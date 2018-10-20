import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Post } from "../../models/post.model";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<Post>("posts");
  }

  getPosts(): Observable<Post[]> {
    return (this.posts = this.postsCollection.valueChanges());
  }
  addPost(post: Post): void {
    this.postsCollection.add(post);
  }
}