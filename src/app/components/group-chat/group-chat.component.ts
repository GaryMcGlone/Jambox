import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { IUser } from '../../interfaces/user-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { ModalController, proxyOutputs } from '@ionic/angular';
import { PrivateChatPage } from '../../pages/private-chat/private-chat.page';

@Component({
  selector: 'group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit {
  @Input() currentChat;

  lastMessages: IChatMessage[];
  lastMessage: IChatMessage;
  userId: string;
  user: IUser;
  otherUsers: IUser[]= [];
  
  constructor(
    private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.userId = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser(this.userId).subscribe(data => {
      this.user = data;
    });
    this.currentChat.members.forEach(element => {
      if(element != this.userId) {
        this.databaseService.getCurrentUser(element).subscribe(data => {
          this.otherUsers.push(data);
        });
      }
    });
    this.chatService.getLastChatRoomMessage(this.currentChat.id).subscribe(message => {
      this.lastMessages = message;
      this.lastMessage = this.lastMessages[0];
    });
  }

  selectChat(selectedChat) {
    this.presentModal(selectedChat);
  }

  async presentModal(selectChat) {
    let props = {
      chat: selectChat
    };
    const modal = await this.modalController.create({
      component: PrivateChatPage,
      componentProps: props
    });
    return await modal.present();
  }

}
