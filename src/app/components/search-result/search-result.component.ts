import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from "../../interfaces/user-interface";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { ActivatedRoute } from "@angular/router";
import { ILike } from "../../interfaces/like-interface";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";
import { ModalController } from "@ionic/angular";
import { CommentsPage } from "../../pages/comments/comments.page";
@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {
  @Input() post: Post;

  private btnValue = "follow";
  private buttonFill = "outline";
  username: string;
  errorMessage: string;
  user: IUser;
  heartType: string = "heart-empty";
  heartColor: string = "dark";
  liked: boolean = false;
  songId: string;
  likeId: string;
  constructor(
    private databaseService: DatabaseService,
    private spotifyService: SpotifyService,
    private youtube: YoutubeVideoPlayer,
    private route: ActivatedRoute,
    private firebaseAuth: FirebaseAuthService,
    private analytics: FirebaseAnalytics,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.databaseService.getCurrentUser().subscribe(data => {
      (this.user = data), (this.username = this.user.displayName);
    });
    this.checkIfLiked(this.post);
    this.songId = this.route.snapshot.paramMap.get("id");
  }

  addLike(id) {
    // this.analytics.logEvent("srPostLiked", { param: "SR_User_Liked_Post" });
    let like: ILike = {
      postId: id,
      userId: this.firebaseAuth.getCurrentUserID()
    };
    this.changeHeart("heart", "danger");
    this.liked = true;
    this.databaseService.addLike(like);
  }
  removeLike(id) {
    // this.analytics.logEvent("srPostUnliked", { param: "SR_User_Unliked_Post" });
    this.likeId = this.firebaseAuth.getCurrentUserID() + "_" + id;
    this.changeHeart("heart-empty", "dark");
    this.liked = false;
    this.databaseService.removeLike(this.likeId);
  }

  changeHeart(type: string, color: string) {
    this.heartType = type;
    this.heartColor = color;
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
  pause() {
    //  this.analytics.logEvent("srPausedSpotify", {
    //    param: "SR_User_Paused_Spotify"
    //  });
    this.spotifyService.pauseTrack();
  }
  playYoutube(videoId: string) {
    //  this.analytics.logEvent("srPlayYoutube", {
    //    param: "SR_User_Played_Youtube"
    //  });
    this.youtube.openVideo(videoId);
  }

  play(post) {
    //  this.analytics.logEvent("srPlayedSpotify", {
    //    param: "SR_User_Played_Spotify"
    //  });
    this.spotifyService.play(post);
  }
  open(uri) {
    //  this.analytics.logEvent("srUserOpenedSpotify", {
    //    param: "SR_User_Opened_Song_On_Spotify"
    //  });
    this.spotifyService.open(uri);
  }

  selectComments(selectedPost): void {
    //  this.analytics.logEvent("srUserOpenedComments", {
    //    param: "SR_User_Opened_Comments_Modal"
    //  });
    this.presentModal(selectedPost);
  }

  async presentModal(selectedPost) {
    let props = {
      post: selectedPost
    };
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: props
    });
    return await modal.present();
  }

  checkIfLiked(post: Post) {
    this.databaseService
      .checkIfLiked(post.id + "_" + this.firebaseAuth.getCurrentUserID())
      .subscribe(data => {
        if (data != undefined) {
          this.changeHeart("heart", "danger");
        } else {
          this.changeHeart("heart-empty", "dark");
        }
      });
  }
}
