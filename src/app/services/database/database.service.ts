import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestoreCollection,
  AngularFirestore
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
  users: Observable<IUser[]>
  user: Observable<IUser>;
  userId: string;
  username: string;

  errorMessage: string;

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

    //Connor this should be, it works the same way as before but it makes more sense and is only one line
    this.userCollection.add(user)
    //so if we want to store additional user details we don't have to keep adding parameters to the function
    //and name this function addUser to keep consistent naming 

    // let user: IUser = {
    //   email: email,
    //   username: username
    // };

    // this._afs
    //   .collection("users")
    //   .doc(userId)
    //   .set({
    //     email: email,
    //     username: username
    //   });
  }

  getUserFollowing(userId: string) {}


  getUsername(userId: string): Observable<IUser[]> {
    console.log("users: ", this.users);

    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IUser;
          console.log("DATA: ", data);
          this.userId = a.payload.doc.id;
          return { userId , ...data };
        })
      )
    );
    console.log(userId)
    this._afs.collection<IUser>("users", ref => {
      return ref.where("id", "==", userId);
    });
    console.log("user: ", this.users);

    return this.users;
    // var hey;

    // this.userCollection.doc(userid).ref.get().then(function(doc) {
    //   if (doc.exists) {
    //       // console.log("Document data:", doc.data());
    //       hey = doc.data();
    //       console.log("IN SERVICE", hey.username);
    //       this.username = hey.username as string;
    //   } else {
    //       console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });

    // return this.username;
  }
}
