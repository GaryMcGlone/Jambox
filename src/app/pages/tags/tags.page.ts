import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }
  goBack() {
    this.modalController.dismiss();
  }
}
