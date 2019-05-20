import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinks } from './../../../shared/constants/app.constants';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user;
  isLoggedIn = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.authService.emitUserData.subscribe(data => {
      this.user = JSON.parse(JSON.stringify(data));
      this.cdr.detectChanges();
    });
  }

  public gotoSignIn() {
    this.router.navigate([RouterLinks.SIGN_IN]);
  }

  public logOut() {
    this.authService.signOut().then(data => {
      this.router.navigate([RouterLinks.HOME]);
      sessionStorage.removeItem('user');
      this.authService.emitUserData.next(null);
    });
  }
}
