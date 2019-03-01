import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IPost } from '../../interfaces/post-interface';
import { ITag } from '../../interfaces/tag-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private postsCollection: AngularFirestoreCollection<IPost>;
  private tagsCollection: AngularFirestoreCollection<ITag>

  private taggedPosts: Observable<IPost[]>
  private tags: Observable<ITag[]>

  constructor(private _afs: AngularFirestore, private _firebaseAuth: AngularFireAuth) {
    this.tagsCollection = this._afs.collection<ITag>("tags");
  }

  getTags() : Observable<ITag[]> {
    return this.tags = this.tagsCollection.valueChanges();
  }
  getTaggedPosts(tag: string) : Observable<IPost[]> {
    this.postsCollection = this._afs.collection<IPost>('posts', ref => {
      return ref.where("tags", "array-contains", tag )
    });
    this.taggedPosts = this.postsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as IPost;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.taggedPosts 
  }
  getTagsByQuery(query: string): Observable<ITag[]> {
    this.tagsCollection = this._afs.collection<ITag>("tags", ref => {
      return ref.orderBy('tag', 'asc')
                .startAt(query)
                .endAt(query + "\uf8ff")
                .limit(5);
    });
    this.tags = this.tagsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as ITag;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
    return this.tags;
  }
}