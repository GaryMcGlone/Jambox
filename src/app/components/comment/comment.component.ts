import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { DatabaseService } from '../../services/database/database.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  userid: string;
  constructor(private databaseService: DatabaseService, 
    private firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.userid = this.firebaseAuth.getCurrentUserID();
  }

  deleteComment() {
    this.databaseService.removeComment(this.comment.id);
  }

}
