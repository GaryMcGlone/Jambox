import { Component, OnInit } from '@angular/core';
import { INotification } from '../../interfaces/notification-interface';
import { NotificationService } from '../../services/notifications/notification.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  unReadNotifications: INotification[] = [];
  readNotifications: INotification[] = [];
  showSpinner: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private auth: FirebaseAuthService
  ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.notificationService.getUnReadNotifications(this.auth.getCurrentUserID()).subscribe(data => {
      this.unReadNotifications = data
      this.showSpinner = false;
      console.log("unread notifications: ", this.unReadNotifications)
    });
    this.notificationService.getReadNotifications(this.auth.getCurrentUserID()).subscribe(data => {
      this.readNotifications = data
      console.log("read notifications: ", this.readNotifications)
    });
  }

  
}
