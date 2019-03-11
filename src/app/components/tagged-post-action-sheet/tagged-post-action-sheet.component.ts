import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { IFollow } from '../../interfaces/follow.interface';
import { ILike } from '../../interfaces/like-interface';
import { IComment } from '../../interfaces/comment-interface';
import * as firebase from "firebase/"
import { ActionSheetController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-tagged-post-action-sheet',
  templateUrl: './tagged-post-action-sheet.component.html',
  styleUrls: ['./tagged-post-action-sheet.component.scss']
})
export class TaggedPostActionSheetComponent implements OnInit {
  @Input() post: Post;
  @Input() following: IFollow[];
  compareFollow: IFollow;
  loggedIn: boolean;
  userId: string;
  likes: ILike[] = [];
  comments: IComment[] = [];

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid
    this.getAllComments();
    this.getAllLikes();
    this.followingService.getSpecificFollow(this.post.UserID, this.firebaseAuth.getCurrentUserID()).subscribe(data => {
      this.compareFollow = data[0]
    })
 }
  constructor(public actionSheetController: ActionSheetController, 
    private databaseService: DatabaseService, 
    private firebaseAuth: FirebaseAuthService, 
    private spotifyService: SpotifyService, 
    private followingService: FollowService, 
    private analytics: AnalyticsService
    ) {
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        this.post.UserID != firebase.auth().currentUser.uid && this.compareFollow == null ?
          {
            text: "Follow",
            icon: "person-add",
            handler: () => {
              this.follow(firebase.auth().currentUser.uid, this.post.UserID);
            }
          }
          :
          {
            text: "Unfollow",
            icon: "close",
            handler: () => {
              this.followingService.removeFollowing(this.compareFollow.id);
            }
          }
        ,
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
        this.post.UserID == firebase.auth().currentUser.uid
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
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            this.actionSheetController.dismiss();
          }
        },
      ]
    });
    await actionSheet.present();
  }

  delete(postid: string) {
    this.analytics.log("deletedPost", { param: "DeletedPost" } )
    this.databaseService.deletePost(postid);
    this.getAllComments();
    this.getAllLikes();
    this.deleteComments();
    this.deleteLikes();
  }

  getAllComments() {
    this.databaseService.getComments(this.post.id).subscribe(comments => {
      this.comments = comments;
    });
  }

  deleteComments() {
    this.comments.forEach(element => {
      this.databaseService.removeComment(element.postId + "_" + element.userID);
    });
  }

  deleteLikes() {
    this.likes.forEach(element => {
      this.databaseService.removeLike(element.postId + "_" + element.userId);
    });
  }

  getAllLikes() {
    this.databaseService.getLikes(this.post.id).subscribe(likes => {
      this.likes = likes;
    });
  }

  open(uri) {
    this.analytics.log("userOpenedSpotify", { User_Opened_Song_On_Spotify: "User_Opened_Song_On_Spotify" } )
    this.spotifyService.open(uri);
  }

  follow(followerId,followedId) {
    this.analytics.log("followed", { User_Followed: "User_Followed" } )
    let follow: IFollow = {
      followerId: followerId,
      followedId: followedId
    }
    this.followingService.addFollow(follow)
  }
}
