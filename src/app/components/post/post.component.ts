import { Component, OnInit, Input, Pipe } from "@angular/core";
import { Post } from "../../models/post.model";
import { FirebaseAuthService } from "../../services/firebaseAuth/firebase-auth.service";
import { SpotifyService } from "../../services/spotify/spotify.service";
import { DatabaseService } from "../../services/database/database.service";
import { IUser } from '../../interfaces/user-interface';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ModalController } from "@ionic/angular";
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
  heartType: string = 'heart-empty';
  heartColor: string = 'dark'
  isLiked: boolean = false;
  postID;

  constructor(private databaseService: DatabaseService, private spotifyService: SpotifyService, private youtube: YoutubeVideoPlayer, private modalController: ModalController ) { }

  ngOnInit() {
    this.databaseService.getCurrentUser(this.post.UserID).subscribe(data => {
      this.user = data,
        this.username = this.user.displayName
    })
  }

  likeClicked(){
    if(this.isLiked == false){
      this.isLiked = true;
      this.changeHeart('heart', 'danger');
    }
    else{
      this.isLiked = false
      this.changeHeart('heart-empty', "dark");
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
 
  playYoutube(videoId){
    this.youtube.openVideo(videoId);
  }

  play(post){
    this.spotifyService.play(post) 
  }
  open(uri){
    this.spotifyService.open(uri)
  }

  commentClick(){
    this.selectComments(this.postID);
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
