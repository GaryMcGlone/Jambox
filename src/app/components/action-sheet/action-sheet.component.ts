import { Component, OnInit, Input } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Post } from "../../models/post.model";
import { DatabaseService } from "../../services/database/database.service";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
@Component({
  selector: "app-action-sheet",
  templateUrl: "./action-sheet.component.html",
  styleUrls: ["./action-sheet.component.scss"]
})
export class ActionSheetComponent implements OnInit {
  @Input() post: Post;

  loggedIn: boolean;

  ngOnInit() {}
  constructor(
    public actionSheetController: ActionSheetController,
    private databaseService: DatabaseService,
    private firebaseAuth: FirebaseAuthService,
    private spotifyService: SpotifyService
  ) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        this.post.UserID == this.firebaseAuth.getCurrentUserID()
          ? {
              text: "Delete",
              role: "destructive",
              icon: "trash",
              handler: () => {
                this.delete(this.post.id);
              }
            }
          : {
              text: "Share",
              icon: "share",
              handler: () => {
                console.log("Share clicked");
              }
            },
        this.post.postType == "yt"
          ? {
              text: "Play on Youtube",
              icon: "arrow-dropright-circle",
              handler: () => {
                this.open(
                  "https://www.youtube.com/watch?v=" + this.post.songId
                );
              }
            }
          : {
              text: "Play on Spotify",
              icon: "arrow-dropright-circle",
              handler: () => {
                this.open(this.post.externalUri);
              }
            },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            this.actionSheetController.dismiss();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  delete(postid: string) {
    console.log(postid);
    this.databaseService.deletePost(postid);
  }
  open(uri) {
    // this.analytics.logEvent("userOpenedSpotify", { User_Opened_Song_On_Spotify: "User_Opened_Song_On_Spotify" } )
    this.spotifyService.open(uri);
  }
}
