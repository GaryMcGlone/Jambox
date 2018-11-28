import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";

@Component({
  selector: "app-create-song-modal",
  templateUrl: "./create-song-modal.page.html",
  styleUrls: ["./create-song-modal.page.scss"]
})
export class CreateSongModalPage implements OnInit {
  post;
  caption: string;
  userID: string;
  constructor(
    private modalController: ModalController,
    private databaseService: DatabaseService,
    private navParams: NavParams,
    private firebaseAuth: FirebaseAuthService
  ) {
    console.log(this.navParams);
    this.post = this.navParams.get("post");
    console.log(this.post);
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
  
  save() {    
    this.userID = this.firebaseAuth.getCurrentUserID()
    this.post.caption = this.caption || "";
    this.post.UserID = this.userID;
    this.databaseService.addPost(this.post);
    this.modalController.dismiss();
  }
}
