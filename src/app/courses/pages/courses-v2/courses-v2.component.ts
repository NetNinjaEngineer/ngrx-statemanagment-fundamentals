import { Component, OnInit } from '@angular/core';
import { CloudinaryUploadService } from '../../../core/services/cloudinary-upload.service';

@Component({
  selector: 'app-courses-v2',
  standalone: false,
  templateUrl: './courses-v2.component.html',
  styleUrl: './courses-v2.component.css'
})
export class CoursesV2Component implements OnInit {
  constructor(private readonly cloudinaryUploadService: CloudinaryUploadService) { }

  ngOnInit(): void {
  }

  onFileSelected($event: Event) {
    const fileUploadElement = $event.target as HTMLInputElement;

    if (fileUploadElement.files != null && fileUploadElement.files.length > 0) {
      const file = fileUploadElement.files[0];
      console.log(file);

      this.cloudinaryUploadService.uploadImage(file).subscribe((response) => {
        console.log(response);
      })
      
    } 

    
  }
}
