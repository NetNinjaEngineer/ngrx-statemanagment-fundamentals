import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CloudinaryUploadService } from '../../../core/services/cloudinary-upload.service';
import { Observable, Subscription } from 'rxjs';
import { CoursesV2State } from '../../store/coursesv2.state';
import { createCourse, setCreateCourseFormVisiable, updateCourse } from '../../store/coursesv2.actions';
import { getCourseByIdQueryParams } from '../../store/coursesv2.selectors';
import { ICourseV2 } from '../../models/courseV2.model';
import { getQueryParams } from '../../../router/router.selectors';

@Component({
    selector: 'app-create-course',
    standalone: false,
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnDestroy, OnInit {

    courseForm: FormGroup;
    selectedFile: File | null = null;
    cloudinaryUploadSubscription: Subscription | null = null;
    isEditMode!: boolean;
    selectCourseToEdit!: ICourseV2 | undefined;

    constructor(
        private fb: FormBuilder,
        private readonly store: Store<{ coursesv2: CoursesV2State }>,
        private readonly clouadinaryService: CloudinaryUploadService) {

        this.courseForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            author: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            instructor: ['', Validators.required],
            duration: [0, [Validators.required, Validators.min(1)]],
            rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
            isActive: [true],
            category: ['', Validators.required]
        });

        this.store.select(getQueryParams).subscribe((queryParams) => {
            this.isEditMode = JSON.parse(queryParams['edit']);
        });

        this.store.select(getCourseByIdQueryParams).subscribe((selectedCourse) => {
            this.selectCourseToEdit = selectedCourse;

            if (this.isEditMode && this.selectCourseToEdit) {
                this.courseForm.patchValue(this.selectCourseToEdit);
            } else {
                this.courseForm.reset();
            }

        });

    }

    ngOnInit(): void {


    }

    onSubmit() {
        if (!this.isEditMode) {
            if (this.selectedFile) {
                this.cloudinaryUploadSubscription = this.clouadinaryService.uploadImage(this.selectedFile).subscribe({
                    next: (response) => {
                        const imageUrl = response.secure_url;
                        const newCourse = { ...this.courseForm.value, image: imageUrl };
                        this.store.dispatch(createCourse({ newCourse: newCourse }));
                        this.close();
                    },
                    error: (err) => {
                        console.error('Image upload failed:', err);
                    }
                });

            }
        } else {
            if (this.selectCourseToEdit?.id) {
                const updatedCourse: ICourseV2 = { ...this.selectCourseToEdit, ...this.courseForm.value } as ICourseV2;

                this.store.dispatch(updateCourse({ id: this.selectCourseToEdit.id, data: updatedCourse }));
                this.close();
            }
        }
    }

    onFileChanged($event: Event) {
        const fileInput = $event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            this.selectedFile = file;
        }
    }

    close() {
        this.store.dispatch(setCreateCourseFormVisiable({ status: false }));
    }

    ngOnDestroy(): void {
        this.cloudinaryUploadSubscription?.unsubscribe();
    }


}
