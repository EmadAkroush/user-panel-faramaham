<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Login-->
      <b-col lg="4" class="align-items-center flex-column auth-bg px-2 p-lg-5">
        <!-- Brand logo-->
        <div class="brand-logo w-100 flex-column align-items-center justify-content-center">
          <vuexy-logo />
          <h2 class="brand-text text-primary mt-2">به آن تایم 24</h2>
          <h2 class="brand-text text-primary">خوش آمدید</h2>
        </div>
        <!-- /Brand logo-->
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-text class="text-primary mb-2">شماره همراه خود را وارد کنید، جهت انجام بهتر امور بانکی و مالی بهتر است مالک خط شما باشید.</b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation" #default="{ invalid }">
            <b-form class="auth-login-form" @submit.prevent>
              <!-- <b-form-group label="شماره همراه" label-for="login-phonenumber"> -->
              <!-- <validation-provider #default="{ errors }" name="شماره همراه" rules="required"> -->
              <CodeInput :loading="false" class="input" @complete="onComplete" dir="ltr" />
              <div class="text-center my-1">
                <b-button variant="white" :disabled="!counterEnded" @click.prevent="sendCode" class="btn btn-no-focus font-weight-bolder text-secondary">
                  <div class="text-main" v-if="!startCounter">
                    <feather-icon icon="RotateCcwIcon" />
                    <span class="mx-1">ارسال مجدد</span>
                  </div>
                  <countdown v-if="startCounter" @end="checkCounterEndTime" :time="timerCount">
                    <template slot-scope="props"> {{ props.minutes }}:{{ props.seconds }}</template>
                  </countdown>
                </b-button>
              </div>
              <!-- <small class="text-danger">{{ errors[0] }}</small> -->
              <!-- </validation-provider> -->
              <!-- </b-form-group> -->

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block @click="validationForm" :disabled="invalid || loginData.code.length !== 5" class="my-3 py-2">
                <span v-if="!loading">تایید</span>
                <b-spinner v-else variant="white" small></b-spinner>
              </b-button>
              <b-button @click.prevent="goBackLogin" type="submit" variant="outline-primary" block class="py-2">ویرایش شماره</b-button>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';
import VuexyLogo from '@core/layouts/components/Logo.vue';
// eslint-disable-next-line object-curly-newline
import { BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BSpinner } from 'bootstrap-vue';
import CodeInput from '@core/components/code-verifier';
import { required, email } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import store from '@/store/index';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BSpinner,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    CodeInput,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      loginData: {
        userName: null,
        phoneNumber: '',
        code: '',
        password: null,
      },
      code: '',
      counterEnded: false,
      startCounter: false,
      // timerCount: 1 * 10 * 1000,
      timerCount: 2 * 60 * 1000,
      sideImg: require('@/assets/images/pages/login.svg'),
      // validation rulesimport store from '@/store/index'
    };
  },
  mixins: [togglePasswordVisibility],
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login.svg');
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.login();
        }
      });
    },
    sendCode() {
      this.$auth
        .sendCode({
          phoneNumber: this.loginData['phoneNumber'],
        })
        .then((res) => {
          this.startCounter = true;
          this.counterEnded = false;
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'کد با موفقیت ارسال شد',
              icon: 'Error',
              variant: 'success',
            },
          });
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'خطا در ارسال کد',
              icon: 'Error',
              variant: 'danger',
            },
          });
        });
    },
    async login() {
      try {
        this.loading = true;
        await this.$auth
          .login(this.loginData)
          .then((res) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'کد با موفقیت ارسال شد',
                icon: 'Error',
                variant: 'success',
              },
            });
            this.$router.push('/')
          })
          .catch((err) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'خطا در ارسال داده',
                icon: 'Error',
                variant: 'danger',
              },
            });
          })
          .finally(() => {
            this.loading = false;
          });
        // debugger
        // this.$router.push(`/auth/success/login`);
      } catch (err) {
        console.log(err);
      }
    },
    onComplete(v) {
      this.loginData.code = v;
    },
    checkCounterEndTime() {
      this.counterEnded = true;
      this.startCounter = false;
    },
    checkPhoneSetup() {
      const phoneSetupStatus = this.$auth.$storage.getLocalStorage('loginMobile') || false;
      if (!phoneSetupStatus) {
        this.$router.push('/login');
      } else {
        this.loginData['phoneNumber'] = this.$auth.$storage.getLocalStorage('loginMobile');
        this.startCounter = true;
      }
    },
    goBackLogin() {
      this.$auth.$storage.removeLocalStorage('loginMobile');
      this.$router.push('/login');
    },
  },

  mounted() {
    this.checkPhoneSetup();
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
