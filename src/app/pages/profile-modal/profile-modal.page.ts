import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebaseAuth/firebase-auth.service'
import { MenuController } from '@ionic/angular';
import { DatabaseService } from '../../services/database/database.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { DateTimeConvertPipe } from '../../pipes/date-time-convert.pipe';
import { IPost } from '../../interfaces/post-interface';
import { IFollow } from '../../interfaces/follow.interface';
import { FollowService } from '../../services/follow/follow.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.page.html',
  styleUrls: ['./profile-modal.page.scss'],
})
export class ProfileModalPage implements OnInit {

  followersCounter: number;
  followingCounter: number;
  postsCounter: number;
  profilePicture: any = null;
  userBio: string;
  userBioEmpty: boolean = false;
  posts: IPost[];
  toggled: boolean = false;
  buttonIsDisabled: boolean = true;
  following: IFollow[];
  followers: IFollow[];
  username: string;
  memberSince: Date;
  userId: string;

  constructor(
    private auth: FirebaseAuthService,
    private menuCtrl: MenuController,
    private db: DatabaseService,
    private followService: FollowService,
    private navParams: NavParams
  ) {
    this.userId = navParams.data.userId
    console.log(this.userId)
  }
  ngOnInit() {
    this.loadProfilePictureURL();
    this.db.getUserByID(this.userId).subscribe(data => {
      this.userBio = data.bio
      this.username = data.displayName
      this.memberSince = this.toDateTime(data.createdAt.seconds);
      if (this.userBio == null || this.userBio == '')
        this.userBioEmpty = true;
    })
    this.db.getLoggedInUserPosts().subscribe(posts => {
      this.posts = posts
      this.postsCounter = this.posts.length
    });
    this.followService.getFollowedUsers().subscribe(following => {
      this.following = following
      this.followingCounter = this.following.length
    });
    this.followService.getFollowingUsers(this.auth.getCurrentUserID()).subscribe(followers => {
      this.followers = followers
      this.followersCounter = this.followers.length
    })
  }

  toDateTime(secs: number) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }


  loadProfilePictureURL() {
    this.db.getProfilePictureURLOfUser(this.userId).then(data => {
      if (data) {
        this.profilePicture = data
      }
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }


  getFollowers() {

  }

}
