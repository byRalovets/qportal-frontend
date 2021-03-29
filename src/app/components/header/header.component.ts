import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
// @ts-ignore
import {log} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  displayedName: string = 'John Doe';

  constructor(private token: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isAuthenticated = true;
      const user = this.token.getUser();

      log(user);

      let displayedName;

      if (user.firstName.trim() == 'null' && user.lastName.trim() == null) {
        displayedName = user.email.trim();
      } else if (user.firstName.trim() == 'null') {
        displayedName = 'Mr./Mrs. ' + user.lastName.trim();
      } else if (user.lastName.trim() == 'null') {
        displayedName = user.firstName.trim();
      } else {
        displayedName = user.firstName.trim() + ' ' + user.lastName.trim();
      }

      this.displayedName = displayedName;
    }
  }

  onLogoutClick() {
    this.token.signOut();
    this.router.navigate(['']);
  }
}
