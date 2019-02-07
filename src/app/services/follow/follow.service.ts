import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { IFollow } from "../../interfaces/follow.interface";
import { IPost } from "../../interfaces/post-interface";
import * as firebase from "firebase/";
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Post } from '../../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<IFollow>;
  private followersList: Observable<IFollow[]>

  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: Observable<IPost[]>;

  constructor(private _afs: AngularFirestore,private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(user => {
      if(user) {
        this.relationshipCollection = this._afs.collection<IFollow>(`relationships/`, ref => {
          console.log('uid', user.uid)
          return ref.where("followerId", "==", user.uid)
        });
      }
    })
   }

  addFollow(follow: any) {
    this.relationshipCollection.add(follow)
  }

   removeFollowing(docId:string) {
      this.relationshipCollection.doc(docId).delete()
   }

   getFollowedUsers() : Observable<IFollow[]> {
    this.followersList = this.relationshipCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IFollow;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.followersList;
   }
   
   getFollowedUsersPosts(UserId) : Observable<IPost[]> {
     console.log("users", UserId)
      this.postsCollection = this._afs.collection<IPost>('posts', ref => {
        return ref.where("UserID", "==", UserId)
      })
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.posts;
   }
}