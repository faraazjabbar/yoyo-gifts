import { Injectable } from '@angular/core';
import { Gift } from 'src/app/shared/models/gift.model';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/app/shared/models/filter.model';
import { Sort } from 'src/app/shared/models/sort.model';
import { QueryResult } from 'src/app/shared/models/query-result.model';
import { HelperService } from './helper.service';
import { mapAndCatchError, mapAndCatchErrorList, mapAndCatchErrorByField } from '../rxjs-operators';

const ENTITIES = 'giftingDesks';
const API_URL = environment.apiUrl + ENTITIES;
const MOCK_URL = `${environment.mocksUrl}${ENTITIES}.json`;
const USE_MOCK = environment.useMocks;

@Injectable({
    providedIn: 'root'
})
export class GiftService {

    constructor(
        private http: HttpClient,
        private helperService: HelperService
    ) { }

    private add(gift: Gift): Observable<Gift> {
        if (USE_MOCK) {
            gift.giftId = (Math.floor(Math.random() * 100) + 10).toString();
            return of(gift);
        }

        return this.http
            .post(API_URL, gift)
            .pipe(
                mapAndCatchError<Gift>()
            );
    }

    private update(giftingdesk: Gift): Observable<Gift> {
        if (USE_MOCK) {
            return of(giftingdesk);
        }

        return this.http
            .put(`${API_URL}/${giftingdesk.giftId}`, giftingdesk)
            .pipe(
                mapAndCatchError<Gift>()
            );
    }

    getList(pageNumber?: number, pageSize?: number, filters?: Filter[], sort?: Sort): Observable<QueryResult<Gift>> {
        const url = USE_MOCK ?
            MOCK_URL :
            this.helperService.buildUrl(API_URL, pageNumber, pageSize, filters, sort);

        return this.http
            .get(url)
            .pipe(
                mapAndCatchErrorList(pageNumber, pageSize, filters, sort, USE_MOCK)
            );
    }

    getById(id: number): Observable<Gift> {
        const url = USE_MOCK ? MOCK_URL : `${API_URL}/${id}`;

        return this.http
            .get(url)
            .pipe(
                mapAndCatchErrorByField(USE_MOCK, 'giftingDeskId', id)
            );
    }

    save(gift: Gift): Observable<Gift> {
        return gift.giftId ? this.update(gift) : this.add(gift);
    }

    delete(id: number): Observable<void> {
        if (USE_MOCK) {
            return of(null);
        }

        return this.http
            .delete(`${API_URL}/${id}`)
            .pipe(
                mapAndCatchError<null>()
            );
    }
}
