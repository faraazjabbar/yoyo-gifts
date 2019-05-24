import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState, GiftStoreActions, GiftStoreSelectors } from 'src/app/root-store';
import { Observable, of, EMPTY } from 'rxjs';
import { Gift } from 'src/app/shared/models/gift.model';
import { GiftService } from '../../services/gift.service';
import { tap, mergeMap, take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GiftDetailsResolver implements Resolve<Gift> {
    constructor(
        private store: Store<RootStoreState.State>,
        private giftService: GiftService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Gift> | Observable<never> {
        // There's a much better way to do this using NgRx Routing | needs rewriting
        // https://medium.com/@amcdnl/angular-routing-data-with-ngrx-effects-1cda1bd5e579

        const giftKey = route.paramMap.get('giftKey');

        this.store.dispatch(new GiftStoreActions.GetGiftsRequestAction({}));
        this.store.select(GiftStoreSelectors.getByKey(giftKey)).pipe(
            tap(gift => console.log('asdfasdf', gift))
        ).subscribe();

        return this.giftService.getGiftByKey(giftKey).pipe(
            mergeMap(gift => {
                if (gift) {
                    gift.key = giftKey;
                    return of(gift);
                } else {
                    this.router.navigate(['gifts']);
                    return EMPTY;
                }
            })
        );
    }
}
