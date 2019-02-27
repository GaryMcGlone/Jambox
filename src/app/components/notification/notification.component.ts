import { Component, OnInit, Input } from '@angular/core';
import { INotification } from '../../interfaces/notification-interface';
import { myDate } from '../../interfaces/my-date.interface';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: INotification;

  displayCreatedAt: Date;
  comment: boolean = false;
  like: boolean = false;
  follow: boolean = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getCreatedAt(this.notification.createdAt);
    this.getIconType(this.notification.type);
  }

  getIconType(type: string): void {
    switch(type)
    {
      case "comment":
        this.comment = true;
        break;
      case "like":
        this.like = true;
        break;
      case "follow":
        this.follow = true;
        break;
    }
  } 


  getCreatedAt(date: myDate): void {
    var newDate = new Date(1970, 0, 1);
    newDate.setSeconds(date.seconds);
    this.displayCreatedAt = newDate;
  }

  deleteNotification(): void {
    this.notificationService.deleteNotification(this.notification.id)
  }

}
