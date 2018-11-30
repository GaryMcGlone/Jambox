import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from "../../services/database/database.service"; 
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { IComment } from '../../interfaces/comment-interface';

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

  constructor(private databaseService: DatabaseService, private firebaseAuth: FirebaseAuthService) {
  }

  ngOnInit() {
    console.log("post: ", this.post);
    this.postID = this.post.id;
    console.log("postid: ", this.postID);
    this.content = "";
    this.comment = {content: "", postedBy: "", userID: "", likes: 0}
  }

  save(){
    this.userID = this.firebaseAuth.getCurrentUserID();
    this.comment.content = this.content;
    this.comment.userID = this.userID;
    this.databaseService.addComment(this.comment, this.postID);
  }
}
