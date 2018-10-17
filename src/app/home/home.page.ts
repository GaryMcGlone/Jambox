import { Component, ViewChild, OnInit } from '@angular/core';
import { InfiniteScroll } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { IPost } from '../interfaces/post-interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  data: any;
  posts: IPost[] = [];
  page = 1;
  errorMessage: string;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(private router: Router, private databaseService: DatabaseService) {}

  ngOnInit(){
    this.databaseService.getPosts().subscribe(posts => {
      console.log(posts),
        (this.posts = posts),
        error => (this.errorMessage = <any>error);
    });
  }

  // swipeEvent(event) {
  //   switch(event.direction){
  //     case 2: this.router.navigate(['/tabs/(home:discover)']);
  //             break;
  //     default: break;
  //   }
  // }

  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.databaseService.getPosts()
        .subscribe(
          res => {
            this.data = res;
            this.perPage = this.data.per_page;
            this.totalData = this.data.total;
            this.totalPage = this.data.total_pages;
            for(let i = 0; i<this.data.data.length; i++)
            {
              this.posts.push(this.data.data[i]);
            }
          },
          error => this.errorMessage = <any>error
        )
        infiniteScroll.complete();
    }, 1000);
  }
}
