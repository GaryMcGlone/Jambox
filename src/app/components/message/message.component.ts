import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { IUser } from '../../interfaces/user-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';
import { myDate } from '../../interfaces/my-date.interface';
import { IChatMessage } from '../../interfaces/chat-message-interface';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: IChatMessage;
  userID: string;
  user: IUser;
  sender: boolean = false;
  showTime: boolean = false;
  displayCreatedAt: Date;

  constructor(private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.userID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser().subscribe(user => {
      this.user = user
      if(this.message.senderName == this.user.displayName){
        this.sender = true;
      }
      if(this.message.createdAt != null){
        this.getCreatedAt(this.message.createdAt);}
    });
  }

  getCreatedAt(date: myDate): void {
    var newDate = new Date(1970, 0, 1);
    newDate.setSeconds(date.seconds);
    this.displayCreatedAt = newDate;
  }

  showTimeSent() {
    if(this.showTime)
      this.showTime = false;
    else
      this.showTime = true
  }

}
