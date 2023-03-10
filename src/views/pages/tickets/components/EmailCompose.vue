<template>
  <b-modal id="compose-mail" :visible="shallShowEmailComposeModal" title="Compose Email" modal-class="modal-sticky" footer-class="d-flex justify-content-between" body-class="p-0" size="lg" no-fade hide-backdrop static @change="(val) => $emit('update:shall-show-email-compose-modal', val)">
    <!-- Modal Header -->
    <template #modal-header>
      <div class="d-flex align-items-center">
        <h5 class="modal-title mb-0">{{ ticketTitle }}</h5>
        <span v-if="title">({{ title }})</span>
      </div>
      <div class="modal-actions">
        <feather-icon icon="XIcon" class="ml-1 cursor-pointer" @click="discardEmail" />
      </div>
    </template>

    <!-- Modal Footer -->
    <template #modal-footer>
      <!-- Footer: Left Content -->
      <div class="d-flex align-items-center">
        <b-button variant="primary" @click.prevent="sendTicket" class="d-flex align-items-center">
          <span> ارسال </span>
          <b-spinner v-if="ticketLoading" variant="white" class="mx-25" small></b-spinner>
        </b-button>
        <b-button variant="outline-primary" :disabled="fileLoading" @click.prevent="selectFile" class="d-flex align-items-center mx-1">
          <span> افزودن فایل </span>
          <b-spinner v-if="fileLoading" variant="primary" class="mx-25" small></b-spinner>
        </b-button>
        <input ref="fileInput" type="file" @change.prevent="createFile" hidden />
      </div>
    </template>

    <!-- Modal: Body -->
    <validation-observer ref="composeTicket" #default="{ invalid }">
      <b-form @submit.prevent>
        <div v-if="createMode" class="compose-mail-form-field justify-content-start">
          <label class="w-50" for="email-category">مشکل شما در کدام دسته بندی قرار دارد؟: </label>
          <v-select v-model="composeData.categoryId" placeholder="انتخاب دسته بندی" dir="rtl" :options="categories" :reduce="(val) => val.id" label="title" :clearable="false" input-id="email-category" class="w-50" />
        </div>
        <validation-provider #default="{ errors }" name="فیلد" rules="required">
          <div v-if="createMode" class="compose-mail-form-field">
            <label for="email-subject">موضوع: </label>
            <b-form-input id="email-subject" placeholder="موضوع را وارد نمایید" :state="errors.length > 0 ? false : null" name="nationalCode" v-model="composeData.subject" />
            <small class="text-danger">{{ errors[0] }}</small>
          </div>
        </validation-provider>
        <validation-provider #default="{ errors }" name="فیلد" rules="required">
          <div class="compose-mail-form-field border-bottom-0">
            <label for="email-text">متن پیام: </label>
            <b-form-textarea id="email-text" rows="5" placeholder="متن پیام را وارد نمایید" v-model="composeData.text" :state="errors.length > 0 ? false : null" />
            <small class="text-danger">{{ errors[0] }}</small>
          </div>
        </validation-provider>
        <div dir="ltr" class="d-flex flex-column align-items-start justify-content-between compose-mail-form-field w-100 mt-2">
          <div dir="ltr" v-for="(file, _i) in files" :key="`file-${_i}`" class="compose-file-field border text-right my-25 w-50">
            <span>{{ file.name }}({{ formatBytes(file.size) }})</span>
            <feather-icon @click.prevent="deleteFile(file.id)" icon="XIcon" class="ml-1 cursor-pointer" />
          </div>
        </div>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { BFormTextarea, BSpinner, BForm, BFormInput, BButton } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import vSelect from 'vue-select';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { required } from '@validations';
export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BForm,
    BFormInput,
    BFormTextarea,
    BButton,
    BSpinner,

    // 3rd Party
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  model: {
    prop: 'shallShowEmailComposeModal',
    event: 'update:shall-show-email-compose-modal',
  },
  data() {
    return {
      composeData: { subject: '', text: '', attachedFiles: [], categoryId: null },
      deletedFileId: null,
      required,
    };
  },
  props: {
    type: {
      type: String,
      default: 'create',
    },
    title: {
      type: String,
      default: null,
    },
    shallShowEmailComposeModal: {
      type: Boolean,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [
        {
          id: 0,
          title: 'مشکل',
        },
      ],
      required: true,
    },
    files: {
      type: Array,
      default: () => [],
    },
    ticketLoading: {
      type: Boolean,
      default: false,
    },
    fileLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ticketTitle() {
      return this.type === 'edit' ? 'ارسال پیام جدید در تیکت' : 'تیکت جدید';
    },
    createMode() {
      return this.type === 'create';
    },
  },
  methods: {
    sendTicket() {
      this.$refs.composeTicket.validate().then((success) => {
        if (success) {
          if (this.files.length) {
            this.composeData.attachedFiles = [...this.files.map((f) => f.id)];
          }
          if (this.createMode) {
            this.$emit('sendTicket', this.composeData);
          } else {
            let editComposeData = {
              attachedFiles: this.composeData.attachedFiles,
              text: this.composeData.text,
            };
            this.$emit('sendTicket', editComposeData);
          }
          this.composeData = { subject: '', text: '', attachedFiles: [], categoryId: null };
        }
      });
    },
    selectFile() {
      this.$refs['fileInput'].click();
    },
    createFile(evt) {
      this.$emit('createFile', evt.target.files[0]);
    },
    discardEmail() {
      this.composeData = { subject: '', text: '', attachedFiles: [], categoryId: null };
      this.$emit('update:shall-show-email-compose-modal', false);
    },
    deleteFile(id) {
      this.$emit('deleteFile', id);
    },
    formatBytes(a, b = 2) {
      if (!+a) return '0 Bytes';
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
      return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/quill.scss';
</style>

<style lang="scss" scoped>
form ::v-deep {
  // Mail To vue-select style
  .v-select {
    .vs__dropdown-toggle {
      border: 0;
      box-shadow: none;
    }
    .vs__open-indicator {
      display: none;
    }
  }

  // Quill Editor Style
  .quill-editor {
    .ql-container.ql-snow {
      border-bottom: 0 !important;
    }
  }
}
.compose-file-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
</style>
