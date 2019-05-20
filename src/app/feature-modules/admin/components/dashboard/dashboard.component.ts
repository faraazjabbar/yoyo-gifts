import { AdminGiftService } from './../../services/admin-gift.service';
import { ManageGiftComponent } from './../manage-gift/manage-gift.component';
import { Component, OnInit } from '@angular/core';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef: MDBModalRef;

  constructor(
    private mdbModal: MDBModalService,
    private adminGiftService: AdminGiftService
  ) {}

  ngOnInit() {}
  openAddGiftModal() {
    this.modalRef = this.mdbModal.show(ManageGiftComponent);

    this.modalRef.content.heading = 'Add new project';
  }
}
