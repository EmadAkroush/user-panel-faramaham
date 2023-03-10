export default [
  {
    path: '/profile',
    name: 'profile-specs',
    component: () => import('@/views/profile/specs.vue'),
    meta: {
        pageTitle: 'اطلاعات کاربری',
        breadcrumb: [
          {
            text: 'پروفایل',
          },
          {
            text: 'اطلاعات کاربری',
            active: true,
          },
        ],
      },
  },
  {
    path: '/score-club',
    name: 'profile-score-club',
    component: () => import('@/views/profile/scoreClub.vue'),
    meta: {
        pageTitle: 'باشگاه امتیاز',
        breadcrumb: [
          {
            text: 'پروفایل',
          },
          {
            text: 'باشگاه امتیاز',
            active: true,
          },
        ],
      },
  },
];
