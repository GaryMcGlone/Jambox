import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  postsCollection: AngularFirestoreCollection<IPost>;
  posts: Observable<IPost[]>;
  errorMessage: string;

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    this.postsCollection = _afs.collection<IPost>("posts", ref =>
      ref.orderBy("createdAt", "desc")
    );
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

  searchForASong(songId): Observable<IPost[]> {
    console.log("from service", songId);
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("songId", "==", songId).orderBy("createdAt", "desc");
    });

    this.posts = this.postsCollection.valueChanges();
    return this.posts;
  }
}
