import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { IFollow } from "../../interfaces/follow.interface";
import { IPost } from "../../interfaces/post-interface";
import * as firebase from "firebase/";
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { Post } from '../../models/post.model';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<IFollow>;
  private followersList: Observable<IFollow[]>

  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: IPost[] = []

  constructor(private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.relationshipCollection = this._afs.collection<IFollow>(`relationships/${user.uid}/userFollowing`);
      }
    })

  }

  addFollow(follow) {
    console.log("updating following array with", follow)
    this.relationshipCollection.doc(follow.followerId + "/userFollowing/" + follow.followedId).set({})
  }

  removeFollowing(docId: string) {
    this.relationshipCollection.doc(docId).delete()
  }

  getFollowedUsers(): Observable<IFollow[]> {
    // return this.followersList = this.relationshipCollection.valueChanges()
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

  getFollowedUsersPosts(UserId: string): IPost[] {
    const string$ = new Subject<string>();

    const Query = string$.pipe(
      switchMap(string =>
        this._afs.collection<IPost>(`posts/${UserId}/userPosts/`).snapshotChanges().pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as IPost;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        )
      )
    )
    Query.subscribe(queryObvs => {
      queryObvs.forEach(post => {
        this.posts.push(post)
      })
    })
    string$.next(UserId)

    return this.posts;
  }
}