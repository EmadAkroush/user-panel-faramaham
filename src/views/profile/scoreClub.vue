<template>
  <b-row>
    <b-col md="6">
      <b-card v-if="leaderBoardItems.length">
        <score-list :selected="user.id" :items="leaderBoardItems" />
      </b-card>
    </b-col>
    <b-col md="6">
      <b-row>
        <b-col md="4">
          <b-card class="card" body-class="d-flex flex-column align-items-center justify-content-between h-100">
            <b-img size="45" :src="require('@/assets/images/avatars/default.png')"></b-img>
            <h3 class="my-1">امتیاز شما</h3>
            <div v-if="userScore.totalScore" class="d-flex align-items-center">
              <feather-icon size="28" icon="StarIcon" class="icon-gold" />
              <h3 class="text-primary mb-0">{{ userScore.totalScore }}</h3>
            </div>
          </b-card>
        </b-col>
        <b-col md="8">
          <b-card class="card-score-box">
            <div class="card-score-content">
              <h5>۱۷۸ امتیاز دیگر تا برتری این ماه</h5>
              <b-card-text class="font-small-3 w-50"> با انجام هر تراکنش در آنتایم امتیاز دریافت کنید </b-card-text>
              <h3 class="mb-75 mt-2 pt-50"></h3>
            </div>
            <b-img :src="require('@/assets/images/illustration/score-club.png')" class="score-image" alt="Medal Pic" />
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="card" body-class="h-100">
            <div class="d-flex flex-column justify-content-between">
              <h4 class="mb-2">تاریخچه امتیازات شما</h4>
              <b-table v-if="historyItems.length" responsive="sm" :fields="fields" :items="historyItems">
                <template #cell(reason)="data"> {{ data.item.reason }} </template>
                <template #cell(date)="data"> {{ convertDateToPersian(data.item.date) }} </template>

                <template #cell()="data">
                  <feather-icon size="28" icon="StarIcon" class="icon-gold" />
                  <span>{{ data.item.count }}</span>
                </template>
              </b-table>
              <div v-else class="text-center">تاریخچه ای ندارید</div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { BCard, BCardText, BLink, BRow, BCol, BButton, BTable, BImg, BAvatar } from 'bootstrap-vue';
import scoreList from '@core/components/score-list.vue';
import { scoreService } from '@/@core/services';
export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BRow,
    BCol,
    BButton,
    BImg,
    BAvatar,
    BTable,
    'score-list': scoreList,
  },
  data() {
    return {
      userHistoryFilters: {
        pageIndex: 1,
        pageSize: 10,
      },
      userScore: {
        currentScore: 0,
        latestScoreIncreaseDate: '',
        totalScore: 0,
      },
      fields: [
        {
          key: 'reason',
          label: 'دلیل',
        },
        {
          key: 'date',
          label: 'تاریخ',
        },
        {
          key: 'count',
          label: 'تعداد',
        },
      ],
      historyItems: [],
      leaderBoardItems: [],
      user: {},
    };
  },
  computed: {
    convertDateToPersian() {
      return (date) => new Date(date).toLocaleDateString('fa-IR');
    },
  },
  methods: {
    getUserScore() {
      scoreService.getUserScore().then(({ data }) => {
        this.userScore = { ...data };
      });
    },
    getUserScoreHistory() {
      scoreService.getUserHistory({ ...this.userHistoryFilters }).then(({ data }) => {
        this.historyItems = [...data.data];
      });
    },
    getLeaderBoard() {
      scoreService.getLeaderBoard().then(({ data }) => {
        this.leaderBoardItems = [...data.message.topUsers];
        this.user = { ...data.message.user };
      });
    },
  },
  mounted() {
    this.getUserScoreHistory();
    this.getUserScore();
    this.getLeaderBoard();
  },
};
</script>
<style>
.icon-gold {
  fill: #ffb800;
  color: #ffb800;
}
</style>
