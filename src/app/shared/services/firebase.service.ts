import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  get(path: string) {
    const array = [];
    this.db.list(path).snapshotChanges().subscribe(data => {
      data.forEach(dataOne => {
        const item: any = dataOne.payload.val();
        array.push( {
          key: dataOne.payload.key,
          ...item
        });
      });
      return array;
  });
}
  add(path, item: any) {
    const projects = this.db.list(path);
    return projects.push(item);
  }

  update(path: string, item: any) {
    const key = item.key;
    delete item.key;
    return of(this.db.object( path + '/' + key)
      .update(item));
  }
  delete(path: string, item: any) {
    return this.db.object(path + '/' + item.key).remove();
  }
}
