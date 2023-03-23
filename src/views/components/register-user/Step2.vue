<template>
  <div style="min-width: 400px;">
    <validation-observer
      ref="step2Rules"
      tag="form"
    >
      <span
        v-if="!user"
        class="center-loading spinner-border spinner-border-sm"
      />
      <template v-else>
        <b-row class="d-flex justify-content-center">
          <h1
            class="login-heading mb-3 f-medium"
            style="font-size: 32px; text-align: center;"
          >
            Email Confirmation
          </h1>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <h1
            class="login-heading mb-3 f-medium"
            style="font-size: 24px; text-align: center; color: #3B3B3B;"
          >
            Please enter the one-time password (OTP) sent to your email address
          </h1>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <validation-provider
            #default="{ errors }"
            name="OTP code"
            rules="required"
          >
            <b-form-input
              id="name"
              v-model="code"
              :state="errors.length > 0 ? false:null"
              placeholder="OTP"
              class="form-input"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-row>
      </template>
    </validation-observer>
    <div class="d-flex flex-column">
      <b-button
        size="lg"
        variant="primary"
        class="mt-2 mb-1 float-right form-btn"
        @click="() => handleEmit()"
      >
        <span class="mr-1">Confirm</span>
        <b-spinner
          v-if="verifying"
          style="width: 17px; height: 17px"
        />
      </b-button>
      <b-button
        size="lg"
        class=" mb-0 float-right form-btn"
        @click="resendEmail"
      >
        <span class="mr-1 text-primary f-medium" style="font-size: 14px;">Resend code</span>
        <b-spinner
          v-if="verifying"
          style="width: 17px; height: 17px"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BRow,
  BImg,
  BSpinner,
  BFormInput,
  BButton
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
import { mapMutations, mapState } from 'vuex'
// import PropertyService from '@/services/PropertyService'
import AuthService from '../../../services/AuthService'
import { errMessage } from '../../../utils/errMessage'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    BRow,
    BImg,
    BSpinner,
    BFormInput,
    BButton
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      resendingEmail: false,
      verifying: false,
      code: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
  },

  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    handleEmit() {
      // this.$emit('next', 2)
      if(this.code)
        this.isConfirmedEM()
    },
    async complete() {
      console.log('yyyyyyyyyyyyyyyyy')
      return new Promise((resolve, reject) => {
        this.$refs.step2Rules.validate().then(async success => {
          console.log(success)
          if (success && await this.isConfirmedEM()) {
            resolve(true)
          } else {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Please verify the email first!',
                icon: 'AlertTriangeIcon',
                variant: 'danger',
              },
            })
            reject()
          }
        })
      })
    },
    async isConfirmedEM() {
      let isconf
      try {
        this.verifying = true

        AuthService.isConfirmed({ userId: this.$store.state.user.user.id, otpCode: this.code, email: this.$store.state.user.user.email })
          .then(res => {
            console.log("email confirm response: ", res)
            this.updateUser({
              ...this.user,
              // mobile: this.mobile,
              confirmedEmail: true,
            })
          })
          .catch(error => {
            this.messageEr = errMessage(error)
            // this.$toast({
            //   component: ToastificationContent,
            //   props: {
            //     title: this.messageEr,
            //     icon: 'AlertTriangeIcon',
            //     variant: 'danger',
            //   },
            // })
          })
          .finally(() => {
            // this.verifying = false
          })
        // isconf = response.data.confirmedEmail
      } catch (e) {
        this.verifying = false
        this.messageEr = errMessage(e)
        // this.$toast({
        //   component: ToastificationContent,
        //   props: {
        //     title: this.messageEr,
        //     icon: 'AlertTriangeIcon',
        //     variant: 'danger',
        //   },
        // })
      }
      // return isconf
    },
    async resendEmail() {
      this.resendingEmail = true
      AuthService.sendMail(this.user.id)
        .then(response => {
          console.log(response)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Email sent successfully',
              icon: 'CheckIcon',
              variant: 'dark',
            },
          })
          this.resendingEmail = false
        })
        .catch(err => {
          console.log(err)
          this.messageEr = errMessage(err)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
          this.resendingEmail = false
        })
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
@import '~@core/scss/vue/libs/vue-wizard.scss';
</style>
