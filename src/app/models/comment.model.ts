export class Comment {
    content: string;
    userID: string;
    postedBy: string;
    likes: number;
    postedAt: string;

    constructor(content:string, userID: string, postedBy:string, likes: number, postedAt: string){
        this.content = content;
        this.userID = userID;
        this.postedBy = postedBy;
        this.likes = likes;
        this.postedAt = postedAt;
    }
}
