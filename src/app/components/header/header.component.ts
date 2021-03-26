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

      const displayedName = (user.firstName + ' ' + user.lastName).trim();
      this.displayedName = displayedName ? displayedName : user.email;
    }
  }

  onLogoutClick() {
    this.token.signOut();
    this.router.navigate(['']);
  }
}
