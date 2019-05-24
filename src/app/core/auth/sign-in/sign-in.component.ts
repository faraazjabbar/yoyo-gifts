import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { RouterLinks } from '../../../shared/constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public isRegistered = false;
  public signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.setSignInForm();
  }

  private setSignInForm() {
    this.signInForm = this.fb.group({
      firstName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ],
      lastName: [null],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ])
      ]
    });

    const firstNameValidation = this.signInForm.get('firstName');
    this.isRegistered
      ? firstNameValidation.setValidators([
          Validators.required,
          Validators.maxLength(10)
        ])
      : firstNameValidation.setValidators(null);
  }

  public signInWithGoogle() {
    this.authService
      .googleSignInWithPopup()
      .then((data: any) => {
        const user: User = {
          userId: data.user.uid,
          userName: data.user.displayName,
          email: data.user.email,
          imageLink: data.user.photoURL,
          isAdmin: false,
          points: 10000
        };
        data.additionalUserInfo.isNewUser
          ? this.addNewUser(user)
          : this.getUser(data.user.email);
      })
      .catch(err => {
        this.alertService.error(err);
      });
  }

  public signInWithEmail(user) {
    this.authService
      .signInWithEmail(user.email, user.password)
      .then((userData: any) => {
        this.getUser(userData.user.email);
      })
      .catch(err => {
        this.alertService.error(err);
      });
  }

  public createUserWithEmail(user) {
    this.authService
      .createUserWithEmail(user.email, user.password)
      .then((data: any) => {
        const userData: User = {
          userId: data.user.uid,
          userName: user.firstName + ' ' + user.lastName,
          email: user.email,
          imageLink: data.user.photoURL,
          isAdmin: false,
          points: 10000
        };
        this.addNewUser(userData);
      })
      .catch(err => {
        this.alertService.error(err);
      });
  }

  private addNewUser(user) {
    this.authService.addNewUser(user).subscribe((res: any) => {
      user.key = res.name;
      this.setUserInSession(user);
    });
  }

  private getUser(email) {
    this.authService.getUser(email).subscribe((data: any) => {
      const user: any = {
        key: Object.keys(data)[0],
        ...Object.values(data)[0]
      };
      this.setUserInSession(user);
    });
  }

  private setUserInSession(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.authService.emitUserData.next(user);
    user.isAdmin
      ? this.router.navigate([RouterLinks.ADMIN])
      : this.router.navigate([RouterLinks.HOME]);
  }

  public toggleRegister() {
    this.isRegistered = !this.isRegistered;
    this.setSignInForm();
  }

  public onSubmit(form) {
    form.value.firstName
      ? this.createUserWithEmail(form.value)
      : this.signInWithEmail(form.value);
  }
}
