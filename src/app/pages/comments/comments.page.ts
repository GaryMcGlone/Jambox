import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { IComment } from '../../interfaces/comment-interface';
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: IComment[] = [];
  errorMessage:string;
  post;
  selectedpost;

  constructor(
    private databaseService:DatabaseService,
    private modalController: ModalController,
    private navParams: NavParams
    ) { 
      this.selectedpost = this.navParams.get("post");
      console.log("selected post: ", this.selectedpost);
    }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss()
  }
}
