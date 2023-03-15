<template>
  <div>
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
          <span
            style="font-family:Avenir-Regular; font-size:15px;"
          >
            We sent a verification email to
            <span
              class="text-primary"
              style="font-family:Avenir-SemiBold; font-size:15px;"
            > {{ user.email }} </span>.
            Click on the link inside to get started!
          </span>
        </b-row>
        <b-row class="d-flex justify-content-center">
          <b-img
            src="../../../assets/images/illustration/message.png"
          />
        </b-row>
        <b-row class="d-flex justify-content-center mt-3 mb-2">
          <span style="font-family:Avenir-Regular; font-size:15px;">
            Email not received? Check your spam folder or
            <span
              class="text-primary"
              style="font-family:Avenir-SemiBold; font-size:15px; cursor:pointer"
              @click="resendEmail"
            >
              Resend Email.
            </span>
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
          </span>.
        </b-row>
      </template>
    </validation-observer>
    <div>
      <button
        class="wizard-btn my-2 float-right"
        style="background-color: var(--primary) !important;
    border-color: var(--primary) !important; color: white;"
        @click="() => {$emit('next', 2)}"
      >
        <span class="mr-1">Continue</span>
        <b-spinner
          v-if="verifying"
          style="width: 17px; height: 17px"
        />
        <feather-icon
          v-else
          icon="ArrowRightIcon"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BRow,
  BImg,
  BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
import { mapState } from 'vuex'
// import PropertyService from '@/services/PropertyService'
import AuthService from '../../../services/AuthService'
import { errMessage } from '../../../utils/errMessage'

export default {
  components: {
    ValidationObserver,
    BRow,
    BImg,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      resendingEmail: false,
      verifying: false,
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
        const { data: response } = await AuthService.isConfirmed({ userId: this.$store.state.user.user.id })
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
            this.verifying = false
          })
        isconf = response.data.confirmedEmail
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
      return isconf
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
