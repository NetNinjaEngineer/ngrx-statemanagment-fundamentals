import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse } from '../models/loginResponse';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FIREBASE_API_KEY } from '../../constants';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.state';
import { logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store<{ auth: AuthState }>) { }

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
        return 'Email is taken.';
      case "INVALID_LOGIN_CREDENTIALS":
        return 'Email or password is incorrect';
      default:
        return 'Unkown error occured, please try again later.'
    }
  }

  setUserInLocalStorage(user: User) {

    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.autoLogoutUser(user);
    } catch (error) {
      console.log(`Error saving user data to the local storage: ${error}`);

    }
  }

  getUserFromLocalStorage(): User | null {
    try {
      const userDataString = localStorage.getItem('currentUser');
      if (!userDataString) {
        return null;
      }

      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);

      const user = new User(userData.email, userData.localId, userData.token, expirationDate);

      if (expirationDate <= new Date()) {
        localStorage.removeItem('currentUser');
        return null;
      }

      return user;
    } catch (error) {
      localStorage.removeItem('currentUser');
      return null;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  autoLogoutUser(loggedUser: User) {
    const todaysTime = new Date().getTime();
    const interval = loggedUser.ExpireDate.getTime() - todaysTime;
    console.log(interval);
    setTimeout(() => {
      this.store.dispatch(logout());
    }, interval);

  }

}
