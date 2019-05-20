import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinks } from './../../shared/constants/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  public gotoSignIn() {
    this.router.navigate([RouterLinks.SIGN_IN]);
  }
}
