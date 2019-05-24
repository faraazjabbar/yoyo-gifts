import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from './firebase.service';
describe('FirebaseService', () => {
  let service: FirebaseService;
  beforeEach(() => {
    const httpClientStub = { get: arg1 => ({ pipe: () => ({}) }) };
    const angularFireDatabaseStub = {
      list: path1 => ({
        snapshotChanges: () => ({ pipe: () => ({}) }),
        push: () => ({})
      }),
      object: arg1 => ({ update: () => ({}), remove: () => ({}) })
    };
    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ]
    });
    service = TestBed.get(FirebaseService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
