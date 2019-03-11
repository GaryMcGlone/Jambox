import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpClientModule } from "@angular/common/http";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreateSongModalPageModule } from "./pages/create-song-modal/create-song-modal.module";
import "hammerjs";
import { YouTubeApiService } from "./services/youtube/youtube-api.service";
import { CreateSongModalPage } from "./pages/create-song-modal/create-song-modal.page";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { FirebaseAnalytics } from "@ionic-native/firebase-analytics/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { CommentsPageModule } from "./pages/comments/comments.module"
import { CommentsPage } from "./pages/comments/comments.page"
import { SearchSongByIdPage } from "./pages/search-song-by-id/search-song-by-id.page";
import { SearchSongByIdPageModule } from "./pages/search-song-by-id/search-song-by-id.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PrivateChatsPage } from "./pages/private-chats/private-chats.page";
import { PrivateChatPageModule } from "./pages/private-chat/private-chat.module";
import { PrivateChatsPageModule } from "./pages/private-chats/private-chats.module";
import { GroupChatsPage } from "./pages/group-chats/group-chats.page";
import { GroupChatsPageModule } from "./pages/group-chats/group-chats.module";
import { UserSearchPage } from "./pages/user-search/user-search.page";
import { InitialUserSearchPageModule } from "./pages/initial-user-search/initial-user-search.module";
import { UserSearchPageModule } from "./pages/user-search/user-search.module";
import { UserSearchGroupPage } from "./pages/user-search-group/user-search-group.page";
import { UserSearchGroupPageModule } from "./pages/user-search-group/user-search-group.module";
import { ProfileModalPage } from './pages/profile-modal/profile-modal.page'
import { ProfileModalPageModule } from './pages/profile-modal/profile-modal.module';
import { TagsPage } from "./pages/tags/tags.page";
import { TagsPageModule } from "./pages/tags/tags.module";
import { TaggedPostsPage } from "./pages/tagged-posts/tagged-posts.page";
import { TaggedPostsPageModule } from "./pages/tagged-posts/tagged-posts.module";
import { ProfileModalActionSheetComponent } from './components/profile-modal-action-sheet/profile-modal-action-sheet.component';

library.add(fas, far, fab)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ProfileModalPage, CreateSongModalPage, CommentsPage, SearchSongByIdPage, PrivateChatsPage, GroupChatsPage, UserSearchPage, UserSearchGroupPage, TagsPage, TaggedPostsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      menuType: "push"
    }),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CreateSongModalPageModule,
    PrivateChatPageModule,
    PrivateChatsPageModule,
    GroupChatsPageModule,
    CommentsPageModule,
    SearchSongByIdPageModule,
    FontAwesomeModule,
    InitialUserSearchPageModule,
    UserSearchPageModule,
    UserSearchGroupPageModule,
    ProfileModalPageModule,
    TagsPageModule,
    TaggedPostsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    YouTubeApiService,
    YoutubeVideoPlayer,
    NativeStorage,
    FirebaseAnalytics,
    GooglePlus,
    Camera,
    File,
    ImagePicker,
    Media,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }