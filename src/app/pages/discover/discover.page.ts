import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { PrivateChatsPage } from '../private-chats/private-chats.page';
import { GroupChatsPage } from '../group-chats/group-chats.page';
import { TagsPage } from "../tags/tags.page";
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private menuCtrl: MenuController,
    private modalController: ModalController,
   // private analytics: AnalyticsService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  openChats() {
    this.presentModal(PrivateChatsPage);
  }
  openTags() {
    this.presentModal(TagsPage)
  }
  openGroupChats() {
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
