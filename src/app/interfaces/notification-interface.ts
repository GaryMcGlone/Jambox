import { myDate } from "./my-date.interface";

export interface INotification{
    userId: string;
    body: string;
    createdAt: myDate;
    type: string;
    read: boolean;
    chatRoomID?: string;
    id?: string;
}