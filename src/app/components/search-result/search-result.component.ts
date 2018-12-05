import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from '../../interfaces/user-interface';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ActivatedRoute } from "@angular/router";
import {IPost} from '../../interfaces/post-interface'
import { ILike } from "../../interfaces/like-interface";
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() post: Post;

  private btnValue = "follow";
  private buttonFill = "outline";
  username: string;
  errorMessage: string;
  user: IUser;
  heartType: string = 'heart-empty';
  heartColor: string = 'dark'
  liked: boolean = false;
  songId: string;
  likeId: string;
  constructor(private databaseService: DatabaseService,
              private spotifyService: SpotifyService,
              private youtube: YoutubeVideoPlayer,
            private route: ActivatedRoute,
            private firebaseAuth: FirebaseAuthService ) { }

  ngOnInit() {
    this.databaseService.getCurrentUser(this.post.UserID).subscribe(data => {
      this.user = data,
        this.username = this.user.displayName
    })
    this.checkIfLiked(this.post)
    this.songId = this.route.snapshot.paramMap.get('id');
  }

  addLike(id) {
    console.log("liking post");
    let like: ILike = {
      postId: id,
      userId: this.firebaseAuth.getCurrentUserID()
    };
    this.changeHeart('heart','danger')
    this.liked = true;
    this.databaseService.addLike(like);
  }
  removeLike(id) {
    this.likeId = this.firebaseAuth.getCurrentUserID() + '_' + id
    this.changeHeart('heart-empty','dark')
    this.liked = false;
    this.databaseService.removeLike(this.likeId);
  }

  changeHeart(type: string, color: string){
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
    this.spotifyService.pauseTrack();
  }
  playYoutube(videoId: string){
    this.youtube.openVideo(videoId);
  }

  play(post){
    this.spotifyService.play(post) 
  }
  open(uri){
    this.spotifyService.open(uri)
  }

  checkIfLiked(post: Post){
    this.databaseService.checkIfLiked(post.id + "_" + this.firebaseAuth.getCurrentUserID()).subscribe( data =>
      {
        if(data != undefined){
          this.changeHeart('heart','danger')
        }
        else{
          console.log("not liked")
          this.changeHeart('heart-empty','dark')
        }
      })
      }
}
