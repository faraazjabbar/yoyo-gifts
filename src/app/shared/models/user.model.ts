import { Gift } from './gift.model';

export interface User {
    key?: string;
    userId: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    imageLink: string;
    points: number;
    favoriteGifts?: Gift[];
}

export interface SendEmail {
    name: string;
    email: string;
    messege?: string;
}
