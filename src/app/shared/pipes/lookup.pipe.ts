import { Pipe, PipeTransform } from '@angular/core';
import { LookupTextField } from '../enums/lookup-text-field.enum';
import { Lookup } from '../models/lookup.model';
import { LookupValueField } from '../enums/lookup-value-field.enum';

@Pipe({
    name: 'lookup'
})
export class LookupPipe implements PipeTransform {

    transform(value: string | number, items: Lookup[], valueField: LookupValueField = LookupValueField.Code, textField: LookupTextField = LookupTextField.FullDescription): string {
        const lookup = items && items.find(x => x[valueField].toString() === value.toString());
        return lookup ? lookup[textField] : value.toString();
    }
}
