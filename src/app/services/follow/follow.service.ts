import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { IFollow } from "../../interfaces/follow.interface";
import { IPost } from "../../interfaces/post-interface";
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<IFollow>;
  private followersList: Observable<IFollow[]>

  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: Observable<IPost[]>;

  constructor(private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(user => {
      if(user) {
        this.relationshipCollection = this._afs.collection<IFollow>(`relationships/${user.uid}/userFollowing`);
      }
    })
  }

  addFollow(follow) {
    console.log("updating following array with", follow)
    this.relationshipCollection.doc(follow.followerId + "/userFollowing/" + follow.followedId ).set({})
  }

  removeFollowing(docId: string) {
    this.relationshipCollection.doc(docId).delete()
  }

  getFollowedUsers(): Observable<IFollow[]> {
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

  getFollowedUsersPosts(UserId): Observable<IPost[]> {
    console.log("uids", UserId)
    this.postsCollection = this._afs.collection<IPost>(`posts/${UserId}/userPosts/`);
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