import { IPost } from '../interfaces/post-interface';
export interface IUser {
    uid?: string;
    email: string;
    username: string;
    photoULR?:string;
    boi?:string
    followers?:string[];
    folowing?:string[];
    likes?: IPost[];
}
