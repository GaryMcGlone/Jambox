import { IPost } from '../interfaces/post-interface';
export interface IUser {
    uid?: string;
    email: string;
    username: string;
    photoURL?:string;
    boi?:string
    followers?:string[];
    following?:string[];
    likes?: IPost[];
}
