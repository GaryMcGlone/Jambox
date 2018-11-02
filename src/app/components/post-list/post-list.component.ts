import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { IPost } from '../../interfaces/post-interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: IPost[] = [];
  errorMessage:string;
  cssClass: string;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getPosts().subscribe(posts => {
      console.log(posts),
        (this.posts = posts),
        error => (this.errorMessage = <any>error);
    });
    this.cssClass = "animated slideInUp faster"
  }

}
