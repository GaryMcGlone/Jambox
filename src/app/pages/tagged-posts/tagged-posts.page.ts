import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tagged-posts',
  templateUrl: './tagged-posts.page.html',
  styleUrls: ['./tagged-posts.page.scss'],
})
export class TaggedPostsPage implements OnInit {
  tag: any
  constructor(private navParams: NavParams) {
    this.tag = this.navParams.get("tag")
    console.log("tag in modal", this.tag)
   }

  ngOnInit() {
  }

}
