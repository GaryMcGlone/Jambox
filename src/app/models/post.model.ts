export class Post {
    userId: string;
    songId: string;
    artistName: string;
    songName: string;
    albumArt: string;
    caption: string;
    createdAt: string;
  
    constructor(songId: string, artistName: string, songName: string, albumArt: string, caption: string, createdAt: string) {
      this.songId = songId;
      this.artistName = artistName;
      this.songName = songName;
      this.albumArt = albumArt;
      this.caption = caption || "";
      this.createdAt = createdAt;
    }
  }
  