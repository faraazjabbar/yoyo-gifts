import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/shared/models/gift.model';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions } from 'src/app/root-store';
import { Subscription, Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit {

    private subscriptions: Subscription[] = [];

    gifts$: Observable<Gift[]>;

    constructor(
        private store: Store<RootStoreState.State>,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.gifts$ = this.store.select(GiftStoreSelectors.getList);
        this.gifts$.pipe(tap(gifts => console.log('Store gifts, ', gifts))).subscribe();
        // Pushing obsersavation to unscribe it
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

}
