<template>
  <b-row class="justify-content-center">
    <b-col md="8">
      <b-card>
        <b-card-body>
          <validation-observer ref="profileValidation" #default="{ invalid }">
            <b-form class="row auth-login-form" @submit.prevent>
              <div class="col-12 px-0">
                <b-card-text class="h4 text-primary">اطلاعات پایه حساب</b-card-text>
                <div class="divider bg-primary"></div>
              </div>
              <div class="col-12 col-md-8 my-2">
                <div class="d-flex">
                  <b-avatar size="90" :src="userLogo" variant="light-primary" />
                  <div class="d-flex flex-row align-items-center user-nav mx-1">
                    <div>
                      <div class="user-status text-primary-light w-100">خوش آمدید</div>
                      <p class="user-name text-primary font-weight-bolder mb-0">
                        {{ getUserFullName }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- first name -->
              <b-form-group label="نام" label-for="firstNameId" class="col-12 col-md-6">
                <!-- <validation-provider #default="{ errors }" name="نام"> -->
                <b-form-input dir="rtl" id="firstNameId" v-model="form.firstName" :class="{ 'font-weight-bolder': !!form.firstName }" name="firstName" class="text-primary-middle" />
                <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                <!-- </validation-provider> -->
              </b-form-group>
              <!-- last name -->
              <b-form-group label="نام خانوادگی" label-for="lastNameId" class="col-12 col-md-6">
                <!-- <validation-provider #default="{ errors }" name="نام خانوادگی"> -->
                <b-form-input dir="rtl" id="lastNameId" v-model="form.lastName" :class="{ 'font-weight-bolder': !!form.lastName }" name="lastName" class="text-primary-middle" />
                <!-- <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
              <!-- phone number -->
              <b-form-group label="شماره همراه" label-for="phoneNumberId" class="col-12 col-md-6">
                <b-form-input disabled dir="ltr" id="phoneNumberId" v-model="form.phoneNumber" name="phoneNumber" class="text-primary font-weight-bolder user-select-none" />
              </b-form-group>
              <!--*************** Bank details ***************-->
              <div class="col-12 px-0">
                <div class="divider bg-primary"></div>
                <b-card-text class="h4 text-primary">اطلاعات بانکی</b-card-text>
                <b-card-text>برای استفاده از خدمات کیف پول آنتایم نیاز پر کردن این فرم دارید.</b-card-text>
                <div class="divider bg-primary"></div>
              </div>
              <!-- national code -->
              <b-form-group label="کد ملی" label-for="nationalCodeId" class="col-12 col-md-6">
                <validation-provider #default="{ errors }" name="کد ملی" rules="nationalCode">
                  <b-form-input dir="ltr" id="nationalCodeId" v-model="form.nationalCode" :class="{ 'font-weight-bolder': !!form.nationalCode }" :state="errors.length > 0 ? false : null" name="nationalCode" class="text-primary-middle" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- email -->
              <b-form-group label="ایمیل" label-for="emailId" class="col-12 col-md-6">
                <validation-provider #default="{ errors }" name="ایمیل" rules="email">
                  <b-form-input dir="ltr" id="emailId" v-model="form.email" :class="{ 'font-weight-bolder': !!form.email }" :state="errors.length > 0 ? false : null" name="email" class="text-primary-middle" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- email -->
              <b-form-group label="تولد" label-for="birthDateId" class="col-12 col-md-6">
                <!-- <validation-provider #default="{ errors }" name="تولد" > -->
                <b-form-input dir="ltr" id="birthDateId" :value="convertDate(form.birthDate)" :class="{ 'font-weight-bolder': !!form.birthDate }" name="birthDateId" class="text-primary-middle cursor-pointer" />
                <date-picker v-model="form.birthDate" :max="currentDate" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD" custom-input="#birthDateId" />
                <!-- <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
              <!-- email -->
              <b-form-group label="شماره شبا(بانک‌های عضو شتاب)" label-for="shabaNumberId" class="col-12 col-md-6">
                <validation-provider #default="{ errors }" name="شماره شبا" rules="ibanValidation">
                  <b-form-input dir="ltr" id="shabaNumberId" v-model="form.shabaNumber" :class="{ 'font-weight-bolder': !!form.shabaNumber }" :state="errors.length > 0 ? false : null" name="shabaNumber" class="text-primary-middle" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <!-- province -->
              <b-form-group label="استان" label-for="shabaNumberId" class="col-12 col-md-6">
                <!-- <validation-provider #default="{ errors }" name="استان"> -->
                <v-select v-model="form.province" dir="rtl" :options="provinces" :reduce="(val) => val.id" label="title" :clearable="false" input-id="provinceId" />
                <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                <!-- </validation-provider> -->
              </b-form-group>
              <!-- city -->
              <b-form-group v-if="!!form.province" label="شهر" label-for="shabaNumberId" class="col-12 col-md-6">
                <!-- <validation-provider #default="{ errors }" name="شهر"> -->
                <v-select v-model="form.city" dir="rtl" :options="selectedCities(form.province)" :reduce="(val) => val.id" label="title" :clearable="false" input-id="provinceId" />
                <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                <!-- </validation-provider> -->
              </b-form-group>
              <!-- sex -->
              <b-form-group label="جنسیت" label-for="genderId" class="col-12">
                <!-- <validation-provider #default="{ errors }" name="جنسیت"> -->
                <b-form-radio-group id="genderId" v-model="form.gender" :options="options" value-field="item" text-field="name" disabled-field="notEnabled" class="my-1" />
                <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                <!-- </validation-provider> -->
              </b-form-group>
              <div class="col-12 my-2">
                <div class="d-flex justify-content-end gap-3">
                  <b-button type="submit" variant="primary" @click="validationForm" :disabled="invalid || loading" class="d-flex gap-3 py-1">
                    <span>ذخیره تغییرات</span>
                    <b-spinner v-if="loading" variant="white" small></b-spinner>
                  </b-button>
                  <b-button :disabled="loading" @click.prevent="cancelUpdateProfile" variant="outline-secondary" class="py-1"> لغو </b-button>
                </div>
              </div>
            </b-form>
          </validation-observer>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BButton, BCard, BCardText, BAvatar, BForm, BFormRadioGroup, BFormGroup, BSpinner, BFormInput, BCardBody } from 'bootstrap-vue';
