import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { IFollow } from "../../interfaces/follow.interface";
import * as firebase from "firebase/";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<any>;
  private followersList: Observable<any[]>
  private userId: string

  constructor(private _afs: AngularFirestore,private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(user => {
      if(user) {
        this.relationshipCollection = _afs.collection<any>('relationships', ref => {
          console.log('uid', user.uid)
          return ref.where("followerId", "==", user.uid)
        });
      }
    })    
   }

   addFollow(follow: IFollow) {
      console.log("following object:", follow)
      this.relationshipCollection.doc(follow.followerId + "_" + follow.followedId).set(follow)
   }

   removeFollowing(docId:string) {

   }

   getFollowedUsers() : Observable<any[]> {
    return this.followersList = this.relationshipCollection.valueChanges()
   }
   
   getFollowedUsersPosts() {

   }
}