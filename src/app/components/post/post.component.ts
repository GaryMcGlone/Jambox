import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from '../../interfaces/user-interface'

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  private btnValue = "follow";
  private buttonFill = "outline";
  username: string;
  errorMessage: string;
  user: IUser;

  constructor(private databaseService: DatabaseService, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.databaseService.getCurrentUser(this.post.UserID).subscribe(data => {
      this.user = data,
        this.username = this.user.displayName
    })
  }
  follow() {
    if (this.buttonFill == "outline") {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
    } else {
      this.btnValue = "follow";
      this.buttonFill = "outline";
    }
  }

  play(songId){
    this.spotifyService.playFullTrack(songId) 
  }
  pause() {
    this.spotifyService.pauseTrack();
  }
  open(uri){
    this.spotifyService.open(uri)
  }
}
