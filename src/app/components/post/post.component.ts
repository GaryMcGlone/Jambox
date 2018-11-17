import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  private btnValue = "follow";
  private buttonFill = "outline";

  errorMessage: string;

  constructor(public auth: FirebaseAuthService, private spotifyService: SpotifyService) {}

  ngOnInit() {}
  follow() {
    if (this.buttonFill == "outline") {
      this.btnValue = "unfollow";
      this.buttonFill = "solid";
    } else {
      this.btnValue = "follow";
      this.buttonFill = "outline";
    }
  }

  play(previewUrl){
    console.log('fc', previewUrl)
    this.spotifyService.playSong(previewUrl) 
  }
  open(uri){
    this.spotifyService.open(uri)
  }
}
