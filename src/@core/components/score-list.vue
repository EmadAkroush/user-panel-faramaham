<template>
  <b-card no-body class="mb-0 rounded-lg overflow-hidden">
    <b-card-header class="d-flex justify-content-between align-items-center bg-primary">
      <div v-for="(user, index) in topUsers" :key="`top-${index}`" class="top-leader">
        <div class="d-flex flex-column align-items-center">
          <b-img img-fluid :src="cupImg(index)"></b-img>
          <h5 class="mt-75 text-white font-weight-bold text-center">{{ user.fullName ? user.fullName : '' }}</h5>
        </div>
      </div>
    </b-card-header>
    <b-card-body id="nav-scroller" ref="content" class="scrollable-list p-0">
      <div v-for="(item, index) in items" :class="selectedClass(item)" :index="`user-${item.id}`" class="d-flex justify-content-between my-2" v-b-scrollspy:nav-scroller>
        <div class="d-flex align-items-center">
          <span :class="indexClass(index)" class="text-white px-75 py-25 rounded-bottom-right">{{ index + 1 }}</span>
          <span class="mx-25">{{ item.fullName }}</span>
        </div>
        <div class="d-flex align-items-center">
          <h3 class="text-primary mb-0">{{ item.totalScore }}</h3>
          <feather-icon size="28" icon="StarIcon" class="icon-gold" />
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import { BCard, BCardHeader, BCardBody, BTable, BImg } from 'bootstrap-vue';
import { VBScrollspy } from 'bootstrap-vue';
export default {
  name: 'score-list',
  props: {
    items: {
      type: Array,
      Default: () => [],
    },
    selected: {
      type: String,
      default: null,
    },
  },
  directives: {
    'b-scrollspy': VBScrollspy,
  },
  components: {
    BCard,
    BCardBody,
    BImg,
    BTable,
    BCardHeader,
  },
  computed: {
    selectedClass() {
      return (item) => (item.id === this.selected ? 'fixed-item bg-primary rounded-sm px-50 py-1' : false);
    },
    topUsers() {
      this.topThreeItems.push(this.items[1] || null);
      this.topThreeItems.push(this.items[0] || null);
      this.topThreeItems.push(this.items[2] || null);
      //   console.log(this.topThreeItems);
      //   debugger;
      return this.topThreeItems;
    },
    indexClass() {
      return (index) => (index === 0 ? 'bg-golden' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-bronze' : 'bg-primary-light');
    },
  },
  data() {
    return {
      topThreeItems: [],
      cupImages: [require('@/assets/images/illustration/cup2.png'), require('@/assets/images/illustration/cup1.png'), require('@/assets/images/illustration/cup3.png')],
    };
  },
  methods: {
    scrollIntoView(event) {
      debugger;
      event.preventDefault();
      const href = event.target.getAttribute('href');
      const el = href ? document.querySelector(href) : null;
      if (el) {
        this.$refs.content.scrollTop = el.offsetTop;
      }
    },
    cupImg(index) {
      return this.cupImages[index] || '';
    },
  },
};
</script>
<style lang="scss">
.scrollable-list {
  position: relative;
  height: 50vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}
.fixed-item {
  position: sticky;
  bottom: 0;
  left: 0;
  margin: 0 !important;
  transition: all 1.5s ease-in-out;
  & * {
    color: white !important ;
  }
  //   background-color: ;
}
.rounded-bottom-right {
  border-radius: 0.5rem 0.5rem 0.5rem 0;
}
.top-leader {
  width: calc(100% / 3);
}
</style>
