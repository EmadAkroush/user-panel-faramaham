export default [
  {
    path: '/referral',
    name: 'referral-page',
    component: () => import('@/views/pages/referral/index.vue'),
    meta: {
      pageTitle: 'دعوت از دوستان',
      breadcrumb: [
        {
          text: 'دعوت از دوستان',
          active: true,
        },
      ],
    },
  },
  {
    path: '/tickets',
    name: 'tickets-page',
    component: () => import('@/views/pages/tickets/list.vue'),
    meta: {
      pageTitle: 'پشتیبانی',
      breadcrumb: [
        {
          text: 'پشتیبانی',
          active: true,
        },
      ],
    },
  },
  {
    path: '/ticket:ticket_id',
    name: 'ticket-view-page',
    component: () => import('@/views/pages/tickets/ticket.vue'),
    meta: {
      pageTitle: 'تیکت',
      breadcrumb: [
        {
          text: 'تیکت',
          active: true,
        },
      ],
    },
  },
  {
    path: '/wallet',
    name: 'card-wallet',
    component: () => import('@/views/pages/card/wallet.vue'),
    meta: {
      pageTitle: 'کیف پول',
      breadcrumb: [
        {
          text: 'کیف پول',
          active: true,
        },
      ],
    },
  },
];
