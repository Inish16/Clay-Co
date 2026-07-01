import { GalleryItem, StudioClass, MembershipTier } from './types';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    category: 'Vases',
    title: 'Speckled Stoneware',
    studentName: 'Sarah J.',
    studentQuote: 'First firing! Thrilled with how the glaze broke on the rim.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRN9SeH-K751KDdOjzeAUSdbD8RvEPrF3qrkcRE_QliY_eDlZSrbcg9voPQwV02-DV35_siR9KaoqhKM6_Bc99Sg871fMsYXa9zH3Dvd4Tt871vnUuGES9gRw4Xp-vxVyQcQGcvDNjMUgSGIN0bH1aFvqV8FShss4GaBVj-52EUFO6UOIZXPdlXf7S9qcYFbvmrfyYGvrPXGiHSqJ5hmWb3B4BGF_uaTEJJr0TVVGIFmQk_4pzjhGZCOZ96vZbUu1S_mQKpyztLdl-',
    likes: 24
  },
  {
    id: 'gallery-2',
    category: 'Tableware',
    title: 'Morning Bowls',
    studentName: 'Marcus T.',
    studentQuote: 'Satin glaze experiments finally paying off.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQRzfBgnah0QoH7kewqjWf5lYJWdzFSfP4tDrKlADPEAzsob0pjvJtJiBk31RgOwZYOBqZV08ck4ZCL0MNM2EUOQQwqOJ31EIubELzDjmmuLjPsbXUjBovjLyrS1Ot_3J08RTed9yZqSXortA3VnvFfQQViyMFT0_Oqs82YPedH1eEGf2vSUONWXeiaa0DWbw6kD23ZzeLIZOtV8DxzjpyC8RiTqzq1caZDbedFZoNRQ_lpIeNvzwlt3Hum-78AXwrQGELn0tcF_vr',
    likes: 42
  },
  {
    id: 'gallery-3',
    category: 'Sculptures',
    title: 'Carved Form 04',
    studentName: 'Elena R.',
    studentQuote: 'Exploring texture and negative space.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCR7UWtMh8XDrbHGZWq_dyUVtL8nDOtLbGf_diKnotuVc_3DRR_RJA80VrojqXuTMLggcKWHqqeK07KQjVbXzu-5hT3f3z742-QNDshAPqda9E93VuSRwPzMJRwsAUF5ibH6Z4m-qupLEeU9JilOHkmhlo9_uN72TMVKnKC3Pb_iw5fhDYkZjYPGcvhJceCD_Q_d_BnbuGoudmBp7eC13DADkxPjqHUjB0e5ZC2t0FFmzHz0Ex0vPTHYjPA5znNgXxRaEaX0g1EW3_',
    likes: 56
  },
  {
    id: 'gallery-4',
    category: 'Tableware',
    title: 'Landscape Platter',
    studentName: 'David L.',
    studentQuote: 'Week 6 project. Pouring glazes is mesmerizing.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwTmuvUSsmLXBtnCGqV8Lrprw0wk2TAxHkXrbYUlWh5Ks6cztWXXp5j6gjIZDIRqYKDAH2q-Iakgm7yAbghkbFnVYks-hk0GSgTueLkH8zcxmnvCHX1_tbWzAPkWH-y3NZPiChQcpCEewBuEhotonEII62qIT_fnXY6A73GJvGIFd4K3SLu5Jxabz4B-1MMtkFtpcDDbsfq8WzuzYm6nkvqKrJ8fWNUkkp0QjXzxuYbYu7e9-FT_XFkAkx5W-KyPC0bDbIIJPoYFBH',
    likes: 31
  },
  {
    id: 'gallery-5',
    category: 'Tableware',
    title: 'Espresso Set',
    studentName: 'Chloe M.',
    studentQuote: 'Practicing consistency on the wheel.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4bwesmz1PegMSNMUWzgocdkJozoQ5N_wqiyE4dObNtE7YkQLJYaYb2Z2CHFQFM4BcQIGUBsjCxc0tKfeGMX926Ip_4Wzks0W8ZWEFUD3eCxV7_83j6AUiSEzLmjU1UZ7oouwGIhLgsJrzu8TQBgr2-urpq3Bfrc2hyGX5v8-lbsy3JNLng66Xy0kIud8rd791xBCYkD96rzWkNMQ9glJpWQZ8cOBRVImxFajD6ACQaZ6ThjKWWsU5XiEsdlfyQ_SFGu0G_A1BIVaA',
    likes: 49
  }
];

