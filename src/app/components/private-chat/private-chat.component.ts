import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { IUser } from '../../interfaces/user-interface';
import { DatabaseService } from '../../services/database/database.service';
import { ModalController } from '@ionic/angular';
import { PrivateChatPage } from '../../pages/private-chat/private-chat.page';
import { UsersService } from '../../services/users/users.service';
import { myDate } from '../../interfaces/my-date.interface';

@Component({
  selector: 'private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  @Input() currentChat;

  lastMessages: IChatMessage[];
  lastMessage: IChatMessage;
  userId: string;
  user: IUser;
  otherUser: IUser;
  displayCreatedAt: Date;
  senderName: string;

  constructor(
    private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService,
    private modalController: ModalController,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userId = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser().subscribe(data =>{
      this.user = data;
    });
    this.currentChat.members.forEach(element => {
      if(element != this.userId){
        this.usersService.getSpecificUserById(element).subscribe(data => {
          this.otherUser = data[0]
        });
      }
    });
    this.chatService.getLastChatRoomMessage(this.currentChat.id).subscribe(message => {
      this.lastMessages = message;
      this.lastMessage = this.lastMessages[0];
      if(this.lastMessage != null){
        this.getCreatedAt(this.lastMessage.createdAt);
        if(this.lastMessage.senderName == this.user.displayName)
          this.senderName = "You";
        else
          this.senderName = this.lastMessage.senderName;
      }
    });
  }

  getCreatedAt(date: myDate): void {
    var newDate = new Date(1970, 0, 1);
    newDate.setSeconds(date.seconds);
    this.displayCreatedAt = newDate;
  }


  selectChat(selectedChat) {
    this.presentModal(selectedChat);
  }

  async presentModal(selectedChat) {
    let props = {
      chat: selectedChat
    };
    const modal = await this.modalController.create({
      component: PrivateChatPage,
      componentProps: props
    });
    return await modal.present();
  }

 
}
