import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() searchResult: Post;
  createdAt: string;

  constructor() { }

  ngOnInit() {
    
  }

}
