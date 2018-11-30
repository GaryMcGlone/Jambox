import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from '../../interfaces/user-interface';
import { ILike } from '../../interfaces/like-interface';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ModalController, NavParams } from "@ionic/angular";
import { CommentsPage } from '../../pages/comments/comments.page';

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
  currentUserID: string;
  like: ILike;
  heartType: string = 'heart-empty';
  heartColor: string = 'dark'
  postID;
  selectedPost;
  liked: boolean;
  likeID: string;

  constructor(private databaseService: DatabaseService, private spotifyService: SpotifyService,
     private youtube: YoutubeVideoPlayer, private modalController: ModalController, 
     private firebaseAuth: FirebaseAuthService) { }

  ngOnInit() {
    this.databaseService.getCurrentUser(this.post.UserID).subscribe(data => {
      this.user = data,
        this.username = this.user.displayName
    })

    this.currentUserID = this.firebaseAuth.getCurrentUserID();
    this.likeID = this.currentUserID + '_' + this.post.id;
    console.log("UID: ", this.currentUserID)
    console.log("LikeID: ", this.likeID)

    this.liked = this.databaseService.checkIfLiked(this.likeID);
    console.log("LIKED: ", this.liked)

    if(this.liked){
      this.changeHeart('heart', 'danger');
      console.log("heart changed liked = true");
    }
    
  }

  likeClicked(){    
    if(!this.databaseService.checkIfLiked(this.likeID))
    {
      this.like = {userID: this.currentUserID, postID: this.post.id}
      this.databaseService.addLike(this.like);
      this.changeHeart('heart', 'danger');
      console.log("Post Liked");
    }
    else {
      this.databaseService.removeLike(this.likeID);
      this.changeHeart('heart-empty', 'dark');
      console.log("Post UnLiked");
    }
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
 
  play(songId){
    this.spotifyService.play(songId) 
  }

  resume(songId) {
    this.spotifyService.resumeSong(songId)
  }
  
  open(uri){
    this.spotifyService.open(uri)
  }

  commentClick(){
    console.log("WTF: ",this.postID);
    this.selectComments(this.postID);
  }

  playYoutube(videoId){
    this.youtube.openVideo(videoId);
  }

  selectComments(selectedPost): void{
    console.log("selectedpost: ", selectedPost);
    this.presentModal(selectedPost);
  }

  async presentModal(selectedPost){
    let props = {
      post: selectedPost
    }
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: props
    });
    return await modal.present();
  }
}
