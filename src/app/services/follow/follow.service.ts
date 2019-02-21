import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { IFollow } from "../../interfaces/follow.interface";
import { IPost } from "../../interfaces/post-interface";
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import { switchMap } from 'rxjs/operators';
import { IonFooter } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private relationshipCollection: AngularFirestoreCollection<IFollow>;
  private testCollection: AngularFirestoreCollection<IFollow>;
  private followersList: Observable<IFollow[]>;
  followerPosts: Observable<IPost[]>;
  private onefollowersList: Observable<IFollow[]>;

  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: Observable<IPost[]>

  private follow: Observable<IFollow>;

  constructor(private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) {
    this._firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.postsCollection = this._afs.collection<IPost>(`posts/${user.uid}/userPosts`);
        this.relationshipCollection = this._afs.collection<IFollow>(`relationships`, ref => {
          return ref.where("followerId", "==", user.uid)
        }); 
      }
    })
  }

  addFollow(follow:IFollow) {
    this.relationshipCollection.add(follow)
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

  getFollowingUsers(followedId:string): Observable<IFollow[]> {
    this.testCollection = this._afs.collection<IFollow>("relationships", ref => {
      return ref.where("followedId", "==", followedId)
    })
    this.followersList = this.testCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as IFollow;
          const id = a.payload.doc.id;
          return { id,...data };
        }))
    );
    return this.followersList;
  }

  getSpecificFollow(followedId:string, followerId:string): Observable<IFollow[]> {
    this.testCollection = this._afs.collection<IFollow>("relationships", ref => {
      return ref.where("followerId", "==", followerId)
                .where("followedId", "==", followedId)
    })

    this.onefollowersList = this.testCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as IFollow;
          const id = a.payload.doc.id;
          return { id,...data };
        }))
    );

    return this.onefollowersList;
  }

  getFollowedUsersPosts(UserID: string): Observable<IPost[]>{
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("UserID", "==", UserID).orderBy("createdAt", "desc")
    });
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