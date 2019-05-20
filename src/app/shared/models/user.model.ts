import { Gift } from './gift.model';

export interface User {
  userId: string;
  userName: string;
  email: string;
  isAdmin: boolean;
  imageLink: string;
  favoriteGifts?: Gift[];
}
