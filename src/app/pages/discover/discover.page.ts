import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { PrivateChatsPage } from '../private-chats/private-chats.page';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private menuCtrl: MenuController,
    private modalController: ModalController) { }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

  openChats() {
    this.presentModal();
  }

  async presentModal(){
    const modal = await this.modalController.create({
      component: PrivateChatsPage
    });
    return await modal.present();
  }

}
