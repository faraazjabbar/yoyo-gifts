import { Gift } from './gift.model';

export interface Order {
  key?: string;
  email: string;
  recieved: RecievedGift[];
  sent: SentGift[];
}

export interface SentGift extends Gift {
  revieverEmail: string;
  recieverName: string;
  recieverImage?: string;
}

export interface RecievedGift extends Gift {
  senderEmail: string;
  senderName: string;
  senderImage?: string;
  isRedeemed: boolean;
  isReviewed: boolean;
}
