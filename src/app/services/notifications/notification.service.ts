import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../database/database.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { iToken } from '../../interfaces/token';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { INotification } from '../../interfaces/notification-interface';
import { Observable } from 'rxjs';
import { map, reduce } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsCollection: AngularFirestoreCollection<INotification>;
  private notificationsList: Observable<INotification[]>;

  token: iToken;
  constructor(private platform: Platform,
    private localNotifications: LocalNotifications,
    private db: DatabaseService,
    private firebase: Firebase,
    private _afs: AngularFirestore
  ) { }

  getToken() {
    this.firebase.getToken().then(token => {
      this.saveToken(token)
    });
  }

  private saveToken(token) {
    this.db.saveUserToken(token);
  }

  private async showNotification(message: string) {
    this.localNotifications.schedule({
      id: 1,
      text: message,
      title: 'Jambox App'
    });
  }

  startNotifications() {
    this.getToken();
    this.firebase.onNotificationOpen().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.showNotification(msg.aps.alert);
        } else {
          this.showNotification(msg.body);
        }
      });
  }

  getReadNotifications(userId: string) {
    this.notificationsCollection = this._afs.collection<INotification>("notifications", ref => {
      return ref.where('userId', '==', userId)
                .where('read', '==', true)
                .limit(10)
                .orderBy('createdAt', 'desc');
    });
    this.notificationsList = this.notificationsCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as INotification;
          const id = a.payload.doc.id;
          return { id, ...data };
      })));
    return this.notificationsList;
  }

  getUnReadNotifications(userId: string) {
    this.notificationsCollection = this._afs.collection<INotification>("notifications", ref => {
      return ref.where('userId', '==', userId)
                .where('read', '==', false)
                .limit(10)
                .orderBy('createdAt', 'desc');
    });
    this.notificationsList = this.notificationsCollection.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as INotification;
          const id = a.payload.doc.id;
          return { id, ...data };
      })));
    return this.notificationsList;
  }

  deleteNotification(id: string): void {
    this.notificationsCollection.doc(id).delete();
  }

  markAsRead(id: string):void {
    this.notificationsCollection.doc(id).set({
      read: true
    }, {merge: true});
  }
}