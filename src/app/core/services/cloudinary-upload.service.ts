import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryUploadService {

  constructor(private readonly httpClient: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const isValid = this.validateImage(image);

    if (!isValid) {
      throw new Error('Invalid image file.');
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    return this.httpClient.post(`${environment.cloudinary.uploadEndpoint}`, formData);
  }


  validateImage(image: File) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(image.type)) {
      throw new Error('Only PNG, JPEG and JPG files are allowed.');
    }

    return true;
  }

}
