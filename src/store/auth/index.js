import auth from '@/@core/auth';
export default {
  namespaced: true,
  state: {
    user: {
      birthDate: '',
      city: null,
      email: null,
      firstName: '',
      gender: null,
      id: '',
      lastName: '',
      nationalCode: null,
      phoneNumber: '',
      province: null,
      referralCode: '',
      referralUser: null,
      shabaNumber: null,
    },
    loggedIn: false,
  },
  getters: {
    GET_USER: (state) => {
      const { user } = state;
      return user;
    },
    GET_LOGGEDIN: (state) => {
      const { loggedIn } = state;
      return loggedIn;
    },
  },
  mutations: {
    SET_USER(state, val) {
      state.user = val;
    },
    SET_LOGGEDIN(state, val) {
      state.loggedIn = state.loggedIn || false;
    },
  },
  actions: {},
};
