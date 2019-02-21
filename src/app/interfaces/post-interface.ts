export interface IPost {
    id:string;
    albumArt: string;
    artistName: string;
    caption: string;
    createdAt: Date;
    songID: string;
    songName: string;
    UserID: string;
    commentCounter: number;
    likeCounter: number;
}