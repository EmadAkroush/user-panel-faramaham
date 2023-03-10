export default [
  {
    title: 'صفحه اصلی',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'سوابق تراکنش ها',
    icon: 'TrelloIcon',
    children: [
      {
        title: 'تراکنش های کیف پول',
        route: 'apps-invoice-list',
      },
      {
        title: 'تراکنش های بانکی',
        route: 'apps-invoice-list',
      },
    ],
  },
  {
    title: 'باشگاه امتیازات',
    icon: 'StarIcon',
    route: 'profile-score-club',
  },
  {
    title: 'کیف پول',
    route: 'card-wallet',
    icon: 'ArchiveIcon',
  },
  {
    title: 'مدیریت کارت ها',
    icon: 'CreditCardIcon',
    children: [
      {
        title: 'کارت‌های من',
        route: 'apps-invoice-list',
      },
      {
        title: 'لیست کارت‌های مقصد',
        route: 'apps-invoice-list',
      },
    ],
  },
  {
    title: 'دعوت از دوستان',
    route: 'referral-page',
    icon: 'UsersIcon',
  },
  {
    header: 'دیگر خدمات',
  },
  {
    title: 'رمز ورود و امنیت',
    route: 'security-page',
    icon: 'LockIcon',
  },
  {
    title: 'درباره ما',
    route: 'aboutus-page',
    icon: 'BookOpenIcon',
  },
  {
    title: 'پشتیبانی',
    route: 'tickets-page',
    icon: 'MessageCircleIcon',
  },
];
