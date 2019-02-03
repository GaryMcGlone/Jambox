import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../interfaces/user-interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersColection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;

  constructor(private _afs: AngularFirestore) {
    this.usersColection = _afs.collection<IUser>("users");
   }
  
  getUsersByQuery(query: string): Observable<IUser[]> {
    this.usersColection = this._afs.collection<IUser>("users", ref => {
      return ref.orderBy('displayName', 'asc')
                .startAt(query)
                .endAt(query + "\uf8ff")
                .limit(5);
    });
    this.users = this.usersColection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IUser;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );

    return this.users;
  }
}
