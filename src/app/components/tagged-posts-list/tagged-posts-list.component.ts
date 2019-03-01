import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '../../services/tags/tags.service';
import { IPost } from '../../interfaces/post-interface';

@Component({
  selector: 'app-tagged-posts-list',
  templateUrl: './tagged-posts-list.component.html',
  styleUrls: ['./tagged-posts-list.component.scss']
})
export class TaggedPostsListComponent implements OnInit {
  
  @Input() tag: any;
  taggedPosts: IPost[]

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getTaggedPosts(this.tag).subscribe(data => {
      this.taggedPosts = data
      console.log(this.taggedPosts)
    }) 
  }

}
