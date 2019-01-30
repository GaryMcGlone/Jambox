import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { IComment } from '../../interfaces/comment-interface';
import { ModalController, NavParams } from "@ionic/angular";
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: IComment[] = [];
  errorMessage:string;
  post: Post;
  selectedPost: Post;

  constructor(private databaseService:DatabaseService, private modalController: ModalController, private navParams: NavParams) { 
      this.selectedPost = this.navParams.get("post");
    }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss()
  }
  goBack() {
    this.modalController.dismiss()
  }
}
