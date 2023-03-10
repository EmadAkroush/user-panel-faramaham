<template>
  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <b-avatar size="40" :src="userInfo.avatar" variant="light-primary">
        <feather-icon v-if="!userInfo.firstName" icon="UserIcon" size="22" />
      </b-avatar>
      <div class="d-sm-flex flex-row align-items-center d-none user-nav">
        <div>
          <div class="user-status w-100">خوش آمدید</div>
          <p class="user-name font-weight-bolder mb-0">
            {{ getUserFullName }}
          </p>
        </div>
        <feather-icon icon="ChevronDownIcon" size="24" class="mx-1" />
      </div>
    </template>

    <b-dropdown-item :to="{ name: 'profile-specs' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="UserIcon" class="mr-50" />
      <span>پروفایل</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'profile-score-club' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="AwardIcon" class="mr-50" />
      <span>باشگاه امتیاز ها</span>
    </b-dropdown-item>
    <!-- <b-dropdown-item :to="{ name: 'apps-todo' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
      <span>Task</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'apps-chat' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="MessageSquareIcon" class="mr-50" />
      <span>Chat</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item :to="{ name: 'pages-account-setting' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="SettingsIcon" class="mr-50" />
      <span>Settings</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-pricing' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="CreditCardIcon" class="mr-50" />
      <span>Pricing</span>
    </b-dropdown-item>
    <b-dropdown-item :to="{ name: 'pages-faq' }" link-class="d-flex align-items-center">
      <feather-icon size="16" icon="HelpCircleIcon" class="mr-50" />
      <span>FAQ</span>
    </b-dropdown-item> -->
    <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
      <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
      <span>خروج</span>
    </b-dropdown-item></b-nav-item-dropdown
  >
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar } from 'bootstrap-vue';
import { initialAbility } from '@/libs/acl/config';
import { avatarText } from '@core/utils/filter';
import { mapGetters } from 'vuex';
export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      avatarText,
      // birthDate: '2010-12-26',
      // city: null,
      // email: null,
      // firstName: 'عرفان',
      // gender: null,
      // id: '98a100b3-3dd6-450a-b9a3-e4e328a98865',
      // lastName: 'لشگری',
      // nationalCode: null,
      // phoneNumber: '09336292512',
      // province: null,
      // referralCode: 'WQYL54968189',
      // referralUser: null,
      // shabaNumber: null,
    };
  },
  computed: {
    getUserFullName() {
      if (!this.userInfo.firstName && !this.userInfo.lastName) return 'کاربر عزیز';
      return this.checkFalsy(this.userInfo.firstName) + ' ' + this.checkFalsy(this.userInfo.lastName);
    },
    ...mapGetters('auth', {
      userInfo: 'GET_USER',
    }),
  },
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push('/login');
      });
    },
    checkFalsy(str) {
      return str === null || str === undefined ? '' : str;
    },
  },
};
</script>
