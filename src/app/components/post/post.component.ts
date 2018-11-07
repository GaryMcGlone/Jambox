import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Post } from '../../models/post.model';
import { DatabaseService } from '../../services/database/database.service';
import { IUser } from '../../interfaces/user-interface';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() searchResult: Post;
  private btnValue = 'follow'
  private buttonFill = 'outline'
  private username: string;
  errorMessage: string;
  user: Observable<IUser[]>;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.getUsername();
  }

  getUsername(){
    this.user = this.databaseService.getUsername(this.post.UserID);
    console.log("IN POST: ",this.user)
  }


 
  follow() {
    if(this.buttonFill =='outline'  ) {
       this.btnValue = 'unfollow'
       this.buttonFill = 'solid'  
    } else {
      this.btnValue = 'follow'
      this.buttonFill = 'outline'
    }
  }

}
