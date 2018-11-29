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
  postID;

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

  //this method adds a post, as well as the subcollection that holds the comments
  addPost(post): void {
    this.postsCollection.add(post)
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
      this._afs.collection('posts/' + docRef.id + '/comments').add({
        'content': "",
        'postedBy': "",
        'likes': 0
      });
    })
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

  addComment(comment): void{
    this.commentsCollection.add(comment);
  }

  getComments(postID): void {
    
  }
}
