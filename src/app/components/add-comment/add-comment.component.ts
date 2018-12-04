import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from "../../services/database/database.service"; 
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IComment } from '../../interfaces/comment-interface';
import { IUser } from '../../interfaces/user-interface';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() post;
  postID: string;
  comment: IComment;
  content: string;
  userID: string;
  postedBy: string;
  user: IUser;
  pipe = new DatePipe("en-IE");
  postedAt: string;

  constructor(private databaseService: DatabaseService, private firebaseAuth: FirebaseAuthService) {
  }

  ngOnInit() {
    this.postID = this.post.id;
    this.content = "";
    this.postedBy = "";
    this.userID = this.firebaseAuth.getCurrentUserID();
    this.databaseService.getCurrentUser(this.userID).subscribe(data => {
      this.user = data,
        this.postedBy = this.user.displayName
    });
    this.comment = {content: "", postedBy: "", userID: "", likes: 0, postedAt: ""}
  }

  buttonIsDisabled:boolean=true;

  public onAddComment(): void {
    this.buttonIsDisabled=true;
    if(this.content.match(/^\s+$/) === null && this.content != ''){
      this.buttonIsDisabled=false;
    }
    else{
      this.buttonIsDisabled=true;
    }
  }

  save(){
    const date = new Date();
    this.postedAt = this.pipe.transform(date, "medium");
    this.comment.content = this.content;
    this.comment.userID = this.userID;
    this.comment.postedBy = this.postedBy;
    this.comment.postedAt = this.postedAt;
    this.databaseService.addComment(this.comment, this.postID);
    this.content = '';
    this.buttonIsDisabled=true;
  }
}
