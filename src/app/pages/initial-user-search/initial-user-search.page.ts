import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-initial-user-search',
  templateUrl: './initial-user-search.page.html',
  styleUrls: ['./initial-user-search.page.scss'],
})
export class InitialUserSearchPage implements OnInit {

  constructor(private modalController: ModalController) { }
  

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }

  goBack() {
    this.modalController.dismiss()
  }
}
