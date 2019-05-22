import { AdminGiftService } from './../../services/admin-gift.service';
import { Gift } from 'src/app/shared/models/gift.model';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  content: Gift;
  constructor(public modalRef: MDBModalRef, private adminGiftService: AdminGiftService) { }

  ngOnInit() {
    console.log(this.content);
    this.adminGiftService.deleteGift(this.content);
  }

}
