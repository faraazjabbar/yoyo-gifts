import { PercentagePipe } from './percentage.pipe';

let pipe: PercentagePipe;

beforeEach(() => {
    pipe = new PercentagePipe();
});

describe('Percentage', () => {
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('Bad values', () => {
        it('should give null', () => {
            expect(pipe.transform(101)).toEqual(null);
        });
        it('should give null when pass as null or undefined', () => {
            // TODO - pipe must check for these values , and brng 0
            expect(pipe.transform(null)).not.toEqual(isNaN(parseFloat(null)));
            expect(pipe.transform(undefined)).not.toEqual(isNaN(parseFloat(undefined)));
            expect(pipe.transform('value')).not.toEqual(isNaN(parseFloat('value')));
        });
    });

    describe('percentage values ', () => {
        it('should return same value if less than 100', () => {
            expect(pipe.transform(99)).toEqual(99);
        });
        it('shold return negative value if pass as negative', () => {
            expect(pipe.transform(-99)).toEqual(-99);
        });
    });

});
