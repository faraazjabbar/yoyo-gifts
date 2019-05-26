import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HelperService } from './helper.service';


@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    private translations: Object[] = [];

    constructor(
        private http: HttpClient,
        private helperService: HelperService
    ) { }

    getLocale() {
        const languageInfo = this.helperService.getBrowserLanguage();
        return languageInfo || environment.defaultLocale;
    }

    getTranslation(module: string, component: string, userLanguage?: string): Observable<Object> {
        const culstureInfo = this.helperService.getBrowserLanguage();
        const dashIndex = culstureInfo.indexOf('-');
        let language = dashIndex !== -1 ? culstureInfo.substring(0, dashIndex) : culstureInfo;
        language = language || environment.defaultLanguage;
        language = language.toLowerCase();
        // Setting up user chosen language
        language = userLanguage || language;

        let translation = this.translations[module] && this.translations[module][component];

        // If this translation is already cached, return it
        if (translation) {
            return of(translation);
        }

        const url = `${environment.i18nUrl}${module}/${component}.json`;

        return this.http
            .get(url)
            .pipe(
                map(response => {
                    if (!this.translations[module]) {
                        this.translations[module] = [];
                    }

                    // Cache and return translation
                    translation = response[language];
                    this.translations[module][component] = translation;
                    return translation;
                })
            );
    }

    getGlobalTranslationValue(value: string): string {
        const module = 'shared';
        const translation = this.translations[module] && this.translations[module]['global'];
        return (translation && translation[value]) || value;
    }
}