export const STUDIO_CLASSES: StudioClass[] = [
  {
    id: 'class-1',
    title: 'Beginner Foundations',
    description: 'An introductory tactile experience. Learn the basics of centering, opening, and pulling walls. No prior experience needed.',
    duration: '2.5 Hours',
    price: '$65 / Session',
    schedule: 'Tuesdays & Thursdays',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJjEt5Ag3rmD7Ww2C4eeS_rWYWCt7THZm7R3tuDWyw47DZiDSetLqlJcKQtlUyxEYWeTk41g-F_QzxRZtpa7aVSoR7484K0N-1l-jy5Iw-nBNerUTP0jAoYRIwIlvnvmpo4o6LFLjW1fXSmm88bxRege0FU2DnbVmDpnO2e2HOFAKBZMWCpV-YZEqGK8dCZl0xpk0I1s8bXSlNb9NvuFT4EO3Fnlbuop2gcYE2wyZDxp9FP6dspGrvjYV8RQ3w98ZUhLf8QYWVJ43k',
    bookingCode: 'Beginner Foundations'
  },
  {
    id: 'class-2',
    title: 'Intermediate Forms',
    description: 'Refine your technique. Focus on larger volumes, specific vessel shapes, and consistent wall thickness.',
    duration: '3 Hours',
    price: '$85 / Session',
    schedule: 'Wednesdays & Saturdays',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwuWR5bqCA40Hx_lpLkJN3egbs8r8djPRVFQ0ZW36Qlh3zUhFL7U2Q6ptGkf1IF4GBUGdfQS7PQSBgGDK9TA6MdWnnT18EoOAAqKMmEqtmorrpW0SwHeK0Dh_6CTOswlBxKiAQoZrf8c9fPz4tFU3_Y6Y3lfFCOgqVUiQtMgSQDMdUnNHEh8TXqwk6rVmyV-Ypu2tww_nh-3N-COBmUFIuNLx1fGMg2LAyFhnAQsy_R59qdAFip6ZRgu5hAnn4o4hiL6sJiZ6eUSmt',
    isPopular: true,
    bookingCode: 'Intermediate Forms'
  },
  {
    id: 'class-3',
    title: 'Advanced Masterclass',
    description: 'For dedicated practitioners. Deep dive into complex forms, lids, altering thrown shapes, and advanced glazing techniques.',
    duration: '4 Weeks (Sundays)',
    price: '$320 / Course',
    schedule: 'Starts 1st of Month',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs0qcUtpLFMDqoMCNw-_wBBQ6xnVbpqE8hOrvJ26NkVWyrMa0PN194u1xAp9_ngqkQVa-i_LFqp6uFb7rMdKE0O4dpArW8n4bMkNsQAA5TXP6NtH0It583KMMybgJxdzVZ_e30YtqUnBknlFwvjHT_rVeNBW9pBekpKndH8GlT3MBJa-i_iIBV2l44BcZGJDrnTT72tM8rnmsUTtc7cgeR-5lG-kOqzDKJMmNsPO4SxB6LddT6v0fQBIKp6IY_fqLWKfUEFqR7yv7j',
    bookingCode: 'Advanced Masterclass'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'member-1',
    title: 'Hobbyist',
    price: '$60',
    features: [
      '3 open studio sessions per month',
      '10% off workshops & additional sessions',
      'Shared shelf space for your pieces',
      'Standard clay and glaze selection'
    ]
  },
  {
    id: 'member-2',
    title: 'Professional',
    price: '$160',
    features: [
      '10 open studio sessions per month',
      '20% off workshops & guest masterclasses',
      'Private shelf & personal clay storage space',
      'Priority bisque & glaze firing slots'
    ],
    isRecommended: true
  },
  {
    id: 'member-3',
    title: 'Unlimited',
    price: '$260',
    features: [
      '24/7 keycard open studio access',
      'Personal tool locker & clay storage unit',
      'Unlimited kiln firing & raw material discounts',
      'Complimentary monthly guest pass'
    ]
  }
];
