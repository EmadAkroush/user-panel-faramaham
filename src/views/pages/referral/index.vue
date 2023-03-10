<template>
  <b-row class="justify-content-center">
    <b-col md="4">
      <b-row class="justify-content-center">
        <b-col sm="12">
          <b-card>
            <b-card-body class="d-flex flex-column justify-content-center p-0">
              <b-img fluid :src="require('@/assets/images/pages/conversation.png')" class="conversation-img"></b-img>
              <b-card-text class="h3 font-weight-bolder text-primary">ارسال کد دعوت</b-card-text>
              <b-card-text class="text-primary-middle">کد دعوت زیر رو با دیگران به اشتراک بگذار و بعد از نصب اون‌ها امتیاز بگیر!</b-card-text>
              <b-input-group>
                <b-input-group-prepend>
                  <b-button v-clipboard:copy="referralCode" v-clipboard:success="onCopy" v-clipboard:error="onCopyError" variant="outline-primary">
                    <feather-icon icon="CopyIcon" />
                  </b-button>
                </b-input-group-prepend>
                <b-form-input disabled v-model="referralCode" dir="ltr" class="py-2" />
              </b-input-group>
              <b-button variant="primary" block class="my-1 py-2"> ارسال از طریق پیامک </b-button>
              <b-card-text class="h4 text-center text-primary-middle mt-2">اشتراک گذاری از طریق</b-card-text>
              <div class="d-flex justify-content-center mt-2">
                <a :href="`https://eitaa.com/share/url?url=${href + referralCode}`" class="mx-1">
                  <b-img :src="telegramIcon" size="35" class="text-primary" />
                </a>
                <a :href="`https://eitaa.com/share/url?url=${href + '?referred=' + referralCode}`" class="mx-1" target="_blank">
                  <b-img :src="eitaIcon" size="35" class="text-primary" />
                </a>
                <a href="" class="mx-1">
                  <b-img :src="whatsAppIcon" size="35" class="text-primary" />
                </a>
                <a href="" class="mx-1">
                  <b-img :src="baleIcon" size="35" class="text-primary" />
                </a>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12">
          <b-card>
            <b-card-body class="p-0">
              <b-card-text class="h3 font-weight-bolder text-primary">وارد کردن کد دعوت</b-card-text>
              <b-card-text class="h4 text-primary-middle my-1">کد دعوتی که گرفتی رو در اینجا وارد کن</b-card-text>
              <validation-observer ref="loginValidation" #default="{ invalid }">
                <validation-provider #default="{ errors }" name="کد دعوت" rules="min:12">
                  <b-input-group>
                    <b-form-input v-model="referredCode" placeholder="کد دعوت" class="text-center py-2" :state="errors.length > 0 ? false : null" />
                    <b-input-group-append>
                      <b-button @click.prevent="onAcceptReferredCode" :disabled="loading || invalid" variant="primary">
                        <span>تایید</span>
                        <b-spinner v-if="loading" variant="white" small></b-spinner>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="8">
      <b-row class="justify-content-center">
        <b-col sm="12">
          <b-card>
            <b-card-body class="p-0">
              <div class="row text-center">
                <div class="col-12 col-md-4 mb-4 mb-md-0">
                  <div class="w-75 mx-auto d-flex flex-column justify-content-center align-items-center">
                    <div class="bg-primary-accent p-3 rounded-circle w-50">
                      <feather-icon icon="AwardIcon" size="35" class="text-primary" />
                    </div>
                    <h4 class="mt-2 mb-1">100% Original</h4>
                    <p class="card-text">Chocolate bar candy canes ice cream toffee. Croissant pie cookie halvah.</p>
                  </div>
                </div>
                <div class="col-12 col-md-4 mb-4 mb-md-0">
                  <div class="w-75 mx-auto d-flex flex-column justify-content-center align-items-center">
                    <div class="bg-primary-accent p-3 rounded-circle w-50">
                      <feather-icon icon="ClockIcon" size="35" class="text-primary" />
                    </div>
                    <h4 class="mt-2 mb-1">100% Original</h4>
                    <p class="card-text">Chocolate bar candy canes ice cream toffee. Croissant pie cookie halvah.</p>
                  </div>
                </div>
                <div class="col-12 col-md-4 mb-4 mb-md-0">
                  <div class="w-75 mx-auto d-flex flex-column justify-content-center align-items-center">
                    <div class="bg-primary-accent p-3 rounded-circle w-50">
                      <feather-icon icon="ShieldIcon" size="35" class="text-primary" />
                    </div>
                    <h4 class="mt-2 mb-1">100% Original</h4>
                    <p class="card-text">Chocolate bar candy canes ice cream toffee. Croissant pie cookie halvah.</p>
                  </div>
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col sm="12">
          <b-card>
            <b-card-body class="p-0">
              <b-card-text class="h3 font-weight-bolder text-primary">دعوت شده ها توسط من</b-card-text>
              <b-table v-if="!!referredUsers.length" responsive="sm" :fields="fields" :items="referredUsers">
                <template #cell(index)="data"> #{{ data.index + 1 }} </template>

                <template #cell(avatarUrl)="data">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.06" cx="17" cy="17" r="17" fill="#242468" />
                    <circle opacity="0.1" cx="17" cy="17" r="13" fill="#242468" />
                    <g opacity="0.6">
                      <path d="M17 17C19.0711 17 20.75 15.3211 20.75 13.25C20.75 11.1789 19.0711 9.5 17 9.5C14.9289 9.5 13.25 11.1789 13.25 13.25C13.25 15.3211 14.9289 17 17 17Z" stroke="#242468" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M23.4426 24.5C23.4426 21.5975 20.5551 19.25 17.0001 19.25C13.4451 19.25 10.5576 21.5975 10.5576 24.5" stroke="#242468" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                  </svg>
                </template>
                <template #cell(messedPhoneNumber)="data">
                  <span dir="ltr">
                    {{ data.item.messedPhoneNumber }}
                  </span>
                </template>
                <template #cell(registerDate)="data"> {{ dateToPersian(data.item.registerDate) }} </template>
              </b-table>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BButton, BTable, BImg, BCard, BCardText, BAvatar, BSpinner, BCardBody, BInputGroup, BFormInput, BInputGroupAppend, BInputGroupPrepend } from 'bootstrap-vue';
