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
  newCreatedAt: string;

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
      if(this.lastMessage != null)
        this.newCreatedAt = this.getCreatedAt(this.lastMessage.createdAt)
    });
  }

  getCreatedAt(date: myDate): any {
    var value: string;
    var newDateMilliseconds = new Date().getTime();
    var seconds = (newDateMilliseconds / 1000) - date.seconds;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;

    if(this.round(seconds, 0) < 60)
      value = this.round(seconds, 0).toString() + "s ago";
    else if(this.round(minutes, 0) < 60)
      value = this.round(minutes, 0).toString() + "m ago";
    else if(this.round(minutes, 0) >= 60 && this.round(hours, 0) < 24)
      value = this.round(hours, 0).toString() + "h ago";
    else
      value = this.round(days, 0).toString() + "d ago";

    return value;
  }

  round(number, precision){
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);

    return roundedTempNumber / factor;
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
