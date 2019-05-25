import { SpinnerService } from './../../../../core/spinner/spinner.service';
import { ConfirmationModalComponent } from './../../../admin/components/confirmation-modal/confirmation-modal.component';
import { ManageGiftComponent } from './../../../admin/components/manage-gift/manage-gift.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions } from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { User } from './../../../../shared/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';

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
  searchValue: string;
  loading$: Observable<boolean>;
  brandFilterArray = [];
  pointsFilterValue = 0;
  sortParam = '';
  sortDirection = 'asc';

    constructor(
        private store: Store<RootStoreState.State>,
        private mdbModal: MDBModalService,
        private spinnerService: SpinnerService,
        private alertService: AlertService
    ) { }

    setSearchValue(event: string) {
        console.log(event);
        this.searchValue = event;
    }

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

    onChangeBrandValue(event: string[]) {
        this.brandFilterArray = event.slice();
    }

    onChangePointsValue(event: number) {
        this.pointsFilterValue = event;
    }

    onChangeSortParam(event: string) {
        this.sortParam = event;
    }

    onChangeSortDirection(event: string) {
        this.sortDirection = event;
    }

    resetSearch() {
        this.searchValue = '';
    }

    ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem('user'));
        this.isAdmin = user && user.isAdmin;

        // From NGRX Gift store ...
        this.gifts$ = this.store.select(GiftStoreSelectors.getList);

        // Pushing all the forced subscriptions for unscribe ...
        this.subscriptions.push(
            this.store.select(GiftStoreSelectors.getLoading)
                .pipe(
                    tap(value => {
                        if (value) {
                            this.spinnerService.show();
                        } else {
                            this.spinnerService.hide();
                        }
                    })
                )
                .subscribe()
        );
        this.subscriptions.push(
            this.store.select(GiftStoreSelectors.getError)
                .pipe(
                    filter(error => error !== null),
                    tap(error => this.alertService.error(error))
                )
                .subscribe()
        );
        // Dispatching gift all store
        this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
    }

    ngOnDestroy() {
        // Unscribing all the subscriptions at one go ...
        this.subscriptions.forEach(eachSubcription => {
            if (eachSubcription) {
                eachSubcription.unsubscribe();
            }
        });
    }
}
