export class Message {
    chatRoomID: string;
    createdAt: Date;
    message: string;
    senderID: string;
    senderName: string;
    id?: string;

    constructor(chatRoomID:string, createdAt: Date, message:string, senderID: string, senderName: string){
        this.chatRoomID = chatRoomID;
        this.createdAt = createdAt;
        this.message = message;
        this.senderID = senderID;
        this.senderName = senderName;
    }
}
