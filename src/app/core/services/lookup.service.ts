import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup } from 'src/app/shared/models/lookup.model';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { KeyValue } from '@angular/common';
import { mapAndCatchError } from '../rxjs-operators';

const API_URL = environment.apiUrl;
const MOCK_URL = `${environment.mocksUrl}lookup/{entity}.json`;
const USE_MOCK = environment.useMocks;

@Injectable({
    providedIn: 'root'
})
export class LookupService {

    constructor(
        private http: HttpClient,
        private helperService: HelperService
    ) { }

    getList(entity: string, lookupFilter?: string, additionalFilters?: KeyValue<string, any>[]): Observable<Lookup[]> {
        let apiUrl = `${API_URL}${entity}/lookup`;

        if (lookupFilter) {
            apiUrl += `?lookupFilter=${lookupFilter}`;
        }

        if (additionalFilters) {
            let firstDelimiter = apiUrl.indexOf('?') === -1 ? '?' : '&';

            for (const filter of  additionalFilters) {
                apiUrl += `${firstDelimiter}${filter.key}=${filter.value}`;
                firstDelimiter = '&';
            }
        }

        const fileName = this.helperService.camelCaseToDash(entity);
        const useMock = USE_MOCK || environment.apiMocks && environment.apiMocks.indexOf('lookup/' + fileName) !== -1;
        const url = useMock ?
            MOCK_URL.replace('{entity}', fileName) :
            apiUrl;

        return this.http
            .get(encodeURI(url))
            .pipe(
                mapAndCatchError<Lookup[]>()
            );
    }
}
