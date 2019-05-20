import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';

export const mapAndCatchErrorByField = <T>(isMock: boolean = false, fieldName?: string, fieldValue?: any) =>
    (source: Observable<T | T[]>) =>
    source.pipe(
        map(response => {
            if (isMock && response instanceof Array) {
                    const list = response;
                    return list.find(x => x[fieldName] === fieldValue);
            }
            return <T>response;
        }),
        catchError(error => new HelperService().handleError(error))
    );
