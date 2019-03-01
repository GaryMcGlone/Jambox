import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  noOfTaggedPosts: number;
  @Output() emmiter: EventEmitter<number> = new EventEmitter();  

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getTaggedPosts(this.tag).subscribe(data => {
      this.taggedPosts = data
      this.emmiter.emit(this.noOfTaggedPosts = data.length)
      console.log(this.taggedPosts)
    }) 
  }
}