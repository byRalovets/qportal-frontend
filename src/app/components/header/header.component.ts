import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isAuthenticated = false;
    displayedName = '';

    constructor(private token: TokenStorageService, private router: Router) {
    }

    ngOnInit(): void {
        if (this.token.getToken()) {
            this.isAuthenticated = true;
            const user = this.token.getUser();

            let displayedName;

            if (!user.firstName && !user.lastName) {
                displayedName = user.email.trim();
            } else if (!user.firstName) {
                displayedName = 'Mr./Mrs. ' + user.lastName.trim();
            } else if (!user.lastName) {
                displayedName = user.firstName.trim();
            } else {
                displayedName = user.firstName.trim() + ' ' + user.lastName.trim();
            }

            this.displayedName = displayedName;
        }
    }

    onLogoutClick(): void {
        this.token.signOut();
        this.router.navigate(['']);
    }
}
