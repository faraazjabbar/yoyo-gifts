import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';

export const mapAndCatchError = <T>() =>
    catchError((error: any, _caught: Observable<T>) =>
        new HelperService().handleError(error)
    );