import { $themeConfig } from '@themeConfig';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, min, max } from '@validations';
import { mapGetters } from 'vuex';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  setup() {
    // App Name
    const { userLogo } = $themeConfig.app;
    const telegramIcon = require('@/assets/images/logo/telegram.png');
    const eitaIcon = require('@/assets/images/logo/eita.png');
    const whatsAppIcon = require('@/assets/images/logo/watsapp.png');
    const baleIcon = require('@/assets/images/logo/bale.png');
    return {
      userLogo,
      telegramIcon,
      eitaIcon,
      whatsAppIcon,
      baleIcon,
    };
  },
  components: {
    BRow,
    BCol,
    BFormInput,
    BCard,
    BCardText,
    BCardBody,
    BAvatar,
    BButton,
    BImg,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    BTable,
  },
  computed: {},
  data() {
    return {
      href: '',
      loading: false,
      referredCode: '',
      referralCode: null,
      referredUsers: [],
      fields: [
        {
          key: 'index',
          label: 'ردیف',
        },
        {
          key: 'avatarUrl',
          label: 'عکس',
        },
        {
          key: 'messedPhoneNumber',
          label: 'شماره همراه',
        },
        {
          key: 'registerDate',
          label: 'تاریخ',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', {
      userInfo: 'GET_USER',
    }),
  },
  methods: {
    onCopy(e) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'متن کپی شد',
          icon: 'CopyIcon',
        },
      });
    },
    onCopyError(e) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'عملیات با خطا مواجه شد',
          icon: 'CopyIcon',
        },
      });
    },
    onAcceptReferredCode() {
      this.loading = true;
      const referralCode = {
        referredCode: this.referredCode,
      };
      this.$auth
        .setReferralUser(referralCode)
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
    getReferredUser() {
      const query = {
        pageSize: 5,
      };
      this.$auth
        .getReferredUser(query)
        .then(({ data }) => {
          this.referredUsers = [...data.data];
          // avatarUrl: null
          // messedPhoneNumber: "0911****111"
          // registerDate: "2023-01-03T05:52:55.407818"
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    dateToPersian(date) {
      return !!date ? new Date(date).toLocaleDateString('fa-IR') : '';
    },
  },
  mounted() {
    this.href = window.location.href;
    this.referralCode = this.userInfo.referralCode;
    this.getReferredUser();
  },
  beforeMount() {},
};
</script>
<style lang="scss">
.conversation-img {
  width: 24rem;
  height: 16rem;
  align-self: center;
}
</style>
