export type ActiveView = 'classes' | 'gallery' | 'membership' | 'about';

export interface GalleryItem {
  id: string;
  category: 'Vases' | 'Tableware' | 'Sculptures';
  title: string;
  studentName: string;
  studentQuote: string;
  imageUrl: string;
  likes: number;
}

export interface StudioClass {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  schedule: string;
  imageUrl: string;
  isPopular?: boolean;
  bookingCode: string;
}

export interface MembershipTier {
  id: string;
  title: string;
  price: string;
  features: string[];
  isRecommended?: boolean;
}

export interface BookingSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  classInterest: string;
  message: string;
  submittedAt: string;
}
