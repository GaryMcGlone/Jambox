import { Component, OnInit, Input } from '@angular/core';
import { IChatMessage } from '../../interfaces/chat-message-interface';
import { ChatService } from '../../services/chat/chat.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { DatePipe } from "@angular/common";
import { Message } from '../../models/message.model';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {
  @Input() chat;
  pipe = new DatePipe("en-IE");
  message: Message;
  content: string;
  chatID: string;
  senderID: string;
  senderName: string;
  createdAt: string;
  buttonIsDisabled: boolean = true;

  constructor(private chatService: ChatService,
    private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService
    ,private analytics: AnalyticsService
    ) { }

  ngOnInit() {
    this.chatID = this.chat.id;
    this.content = "";
    this.senderName = "";
    this.senderID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser().subscribe(user => {
      this.senderName = user.displayName
    });
    this.message = { message: "", createdAt: new Date(), senderID: "", chatRoomID: "", senderName: "" }
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
    this.analytics.log("messageSent", { param: "Message_Sent" } )
    var token = this.firebaseAuth.doTheThing();
    console.log(token);
    this.message.message = this.content;
    this.message.senderID = this.senderID;
    this.message.senderName = this.senderName;
    this.message.createdAt = new Date();
    this.message.chatRoomID = this.chatID;
    this.chatService.createChatMessage(this.message);
    this.content = "";
    this.buttonIsDisabled = true;
  }

}
