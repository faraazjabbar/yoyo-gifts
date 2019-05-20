import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  get(path: string) {
    return this.db
      .list(path)
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          return data.map((d: any) => {
            return {
              key: d.key,
              ...d.payload.val()
            };
          });
        })
      );
  }

  add(path, item: any) {
    const projects = this.db.list(path);
    return projects.push(item);
  }
  update(path: string, item: any) {
    return of(this.db.object(path + '/' + item.key).update(item));
  }
  delete(path: string, item: any) {
    return this.db.object(path + '/' + item.key).remove();
  }
}
