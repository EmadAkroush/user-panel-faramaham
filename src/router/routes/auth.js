export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Authentication/Login.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/Authentication/Verify.vue'),
    meta: {
      layout: 'full',
    },
  },
];
