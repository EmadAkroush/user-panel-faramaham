<template>
  <div>
    <b-row class="match-height">
      <b-col lg="4" md="12">
        <walletCard increaseStatus :count="walletPrice.toLocaleString('fa-IR')" />
      </b-col>
      <b-col lg="4">
        <b-card class="card-congratulation-medal">
          <h5>۱۷۸ امتیاز دیگر تا برتری این ماه</h5>
          <b-card-text class="font-small-3 w-75"> با انجام هر تراکنش در آنتایم امتیاز دریافت کنید </b-card-text>
          <h3 class="mb-75 mt-2 pt-50">
            <!-- <b-link>${{ kFormatter(data.saleToday) }}</b-link> -->
          </h3>
          <div class="d-flex align-items-center justify-content-between mt-3">
            <div>
              <span>امتیاز شما</span>
              <div class="d-flex align-items-center">
                <feather-icon size="28" icon="StarIcon" class="icon-gold" />
                <h3 class="text-primary mb-0">{{ userScore.totalScore }}</h3>
              </div>
            </div>
            <b-button to="/score-club" variant="primary"> باشگاه امتیاز </b-button>
          </div>
          <b-img :src="require('@/assets/images/illustration/badge.svg')" class="congratulation-medal" alt="Medal Pic" />
        </b-card>
      </b-col>
      <b-col lg="2" md="2" cols="6">
        <ecommerce-profit-chart title="هر انس طلا امروز" label="۲۴۵۰۰۰ تومان" :data="statisticsProfit" />
      </b-col>
      <b-col lg="2" md="2" cols="6">
        <ecommerce-profit-chart title="دلار نیمایی" label="۲۴۵۰۰۰ تومان" :data="statisticsProfit" />
      </b-col>
    </b-row>
    <b-row>
      <!-- Services -->
      <b-col md="6">
        <b-card v-for="(item, index) in homeItems" :key="index" class="card" body-class="h-100">
          <h3>{{ item.title }}</h3>
          <b-row>
            <b-col v-for="(service, _i) in item.items" :key="`service-${_i}`" md="5" lg="4">
              <b-button variant="white" :to="service.route" class="d-flex align-items-center px-0">
                <span class="d-inline-block p-50 rounded-sm" :style="{ backgroundColor: service.color }">
                  <feather-icon size="24" :icon="service.icon" :style="{ stroke: service.iconColor, color: service.iconColor }" />
                </span>
                <span class="text-primary ml-50">{{ service.title }}</span>
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <!-- Last transactions -->
      <b-col md="6">
        <b-card class="card" body-class="h-100">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <h4 class="mb-0">تراکنش‌های اخیر</h4>
              <span>(ریال)</span>
            </div>
            <b-button to="/" variant="white"> مشاهده کامل </b-button>
          </div>
          <div v-if="transactionList.length">
            <div v-for="(transaction, index) in transactionList" :key="`transact-${index}`" class="d-flex align-items-center justify-content-between mt-2">
              <div>{{ transaction.description }}</div>
              <div>{{ transaction.amount }}</div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BCardText, BLink, BRow, BCol, BButton, BImg } from 'bootstrap-vue';
import EcommerceProfitChart from '@/@core/components/home-components/EcommerceProfitChart.vue';
import { paymentService, scoreService } from '@/@core/services';
import walletCard from '@core/components/wallet-card/index.vue';
export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BRow,
    BCol,
    BButton,
    BImg,
    walletCard,
    EcommerceProfitChart,
  },
  data() {
    return {
      statisticsProfit: {
        series: [
          {
            data: [0, 20, 5, 30, 15, 45],
          },
        ],
      },
      userScore: {
        currentScore: 0,
        latestScoreIncreaseDate: '',
        totalScore: 0,
      },
      transactionFilter: {
        pageIndex: 1,
        pageSize: 10,
      },
      transactionList: [],
      walletPrice: 0,
      homeItems: [
        {
          title: 'کاربردی ترین‌ها',
          items: [
            {
              title: 'کارت به کارت',
              route: '/',
              icon: 'CreditCardIcon',
              color: 'rgba(255, 107, 0, 0.12)',
              iconColor: '#FF6B00',
            },
            {
              title: 'خرید شارژ سیم‌کارت',
              route: '/',
              icon: 'FileTextIcon',
              color: 'rgba(255, 107, 0, 0.12)',
              iconColor: '#FF6B00',
            },
          ],
        },
      ],
    };
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
    getUserScore() {
      scoreService.getUserScore().then(({ data }) => {
        this.userScore = { ...data };
      });
    },
  },
  mounted() {
    this.getTransactionList();
    this.getBalance();
    this.getUserScore();
  },
};
</script>
<style lang="scss">
.bg-shadowed {
  background: rgba(126, 130, 187, 0.42) !important;
}
.match-height {
  min-height: 35vh;
}

.icon-gold {
  fill: #ffb800;
  color: #ffb800;
}
</style>
