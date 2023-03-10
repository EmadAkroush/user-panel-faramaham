<template>
  <div class="email-application">
    <div class="email-app-details">
      <!-- Email Header -->
      <b-card>
        <!-- <b-row>
        <b-col cols="12"> -->
        <b-row>
          <b-col md="3">
            <div class="d-flex">
              <span>کد تیکت :</span>
              <!-- <span>{{ ticketVm }}</span> -->
            </div>
          </b-col>
          <b-col md="3">
            <div class="d-flex">
              <span>دسته بندی: </span>
              <span>{{ ticketVm.category.title }}</span>
            </div>
          </b-col>
          <b-col md="3">
            <div class="d-flex">
              <span>تاریخ بروزرسانی :</span>
              <span>{{ new Date(ticketVm.lastModifiedAt).toLocaleDateString('fa-IR') }}</span>
            </div>
          </b-col>
          <b-col md="3">
            <div class="d-flex justify-content-between">
              <span>آخرین وضعیت:</span>
              <span
                ><b-badge :variant="getTicketStatus(ticketVm.status, 'color')" class="badge-glow">{{ getTicketStatus(ticketVm.status, 'text') }}</b-badge></span
              >
            </div>
          </b-col>
        </b-row>
        <!-- </b-col>
    </b-row> -->
      </b-card>
      <div class="email-detail-header">
        <!-- Header: Left -->
        <div class="email-header-left d-flex align-items-center">
          <span class="go-back mr-1">
            <feather-icon :icon="$store.state.appConfig.isRTL ? 'ChevronLeftIcon' : 'ChevronRightIcon'" size="20" class="align-bottom" @click="$emit('close-email-view')" />
          </span>
          <h4 class="email-subject mb-0">
            {{ ticketVm.subject }}
          </h4>
        </div>
        <b-button @click.prevent="shallShowEmailComposeModal = true" variant="primary" class="rounded-pill d-flex align-items-center">
          <span> ارسال پیام جدید </span>
          <feather-icon icon="PlusCircleIcon" class="text-white mx-25" />
        </b-button>
      </div>

      <!-- Email Details -->
      <div class="border">
        <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="email-scroll-area scroll-area">
          <!-- Email Thread -->
          <b-row>
            <template v-if="ticketVm.responses.length">
              <b-col v-for="(res, index) in ticketVm.responses" :key="`res-${index}`" cols="12">
                <email-message-card :message="res" />
              </b-col>
            </template>
            <b-col v-else cols="12">
              <h4 class="text-center text-primary my-3">
                <b-card> در انتظار پاسخ </b-card>
              </h4>
            </b-col>
          </b-row>
        </vue-perfect-scrollbar>
      </div>
    </div>
    <email-compose type="edit" :title="ticketVm.subject" :ticketLoading="sendTicketLoading" @sendTicket="sendMessage" :categories="categories" :fileLoading="fileLoading" @createFile="uploadFile" @deleteFile="deleteFile" :files="files" v-model="shallShowEmailComposeModal" />
  </div>
</template>

<script>
import { fileService, ticketService } from '@core/services';
import { BDropdown, BDropdownItem, BRow, BCol, BButton, BBadge, BCard, BLink } from 'bootstrap-vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import EmailMessageCard from './components/EmailMessageCard.vue';
import EmailCompose from './components/EmailCompose.vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    // BSV
    BDropdown,
    BDropdownItem,
    BRow,
    BCol,
    BBadge,
    BCard,
    BLink,
    BButton,

    // 3rd Party
    VuePerfectScrollbar,

    // SFC
    EmailMessageCard,
    EmailCompose,
  },
  data() {
    return {
      ticketVm: {
        id: null,
        subject: '',
        text: '',
        attachedFiles: [],
        status: 0,
        category: {
          title: '',
          id: '',
        },
        createdAt: '',
        lastModifiedAt: '',
        responses: [],
      },
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      statuses: {
        0: {
          text: 'در دست بررسی',
          color: 'danger',
        },
        1: {
          text: 'پاسخ داده شده',
          color: 'success',
        },
        2: {
          text: 'ارسال شده',
          color: 'orange',
        },
        3: {
          text: 'پیام بسته شده',
          color: 'secondary',
        },
      },
      shallShowEmailComposeModal: false,
      newTicket: {
        subject: '',
        text: '',
        attachedFiles: [],
        categoryId: 0,
      },
      categories: [],
      files: [],
      message: '',
      sendTicketLoading: false,
      fileLoading: false,
    };
  },
  watch: {
    '$route.params.ticket_id': {
      handler: function (val) {
        this.getTicket(val);
      },
      immediate: true,
    },
  },
  computed: {
    getTicketStatus() {
      return (status, param = 'text') => this.statuses[`${status}`][param];
    },
    getUserFullName() {
      if (!this.userInfo.firstName && !this.userInfo.lastName) return 'شما';
      return this.checkFalsy(this.userInfo.firstName) + ' ' + this.checkFalsy(this.userInfo.lastName);
    },
    ...mapGetters('auth', {
      userInfo: 'GET_USER',
    }),
  },
  methods: {
    getTicket(ticket_id) {
      ticketService.getTicket(ticket_id).then(({ data }) => {
        const userTicket = {
          fromSupport: false,
          userName: this.getUserFullName,
          supportJob: null,
          text: data.text,
          attachedFiles: data.attachedFiles,
          createdAt: data.createdAt,
        };
        this.ticketVm = { ...data };
        this.ticketVm.responses = [userTicket, ...data.responses];
      });
    },
    sendMessage(newTicket) {
      this.sendTicketLoading = true;
      ticketService
        .responseTicket(newTicket, this.ticketVm.id)
        .then(({ data }) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'عملیات با موفقیت انجام شد',
              icon: 'Error',
              variant: 'success',
            },
          });
          this.getTicket(this.$route.params.ticket_id);
          this.files = [];
        })
        .finally(() => {
          this.shallShowEmailComposeModal = false;
          this.sendTicketLoading = false;
        });
    },
    uploadFile(file) {
      this.fileLoading = true;
      let formData = new FormData();
      formData.append('Title', file.name);
      formData.append('ServiceType', 'ticket');
      formData.append('IsPublic', true);
      formData.append('File', file);

      fileService
        .createFile(formData)
        .then(({ data }) => {
          file['id'] = data;
          this.files.push(file);
        })
        .finally(() => {
          this.fileLoading = false;
        });
    },
    deleteFile(id) {
      this.files = [...this.files.filter((p) => p.id !== id)];
      fileService.deleteFile({ id: id }).then(({ data }) => {});
    },
    getListCategory() {
      ticketService.getCategoryList().then(({ data }) => {
        this.categories = [...data];
      });
    },
    checkFalsy(str) {
      return str === null || str === undefined ? '' : str;
    },
  },
  mounted() {
    this.getListCategory();
  },
};
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-email.scss';
</style>
