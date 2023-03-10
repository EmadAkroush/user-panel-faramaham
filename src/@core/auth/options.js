export default {
  // Endpoints
  endpoints: {
    login: 'Auth/login',
    register: 'Auth/register',
    refresh: 'Auth/refreshToken',
    logout: 'Auth/logout',
    sendCode: 'Auth/sendCode',
    userInfo: 'Auth/getUserInfo',
    updateUser: 'Auth/updateUserInfo',
    referral: {
      setReferralUser: 'referral/setReferralUser',
      getReferredUser: 'referral/GeReferredUsers',
    },
  },

  loginInstance: {
    userName: String,
    phoneNumber: String,
    code: Number,
    password: String,
  },

  urlDefinition: {
    service: 'identityProvider',
    version: 1,
  },

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storage: {
    tokenKey: 'accessToken',
    user: 'user',
    refreshTokenKey: 'refreshToken',
    tokenExpiration: 'tokenExp',
  },
};
