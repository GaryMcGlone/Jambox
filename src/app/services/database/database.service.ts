import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";
import { IUser } from "../../interfaces/user-interface";
import { IComment } from "../../interfaces/comment-interface";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;
  userCollection: AngularFirestoreCollection<IUser>;

  private fireDocUser: AngularFirestoreDocument<IUser>;

  currentUser: Observable<IUser>;
  filteredPosts: Observable<IPost[]>;

  comments: Observable<IComment[]>;
  commentsCollection: AngularFirestoreCollection<IComment>;


  userSearch(start, end)  {
  }
  

  constructor(private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts", ref =>
      ref.orderBy("createdAt", "desc")
    );

    this.userCollection = _afs.collection<IUser>("users");
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

  //this method adds a post
  addPost(post): void {
    this.postsCollection.add(post)
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
    console.log(this.searchResults);
    return this.searchResults;
  }
  
  //dis workds connord
  //hurray
  addUser(user: IUser) {
    this.userCollection.doc(user.uid).set(user);
  }

  getCurrentUser(userId: string): Observable<IUser> {
    this.fireDocUser = this._afs.doc<IUser>("users/" + userId);
    this.currentUser = this.fireDocUser.valueChanges();
    return this.currentUser;
  }

  filterPosts(following: string): Observable<IPost[]> {
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

  //adds a comment to a subcollection, creates subcollection if it doesn't exist
  addComment(comment, postID): void{
    this._afs.collection('posts/' + postID + '/comments').add(comment)
  }

  getComments(postID): Observable<IComment[]> {
    this.comments = this._afs.collection('posts/' + postID + '/comments', ref => ref.orderBy("postedAt", "desc")).snapshotChanges().pipe(
      map(actions =>
      actions.map(a => {
        const data = a.payload.doc.data() as IComment;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    ));
    return this.comments;
  }
}
