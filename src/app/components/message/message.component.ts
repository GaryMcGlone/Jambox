import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model';
import { IUser } from '../../interfaces/user-interface';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  userID: string;
  user: IUser;
  sender: boolean = false;
  showTime: boolean = false;

  constructor(private firebaseAuth: FirebaseAuthService,
    private databaseService: DatabaseService) { }

  ngOnInit() {
    this.userID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser().subscribe(user => {
      this.user = user
      if(this.message.senderName == this.user.displayName){
        this.sender = true;
      }
    });
  }

  showTimeSent() {
    if(this.showTime)
      this.showTime = false;
    else
      this.showTime = true
  }

}
