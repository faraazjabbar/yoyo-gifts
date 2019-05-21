import { GiftService } from './../../services/gift.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreSelectors, GiftStoreActions } from 'src/app/root-store';
import { Observable, Subscription } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    gifts$: Observable<Gift[]>;
    constructor(
        private store: Store<RootStoreState.State>,
        private giftService: GiftService
    ) { }

    ngOnInit() {
        // individial gift key to be fetched : '-LfIigQjjdKusws13mRo';

        // From NGRX Gift store ...
        this.gifts$ = this.store.select(GiftStoreSelectors.getList);

        this.subscriptions.push(this.store.select(GiftStoreSelectors.getError)
            .pipe(
                tap(error => {
                    if (error) {
                        // this.alertService.error(error);
                        console.log('something went wrong');
                    }
                })
            )
            .subscribe());
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
