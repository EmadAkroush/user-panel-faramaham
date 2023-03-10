<template>
  <b-card text-variant="center" class="card card-congratulations" body-class="d-flex flex-column justify-content-between h-100">
    <img :src="require('@/assets/images/elements/decore-right.png')" class="congratulations-img-left" />
    <div class="d-flex justify-content-start align-items-center">
      <img :src="require('@/assets/images/logo/logo-white.png')" class="mr-1" />
      <h2 class="text-white mb-0">آن‌تایم کارت</h2>
    </div>
    <div class="d-flex" :class="handleClass">
      <b-button v-if="increaseStatus" to="" class="bg-shadowed rounded-sm d-flex align-items-center border-0">
        <feather-icon size="28" icon="PlusCircleIcon" />
        <span>افزایش موجودی</span>
      </b-button>
      <div v-if="count" class="d-flex flex-column">
        <div class="text-right">موجودی کیف پول</div>
        <div class="d-flex align-items-center mt-1">
          <span class="mx-1">ریال</span>
          <h1 class="text-white mb-0">{{ count }}</h1>
        </div>
      </div>
    </div>
  </b-card>
</template>
<script>
import { BCard, BButton } from 'bootstrap-vue';
export default {
  props: {
    count: {
      type: String | Number,
      default: null,
    },
    increaseStatus: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BCard,
    BButton,
  },
  computed: {
    handleClass() {
      return this.increaseStatus ? 'justify-content-between' : 'justify-content-end';
    },
  },
};
</script>
