<template>
  <div>
    <validation-observer
      ref="step1Rules"
      tag="form"
      class="d-flex flex-column justify-content-center"
    >
      <h1
        class="login-heading mb-3 f-medium"
        style="font-size: 32px; text-align: center;"
      >
        Sign up
      </h1>
      <b-form-group
        label-for="firstName"
        style="font-family: Avenir-SemiBold"
      >
        <validation-provider
          #default="{ errors }"
          name="First Name"
          rules="required"
        >
          <b-form-input
            id="name"
            v-model="form.firstName"
            :state="errors.length > 0 ? false:null"
            placeholder="First name"
            class="form-input"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
        
      <b-form-group
        label-for="lastName"
        style="font-family: Avenir-SemiBold"
      >
        <validation-provider
          #default="{ errors }"
          name="Last Name"
          rules="required"
        >
          <b-form-input
            id="lastName"
            class="form-input"
            v-model="form.lastName"
            :state="errors.length > 0 ? false:null"
            placeholder="Last name"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    
      <b-form-group
        label-for="email"
        style="font-family: Avenir-SemiBold"
      >
        <validation-provider
          #default="{ errors }"
          name="Email"
          rules="required|email"
        >
          <b-form-input
            id="email"
            class="form-input"
            v-model="form.email"
            type="email"
            :state="errors.length > 0 ? false:null"
            placeholder="Email address"
            prepend-html="<i class=&quot;fa fa-pencil&quot;></i>"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    
      <b-form-group
        label-for="password"
        style="font-family: Avenir-SemiBold,sans-serif;"
      >
        <validation-provider
          #default="{ errors }"
          name="password"
          vid="password"
          rules="required|password"
        >
          <b-form-input
            id="password"
            class="form-input"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            :state="errors.length > 0 ? false:null"
            placeholder="Password"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
      <!-- <b-form-group
        label-for="firstName"
        style="font-family: Avenir-SemiBold"
      >
        <validation-provider
          #default="{ errors }"
          name="Phone Number"
          rules="required"
        >
          <b-form-input
            id="name"
            v-model="form.mobile"
            :state="errors.length > 0 ? false:null"
            placeholder="Phone Number"
            class="form-input"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group> -->
      <div class="d-flex flex-row phone-area">
        <div class="d-flex flex-row align-items-center justify-content-center form-input" style="width: 25%;margin-right: 3%;">
          <img src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg" />
          <span class="text-dark">+1</span>
        </div>
        <div style="width: 72%;">
          <validation-provider
            #default="{ errors }"
            name="Phone Number"
            rules="required"
          >
            <b-form-input
              id="name"
              type="number"
              v-model="form.mobile"
              :state="errors.length > 0 ? false:null"
              placeholder="Phone Number"
              class="form-input"
              style="width: 100%;"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </div>
      </div>
      <b-form-group
        label-for="firstName"
        style="font-family: Avenir-SemiBold"
      >
        <validation-provider
          #default="{ errors }"
          name="Policy"
          rules="required"
        >
          <b-form-checkbox
            id="checkbox-1"
            v-model="agreed"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            <div class="d-flex flex-row">
              <span>&nbsp;I agree to the</span>
              <span class="text-primary">Terms of service</span>&nbsp;
              <span>and</span>&nbsp;
              <span class="text-primary">Privacy policy</span>
            </div>
          </b-form-checkbox>
          <!-- <b-form-invalid-feedback :state="visiblePolicy" class="text-danger" style="font-size: 0.857rem;font-weight: 400;">
            Please select two
          </b-form-invalid-feedback> -->
        </validation-provider>
      </b-form-group>
      
      <div>
        <b-button
          size="lg"
          variant="primary"
          class="my-2 float-right form-btn"
          @click="() => handleEmit()"
        >
          <span class="mr-1">Sing up</span>
          <b-spinner
            v-if="signingUp"
            style="width: 17px; height: 17px"
          />
        </b-button>
      </div>
      <div class="d-flex flex-column text-center">
        <p class="mb-0 mt-1 d-flex flex-row align-items-center justify-content-center text-center">
          <small
            class="text-dark me-2 text-center"
            style="font-family: Avenir-Medium, sans-serif; font-weight: 500; font-size: 16px;"
          >
            Already to Landlock? &nbsp;
          </small>
          <router-link
            :to="{ name: 'login-page' }"
            class="text-primary f-medium"
            style="margin-top: 2px;font-size: 15px;color: var(--primary) !important;"
          >
            Sign in
          </router-link>
        </p>
      </div>
    </validation-observer>
    <b-modal
      id="privacy-policy-modal"
      size="lg"
    >
      <privacy-policy />
    </b-modal>
    <b-modal
      id="user-account-agreement-modal"
      size="lg"
    >
      <user-account-agreement />
    </b-modal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapState } from 'vuex'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import { password, required, confirmed } from '@validations'
