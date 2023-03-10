<template>
  <div class="email-application">
    <div class="content-area-wrapper w-100">
      <div class="email-app-list w-100 h-100">
        <div class="app-fixed-search d-flex align-items-center">
          <!-- Searchbar -->
          <div class="d-flex align-content-center justify-content-between w-100">
            <b-input-group class="input-group-merge">
              <b-input-group-prepend is-text>
                <feather-icon icon="SearchIcon" class="text-muted" />
              </b-input-group-prepend>
              <b-form-input class="h-100 rounded-0" :value="searchQuery" placeholder="جستجو عنوان" @input="updateRouteQuery" />
            </b-input-group>
            <b-button variant="primary" @click.prevent="shallShowEmailComposeModal = true" class="rounded-0 d-flex align-items-center">
              <span> ارسال تیکت جدید </span>
              <feather-icon icon="PlusCircleIcon" class="text-muted mx-25" />
            </b-button>
          </div>
        </div>
        <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="email-user-list scroll-area w-100 h-100">
          <ul v-if="tickets.length" class="email-media-list">
            <b-media v-for="ticket in tickets" :key="ticket.id" tag="li" no-body :class="{ 'mail-read': ticket.status === 1 }" @click="updateTicketsViewData(ticket.id)">
              <b-media-aside class="media-left mr-50">
                <b-avatar class="avatar" size="40" variant="primary" :src="require('@/assets/images/avatars/user.png')" />
              </b-media-aside>

              <b-media-body>
                <div class="mail-details">
                  <div class="mail-items">
                    <h5 class="mb-25 font-weight-bold">
                      {{ ticket.subject }}
                    </h5>
                  </div>
                  <div class="mail-meta-item">
                    <span class="mail-date">{{ convertDateToPersian(ticket.createdAt) }}</span>
                  </div>
                </div>

                <div class="mail-message">
                  <p class="text-truncate mb-0">
                    {{ ticket.text }}
                  </p>
                </div>
                <div class="mail-message d-flex align-items-center justify-content-between mt-50">
                  <p class="text-truncate mb-0">
                    <span class="text-primary">دسته بندی:‌ </span>
                    {{ ticket.category.title }}
                  </p>
                  <b-badge :variant="getTicketStatus(ticket.status, 'color')" class="badge-glow">{{ getTicketStatus(ticket.status, 'text') }}</b-badge>
                </div>
              </b-media-body>
            </b-media>
          </ul>
          <div v-if="!tickets.length" class="no-results">
            <h5>تیکتی موجود نیست</h5>
          </div>
        </vue-perfect-scrollbar>
        <!-- </div> -->
      </div>
    </div>
    <div class="d-flex justify-content-center my-75">
      <b-pagination v-model="filters.pageIndex" hide-goto-end-buttons :total-rows="filters.totalCount" />
    </div>
    <email-compose :ticketLoading="sendTicketLoading" @sendTicket="sendMessage" :categories="categories" :fileLoading="fileLoading" @createFile="uploadFile" @deleteFile="deleteFile" :files="files" v-model="shallShowEmailComposeModal" />
  </div>
</template>
<script>
import { BFormInput, BInputGroup, BPagination, BBadge, BInputGroupPrepend, BDropdown, BDropdownItem, BButton, BMedia, BMediaAside, BMediaBody, BAvatar } from 'bootstrap-vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { fileService, ticketService } from '@core/services';
import EmailCompose from './components/EmailCompose.vue';
export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BButton,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BBadge,
    BPagination,
    VuePerfectScrollbar,
    EmailCompose,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 150,
      },
      tickets: [],
      filters: {
        from: '',
        to: '',
        status: '',
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
      searchQuery: '',
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
  computed: {
    convertDateToPersian() {
      return (date) => new Date(date).toLocaleDateString('fa-IR');
    },
    getTicketStatus() {
      return (status, param = 'text') => this.statuses[status][param];
    },
  },
  methods: {
    getListTickets() {
      ticketService.getTickets(this.filters).then(({ data }) => {
        this.tickets = [...data.data];
        this.filters.totalCount = data.totalCount;
        // debugger;
      });
    },
    getListCategory() {
      ticketService.getCategoryList().then(({ data }) => {
        this.categories = [...data];
      });
    },
    updateRouteQuery(val) {
      const currentRouteQuery = JSON.parse(JSON.stringify(this.$route.query));
      if (val) currentRouteQuery.q = val;
      else delete currentRouteQuery.q;

      this.$router.replace({ name: this.$route.name, query: currentRouteQuery });
    },
    sendMessage(newTicket) {
      this.sendTicketLoading = true;
      ticketService
        .createTicket(newTicket)
        .then(({ data }) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'عملیات با موفقیت انجام شد',
              icon: 'Error',
              variant: 'success',
            },
          });
          this.getListTickets();
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
    updateTicketsViewData(ticketId) {
      this.$router.push({
        name: 'ticket-view-page',
        params: {
          ticket_id: ticketId,
        },
      });
    },
  },
  mounted() {
    this.getListCategory();
    this.getListTickets();
  },
};
</script>
<style lang="scss">
@import '~@core/scss/base/pages/app-email.scss';
</style>
