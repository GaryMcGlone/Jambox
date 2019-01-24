import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<any[]>;

  constructor(private _afs: AngularFirestore) {
    this.relationshipCollection = _afs.collection<any[]>('followers');
    
   }

   addFollow() {

   }

   removeFollowing() {

   }

}
