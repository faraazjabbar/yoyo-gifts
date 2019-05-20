export interface Gift {
  key?: string;
  giftName: string;
  brandId?: string;
  brandName: string;
  categoryId?: string;
  categoryName: string;
  imageLink?: string;
  cost: number;
  discount?: number;
  count: number;
  description?: string;
  rating?: number;
  giftedCount?: number;
  reviews?: Review[];
}

export interface Review {
  userId: string;
  userName: string;
  userImage?: string;
  userRating: number;
  userReview: string;
}

export interface Brand {
  key?: string;
  brandName: string;
  categoryId?: string;
  categoryName: string;
}

export interface Category {
  key?: string;
  categoryName: string;
}
