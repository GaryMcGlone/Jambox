import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaggedPostsPage } from "../../pages/tagged-posts/tagged-posts.page";
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: any
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  openTagPage(tag) {
    console.log(tag)
    this.presentModal(TaggedPostsPage, tag)
  }
  async presentModal(TaggedPostsPage, tag) {
    const modal = await this.modalController.create({
      component: TaggedPostsPage,
      componentProps: tag
    });
    return await modal.present();
  }
}
