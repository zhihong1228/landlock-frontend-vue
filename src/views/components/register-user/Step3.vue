<template>
  <div>
    <div>
      <div
        v-if="!showOTP"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <h4 class="text-center mt-3 mb-0">
          Please type your cell number
        </h4>
        <b-input-group
          class="mt-3"
          style="max-width: 400px; margin-bottom: 90px;"
        >
          <template #append>
            <b-button
              variant="primary"
              style="border-radius: 0.358rem;margin-left: -5px"
              @click="sendSMS"
            >
              <span class="mr-1"> {{ resendingMobile ? 'Sending... ' : 'Send OTP' }} </span>
              <feather-icon
                icon="ArrowRightIcon"
              />
            </b-button>
          </template>
          <b-form-input
            id="mobile"
            ref="mobile"
            v-model="mobile"
            name="mobile"
            type="tel"
          />
        </b-input-group>
      </div>
    </div>
    <b-col
      v-if="mobile && showOTP"
      class="px-xl-2 mx-auto"
    >
      <h5
        class="mb-0 mt-1 d-flex justify-content-center"
        style="font-family:Avenir-Regular,sans-serif;"
      >
        Please enter the one time password sent to
        <span style="font-family:Avenir-SemiBold,sans-serif;margin-left: 5px;">
          {{ mobile }}.
        </span>
      </h5>
      <div class=" d-flex justify-content-center">
        <div
          class="otp"
          style="max-width: 500px; margin-bottom: 90px;"
        >
          <validation-observer ref="verifyOTPForm">
            <validation-provider
              #default="{ errors }"
              name="OTP"
              rules="required|min:6"
            >
              <b-input-group
                class="mt-3"
                style=""
              >
                <template #append>
                  <b-button
                    variant="primary"
                    style="border-radius: 0.358rem;margin-left: -5px"
                    @click="$emit('next', 3)"
                  >
                    <span class="mr-1"> {{ verifying ? 'Verifying... ' : 'Verify' }} </span>
                    <feather-icon
                      icon="ArrowRightIcon"
                    />
                  </b-button>
                </template>
                <b-form-input
                  id="otp"
                  ref="otp"
                  v-model="otp"
                  class=""
                  style="color: black;"
                  placeholder="XXXXXX"
                  type="number"
                  :state="errors.length > 0 ? false : null"
                  name="otp"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </validation-observer>
        </div>
      </div>
      <span
        class="d-flex justify-content-center mb-2"
        style="font-family:Avenir-Regular,sans-serif; font-size:15px;"
      >
        OTP not received? <span
          class="text-primary"
          style="font-family:Avenir-SemiBold,sans-serif; font-size:15px; cursor:pointer; margin-left: 5px;"
          @click="showOTP = false; addCountryCode(); mobile = mobileInput.getNumber();"
        >  Resend.
        </span>
      </span>
      <b-spinner
        v-if="resendingMobile"
        class="text-primary"
        style="width: 20px;height: 20px"
      />
    </b-col>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BCol,
  BInputGroup,
  BButton,
  BFormInput,
  BSpinner,
} from 'bootstrap-vue'
import { errMessage } from '@/utils/errMessage'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
import { mapState, mapMutations } from 'vuex'
import intlTelInput from 'intl-tel-input'
import AuthService from '../../../services/AuthService'
import 'intl-tel-input/build/css/intlTelInput.css'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCol,
    BInputGroup,
    BButton,
    BFormInput,
    BSpinner,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      otp: '',
      showOTP: false,
      mobile: null,
      verifying: false,
      resendingMobile: false,
      mobileInput: null,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    if (this.user.mobile) this.mobile = this.user.mobile
    this.addCountryCode()
  },

  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    addCountryCode() {
      const that = this
      setTimeout(() => {
        const phoneInputField = document.querySelector('#mobile')
        that.mobileInput = intlTelInput(phoneInputField, {
          preferredCountries: ['us', 'ae', 'in', 'fr'],
          separateDialCode: true,
          hiddenInput: 'test',
          formatOnDisplay: false,
          utilsScript:
              'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js',
        })
      }, 1)
    },
    async complete() {
      return new Promise((resolve, reject) => {
        this.$refs.verifyOTPForm.validate().then(success => {
          console.log(success)
          if (success) {
            console.log(this.mobileInput.getSelectedCountryData())
            const data = {
              otp: this.otp,
              mobile: this.mobileInput.getNumber(),
              channel: 'sms',
              locale: 'en',
              userId: this.user.id,
            }
            this.verifying = true
            AuthService.confirmMobile(data)
              .then(response => {
                console.log(response)
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-center',
                  props: {
                    title: 'Mobile number updated Successfully!',
                    icon: 'CheckIcon',
                    variant: 'success',
                  },
                })
                this.verifying = false
                this.updateUser({
                  ...this.user,
                  mobile: this.mobileInput.getNumber(),
                  confirmedMobile: true,
                })
                resolve(true)
                // this.$router.push('/identity-verification')
              })
              .catch(error => {
                this.verifying = false
                this.messageEr = errMessage(error)
                console.log(this.messageEr)
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Error!',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
                  },
                })
                reject()
              })
          } else {
            reject()
          }
        })
      })
    },

    async sendSMS() {
      try {
        this.resendingMobile = true
        console.log(this.mobileInput.getSelectedCountryData())
        const resp = await AuthService.sendOTP(this.mobileInput.getNumber())
        this.resendingMobile = false
        console.log(resp)
        if (resp.data.data !== true) {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${resp.data.error.message || 'something went wrong! #878dfgh'}`,
            },
          })
          return
        }
        this.showOTP = true
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'OTP sent successfully',
            icon: 'CheckIcon',
            variant: 'dark',
          },
        })
      } catch (e) {
        console.log(e)
        this.messageEr = errMessage(e)
        this.resendingMobile = false
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error!',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
          },
        })
      }
    },
  },
}
</script>

<style>
.iti.iti--allow-dropdown.iti--separate-dial-code {
  display: inline;
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
@import '~@core/scss/vue/libs/vue-wizard.scss';
</style>
