export default {
  location: {
    Address: '/Address/GetProvincesWithCities',
  },
  file: {
    create: '/file/create',
    update: '/file/update',
    delete: '/file/delete',
  },
  payment: {
    tranactionList: '/transaction',
    getBalance: '/wallet/getBalance',
  },
  ticket: {
    ticket: '/ticket',
    response: '/ticket/{_id}/response',
    category: '/category',
  },
  score: {
    userScore: '/getUserScore',
    history: '/history',
    leaderboard: '/leaderboard',
  },
};
