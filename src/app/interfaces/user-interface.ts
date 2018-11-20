import { IPost } from '../interfaces/post-interface';
export interface IUser {
    uid?: string;
    email: string;
    displayName: string;
    photoURL?:string;
    boi?:string
    followers?:string[];
    following?:string[];
    likes?: IPost[];
}
