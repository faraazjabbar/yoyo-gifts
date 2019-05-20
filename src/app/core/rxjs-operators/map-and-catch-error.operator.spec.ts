import { throwError } from 'rxjs';
import { mapAndCatchError } from './map-and-catch-error.operator';

describe('mapAndCatchError', () => {
    it('should correctly 500 exceptions', () => {
        const err = new Error('marbles');
        (<any>err).status = 500;
        throwError(err)
            .pipe(mapAndCatchError())
            .subscribe(
                () => {
                    throw Error('This should not be called in this scenario!');
                },
                x => {
                    expect(x).toBe(
                        'Sorry, we can\'t communicate with the API right now. Please try again later.'
                    );
                }
            );
    });

    it('should correctly 404 exceptions', () => {
        const err = new Error('marbles');
        (<any>err).status = 404;
        throwError(err)
            .pipe(mapAndCatchError())
            .subscribe(
                () => {
                    throw Error('This should not be called in this scenario!');
                },
                x => {
                    expect(x).toBe(
                        'Sorry, API returned a not found message.'
                    );
                }
            );
    });
});
