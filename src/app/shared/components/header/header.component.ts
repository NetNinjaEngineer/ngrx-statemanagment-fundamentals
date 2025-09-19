import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/store/auth.state';
import { User } from '../../../auth/models/user.model';
import { selectLoggedInUser } from '../../../auth/store/auth.selectors';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    loggedInUser$!: Observable<User | null>;

    constructor(private readonly store: Store<{ auth: AuthState }>) { }

    ngOnInit(): void {
        this.loggedInUser$ = this.store.select(selectLoggedInUser);
    }
}
