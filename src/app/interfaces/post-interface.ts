export interface IPost {
    id:string;
    albumArt: string;
    artistName: string;
    caption: string;
    createdAt: myDate;
    songID: string;
    songName: string;
    UserID: string;
    commentCounter: number;
    likeCounter: number;
}

export interface myDate {
    seconds: number;
    nanoseconds: number;
}