import {
  BCol,
  BFormGroup,
  BFormInput,
  BRow,
  BInputGroup,
  BFormCheckbox,
  // BFormSelect,
  BButton,
  BSpinner, VBModal,
  BModal,
  BFormInvalidFeedback
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { heightTransition } from '@core/mixins/ui/transition'
import { errMessage } from '@/utils/errMessage'
import PrivacyPolicy from '@/views/components/legal/PrivacyPolicy.vue'
import UserAccountAgreement from '@/views/components/legal/UserAccountAgreement.vue'
import AuthService from '../../../services/AuthService'
// import PropertyService from '../../../services/PropertyService'

export default {
  components: {
    VuePhoneNumberInput,
    UserAccountAgreement,
    PrivacyPolicy,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormCheckbox,
    BFormInvalidFeedback,
    // BFormSelect,
    BButton,
    BSpinner,
    BModal,
    // BFormInvalidFeedback,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      password,
      required,
      confirmed,
      showPassword: false,
      signingUp: false,
      messageEr: '',
      submitted: false,
      message: '',
      form: {
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        confirmPassword: '',
      },
      agreed: 'not_accepted',
      reqPolicy: false
    }
  },
  watch: {
    form (value) {
      console.log("form data changed: ", value)
    }
  },
  emits: ['next'],
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    visiblePolicy () {
      return !(this.reqPolicy && this.agreed === 'not_accepted')
    }
  },

  mounted() {
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    handleEmit() {
      // this.$emit('next', 1)
      // console.log("form info: ", this.form)
      
      if(this.agreed === 'accepted') {
        console.log("this.agreeed: ", this.agreed)
        this.complete()
      } else {
        this.reqPolicy = true
      }
    },
    async complete() {
      return new Promise((resolve, reject) => {
        this.$refs.step1Rules.validate().then(success => {
          if (success) {
            this.signingUp = true
            const data = {
              password: this.form.password,
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              email: this.form.email,
              mobile: `+1${this.form.mobile}`,
              step1: 'complete',
            }
            AuthService.register(data)
              .then(response => {
                this.signingUp = false
                console.log(response)
                localStorage.setItem('token', response.data.token)
                this.$emit('complete', response.data.user)
                // PropertyService.sendOPT(this.form.mobile)
                //   .then(resp => {
                //     console.log(resp)
                //     if (response.data.data !== true) {
                //       this.$toast({
                //         component: ToastificationContent,
                //         position: 'top-right',
                //         props: {
                //           title: 'Error!',
                //           icon: 'AlertTriangleIcon',
                //           variant: 'danger',
                //           text: `${resp.data.error.message || 'something went wrong! #878dfgh'}`,
                //         },
                //       })
                //       return
                //     }
                //     this.$toast({
                //       component: ToastificationContent,
                //       position: 'top-right',
                //       props: {
                //         title: 'OTP sent successfully',
                //         icon: 'CheckIcon',
                //         variant: 'dark',
                //       },
                //     })
                //   })
                resolve(true)
              })
              .catch(error => {
                this.signingUp = false
                this.messageEr = null
                this.messageEr = errMessage(error)
                console.log('-----------> test error message', errMessage(error))
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
  },
}
</script>

<style scoped>
input {
  /*font-weight: bold;*/
  font-family: Lato, serif;
}

.input-group > .input-group-append > .btn {
  border-color: #d8d6de !important;
}

.phone-area {
  margin-bottom: 1rem;
}
.phone-area img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
@import '~@core/scss/vue/libs/vue-wizard.scss';
</style>
