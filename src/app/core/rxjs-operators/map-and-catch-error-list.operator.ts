import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';
import { Filter } from 'src/app/shared/models/filter.model';
import { Sort } from 'src/app/shared/models/sort.model';
import { QueryResult } from 'src/app/shared/models/query-result.model';

export const mapAndCatchErrorList = <T>(pageNumber?: number, pageSize?: number, filters?: Filter[], sort?: Sort, isMock: boolean = false) =>
    (source: Observable<QueryResult<T> | T[]>) =>
    source.pipe(
        map(response => {
            return isMock ?
                new HelperService().getQueryResult<T>(<T[]>response, pageNumber, pageSize, filters, sort) :
                <QueryResult<T>>response;
        }),
        catchError(error => new HelperService().handleError(error))
    );
