export class Post {
    UserID: string;
    songId: string;
    artistName: string;
    songName: string;
    albumArt: string;
    caption: string;
    createdAt: string;
  
    constructor(userId:string, songId: string, artistName: string, songName: string, albumArt: string, caption: string) {
      this.songId = songId;
      this.artistName = artistName;
      this.songName = songName;
      this.albumArt = albumArt;
      this.caption = caption || "";
      this.UserID = userId || "";
    }
  }
  