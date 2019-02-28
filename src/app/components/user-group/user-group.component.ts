import { Component, OnInit, Input } from '@angular/core';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { ModalController, Events } from '@ionic/angular';
import { FollowService } from '../../services/follow/follow.service';
import { DatabaseService } from '../../services/database/database.service';
import { myDate } from '../../interfaces/my-date.interface';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  members: string[];
  chatRoom: IGroupChatRoom;
  profilePicture: any = null;
  displayCreatedAt: Date;

  constructor(
      private db: DatabaseService,
      public events: Events
       ) { }

 ngOnInit() {
    this.loadProfilePictureURL();  
    this.getCreatedAt(this.user.createdAt);  
  }

  getCreatedAt(date: myDate): void {
    var newDate = new Date(1970, 0, 1);
    newDate.setSeconds(date.seconds);
    this.displayCreatedAt = newDate;
  }

  selectUser() {
    this.events.publish('member-add', this.user);
  }

  loadProfilePictureURL() {
    this.db.getProfilePictureURLOfUser(this.user.uid).then(data => {
      if (data) {
        this.profilePicture = data
      }
    })
  }
}
