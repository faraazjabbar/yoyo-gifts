import { Category } from './../../../../shared/models/gift.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
    selector: 'app-gift-list',
    templateUrl: './gift-list.component.html',
    styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit, OnDestroy {
    translation$: Observable<Object>;
    isAdmin = false;
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
    categoryImage: string;
    gifts$: Observable<Gift[]>;
    modalRef: MDBModalRef;
    searchValue: string;
    loading$: Observable<boolean>;
    brandFilterArray = [];
    pointsFilterValue = 0;
    sortParam;
    sortDirection = 'asc';
    categoryFilterValue;
    categories;

    constructor(
        private store: Store<RootStoreState.State>,
        private mdbModal: MDBModalService,
        private fbService: FirebaseService,
        private spinnerService: SpinnerService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router,
        private translationService: TranslationService
    ) {}

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('gift', 'gift-list', localStorage.getItem('chosenLang'));
        const user: User = JSON.parse(localStorage.getItem('user'));
        this.isAdmin = user && user.isAdmin;

        this.route.queryParams
        .subscribe(params => {
            if (params.categoryKey) {
                this.categoryFilterValue = params.categoryKey;
                this.fbService.getByKey('/categories', this.categoryFilterValue)
                .subscribe((category: Category) => {
                    this.categoryImage = category.categoryImage;
                });
            } else {
                this.categoryFilterValue = null;
                this.categoryImage = 'https://vinylbannersprinting.co.uk/wp-content/uploads/2016/04/sb09-RA-Demo.jpg';
            }
         });
        // From NGRX Gift store ...
        this.gifts$ = this.store.select(GiftStoreSelectors.getList);

        // Pushing all the forced subscriptions for unscribe ...
        this.subscriptions.push(
            this.store
                .select(GiftStoreSelectors.getLoading)
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
            this.store
                .select(GiftStoreSelectors.getError)
                .pipe(
                    filter(error => error !== null),
                    tap(error => this.alertService.error(error))
                )
                .subscribe()
        );
        // Dispatching gift all store
        this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
    }
    setSearchValue(event: string) {
        console.log(event);
        this.searchValue = event;
    }

    onEdit(event: Gift) {
        const modalOptions = JSON.parse(JSON.stringify(this.modalOptions));
        modalOptions.data = { content: event };
        this.modalRef = this.mdbModal.show(ManageGiftComponent, modalOptions);
    }

    onDelete(event: Gift) {
        const modalOptions = JSON.parse(JSON.stringify(this.modalOptions));
        modalOptions.data = { content: event };
        this.modalRef = this.mdbModal.show(
            ConfirmationModalComponent,
            modalOptions
        );
    }

    openManageGiftModal(mode: string) {
        if (mode === 'add') {
            const modalOptions = JSON.parse(JSON.stringify(this.modalOptions));
            this.modalRef = this.mdbModal.show(
                ManageGiftComponent,
                modalOptions
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
        this.router.navigate(['/gifts']);
    }

    ngOnDestroy() {
        // Unscribing all the subscriptions at one go ...
        this.subscriptions.forEach(eachSubcription => {
            if (eachSubcription) {
                eachSubcription.unsubscribe();
            }
        });
    }
    trackByFn(index: any) {
        return index;
      }
}
