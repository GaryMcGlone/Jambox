import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Post } from '../../models/post.model';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  createdAt: string;

  constructor() { }

  ngOnInit() {
    
  }

}
