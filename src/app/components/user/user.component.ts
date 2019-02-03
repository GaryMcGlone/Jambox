import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { ModalController } from '@ionic/angular';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { IPrivateChatRoom } from '../../interfaces/private-chat-room-interface';
import { IUser } from '../../interfaces/user-interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user;
  currentUserId: string;
  members: string[];
  chatRoom: IPrivateChatRoom;

  constructor(
    private modalController: ModalController,
    private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService
  ) { }

  ngOnInit() {
    this.chatRoom = { members: [] }
  }

  selectUser() {
    this.currentUserId = this.firebaseAuth.getCurrentUserID();
    this.members = [ this.currentUserId, this.user.uid];
    this.chatRoom.members.push(this.currentUserId, this.user.id);
    this.chatService.createPrivateChatRoom(this.chatRoom);
    this.modalController.dismiss();
  }

}
