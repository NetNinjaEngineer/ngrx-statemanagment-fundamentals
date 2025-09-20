import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../models/loginResponse';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FIREBASE_API_KEY } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  interval: any;

  constructor(private readonly httpClient: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, { email, password, returnSecureToken: true });
  }


  register(email: string, password: string): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, { email, password, returnSecureToken: true });
  }

  formatUser(userData: ILoginResponse): User {
    const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000);
    const user = new User(userData.email, userData.localId, userData.idToken, expirationDate);
    return user;
  }

  getErrorMessage(errCode: string) {
    switch (errCode) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'Invalid password.';
      case 'EMAIL_EXISTS':
        return 'Email is taken.'
      default:
        return 'Unkown error occured, please try again later.'
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    const todaysDate = new Date().getTime();
    const expirationDate = user.ExpireDate.getTime();

    const timeInterval = expirationDate - todaysDate;

    this.interval = setTimeout(() => {
      // logout functionality or get a refresh token
      this.logout();
    }, timeInterval);

  }

  getUserFromLocalStorage(): User | null {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(userData.email, userData.localId, userData.token, expirationDate);
      return user;
    }

    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.interval) {
      clearTimeout(this.interval);
      this.interval = null
    }
  }

}
