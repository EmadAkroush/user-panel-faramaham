import Vue from 'vue';
import AuthService from './auth';
import options from './options';

const auth = new AuthService({ ...options.urlDefinition });

Vue.prototype.$auth = auth;

export default auth;
