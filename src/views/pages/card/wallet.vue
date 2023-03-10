<template>
  <b-row class="justify-content-center">
    <b-col md="4">
      <b-row class="justify-content-center">
        <b-col sm="12">
          <walletCard :count="walletPrice.toLocaleString('fa-IR')" />
        </b-col>
        <b-col sm="12">
          <b-card>
            <b-card-text class="h3 font-weight-bolder text-primary">افزایش موجودی کیف پول</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="8">
      <b-row class="justify-content-center">
        <b-col sm="12">
          <b-card>
            <b-card-body class="p-0">
              <b-card-text class="h3 font-weight-bolder text-primary">تراکنش‌های کیف پول</b-card-text>
              <b-table v-if="transactionList.length" responsive="sm" :fields="fields" :items="transactionList">
                <template #cell(description)="data"> {{ data.item.description }} </template>
                <template #cell(createdAt)="data"> {{ new Date(data.item.createdAt).toLocaleDateString('fa-IR') }} </template>
                <template #cell(trackingNumber)="data"> {{ data.item.trackingNumber }} </template>
                <template #cell(status)="data">
                  <b-badge :variant="getTicketStatus(data.item.status, 'color')" class="badge-glow">{{ getTicketStatus(data.item.status, 'text') }}</b-badge>
                </template>
                <template #cell(amount)="data"> {{ data.item.amount.toLocaleString('fa-IR') }} </template>
                <template #cell(operation)="data">
                  <div class="d-flex align-items-center justify-content-center">
                    <feather-icon size="24" icon="ArrowLeftCircleIcon" />
                  </div>
                </template>
              </b-table>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BButton, BTable, BImg, BCard, BCardText, BAvatar, BSpinner, BCardBody, BInputGroup, BFormInput, BInputGroupAppend, BInputGroupPrepend, BBadge } from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import walletCard from '@core/components/wallet-card/index.vue';
import { paymentService } from '@/@core/services';
export default {
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
    walletCard,
    BBadge,
  },
  data() {
    return {
      transactionList: [],
      walletPrice: 0,
      transactionFilter: {
        pageIndex: 1,
        pageSize: 10,
      },
      statuses: {
        0: {
          text: 'ناموفق',
          color: 'danger',
        },
        1: {
          text: 'موفق',
          color: 'success',
        },
      },
      fields: [
        {
          key: 'description',
          label: 'نوع تراکنش',
        },
        {
          key: 'createdAt',
          label: 'تاریخ',
        },
        {
          key: 'trackingNumber',
          label: 'شماره ارجاع',
        },
        {
          key: 'status',
          label: 'وضعیت',
        },
        {
          key: 'amount',
          label: 'مبلغ',
        },
        {
          key: 'operation',
          label: 'عملیات',
        },
      ],
    };
  },
  computed: {
    getTicketStatus() {
      return (status, param = 'text') => this.statuses[status][param];
    },
  },
  methods: {
    getTransactionList() {
      paymentService.getTransactionList({ ...this.transactionFilter }).then(({ data }) => {
        this.transactionList = [...data.data];
      });
    },
    getBalance() {
      paymentService.getBalance().then(({ data }) => {
        this.walletPrice = data.value;
      });
    },
  },
  mounted() {
    this.getTransactionList();
    this.getBalance();
  },
};
</script>
<style lang="scss">
.conversation-img {
  width: 24rem;
  height: 16rem;
  align-self: center;
}
</style>
