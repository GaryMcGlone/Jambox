import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-search-group',
  templateUrl: './user-search-group.page.html',
  styleUrls: ['./user-search-group.page.scss'],
})
export class UserSearchGroupPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }

  goBack() {
    this.modalController.dismiss()
  }

}
