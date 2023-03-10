<template>
  <b-card v-if="data" class="card-tiny-line-stats" body-class="d-flex flex-column justify-content-between pb-50">
    <h4 class="font-weight-bolder mb-1">{{ title }}</h4>
    <h6>{{ label }}</h6>
    <!-- chart -->
    <vue-apex-charts height="70" :options="statisticsProfit.chartOptions" :series="data.series" />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue';
import VueApexCharts from 'vue-apexcharts';
import { $themeColors } from '@themeConfig';

const $trackBgColor = '#EBEBEB';

export default {
  components: {
    BCard,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    color: {
      type: String,
      default: () => $trackBgColor,
    },
    title: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      statisticsProfit: {
        chartOptions: {
          chart: {
            type: 'line',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.success],
          markers: {
            size: 2,
            colors: $themeColors.success,
            strokeColors: $themeColors.success,
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: '#ffffff',
                strokeColor: $themeColors.success,
                size: 5,
              },
            ],
            shape: 'circle',
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: '0px',
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
    };
  },
};
</script>
