import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { PrivateChatsPage } from '../private-chats/private-chats.page';
import { GroupChatsPage } from '../group-chats/group-chats.page';
import { AnalyticsService } from '../../services/analytics/analytics.service';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private menuCtrl: MenuController,
    private modalController: ModalController,
    private analytics: AnalyticsService,
    private toastCtrl: ToastController
  ) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  openChats() {
   this.analytics.log("openedChats", { param: "Chat_View" })
    this.presentModal(PrivateChatsPage);
  }

  openGroupChats() {
    this.analytics.log("openedGroups", { param: "Group_View" })
    this.presentModal(GroupChatsPage);
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
  async presentModal(ChatPage) {
    const modal = await this.modalController.create({
      component: ChatPage
    });
    return await modal.present();
  }

}
