<template>
  <div>
    <b-modal
      v-model="showLogin"
      hide-footer
      hide-header
      cons
      centered
      lg="4"
      size="sm"
      class="d-flex align-items-center auth-bg px-1 p-lg-5"
      no-close-on-esc
      no-close-on-backdrop
    >
      <!--
      no-close-on-backdrop
      hide-header-close-->
      <b-col class="px-0 pt-2">
        <h2 class="text-center font-weight-bolder">
          Second Factor Authentication
        </h2>

        <!-- form -->
        <validation-observer ref="loginForm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >
            <!-- mobile -->
            <b-form-group
              label="Mobile"
              label-for="mobile"
            >
              <validation-provider
                #default="{ errors }"
                name="Mobile"
                rules="required|min:8"
              >
                <b-form-input
                  id="mobile"
                  ref="mobile"
                  v-model="userMobile"
                  type="number"
                  size="lg"
                  :state="errors.length > 0 ? false : null"
                  name="mobile"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <p class="font-weight-bold text-center my-3">Security is critical at Landlock. To help keep your account
              safe, we'll text
              you a
              verification code
              when
              you sign in on a new device.</p>

            <!-- submit buttons -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="dark"
              block

              class="mb-2 mt-2 py-2"
              style="border-radius: 0"
              :disabled="loggingIn"
              @click="sendOTP"
            >
              <b-spinner
                v-if="sendingOTP"
                style="margin:1px 3px"
                small
              />
              SEND OTP
            </b-button>
          </b-form>
        </validation-observer>
      </b-col>
    </b-modal>
    <b-modal
      v-model="otpModal"
      hide-footer
      cons
      centered
      size="sm"
      class="d-flex align-items-center auth-bg px-2 p-lg-5"
      no-close-on-esc
    >
      <!--
      no-close-on-backdrop
      hide-header-close-->
      <b-col class="px-xl-2 mx-auto">
        <h2 class="text-center my-2">
          Enter authentication code
        </h2>
        <b-card-text class="mb-2">
          Please enter the four digit code we just sent to your number <b>+xx xxxxxxxx{{ (userMobile || '').slice(-2)
          }}</b>
        </b-card-text>

        <!-- form -->
        <validation-observer ref="verifyOTPForm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >
            <!-- OTP -->
            <b-form-group
              label="OTP"
              label-for="otp"
            >
              <validation-provider
                #default="{ errors }"
                name="OTP"
                rules="required|min:6"
              >
                <b-form-input
                  id="otp"
                  ref="otp"
                  v-model="otp"
                  size="lg"
                  style="color: black"
                  placeholder=" 0 0 0 0 0 0"
                  type="number"
                  :state="errors.length > 0 ? false : null"
                  name="otp"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit buttons -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="dark"
              block
              style="border-radius: 0"
              class="mt-3 mb-2 py-2"
              :disabled="loggingIn || otp.length < 4"
              @click="confirmMobile"
            >
              <b-spinner
                v-if="loggingIn"
                style="margin:1px 3px"
                small
              />
              VERIFY
            </b-button>
          </b-form>
        </validation-observer>
      </b-col>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require,no-console */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BSpinner,
  BCol,
  BModal,
  BFormGroup,
  BFormInput,
  BCardText,
  BForm,
  BButton,
  VBModal,
} from 'bootstrap-vue'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import { required, min } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { mapMutations } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
// import axios from 'axios'
import store from '@/store/index'
import AuthService from '../../services/AuthService'
import { errMessage } from '../../utils/errMessage'

export default {
  components: {
    BSpinner,
    BCol,
    BFormGroup,
    BFormInput,
    BCardText,
    BModal,
    // BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      nameModal: false,
      customerName: '',
      mobileInput: null,
      otp: '',
      status: '',
      otpModal: false,
      userMobile: null,
      // validation rulesimport store from '@/store/index'
      required,
      min,
      sendingOTP: false,
      loggingIn: false,
    }
  },
  computed: {
    showLogin: {
      get() {
        return store.state.user.showLogin
      },
      set() {
        this.toggleLogin()
      },
    },
    user: {
      get() {
        return store.state.user.user
      },
      set() {},
    },
  },
  watch: {
    showLogin(value) {
      if (value) {
        const that = this
        setTimeout(() => {
          const phoneInputField = document.querySelector('#mobile')
          that.mobileInput = intlTelInput(phoneInputField, {
            preferredCountries: ['us', 'co', 'in', 'de'],
            separateDialCode: true,
            utilsScript:
              'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.11/js/utils.js',
          })
        }, 1)
      }
    },
  },
  async mounted() {
    // const x = await fetch('http://localhost:8888/test')
    // console.log(x)
    this.nameModal = this.user && this.user.mobile && !this.user.name
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
      toggleLogin: 'user/toggleLogin',
    }),
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }
      })
    },
    async sendOTP() {
      try {
        this.sendingOTP = true
        const success = await this.$refs.loginForm.validate()
        console.log(this.mobileInput.getNumber().toString())
        if (success) {
          /**
           * @type {Object}
           */
          await AuthService.sendOTP(this.mobileInput.getNumber())
            .then(response => {
              console.log(response)
              if (response.data.data !== true) {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Error!',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: `${response.data.error.message || 'something went wrong! #878dfgh'}`,
                  },
                })
                return
              }
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'OTP sent successfully',
                  icon: 'CheckIcon',
                  variant: 'dark',
                },
              })
              this.otp = ''
              this.otpModal = true
            })
            .catch(error => {
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
            })
        }
      } catch (e) {
        console.log(e)
        this.messageEr = errMessage(e)
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error!',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `${this.messageEr}`,
          },
        })
      } finally {
        this.sendingOTP = false
      }
    },
    async confirmMobile() {
      try {
        this.loggingIn = true
        const success = await this.$refs.verifyOTPForm.validate()
        if (success) {
          /**
           * @type {Object}
           */
          const data = {
            otp: this.otp,
            mobile: this.mobileInput.getNumber(),
            channel: 'sms',
            locale: 'en',
          }
          await AuthService.confirmMobile(data)
            .then(response => {
              console.log(response)
              this.$toast({
                component: ToastificationContent,
                position: 'top-center',
                props: {
                  title: 'Mobile number updated Successfully!',
                  icon: 'CoffeeIcon',
                  variant: 'success',
                },
              })
              this.showLogin = false
              this.otpModal = false
              this.$router.push('/identity-verification')
            })
            .catch(error => {
              this.messageEr = errMessage(error)
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
            })
        }
      } catch (e) {
        console.log(e)
        this.messageEr = errMessage(e)
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error!',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `${this.messageEr}`,
          },
        })
      } finally {
        this.loggingIn = false
      }
    },
  },
}
</script>
<style>
</style>
<style lang="scss">
@import 'src/@core/scss/vue/pages/page-auth.scss';
</style>
