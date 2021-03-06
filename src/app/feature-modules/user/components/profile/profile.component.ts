import { Component, OnInit } from '@angular/core';
import { User } from './../../../../shared/models/user.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddPointsComponent } from './../add-points/add-points.component';
import { AuthService } from './../../../../core/auth/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public user: User;
    private addPointsModalRef: MDBModalRef;
    private modalOptions = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: true,
        class: '',
        containerClass: '',
        animated: true,
        data: {}
    };

    constructor(
        private modalService: MDBModalService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.user = this.authService.emitUserData.getValue();
    }

    public addPoints() {
        this.modalOptions.data = { content: this.user };
        this.addPointsModalRef = this.modalService.show(
            AddPointsComponent,
            this.modalOptions
        );
    }
}
