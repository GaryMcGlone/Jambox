import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaggedPostsPage } from "../../pages/tagged-posts/tagged-posts.page";
import { ITag } from '../../interfaces/tag-interface';
import { TagsService } from '../../services/tags/tags.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: ITag;
  tagString: string
  taggedPostsCount:number;
  constructor(private modalController: ModalController, private tagsService: TagsService) { }

  ngOnInit() {
    this.tagString = this.tag.tag.substring(1)
    this.tagsService.getTaggedPosts(this.tag.tag).subscribe(data => {
      this.taggedPostsCount = data.length
    }) 
  
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
