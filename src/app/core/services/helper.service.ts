import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Filter } from 'src/app/shared/models/filter.model';
import { Sort } from 'src/app/shared/models/sort.model';
import { Direction } from 'src/app/shared/enums/direction.enum';
import { QueryResult } from 'src/app/shared/models/query-result.model';
import { Observable, throwError } from 'rxjs';

const TODAY = new Date(new Date().setHours(0, 0, 0, 0));
const MILLISECONDS_PER_DAY = 86400000; // 24 hours * 60 mins * 60 seconds * 1000 milliseconds

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    private backRoute: string;

    constructor() { }

    setBackRoute(backRoute: string) {
        this.backRoute = backRoute;
    }

    getBackRoute(): string {
        return this.backRoute || environment.defaultRoute;
    }

    isTouchDevice(): boolean {
        return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
    }

    handleError(error: Response | any): Observable<never> {
        const friendly = environment.apiShowFriendlyMessage;
        let message = '';
        console.error('Request failed', error);
        const genericMessage = 'Sorry, the API service is not reachable. Please try later.';
        if (friendly) {
            message = genericMessage;
        } else if (error.status === 404) {
            message = 'Sorry, API returned a not found message.';
        } else if (error.error && error.error.ValidationErrors) {
            error.error.ValidationErrors.forEach(validationError => {
                message += validationError.Description + '\n';
            });
        } else if (error.error && error.error.Detail) {
            message = error.error.Detail;
            const lineBreakIndex = message.indexOf('\n');
            if (lineBreakIndex !== -1) {
                message = message.substring(0, lineBreakIndex);
            }
        } else if (error.status === 500) {
            message = genericMessage;
        } else {
            message = error.message;
        }

        // Rethrow as a user friendly message
        return throwError(message);
    }

    getBrowserLanguage(): string {
        const nav = window.navigator;
        const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];

        // Support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
            for (const language of nav.languages) {
                if (language && language.length) {
                    return language;
                }
            }
        }

        // Support for other well known properties in browsers
        for (const key of browserLanguagePropertyKeys) {
            const language = nav[key];
            if (language && language.length) {
                return language;
            }
        }

        return null;
    }

    cloneObject<T extends object>(obj: T): T {
        return { ...(obj as object) } as T;
    }

    cloneList<T>(list: T[]): T[] {
        return list.slice(0);
    }

    camelCaseToDash(str: string): string {
        return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    }

    camelCaseToSpace(str: string): string {
        return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ');
    }

    getUrl(entities: string, action: string = ''): { url: string, isMock: boolean } {
        const fileName = this.camelCaseToDash(entities + action);
        const useMock = environment.useMocks || environment.apiMocks && environment.apiMocks.indexOf(fileName) !== -1;
        const mockUrl = `${environment.mocksUrl}${fileName}.json`;
        let apiUrl = environment.apiUrl + entities;
        if (action) {
            apiUrl += `/${action}`;
        }

        return {
            url: useMock ? mockUrl : apiUrl,
            isMock: useMock
        };
    }

    sortNumber(a: number, b: number): number {
        return a - b;
    }
}
