import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Gift } from './../models/gift.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { of, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db: AngularFireDatabase, private http: HttpClient) {}

    get(path: string): Observable<Gift|User> {
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

    getByKey(key: string) {
        return this.http.get(`https://yoyo-gift.firebaseio.com/gifts/${key}.json`);
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
