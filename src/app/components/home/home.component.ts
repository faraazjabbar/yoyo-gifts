import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories;
  brands;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.fbs.get('/categories').subscribe(data => {
      this.categories = data;
    });
    this.fbs.get('/brands').subscribe(data => {
      this.brands = data;
    });
  }
}
