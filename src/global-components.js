import Vue from 'vue';
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.use(VuePersianDatetimePicker, {
  name: 'date-picker',
  props: {
    format: 'YYYY-MM-DD',
    displayFormat: 'jYYYY-jMM-jDD',
    editable: false,
    inputClass: 'form-control',
    placeholder: '',
    altFormat: 'YYYY-MM-DD',
    color: '#242468',
    autoSubmit: true,
  },
});

Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VueCountdown.name, VueCountdown);
