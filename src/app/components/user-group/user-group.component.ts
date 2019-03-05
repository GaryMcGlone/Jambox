import { Component, OnInit, Input } from '@angular/core';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { ModalController, Events, ToastController } from '@ionic/angular';
import { FollowService } from '../../services/follow/follow.service';
import { DatabaseService } from '../../services/database/database.service';
import { myDate } from '../../interfaces/my-date.interface';
import { IUser } from '../../interfaces/user-interface';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  @Input() user: IUser;
  currentUserId: string;
  members: string[];
  chatRoom: IGroupChatRoom;
  profilePicture: any = null;
  displayCreatedAt: Date;
  blockeByUser: boolean = false;

  constructor(
      private db: DatabaseService,
      public events: Events,
      private auth: FirebaseAuthService,
      private toastCtrl: ToastController
       ) { }

 ngOnInit() {
    this.checkIfBlocked(this.auth.getCurrentUserID());
    this.loadProfilePictureURL();  
    this.getCreatedAt(this.user.createdAt);  
  }

  checkIfBlocked(uid: string){
    if(this.user.blockedUsers.includes(uid))
      this.blockeByUser = true;
    else
      this.blockeByUser = false;
  }

  getCreatedAt(date: myDate): void {
    var newDate = new Date(1970, 0, 1);
    newDate.setSeconds(date.seconds);
    this.displayCreatedAt = newDate;
  }

  selectUser() {
    if(!this.blockeByUser)
      this.events.publish('member-add', this.user);
    else
      this.presentToast('You cannot add users that blocked you');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
      toast.present();
    }

  loadProfilePictureURL() {
    this.db.getProfilePictureURLOfUser(this.user.uid).then(data => {
      if (data) {
        this.profilePicture = data
      }
    })
  }
}
