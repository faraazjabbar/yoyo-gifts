export interface Gift {
  giftId: string;
  giftName: string;
  brandId?: string;
  brandName: string;
  categoryId?: string;
  categoryName: string;
  imageLink: string;
  cost: number;
  discount?: number;
  count: number;
  description?: string;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  userId: string;
  userName: string;
  userImage?: string;
  userRating: number;
  userReview: string;
}
