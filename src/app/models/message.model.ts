export class Message {
    chatRoomID: string;
    createdAt: string;
    message: string;
    senderID: number;
    senderName: string;
    id?: string;

    constructor(chatRoomID:string, createdAt: string, message:string, senderID: number, senderName: string){
        this.chatRoomID = chatRoomID;
        this.createdAt = createdAt;
        this.message = message;
        this.senderID = senderID;
        this.senderName = senderName;
    }
}
