import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {
  @Input() chat;
  pipe = new DatePipe("en-IE");
  message: IChatMessage;
  content: string;
  chatID: string;
  senderID: string;
  senderName: string;
  createdAt: string;
  buttonIsDisabled: boolean = true;

  constructor(private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.chatID = this.chat.id;
    this.content = "";
    this.senderName = "";
    this.senderID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser().subscribe(user => {
      this.senderName = user.displayName
    });
    this.message = { message: "", createdAt: "", senderID: "", chatRoomID: "", senderName: "" }
  }

  disableButton(): boolean {
    if(this.content != '') {
      return this.buttonIsDisabled = false;
    }
    else {
      return this.buttonIsDisabled = true;
    }
  }


  sendMessage() {
    const date = new Date();
    this.createdAt = this.pipe.transform(date, "medium");
    this.message.message = this.content;
    this.message.senderID = this.senderID;
    this.message.senderName = this.senderName;
    this.message.createdAt = this.createdAt;
    this.message.chatRoomID = this.chatID;
    this.chatService.createChatMessage(this.message);
    this.content = "";
    this.buttonIsDisabled = true;
  }

}
