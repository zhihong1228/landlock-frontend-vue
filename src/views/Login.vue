<template>
  <div class="auth-wrapper auth-v2">
    <b-link class="brand-logo">
      <img :src="appLogoImage">
    </b-link>
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <!-- /Brand logo-->

      <!-- Login-->
      <div class="d-flex flex-column align-items-center justify-content-center w-100">
        <h4>Logging you in... Please wait!</h4>
        <b-spinner
          style="width: 3rem; height: 3rem"
          variant="primary"
        />
      </div>

      <!-- /Login-->
    </b-row>

    <b-modal
      v-model="showVerifyEmailModal"
      centered
      content-class="custom-modal"
      title="Verify Your Email"
    >
      <div
        slot="modal-header"
        class="p-0 m-0"
      />
      <div class="d-flex align-items-center justify-content-center flex-column">
        <div class="d-flex align-items-center justify-content-center dZqZTc mt-5">
          <svg
            aria-hidden="true"
            class="Circle-sc-44hwb2-0 ConfirmEmail__Spinner-sc-8qtjpe-6 cRneZt"
            focusable="false"
            height="160"
            role="none"
            width="160"
          >
            <circle
              cx="80"
              cy="80"
              fill="rgba(0,0,0,0)"
              r="75"
              stroke="var(--primary)"
              stroke-dasharray="471.23889803846896 471.23889803846896"
              stroke-width="2.5"
              width="160"
            />
          </svg>
          <svg
            aria-hidden="true"
            class="ConfirmEmail__VerifyImage-sc-8qtjpe-2 gTxrkU"
            focusable="false"
            height="49"
            role="none"
            viewBox="0 0 67 49"
            width="67"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="var(--primary)"
              stroke-linecap="square"
              stroke-width="2.4"
            >
              <path d="M9.997 10.309l22.937 18.246 22.938-18.246" />
              <path
                d="M2 6.09v36.82C2 45.167 3.88 47 6.2 47h54.6c2.32 0 4.2-1.832 4.2-4.09V6.09C65 3.833 63.12 2 60.8 2H6.2C3.88 2 2 3.832 2 6.09zm7.997 30.574l8.34-10.137m37.535 10.137l-8.34-10.137"
              />
            </g>
          </svg>
        </div>
        <h5 class="mx-3 mb-5 mt-2 text-center">We sent a verification email to <b v-if="user">{{ user.email }}</b>. Click the link
          inside to
          get
          started!</h5>
      </div>

      <div
        slot="modal-footer"
        class="d-block my-1 w-100"
      >
        <div
          class="text-nowrap d-flex justify-content-center align-items-center w-100 cursor-pointer text-primary"
          @click="resendEmail"
        >
          <h5
            class="mb-0 mr-1"
          >
            <span class="text-primary">Email didn't arrive?</span>
          </h5>
          <b-spinner
            v-if="resendingEmail"
            style="width: 20px;height: 20px"
          />
          <feather-icon
            v-else
            icon="ChevronsRightIcon"
            size="20"
            style="opacity: 0"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BLink, BModal, BRow, BSpinner, VBModal,
} from 'bootstrap-vue'
import { email, required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapMutations, mapState, mapActions } from 'vuex'
import Ripple from 'vue-ripple-directive'
import { $themeConfig } from '@themeConfig'
import AuthService from '../services/AuthService'
import { errMessage } from '../utils/errMessage'

export default {
  components: {
    BRow,
    BSpinner,
    BLink,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      resendingEmail: false,
      showVerifyEmailModal: false,
      status: '',
      password: '',
      userEmail: '',
      // validation rulesimport store from '@/store/index'
      required,
      email,
      int: undefined,
      token: null,
      isConfirmed: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    appLogoImage() {
      return $themeConfig.app.appLogoImage
    },
  },
  created() {
    this.token = this.$route.query.key
    if (this.$route.query.key !== undefined) {
      localStorage.setItem('token', this.token)
    }
    this.int = setInterval(() => {
      // console.log(localStorage.getItem('gettingUserData'))
      // if (localStorage.getItem('gettingUserData') === 'no') {
      // const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      // this.updateUser(userData)
      AuthService.getUser()
        .then(response => {
          console.log("login created: ", response.data.userData?.user?.firstName)
          this.updateUser(response.data.userData.user)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Welcome ${response.data.userData?.user?.firstName}`,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.verify()
        })
        .catch(error => {
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'CheckIcon',
              variant: 'warning',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        })

      clearInterval(this.int)
      // }
    }, 1200)
  },
  beforeDestroy() {
    if (this.int) clearInterval(this.int)
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    ...mapActions({
      toggleLogin: 'user/toggleLogin',
    }),
    async resendEmail() {
      this.resendingEmail = true
      let response
      try {
        const { data } = await this.$http.get('/auth/resendMail')
        response = data
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Email resent Successfully',
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
      } catch (e) {
        this.messageEr = errMessage(e)
        this.$toast({
          component: ToastificationContent,
          props: {
            title: e.message,
            icon: 'AlertTriangeIcon',
            variant: 'error',
          },
        })
      } finally {
        this.resendingEmail = false
      }
      return response
    },
    async isConfirmedEM() {
      let isconf
      try {
        const response = await AuthService.isConfirmed()
          .catch(error => {
            this.messageEr = errMessage(error)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'CheckIcon',
                variant: 'warning',
                text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
              },
            })
          })

        console.log(response)
        isconf = response.data.data
      } catch (e) {
        this.verifying = false
        this.$toast({
          component: ToastificationContent,
          props: {
            title: e.message,
            icon: 'AlertTriangeIcon',
            variant: 'error',
          },
        })
      }
      return isconf
    },
    async verify() {
      console.log("login: verify log:")
      // console.log('comfirming', this.isConfirmed, this.isConfirmedEM())
      /* const confirmed = await this.isConfirmedEM()
      // console.log('confirmed', confirmed)
      if (!confirmed.confirmedEmail) {
        this.showVerifyEmailModal = true
      } else if (!confirmed.confirmedMobile) this.toggleLogin()
      else */
       this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.dZqZTc {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: row;
  height: 160px;
  width: 160px;
  margin-bottom: 32px;
}
.gTxrkU {
  position: absolute;
  width: 63px;
  height: 63px;
}

</style>
<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
