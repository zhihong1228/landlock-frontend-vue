<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <account-setting-general
        v-if="user"
        :general-data="user"
      />
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="LockIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Change Password</span>
      </template>

      <account-setting-password />
    </b-tab>
    <!--/ change password tab -->

    <!-- info -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="FlagIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Address</span>
      </template>

      <account-setting-address
        v-if="user"
        :information-data="user"
      />
    </b-tab>

    <!-- social links -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="ClipboardIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Security Questions</span>
      </template>

      <account-setting-question-answer
        v-if="user"
        :social-data="user"
      />
    </b-tab>

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { mapState } from 'vuex'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingPassword from './AccountSettingPassword.vue'
import AccountSettingAddress from './AccountSettingAddress.vue'
import AccountSettingQuestionAnswer from './AccountSettingQuestionAnswer.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
    AccountSettingPassword,
    AccountSettingAddress,
    AccountSettingQuestionAnswer,
  },
  data() {
    return {
      options: {},
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  beforeCreate() {
    this.$http.get('/account-setting/data').then(res => { this.options = res.data })
  },

}
</script>
