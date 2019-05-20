import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe implements PipeTransform {

    constructor(
        private translationService: TranslationService
    ) { }

    transform(value: string, translation?: Object): string {
        if (translation) {
            return (translation[value]) || value;
        }

        return this.translationService.getGlobalTranslationValue(value);
    }
}
