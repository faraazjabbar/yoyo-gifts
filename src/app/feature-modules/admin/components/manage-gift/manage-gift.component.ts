import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-manage-gift',
  templateUrl: './manage-gift.component.html',
  styleUrls: ['./manage-gift.component.scss'],
})
export class ManageGiftComponent implements OnInit {
  @ViewChild('projectForm') projectForm: NgForm;

  heading: string;
  project: any = {};

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

}
