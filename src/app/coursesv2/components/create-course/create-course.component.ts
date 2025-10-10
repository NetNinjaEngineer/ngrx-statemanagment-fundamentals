import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CloudinaryUploadService } from '../../../core/services/cloudinary-upload.service';
import { Subscription } from 'rxjs';
import { CoursesV2State } from '../../store/coursesv2.state';
import { createCourse, setCreateCourseFormVisiable } from '../../store/coursesv2.actions';

@Component({
    selector: 'app-create-course',
    standalone: false,
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnDestroy {

    courseForm: FormGroup;
    selectedFile: File | null = null;
    cloudinaryUploadSubscription: Subscription | null = null;

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
    }

    onSubmit() {
        if (this.courseForm.valid) {
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
