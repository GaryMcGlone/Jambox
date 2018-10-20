import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-song-modal',
  templateUrl: './create-song-modal.page.html',
  styleUrls: ['./create-song-modal.page.scss'],
})
export class CreateSongModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
