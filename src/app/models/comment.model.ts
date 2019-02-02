export class Comment {
    content: string;
    userID: string;
    postedBy: string;
    likes: number;
    postedAt: string;
    postId: string;
    id?: string;

    constructor(content:string, userID: string, postedBy:string, likes: number, postedAt: string, postId: string){
        this.content = content;
        this.userID = userID;
        this.postedBy = postedBy;
        this.likes = likes;
        this.postedAt = postedAt;
        this.postId = postId;
    }
}
