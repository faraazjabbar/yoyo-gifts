import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  get<T>(path: string): Observable<T[]> {
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

  getByKey<T>(path: string, key: string): Observable<T> {
    return this.http.get<T>(`${environment.firebaseConfig.databaseURL}/${path}/${key}.json`).pipe(
      map(data => {
        return data;
      })
    );
  }

  add(path, item: any) {
    const projects = this.db.list(path);
    return projects.push(item);
  }

  update(path: string, item: any) {
    const key = item.key;
    delete item.key;
    return of(this.db.object( path + '/' + key).update(item));
  }

  delete(path: string, item: any) {
    return this.db.object(path + '/' + item.key).remove();
  }
}
