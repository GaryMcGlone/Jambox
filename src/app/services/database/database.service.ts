import { Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map, reduce } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";
import { IUser } from "../../interfaces/user-interface";
import { IComment } from "../../interfaces/comment-interface";
import { ILike } from "../../interfaces/like-interface";
import * as firebase from "firebase/";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {

  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: Observable<IPost[]>;
  private filteredPosts: Observable<IPost[]>;

  private userCollection: AngularFirestoreCollection<IUser>;
  private fireDocUser: AngularFirestoreDocument<IUser>;
  private currentUser: Observable<IUser>;

  private comments: Observable<IComment[]>;
  private commentsCollection: AngularFirestoreCollection<IComment>;

  private likes: Observable<ILike[]>
  private likeCollection: AngularFirestoreCollection<ILike>

  private found: boolean = false;
  private likeDocument: AngularFirestoreDocument<ILike>;
  private like: Observable<ILike>


  constructor(private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts", ref =>
      ref.orderBy("createdAt", "desc")
    );

    this.userCollection = _afs.collection<IUser>("users");
    this.likeCollection = _afs.collection<ILike>('likes');
    this.commentsCollection = _afs.collection<IComment>("comments")
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
  addComment(comment): void {
    this.commentsCollection.add(comment)
  }

  getComments(postID: string): Observable<IComment[]> {
    // this._afs.collection(`posts/${postID}/comments`,ref => ref.orderBy('postedAt','desc'))
    this.commentsCollection = this._afs.collection<IComment>("comments", ref => {
      return ref.where("postId", "==", postID)
    });
    this.comments = this.commentsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IComment;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.comments


  }

  //Checking if post is liked by a user
  checkIfLiked(likeId: string): Observable<ILike> {
    this.likeDocument = this._afs.doc<ILike>("likes/" + likeId);
    this.like = this.likeDocument.valueChanges();
    return this.like
  }

  //Adding a like
  addLike(like: ILike): void {
    this.likeCollection.doc(like.postId + "_" + like.userId).set(like)
  }

  //Remove a like
  removeLike(likeId: string): void {
    this.likeCollection.doc(likeId).delete()
  }

  storeProfilePicture(imageBlob){
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let fileRef = firebase.storage()
                        .ref("images/" + firebase.auth().currentUser.uid);
      let uploadTask = fileRef.put(imageBlob);
      uploadTask.on(
        "state_changed",
        (_snap: any) => {
          console.log(
            "progess " +
              (_snap.bytesTransferred / _snap.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }
  
}
