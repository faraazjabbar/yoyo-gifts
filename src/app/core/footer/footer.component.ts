import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    translation$: Observable<Object>;

    constructor(private translationService: TranslationService) { }

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('core', 'footer', localStorage.getItem('chosenLang'));
    }

}
