import { myDate } from './my-date.interface';

export interface IChatMessage {
    createdAt: myDate
    chatRoomID: string 
    senderID: string
    senderName: string
    message: string
}