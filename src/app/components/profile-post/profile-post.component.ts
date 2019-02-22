import { Component, OnInit, Input } from '@angular/core';
import { CommentsPage } from '../../pages/comments/comments.page';
import { ILike } from '../../interfaces/like-interface';
import { DatabaseService } from '../../services/database/database.service';
import { SpotifySearchComponent } from '../spotify-search/spotify-search.component';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ModalController } from '@ionic/angular';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { IComment } from '../../interfaces/comment-interface';
import { IUser } from '../../interfaces/user-interface';
import { Post } from '../../models/post.model';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {

  @Input() post: Post;
  private btnValue = "follow";
  private buttonFill = "outline";
  username: string;
  errorMessage: string;
  user: IUser;
  currentUserID: string;
  like: ILike;
  heartType: string = "heart-empty";
  heartColor: string = "dark";
  postID;
  selectedPost;
  liked: boolean;
  likeID: string;
  comments: IComment[] = [];
  commentCounter: number = 0;
  likes: ILike[] = [];
  likeCounter: number = 0;

  constructor(
    private databaseService: DatabaseService,
    private spotifyService: SpotifyService,
    private youtube: YoutubeVideoPlayer,
    private modalController: ModalController,
    private firebaseAuth: FirebaseAuthService,
    private analytics: FirebaseAnalytics
  ) { }

  ngOnInit() {
    this.databaseService.getCurrentUser().subscribe(data => {
      (this.user = data), (this.username = this.user.displayName);
    });
    this.databaseService.getComments(this.post.id).subscribe(comments => {
      (this.comments = comments),
        this.commentCounter = this.comments.length,
        error => (this.errorMessage = <any>error);
    });
    this.checkIfLiked();
    this.databaseService.getLikes(this.post.id).subscribe(likes => {
      this.likes = likes,
        this.likeCounter = this.likes.length,
        error => (this.errorMessage = <any>error);
    });
  }

  addLike(id) {
    this.analytics.logEvent("postLiked", { param: "User_Liked_Post" })
    let like: ILike = {
      postId: id,
      userId: this.firebaseAuth.getCurrentUserID()
    };
    this.changeHeart("heart", "danger");
    this.liked = true;
    this.databaseService.addLike(like);
  }
  removeLike(id) {
    this.analytics.logEvent("postUnliked", { param: "User_Unliked_Post" })
    this.likeID = this.post.id + "_" + this.firebaseAuth.getCurrentUserID();
    this.changeHeart("heart-empty", "dark");
    this.liked = false;
    this.databaseService.removeLike(this.likeID);
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
    this.analytics.logEvent("pausedSpotify", { param: "User_Paused_Spotify" })
    this.spotifyService.pauseTrack();
  }

  play(songId) {
    this.analytics.logEvent("playedSpotify", { param: "User_Played_Spotify" })
    this.spotifyService.play(songId);
  }

  resume(songId) {
    this.analytics.logEvent("resumedSpotify", { param: "User_Resumed_Spotify" })
    this.spotifyService.resumeSong(songId);
  }


  commentClick() {
    this.selectComments(this.postID);
  }

  playYoutube(videoId) {
    this.analytics.logEvent("playYoutube", { param: "User_Played_Youtube" })
    this.youtube.openVideo(videoId);
  }

  selectComments(selectedPost): void {
    // this.analytics.logEvent("userOpenedComments", { param: "User_Opened_Comments_Modal" } )
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

  checkIfLiked() {
    this.databaseService
      .checkIfLiked(this.post.id + "_" + this.firebaseAuth.getCurrentUserID())
      .subscribe(data => {
        if (data != undefined) {
          this.changeHeart("heart", "danger");
        } else {
          this.changeHeart("heart-empty", "dark");
        }
      });
  }
}
