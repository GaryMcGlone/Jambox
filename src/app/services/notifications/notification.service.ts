import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuthService } from '../firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../database/database.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { iToken } from '../../interfaces/token';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  token: iToken;
  constructor(private platform: Platform,
    private localNotifications: LocalNotifications,
    private db: DatabaseService,
    private firebase: Firebase
  ) { }

  getToken() {
    this.firebase.getToken().then(token => {
      this.saveToken(token)
    });
    console.log("gonna save a wee token hey ")
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
    console.log("starting notifications")

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
}
