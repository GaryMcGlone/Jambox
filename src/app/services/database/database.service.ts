import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { IPost } from "../../interfaces/post-interface";
import { IUser } from "../../interfaces/user-interface";
import { IComment } from "../../interfaces/comment-interface";
import { ILike } from "../../interfaces/like-interface";
import * as firebase from "firebase/";
import { AngularFireAuth } from "@angular/fire/auth";
import { iToken } from "../../interfaces/token";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  private postsCollection: AngularFirestoreCollection<IPost>;
  private posts: Observable<IPost[]>;

  private userCollection: AngularFirestoreCollection<IUser>;
  private fireDocUser: AngularFirestoreDocument<IUser>;
  private currentUser: Observable<IUser>;
  private user: Observable<IUser>

  private comments: Observable<IComment[]>;
  private commentsCollection: AngularFirestoreCollection<IComment>;

  private likes: Observable<ILike[]>;
  private likeCollection: AngularFirestoreCollection<ILike>;

  private found: boolean = false;
  private likeDocument: AngularFirestoreDocument<ILike>;
  private like: Observable<ILike>
  private userPosts: Observable<IPost[]>
  private tokenCollection: AngularFirestoreCollection<iToken>;

  private bugCollection: AngularFirestoreCollection<any>

  constructor(private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) {
    
    this._firebaseAuth.authState.subscribe(user => {
      this.postsCollection = this._afs.collection<IPost>(`posts`, ref => {
        if(user) {
          return ref.where("UserID", "==", user.uid).orderBy("createdAt","desc")
        }
      });
    })
    this.userCollection = _afs.collection<IUser>("users");
    this.likeCollection = _afs.collection<ILike>('likes');
    this.commentsCollection = _afs.collection<IComment>("comments")
    this.tokenCollection = _afs.collection<iToken>("tokens");
    this.bugCollection = _afs.collection<any>("feedback")
  }


  getLoggedInUserPosts(): Observable<IPost[]> {
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
  addPost(post: IPost): void {
    this.postsCollection.add(post)
  }

  //this method deletes a post
  deletePost(postid: string): void {
    this.postsCollection.doc(postid).delete();
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

  addUser(user: IUser) {
    this.userCollection.doc(user.uid).set(user);
  }

  getCurrentUser(): Observable<IUser> {
    this.fireDocUser = this._afs.doc<IUser>("users/" + firebase.auth().currentUser.uid);
    this.currentUser = this.fireDocUser.valueChanges();
    return this.currentUser;
  }
  getUserByID(userId: string): Observable<IUser> {
    this.fireDocUser = this._afs.doc<IUser>("users/" + userId);
    this.currentUser = this.fireDocUser.valueChanges();
    return this.currentUser;
  }

  //adds a comment to a subcollection, creates subcollection if it doesn't exist
  addComment(comment: IComment): void {
    this.commentsCollection.add(comment);
  }

  //removes a comment from a post
  removeComment(commentId): void {
    this.commentsCollection.doc(commentId).delete();
  }

  //Getting all comments for a post
  getComments(postID: string): Observable<IComment[]> {
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

  //Getting all likes for a post
  getLikes(postID: string): Observable<ILike[]> {
    this.likeCollection = this._afs.collection<ILike>("likes", ref => {
      return ref.where("postId", "==", postID)
    });
    this.likes = this.likeCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as ILike;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    )
    return this.likes
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


  storeProfilePicture(image: any) {
      let fileRef = firebase.storage().ref("images/" + firebase.auth().currentUser.uid);
      fileRef.put(image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this._afs.doc("users/" + firebase.auth().currentUser.uid).update({profilePic: url})
          console.log(url)
        })
      }); 
  }

  getProfilePictureURLOfUser(userId: string){
    let storageRef
    try{
     storageRef = firebase.storage().ref();
    }
    catch(error){

    }
    return storageRef.child("images/" + userId).getDownloadURL()
  }

  //Changes displayName of user
  updateUserDisplayName(userId: string, newDisplayName: string): void {
    this.userCollection.doc(userId).set({
      displayName: newDisplayName
    }, { merge: true });
  }

  updateBio(bio: string): void {
    this.userCollection.doc(firebase.auth().currentUser.uid).set({
      bio: bio
    }, { merge: true });
  }


  getPostByUserID(): Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("UserID", "==", firebase.auth().currentUser.uid)
                 .orderBy('createdAt', 'desc')
    });
    this.userPosts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.userPosts;
  }

  getPostsByPostID(id: string): Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref
      .where(firebase.firestore.FieldPath.documentId(), '==', id)
    });

    this.userPosts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.userPosts;
  }

  
  getPostByID(userId: string): Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>("posts", ref => {
      return ref.where("UserID", "==", userId)
                 .orderBy('createdAt', 'desc')
    });
    this.userPosts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.userPosts;
  }

  addBug(bug){
    this.bugCollection.add({content: bug})
  }

  saveUserToken(token){
    this.tokenCollection.doc(firebase.auth().currentUser.uid).set({token: token})
  }

  removeToken(userId: string): void {
    this.tokenCollection.doc(userId).delete();
  }

  getUsersLikedPostIDs(id: string): Observable<ILike[]> {
    this.likeCollection = this._afs.collection<ILike>("likes", ref => {
      return ref.where("userId", "==", id);
    });
    this.likes = this.likeCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as ILike;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.likes;
  }
}