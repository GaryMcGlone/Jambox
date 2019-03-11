import { myDate } from './my-date.interface';
import { ITag } from './tag-interface';

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
    tags?: string[]
    postType?: string;
    externalUri?:string;
}
