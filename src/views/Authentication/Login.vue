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
          <b-card-text class="text-primary-middle mb-2">شماره همراه خود را وارد کنید، جهت انجام بهتر امور بانکی و مالی بهتر است مالک خط شما باشید.</b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation" #default="{ invalid }">
            <b-form class="auth-login-form" @submit.prevent>
              <!-- phone number -->
              <b-form-group label="شماره همراه" label-for="login-phonenumber">
                <validation-provider #default="{ errors }" name="شماره همراه" rules="required|phoneNumber">
                  <b-form-input dir="ltr" id="login-phonenumber" v-model="userMobile" :class="{ 'font-weight-bolder': !!userMobile }" :state="errors.length > 0 ? false : null" name="login-phonenumber" placeholder="+98" class="text-center text-primary-middle" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block @click="validationForm" :disabled="invalid || loading" class="my-3 py-2">
                <span v-if="!loading">دریافت کد اعتبارسنجی</span>
                <b-spinner v-else variant="white" small></b-spinner>
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-primary text-center mt-2">
            <span>با ثبت نام یا ورود</span>
            <!-- <b-link :to="{ name: 'page-auth-register-v2' }"> -->
            <span class="text-main" v-b-modal.modal-scrollable>&nbsp;قوانین و مقررات </span>
            <!-- </b-link> -->
            <span>آنتایم را می پذیرم</span>
          </b-card-text>
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
    <b-modal id="modal-scrollable" scrollable title="قوانین و مقررات" ok-only ok-title="فهمیدم" cancel-variant="outline-secondary">
      <b-card-text v-for="(content, index) in scrollContent" :key="index">
        {{ content }}
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';
import VuexyLogo from '@core/layouts/components/Logo.vue';
// eslint-disable-next-line object-curly-newline
import { BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BSpinner } from 'bootstrap-vue';
import { required, phoneNumber } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import store from '@/store/index';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
// import AuthService from '@core/auth/index';
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
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userMobile: '',
      loading: false,
      sideImg: require('@/assets/images/pages/login.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      phoneNumber,
      // email,
      scrollContent: [
        'Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake fruitcake powder pudding pastry.',
        'Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.',
        'Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate marzipan muffin pie liquorice.',
        'Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake fruitcake powder pudding pastry.',
        'Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.',
        'Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate marzipan muffin pie liquorice.',
        'Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake fruitcake powder pudding pastry.',
        'Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.',
        'Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate marzipan muffin pie liquorice.',
        'Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot cake soufflé halvah. Biscuit powder jelly beans. Lollipop candy canes croissant icing chocolate cake. Cake fruitcake powder pudding pastry.',
        'Tootsie roll oat cake I love bear claw I love caramels caramels halvah chocolate bar. Cotton candy gummi bears pudding pie apple pie cookie. Cheesecake jujubes lemon drops danish dessert I love caramels powder.',
        'Chocolate cake icing tiramisu liquorice toffee donut sweet roll cake. Cupcake dessert icing dragée dessert. Liquorice jujubes cake tart pie donut. Cotton candy candy canes lollipop liquorice chocolate marzipan muffin pie liquorice.',
        'Powder cookie jelly beans sugar plum ice cream. Candy canes I love powder sugar plum tiramisu. Liquorice pudding chocolate cake cupcake topping biscuit. Lemon drops apple pie sesame snaps tootsie roll carrot cake soufflé halvah.',
      ],
    };
  },
  computed: {
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
          this.sendCode();
        }
      });
    },
    sendCode() {
      this.loading = true;
      this.$auth
        .sendCode({
          phoneNumber: this.userMobile,
        })
        .then((res) => {
          this.$auth.$storage.setLocalStorage('loginMobile', this.userMobile);
          this.$router.push('/verify');
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
    },
  },

  mounted() {
    // console.log(process.env.BASE_URL);
    // debugger
    // localize('fa');
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
