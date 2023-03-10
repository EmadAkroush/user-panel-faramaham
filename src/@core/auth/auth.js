import defaultConfigs from './options';
import axios from '@/libs/axios';
import Storage from './core/storage';
import State from './core/state';
// import Referral from './referral';
import router from '@/router/index';
import store from '@/store';
const jwt = require('jsonwebtoken');
// TODO: Complete state management in authentication flow
export default class AuthService {
  // Will be used by this service for making API calls
  axiosIns = null;

  // options <= Will be used by this service
  options = { ...defaultConfigs };

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // For Refreshing Token
  subscribers = [];

  $storage;

  constructor(defaults) {
    this.serviceDefinition = { ...defaults };

    this.axiosIns = axios;

    this.options = { ...this.options };

    this.basePath = this.urlProvider('/api/{service}/v{version}/');

    this.$storage = new Storage();

    this.state = new State(store);

    // this.$referral = new Referral(this.basePath);

    this.$router = router;

    this.$jwtService = jwt;
    // Request Interceptor
    // this.axiosIns.interceptors.request.use(
    //   (config) => {
    //     // Get token from localStorage
    //     const accessToken = this.getToken();

    //     // If token is present add it to request's Authorization Header
    //     if (accessToken) {
    //       // eslint-disable-next-line no-param-reassign
    //       config.headers.Authorization = `${this.options.tokenType} ${accessToken}`;
    //     }
    //     return config;
    //   },
    //   (error) => Promise.reject(error)
    // );

    // // Add request/response interceptor
    // this.axiosIns.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     // const { config, response: { status } } = error
    //     const { config, response } = error;
    //     const originalRequest = config;

    //     // if (status === 401) {
    //     if (response && response.status === 401) {
    //       if (!this.isAlreadyFetchingAccessToken) {
    //         this.isAlreadyFetchingAccessToken = true;
    //         this.refreshToken().then((r) => {
    //           this.isAlreadyFetchingAccessToken = false;

    //           // Update accessToken in localStorage
    //           this.setToken(r.data.accessToken);
    //           this.setRefreshToken(r.data.refreshToken);

    //           this.onAccessTokenFetched(r.data.accessToken);
    //         });
    //       }
    //       const retryOriginalRequest = new Promise((resolve) => {
    //         this.addSubscriber((accessToken) => {
    //           // Make sure to assign accessToken according to your response.
    //           // Check: https://pixinvent.ticksy.com/ticket/2413870
    //           // Change Authorization header
    //           originalRequest.headers.Authorization = `${this.options.tokenType} ${accessToken}`;
    //           resolve(this.axiosIns(originalRequest));
    //         });
    //       });
    //       return retryOriginalRequest;
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }

  login(...args) {
    try {
      return this.axiosIns
        .post(this.basePath + this.options.endpoints.login, ...args)
        .then((res) => {
          this.tokenManager(res.data).then(() => {
            this.getUserInfo();
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } catch (_) {}
  }

  updateUser(...args) {
    try {
      return this.axiosIns
        .post(this.basePath + this.options.endpoints.updateUser, ...args)
        .then((res) => {
          this.setUser(...args);
          store.commit('auth/SET_USER', ...args);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } catch (_) {}
  }

  getUserInfo() {
    return this.axiosIns
      .get(this.basePath + this.options.endpoints.userInfo)
      .then((res) => {
        this.setUser(res.data);
        store.commit('auth/SET_USER', res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  setReferralUser(...args) {
    try {
      return this.axiosIns
        .post(this.basePath + this.options.endpoints.referral.setReferralUser, ...args)
        .then((res) => {
          debugger;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    } catch (_) {}
  }

  getReferredUser({ pageIndex = 1, pageSize = 10 }) {
    let query = `pageIndex=${pageIndex}&pageSize=${pageSize}`;
    try {
      return this.axiosIns.get(this.basePath + this.options.endpoints.referral.getReferredUser + `?${query}`);
    } catch (_) {}
  }

  sendCode(args) {
    return this.axiosIns.post(this.basePath + this.options.endpoints.sendCode, args);
  }

  refreshToken() {
    return this.axiosIns.post(this.options.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }

  logout() {
    this.$storage.clearLocalStorage();
    return Promise.resolve();
  }

  setUser(...userData) {
    this.$storage.setLocalStorage(this.options.storage.user, ...userData);
  }

  getUser() {
    const localUser = this.$storage.getLocalStorage(this.options.storage.user);
    return localUser || null;
  }

  tokenManager(tokens) {
    const { accessToken, refreshToken } = tokens;
    if (!!accessToken) {
      this.$storage.setLocalStorage(this.options.storage.tokenKey, this.options.tokenType + ' ' + accessToken);
      return Promise.resolve();
    }
    if (!!refreshToken) {
      this.$storage.setLocalStorage(this.options.storage.tokenKey, this.options.tokenType + ' ' + refreshToken);
      return Promise.resolve();
    }
  }

  isAuthenticated() {
    // return !!this.getUser() && !!this.getToken() && !!this.checkExpiration(this.options.storage.tokenKey) ? true : false;
    return !!this.getToken() ? true : false;
  }

  handleRouter(router) {
    router.beforeEach((to, from, next) => {
      if (this.isAuthenticated()) {
        store.commit('auth/SET_USER', this.getUser());
        if (to.name !== 'login' || to.name !== 'verify') {
          next();
        } else {
          next('/');
        }
      } else {
        if (to.name === 'login' || to.name === 'verify') {
          next();
        } else {
          this.logout();
          next({ name: 'login' });
        }
      }
    });
  }

  getRefreshToken() {
    return this.$storage.getLocalStorage(this.options.storage.refreshTokenKey, value);
  }

  getToken() {
    return this.$storage.getLocalStorage(this.options.storage.tokenKey) || null;
  }

  async setToken(value) {
    await this.$storage.setLocalStorage(this.options.storage.tokenKey, this.options.tokenType + ' ' + value);
  }

  async setRefreshToken(value) {
    await this.$storage.setLocalStorage(this.options.storage.refreshTokenKey, value);
  }

  urlProvider(_url = '') {
    return _url.replace('{version}', encodeURIComponent('' + this.serviceDefinition.version)).replace('{service}', encodeURIComponent('' + this.serviceDefinition.service));
  }

  tokenParser(token) {
    return this.$jwtService.decode(token, { complete: true });
  }

  setTokenExpiration(data) {
    this.setExpiration(this.options.storage.tokenExpiration, this.tokenParser(data[this.options.storage.tokenKey]).payload.exp) || 0;
  }

  getTokenExpiration() {
    const localExp = this.$storage.getLocalStorage(this.options.storage.tokenExpiration);
    let localToken = this.getToken();
    if (localExp) {
      return localExp;
    } else {
      localToken = localToken.includes('Bearer ') ? localToken.replace('Bearer ', '') : localToken;
      return this.tokenParser(localToken).payload.exp;
    }
  }

  setExpiration(key, value) {
    this.$storage.set(key, value);
  }

  checkExpiration(token = '') {
    const now = Math.trunc(Date.now() / 1000);
    const expTime = +this.getToken() || 0;
    return now > expTime;
  }
}
