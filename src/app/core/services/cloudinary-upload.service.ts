import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface CloudinaryUploadFileResponse {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  asset_folder: string
  display_name: string
  original_filename: string
}


@Injectable({
  providedIn: 'root'
})
export class CloudinaryUploadService {

  constructor(private readonly httpClient: HttpClient) { }

  uploadImage(image: File): Observable<CloudinaryUploadFileResponse> {
    const isValid = this.validateImage(image);

    if (!isValid) {
      throw new Error('Invalid image file.');
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    return this.httpClient.post<CloudinaryUploadFileResponse>(`${environment.cloudinary.uploadEndpoint}`, formData);
  }


  validateImage(image: File) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(image.type)) {
      throw new Error('Only PNG, JPEG and JPG files are allowed.');
    }

    return true;
  }

}
