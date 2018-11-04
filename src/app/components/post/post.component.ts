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
  
  private  buttonFill = 'outline'

  constructor() { }

  ngOnInit() {
    
  }
 
  follow() {
    if(this.buttonFill =='outline') {
       this.buttonFill = 'solid'  
    } else {
      this.buttonFill = 'outline'
    }
  }

}
