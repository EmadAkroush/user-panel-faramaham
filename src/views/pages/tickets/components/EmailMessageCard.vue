<template>
  <b-card :class="{ 'support-box': !message.fromSupport }" no-body class="my-1">
    <b-card-header class="email-detail-head">
      <div class="user-details d-flex justify-content-between align-items-center flex-wrap w-100">
        <div class="d-flex align-items-center">
          <b-avatar class="avatar" size="40" variant="primary" :src="require('@/assets/images/avatars/user.png')" />
          <h5 class="mb-0 mx-25">
            {{ message.userName }}
          </h5>
        </div>
        <div>
          {{ new Date(message.createdAt).toLocaleDateString('fa-IR') }}
        </div>
      </div>
    </b-card-header>

    <b-card-body class="mail-message-wrapper pt-2">
      <!-- eslint-disable vue/no-v-html -->
      <div class="mail-message" v-text="message.text" />
      <!-- eslint-enable -->
    </b-card-body>

    <b-card-footer v-if="message.attachedFiles.length">
      <div class="mail-attachments">
        <div class="d-flex align-items-center mb-1">
          <feather-icon icon="PaperclipIcon" size="16" />
          <h5 class="font-weight-bolder text-body mb-0 ml-50">{{ message.attachedFiles.length }} پیوست{{ message.attachedFiles.length > 1 ? 's' : '' }}</h5>
        </div>

        <div class="d-flex flex-column">
          <div v-for="(attachment, index) in message.attachedFiles" :key="index" :class="{ 'mt-75': index }" class="attachment-link bg-primary-accent py-50 px-1 rounded-pill">
            <b-link :href="attachment" download target="_blank">
              <!-- <b-img :src="attachment.thumbnail" width="16px" class="mr-50" /> -->
              <span class="text-muted font-weight-bolder align-text-top">فایل {{ index + 1 }}</span>
              <feather-icon icon="ArrowDownCircleIcon" size="16" class="ml-75" />
            </b-link>
          </div>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>
import { BDropdown, BDropdownItem, BCard, BCardHeader, BCardBody, BCardFooter, BAvatar, BLink, BImg } from 'bootstrap-vue';
import { formatDate } from '@core/utils/filter';

export default {
  components: {
    BDropdown,
    BDropdownItem,
    BCard,
    BCardHeader,
    BCardBody,
    BCardFooter,
    BAvatar,
    BLink,
    BImg,
  },
  props: {
    message: {
      type: Object,
      default: () => ({
        fromSupport: false,
        userName: '',
        supportJob: '',
        text: '',
        attachedFiles: [],
        createdAt: '',
      }),
      required: true,
    },
  },
  setup() {
    return {
      formatDate,
    };
  },
};
</script>

<style lang="scss">
.support-box {
  background-color: #4a3594;
  & * {
    color: #ffffff !important;
  }
}
.attachment-link {
  width: fit-content;
}
</style>
