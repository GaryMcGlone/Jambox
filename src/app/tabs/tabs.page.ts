import { Component } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { SearchModalPage } from '../pages/search-modal/search-modal.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchModalPage,
    });
    return await modal.present();
  }
}
