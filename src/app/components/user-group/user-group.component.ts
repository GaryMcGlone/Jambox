import { Component, OnInit, Input } from '@angular/core';
import { IGroupChatRoom } from '../../interfaces/group-chat-room-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { ModalController, Events } from '@ionic/angular';
import { FollowService } from '../../services/follow/follow.service';
import { DatabaseService } from '../../services/database/database.service';

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

  constructor(
      private db: DatabaseService,
      public events: Events
       ) { }

 ngOnInit() {
    this.loadProfilePictureURL();    
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
