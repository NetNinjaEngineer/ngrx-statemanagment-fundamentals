import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/auth.state';
import { User } from '../../../auth/models/user.model';
import { isAuthenticated, selectLoggedInUser } from '../../../auth/store/auth.selectors';
import { logout } from '../../../auth/store/auth.actions';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    loggedInUser$!: Observable<User | null>;
    isAuthenticated$!: Observable<boolean>;

    constructor(private readonly store: Store<{ auth: AuthState }>) { }

    ngOnInit(): void {
        this.loggedInUser$ = this.store.select(selectLoggedInUser);
        this.isAuthenticated$ = this.store.select(isAuthenticated);
    }

    onLogout() {
        this.store.dispatch(logout())
    }
}
