import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
    pure: false
})
export class PercentagePipe implements PipeTransform {

    percentageInvalid = false;

    constructor() { }

    transform(value: any): any {
        const percentage = parseFloat(value);
        if (percentage > 100) {
            return null;
        } else {
            return value;
        }
    }

}
