import { Category } from './../../shared/models/gift.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinks } from './../../shared/constants/app.constants';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { TranslationService } from '../services/translation.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    translation$: Observable<Object>;
    user: User;
    isLoggedIn = false;
    languages = environment.languages;
    categories$: Observable<Category[]>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private fbService: FirebaseService,
        private translationService: TranslationService
    ) {}

    ngOnInit() {
        this.translation$ = this.translationService.getTranslation('core', 'header', localStorage.getItem('chosenLang'));
        this.getUser();
        this.getCategories();
    }
    getCategories() {
        this.categories$ = this.fbService.get('/categories');
    }
    routeToCategories(category: Category) {
        this.router.navigate(['/gifts'], { queryParams: { categoryKey: category.key } });
    }

    onLanguage(locale) {
        // Setting up user language ...
        localStorage.setItem('chosenLang', locale);
        location.reload();
    }

    private getUser() {
        this.authService.emitUserData.subscribe(data => {
            this.user = JSON.parse(JSON.stringify(data));
            this.cdr.detectChanges();
        });
    }

    public gotoSignIn() {
        this.router.navigate([RouterLinks.SIGN_IN]);
    }

    public logOut() {
        this.authService.signOut().then(data => {
            this.router.navigate([RouterLinks.HOME]);
            localStorage.removeItem('user');
            this.authService.emitUserData.next(null);
        });
    }
}
