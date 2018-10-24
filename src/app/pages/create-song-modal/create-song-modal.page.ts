import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-create-song-modal',
  templateUrl: './create-song-modal.page.html',
  styleUrls: ['./create-song-modal.page.scss'],
})
export class CreateSongModalPage implements OnInit {
  post
  caption: string;
  constructor(private modalController: ModalController, private databaseService: DatabaseService, private navParams: NavParams) {
    console.log(this.navParams);
    this.post = this.navParams.get('post')
    console.log(this.post)
   }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
  save() {
    this.post.caption = this.caption;
    this.databaseService.addPost(this.post)
    this.modalController.dismiss()
  }
}
