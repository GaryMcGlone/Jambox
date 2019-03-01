import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tagged-posts',
  templateUrl: './tagged-posts.page.html',
  styleUrls: ['./tagged-posts.page.scss'],
})
export class TaggedPostsPage implements OnInit {
  tag: any
  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.tag = this.navParams.get("tag")
    console.log("tag in modal", this.tag)
   }

  ngOnInit() {
  }
  test(event) {
    console.log("no of posts with tag",event)
  }
  goBack() {
    this.modalController.dismiss();
  }
}