import vSelect from 'vue-select';
import { $themeConfig } from '@themeConfig';
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate';
import { required, digits, ibanValidation, email, nationalCode } from '@validations';
import { default as locations } from '@/@core/data/provinces';
import { mapGetters } from 'vuex';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
export default {
  setup() {
    // App Name
    const { userLogo } = $themeConfig.app;
    return {
      userLogo,
    };
  },
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BCard,
    BCardText,
    BFormRadioGroup,
    BCardBody,
    BAvatar,
    BButton,
    BForm,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  data() {
    return {
      loading: false,
      userData: { ...this.$auth.getUser() },
      date: null,
      form: {
        birthDate: '',
        city: null,
        email: null,
        firstName: null,
        gender: null,
        id: '',
        lastName: null,
        nationalCode: null,
        phoneNumber: '',
        province: null,
        shabaNumber: null,
        required,
        digits,
      },
      options: [
        { item: 0, name: 'زن' },
        { item: 1, name: 'مرد' },
      ],
      provinces: [...locations],
      cities: null,
      currentDate: '',
      ibanValidation,
      email,
      nationalCode,
      // birthDate: '2010-12-26',
      // city: null,
      // email: null,
      // firstName: 'عرفان',
      // gender: null,
      // id: '98a100b3-3dd6-450a-b9a3-e4e328a98865',
      // lastName: 'لشگری',
      // nationalCode: null,
      // phoneNumber: '09336292512',
      // province: null,
      // referralCode: 'WQYL54968189',
      // referralUser: null,
      // shabaNumber: null,
    };
  },
  computed: {
    ...mapGetters('auth', {
      userInfo: 'GET_USER',
    }),
    convertDate() {
      return (faDate) => {
        faDate ? new Date(faDate).toLocaleDateString('fa-IR') : null;
      };
    },
    getUserFullName() {
      if (!this.userInfo.firstName && !this.userInfo.lastName) return 'کاربر عزیز';
      return this.checkFalsy(this.userInfo.firstName) + ' ' + this.checkFalsy(this.userInfo.lastName);
    },
    selectedCities() {
      return (id) => (id ? this.provinces.filter((state) => state.id === id)[0].cities : null);
    },
  },
  methods: {
    validationForm() {
      this.$refs.profileValidation.validate().then((success) => {
        if (success) {
          this.updateProfile();
        }
      });
    },
    updateProfile() {
      this.loading = true;
      this.$auth
        .updateUser(this.requestHandler())
        .then((res) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'عملیات با موفقیت انجام شد',
              icon: 'Error',
              variant: 'success',
            },
          });
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'عملیات با خطا مواجه شد',
              icon: 'Error',
              variant: 'danger',
            },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    requestHandler() {
      for (const property in this.form) {
        this.form[property] == '' && (this.form[property] = null);
      }
      return this.form;
    },
    checkFalsy(str) {
      return str === null || str === undefined ? '' : str;
    },
    cancelUpdateProfile() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.currentDate = new Date(Date.now());
    this.currentDate = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`;
    this.form = { ...this.userInfo };
  },
};
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.gap-3 {
  gap: 8px;
}
</style>
