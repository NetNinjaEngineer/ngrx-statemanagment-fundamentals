import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../models/loginResponse';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FIREBASE_API_KEY } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, { email, password, returnSecureToken: true });
  }

  formatUser(userData: ILoginResponse): User {
    const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
    const user = new User(userData.email, userData.localId, userData.idToken, expirationDate);
    return user;
  }

  getErrorMessage(errCode: string) {
    switch(errCode) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'Invalid password.'
      default:
        return 'Unkown error occured, please try again later.'
    }
  }

}
