import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { RouterLinks } from '../../../shared/constants/app.constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public isRegistered = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  public signInWithGoogle() {
    this.authService.googleSignInWithPopup().then((data: any) => {
      data.additionalUserInfo.isNewUser
        ? this.addNewUser(data)
        : this.getUser(data.user.email);
    });
  }

  private addNewUser(data) {
    const user: User = {
      userId: data.user.uid,
      userName: data.user.displayName,
      email: data.user.email,
      imageLink: data.user.photoURL,
      isAdmin: false
    };
    this.authService.addNewUser(user).subscribe((res: any) => {
      user.key = res.name;
      this.setUserInSession(user);
    });
  }

  private getUser(email) {
    this.authService.getUser(email).subscribe((data: any) => {
      const user: any = { key: Object.keys[0], ...Object.values(data)[0] };
      this.setUserInSession(user);
    });
  }

  private setUserInSession(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authService.emitUserData.next(user);
    user.isAdmin
      ? this.router.navigate([RouterLinks.ADMIN])
      : this.router.navigate([RouterLinks.HOME]);
  }

  public toggleRegister() {
    this.isRegistered = !this.isRegistered;
  }
}
