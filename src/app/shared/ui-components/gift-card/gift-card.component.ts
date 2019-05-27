import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Gift } from '../../models/gift.model';
import { User } from '../../models/user.model';
import { UserService } from './../../../feature-modules/user/services/user.service';
import { AuthService } from './../../../core/auth/auth.service';

@Component({
    selector: 'app-gift-card',
    templateUrl: './gift-card.component.html',
    styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent implements OnInit {
    @Input() gift: Gift;
    @Input() isAdmin: boolean;
    @Output() deleteEvent = new EventEmitter<Gift>();
    @Output() editEvent = new EventEmitter<Gift>();
    @Input() isFavorite: boolean;
    public user: User;

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.user = this.authService.emitUserData.getValue();
    }
    onEdit() {
        this.editEvent.emit(this.gift);
    }

    onDelete() {
        if (this.isFavorite) {
            this.userService.removeFromFavorites(this.user, this.gift);
        } else {
            this.deleteEvent.emit(this.gift);
        }
    }

    public addToFavorites() {
        this.userService.addToFavorites(this.user, this.gift);
    }
    getDiscountValue(discount, cost) {
        const discountValue = (cost / 100) * discount;
        return cost - discountValue;
    }
}
