import { IPost } from '../interfaces/post-interface';
import { ThrowStmt } from '@angular/compiler';

export class User {
    uid?: string;
    email: string;
    displayName: string;
    lowerDisplayName: string;
    photoURL?:string;
    bio?:string
    followers?:string[];
    following?:string[];
    likes?: IPost[];
    

    constructor(uid: string, email: string, displayName: string, photoURL: string, bio: string,
        followers: string[], following: string[], likes: IPost[]) {
            this.uid = uid;
            this.email = email;
            this.displayName = displayName;
            this.lowerDisplayName = displayName.toLowerCase();
            this.photoURL = photoURL;
            this.bio = bio;
            this.followers = followers;
            this.following = following;
            this.likes = likes;
    }
}