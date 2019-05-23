import { SpinnerService } from './../../../../core/spinner/spinner.service';
import { ConfirmationModalComponent } from './../../../admin/components/confirmation-modal/confirmation-modal.component';
import { ManageGiftComponent } from './../../../admin/components/manage-gift/manage-gift.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  RootStoreState,
  GiftStoreSelectors,
  GiftStoreActions
} from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { User } from './../../../../shared/models/user.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit, OnDestroy {
  public isAdmin = false;
  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: true,
    class: 'modal-dialog modal-lg ',
    containerClass: '',
    animated: true,
    data: {}
  };
  private subscriptions: Subscription[] = [];
  gifts$: Observable<Gift[]>;
  modalRef: MDBModalRef;
  loading$: Observable<boolean>;

    constructor(
        private store: Store<RootStoreState.State>,
        private mdbModal: MDBModalService,
        private spinnerService: SpinnerService
   ) { }

  onEdit(event: Gift) {
    this.modalOptions.data = { content: event };
    this.modalRef = this.mdbModal.show(ManageGiftComponent, this.modalOptions);
  }
  onDelete(event: Gift) {
    this.modalOptions.data = { content: event };
    this.modalRef = this.mdbModal.show(
      ConfirmationModalComponent,
      this.modalOptions
    );
  }
  openManageGiftModal(mode: string) {
    if (mode === 'add') {
      this.modalRef = this.mdbModal.show(
        ManageGiftComponent,
        this.modalOptions
      );
    }
  }
  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = user && user.isAdmin;
    // individial gift key to be fetched : '-LfIigQjjdKusws13mRo';

    // From NGRX Gift store ...
    this.gifts$ = this.store.select(GiftStoreSelectors.getList);
    this.store.select(GiftStoreSelectors.getLoading)
    .pipe(
      tap(value => {
        console.log(value);
        if (value) {
          this.spinnerService.show();
        } else {
          this.spinnerService.hide();
        }
      })
    )
    .subscribe();

    this.subscriptions.push(
      this.store
        .select(GiftStoreSelectors.getError)
        .pipe(
          tap(error => {
            if (error) {
              // this.alertService.error(error);
              console.log('something went wrong');
            }
          })
        )
        .subscribe()
    );
    // Dispatching gift all store
    this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (x) {
        x.unsubscribe();
      }
    });
  }
}
