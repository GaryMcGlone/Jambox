import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore, AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";
import { IUser } from "../../interfaces/user-interface";
@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;
  userCollection: AngularFirestoreCollection<IUser>;
  private fireDocUser: AngularFirestoreDocument<IUser>;
  currentUser: Observable<IUser>;
  filteredPosts: Observable<IPost[]>

  constructor(private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts", ref =>
      ref.orderBy("createdAt", "desc")
    );

    this.userCollection = _afs.collection<IUser>("users")

  }

  getPosts(): Observable<IPost[]> {
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

  addPost(post): void {
    this.postsCollection.add(post);
  }

  // Search for a song in our database
  searchResults: Observable<IPost[]>;
  searchForASong(songId): Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("songId", "==", songId).orderBy("createdAt", "desc");
    });
    this.searchResults = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.searchResults;
  }
  //email: string, userId: string, username: string
  addUser(user: IUser) {

  }

  storeUser(email: string, userId: string, username: string) {
    let user: IUser = {
      email: email,
      username: username,
      following: []
    }

    // let user: IUser = {
    //   email: email,
    //   username: username
    // };
  }
   

  getCurrentUser(userId: string): Observable<IUser> {
    this.fireDocUser = this._afs.doc<IUser>('users/' + userId);
    this.currentUser = this.fireDocUser.valueChanges();
    console.log(this.currentUser)
    return this.currentUser
  }

  filterPosts(following: string): Observable<IPost[]>{
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("UserID", "==", following).orderBy("createdAt", "desc");
    });
    this.filteredPosts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.filteredPosts;
  }


}
