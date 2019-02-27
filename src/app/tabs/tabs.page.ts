import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { SearchModalPage } from '../pages/search-modal/search-modal.page';
import { NotificationService } from '../services/notifications/notification.service';
import { FirebaseAuthService } from '../services/firebaseAuth/firebase-auth.service';
import { INotification } from '../interfaces/notification-interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  notificationsArray: INotification[] = [];
  empty: boolean = true;
  arrayLength: number;

  constructor(
    public modalController: ModalController,
    private notificationService: NotificationService,
    private auth: FirebaseAuthService
    ) {}

  ngOnInit(){
    this.notificationService.getUnReadNotifications(this.auth.getCurrentUserID()).subscribe(data => {
      this.notificationsArray = data;
      if(this.notificationsArray.length < 1){
        this.empty = true;
      }else{
        this.empty = false;
        this.arrayLength = this.notificationsArray.length;
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchModalPage,
    });
    return await modal.present();
  }
}
