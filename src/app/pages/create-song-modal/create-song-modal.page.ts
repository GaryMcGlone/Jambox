import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { TagsService } from "../../services/tags/tags.service";
import { ITag } from "../../interfaces/tag-interface";
import { IPost } from "../../interfaces/post-interface";
@Component({
  selector: "app-create-song-modal",
  templateUrl: "./create-song-modal.page.html",
  styleUrls: ["./create-song-modal.page.scss"]
})
export class CreateSongModalPage implements OnInit {
  post: IPost;
  caption: string;
  userID: string;
  tags: string[];
  constructor(private modalController: ModalController, private databaseService: DatabaseService, private navParams: NavParams, private firebaseAuth: FirebaseAuthService, private tagsService: TagsService ,
    //private analytics: AnalyticsService
    ) {
    this.post = this.navParams.get("post");
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
  
  save() {    
    this.userID = this.firebaseAuth.getCurrentUserID()
    this.post.caption = this.caption || "";
    this.tags = this.caption.match(/#[a-z]+/gi);
    this.post.tags = this.tags    
    this.post.UserID = this.userID;
   // this.post.createdAt = new Date();
    this.databaseService.addPost(this.post);
    this.modalController.dismiss();
    //this.analytics.log("postSong", { param: "User_Posted_Song" });
  }
}