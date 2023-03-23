<template>
  <div>
    <!-- <div>
      <div
        v-if="!showOTP"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <h1
          class="login-heading f-medium"
          style="font-size: 32px; text-align: center;"
        >
          Phone verification
        </h1>
        <h4 class="text-center mt-3 mb-0">
          Please enter the one-time password (OTP) send to {{ mobile }}
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
    </div> -->
    <b-col
      class="mx-auto"
      style="padding: 0"
    >
      <h1
        class="login-heading f-medium"
        style="font-size: 32px; text-align: center;"
      >
        Phone verification
      </h1>
      <h1 class="text-center mt-3 mb-3 f-regular" style="font-size: 24px">
        Please enter the one-time password (OTP) send to {{ mobile }}
      </h1>
      <div class=" d-flex justify-content-center">
        <div
          class="otp"
          style="max-width: 500px;"
        >
          <validation-observer ref="verifyOTPForm">
            <validation-provider
              #default="{ errors }"
              name="OTP"
              rules="required|min:6"
            >
              <!-- <validation-provider
                #default="{ errors }"
                name="OTP code"
                rules="required"
              > -->
                <b-form-input
                  id="name"
                  v-model="otp"
                  :state="errors.length > 0 ? false:null"
                  placeholder="OTP"
                  class="form-input"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              <!-- </validation-provider> -->
              <!-- <b-input-group
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
              </b-input-group> -->
            </validation-provider>
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
              @click="sendSMS"
            >
              <span class="mr-1 text-primary f-medium" style="font-size: 14px;">Resend code</span>
              <b-spinner
                v-if="verifying"
                style="width: 17px; height: 17px"
              />
            </b-button>
          </div>
        </div>
      </div>
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
    handleEmit() {
      // this.$emit('next', 3)
      console.log("this.opt: ", this.otp)
      if(this.otp)
        this.complete()
    },
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
            // console.log(this.mobileInput.getSelectedCountryData())
            const data = {
              otp: this.otp,
              // mobile: this.mobileInput.getNumber(),
              mobile: this.mobile,
              channel: 'sms',
              locale: 'en',
              userId: this.user.id,
            }
            this.verifying = true

            AuthService.confirmMobile(data)
              .then(response => {
                console.log("mobile confirm response: ", response)
                // this.$toast({
                //   component: ToastificationContent,
                //   position: 'top-center',
                //   props: {
                //     title: 'Mobile number updated Successfully!',
                //     icon: 'CheckIcon',
                //     variant: 'success',
                //   },
                // })
                this.verifying = false
                this.updateUser({
                  ...this.user,
                  // mobile: this.mobile,
                  confirmedMobile: true,
                  // step2: 'complete'
                })
                this.$router.push('/identity-verification')
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
        // console.log(this.mobileInput.getSelectedCountryData())
        // const resp = await AuthService.sendOTP(this.mobileInput.getNumber())
        const resp = await AuthService.sendOTP(this.mobile)
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
