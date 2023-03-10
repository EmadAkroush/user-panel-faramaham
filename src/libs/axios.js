// Import section
import Vue from 'vue';
// import auth from '../@core/auth';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || '';
//*************** Run on request sended to server ********************/
axios.interceptors.request.use(
  async (config) => {
    if (!config.url.includes('/login')) {
      config.headers.common['Authorization'] = localStorage.getItem('accessToken') || '';
    }
    return config;
  },
  (err) => {
    return err.response;
  }
);
//*************** Run on response get from server ********************/
axios.interceptors.response.use(
  async (res) => {
    return Promise.resolve(res);
  },
  async (err) => {
    const { config, response, message } = err;
    if (response.status !== 401) {
      return Promise.reject(err);
    }
    //TODO: Complete commit state when refresh get 500 error
    // if(response.status === 401){
    //     const {status , token} = await auth.refreshToken()
    //         if(status == 200){
    //             config.headers['Authorization'] = token
    //             const res = await axios(config)
    //             return res;
    //         }
    //         if(status == 500){
    //             auth.logout()
    //         }
    // }Promise.reject(err)
  }
);

Vue.prototype.$http = axios;

export default axios;
