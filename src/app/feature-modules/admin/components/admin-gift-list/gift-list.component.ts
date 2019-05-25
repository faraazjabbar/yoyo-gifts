import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gift } from 'src/app/shared/models/gift.model';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions } from 'src/app/root-store';
import { Subscription, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { SpinnerService } from 'src/app/core/spinner/spinner.service';
import { Router } from '@angular/router';
import { AdminGiftService } from '../../services/admin-gift.service';
import { GiftService } from 'src/app/feature-modules/gift/services/gift.service';

@Component({
  selector: 'app-admin-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class AdminGiftListComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    gifts$: Observable<Gift[]>;

    constructor(
        private store: Store<RootStoreState.State>,
        private giftService: GiftService,
        private adminGiftService: AdminGiftService,
        private alertService: AlertService,
        private spinnerService: SpinnerService,
        private router: Router
    ) { }

    ngOnInit() {
        this.gifts$ = this.store.select(GiftStoreSelectors.getList);
        // Pushing obsersavation to unscribe it
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
        // Dispatching Gift Store Actions ...
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

    gotoGiftDetails(giftKey) {
        this.router.navigate(['gifts/details', giftKey]);
    }

    deleteGift(giftKey) {
        this.alertService.confirm(
            'Delete Gift !',
            'Want to Delete ?',
            () => this.store.dispatch(new GiftStoreActions.DeleteGiftRequestAction({key: giftKey})),
            null
        );
    }

}
