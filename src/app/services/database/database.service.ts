import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts");
  }

  getPosts(): Observable<IPost[]> {
    return (this.posts = this.postsCollection.valueChanges());
  }
  addPost(post: IPost): void {
    this.postsCollection.add(post);
  }
}