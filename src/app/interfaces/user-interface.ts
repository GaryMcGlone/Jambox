import { IPost } from '../interfaces/post-interface';
import { myDate } from './my-date.interface';

export interface IUser {
    uid?: string;
    email: string;
    createdAt: myDate;
    displayName: string;
    lowerDisplayName?: string;
    followerCount?: number;
    followingCount?: number;
    photoURL?:string;
    bio?:string
    followers?:string[];
    following?:string[];
    likes?: IPost[];
}
