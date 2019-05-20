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

    buildUrl(url: string, pageNumber?: number, pageSize?: number, filters?: Filter[], sort?: Sort): string {
        let querySeparator = url.indexOf('?') >= 0 ? '&' : '?';

        if (pageNumber && pageSize) {
            url += `${querySeparator}pageNumber=${pageNumber}&pageSize=${pageSize}`;
            querySeparator = '&';
        }

        if (filters && filters.length) {
            url += `${querySeparator}filters=`;
            querySeparator = '&';

            const arr = [];
            for (const filter of filters) {
                if (filter.value === null) {
                    continue;
                }

                arr.push(`${filter.field}|${filter.operator}|${filter.value}`);
            }
            url += arr.join(',');
        }

        if (sort) {
            url += `${querySeparator}sort=${sort.field} ${sort.direction}`;
        }

        return url;
    }

    filterList<T>(list: T[], filters: Filter[]): T[] {
        return list.filter(x => {
            let matchesFound = 0;

            for (const filter of filters) {
                // Skip if the value is null or the key they wanna filter by is not part of this object
                if (filter.value === null || !(filter.field in x)) {
                    matchesFound++;
                    continue;
                }

                const value = (x[filter.field] + '').toLowerCase().replace('null', '');

                switch (filter.operator) {
                    case 'eq': // Equal to
                        if (value === filter.value.toString().toLowerCase()) {
                            matchesFound++;
                        }
                        break;
                    case 'startswith': // Starts with
                        if (value.indexOf(filter.value.toString().toLowerCase()) === 0) {
                            matchesFound++;
                        }
                        break;
                    case 'endswith': // Ends with
                        if ((new RegExp(filter.value + '$')).test(x[filter.field])) {
                            matchesFound++;
                        }
                        break;
                    case 'gte': // Greater than or equal to
                        if (x[filter.field] >= filter.value) {
                            matchesFound++;
                        }
                        break;
                    case 'gt': // Greater than
                        if (x[filter.field] > filter.value) {
                            matchesFound++;
                        }
                        break;
                    case 'lte': // Less than or equal to
                        if (x[filter.field] <= filter.value) {
                            matchesFound++;
                        }
                        break;
                    case 'lt': // Less than
                        if (x[filter.field] < filter.value) {
                            matchesFound++;
                        }
                        break;
                    default: // Contains
                        if (value.indexOf(filter.value.toString().toLowerCase()) !== -1) {
                            matchesFound++;
                        }
                        break;
                }
            }

            return matchesFound === filters.length;
        });
    }

    sortList<T>(list: T[], sort: Sort) {
        list.sort((a, b) => {
            const aValue = typeof a[sort.field] === 'number' ? a[sort.field] : a[sort.field] + '';
            const bValue = typeof b[sort.field] === 'number' ? b[sort.field] : b[sort.field] + '';

            if (!sort.direction || sort.direction === Direction.Asc) {
                return aValue < bValue ? -1 : 1;
            }

            if (sort.direction === Direction.Desc) {
                return aValue > bValue ? -1 : 1;
            }

            return 0;
        });
    }

    paginateList<T>(list: T[], pageNumber: number, pageSize: number): T[] {
        const start = (pageNumber - 1) * pageSize;
        const end = start + pageSize;

        return list.slice(start, end);
    }

    getQueryResult<T>(list: T[], pageNumber?: number, pageSize?: number, filters?: Filter[], sort?: Sort): QueryResult<T> {
        if (filters && filters.length) {
            list = this.filterList<T>(list, filters);
        }

        const total = list.length;

        if (sort) {
            this.sortList<T>(list, sort);
        }

        if (pageNumber && pageSize) {
            list = this.paginateList<T>(list, pageNumber, pageSize);
        }

        return {
            data: list,
            total: total
        };
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

    getFullDescription<T>(obj: T): string {
        if (!obj) {
            return null;
        }

        return `${obj['code']} - ${obj['description']}`;
    }
}
