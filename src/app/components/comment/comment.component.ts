import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../interfaces/comment-interface';
import { Comment } from '../../models/comment.model';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
  }

}
