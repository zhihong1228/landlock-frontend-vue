<template>
  <div>
    <validation-observer
      ref="step1Rules"
      tag="form"
    >
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <span
            class="mb-0"
            style="font-family:Avenir-Regular; font-size:16px; color:black;"
          >
            Enter your first and last name as they exactly appear on your government ID.
          </span>
        </b-col>
        <b-col
          md="6"
          class="mb-1"
        >
          <b-form-group
            label="First Name"
            label-for="firstName"
            style="font-family: 'Avenir-SemiBold';"
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
                placeholder="John"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="6"
          class="mb-1"
        >
          <b-form-group
            label="Last Name"
            label-for="lastName"
            style="font-family: 'Avenir-SemiBold';"
          >
            <validation-provider
              #default="{ errors }"
              name="Last Name"
              rules="required"
            >
              <b-form-input
                id="lastName"
                v-model="form.lastName"
                :state="errors.length > 0 ? false:null"
                placeholder="Doe"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="6"
          class="mb-1"
        >
          <b-form-group
            label="Email"
            label-for="email"
            style="font-family: 'Avenir-SemiBold';"
          >
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                :state="errors.length > 0 ? false:null"
                placeholder="john.doe@email.com"
                prepend-html="<i class=&quot;fa fa-pencil&quot;></i>"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="6"
          class="mb-1"
        >
          <b-form-group
            label="Password"
            label-for="password"
            style="font-family: 'Avenir-SemiBold',sans-serif;"
          >
            <validation-provider
              #default="{ errors }"
              name="password"
              vid="password"
              rules="required|password"
            >

              <b-input-group
                class="mt-0"
                style=""
              >
                <b-form-input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Password"
                />
                <template #append>
                  <b-button
                    variant="outline-dark"
                    @click="togglePassword"
                  >
                    <feather-icon
                      :icon="showPassword ? 'EyeOffIcon' : 'EyeIcon'"
                    />
                  </b-button>
                </template>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!--          <b-col
            md="6"
            class="mb-1"
          >
            <b-form-group
              label="Confirm Password"
              label-for="confirmPassword"
              style="font-family: 'Avenir-SemiBold';"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:password"
              >
                <b-form-input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Confirm Password"
                  data-vv-as="password"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>-->
        <!--          <b-col
            md="6"
            class="mb-1"
          >
            <b-form-group
              label="Phone number"
              label-for="phone-number"
              style="font-family: 'Avenir-SemiBold';"
            >
              <validation-provider
                #default="{ errors }"
                name="Phone umber"
                rules="required"
              >
                <b-form-input
                  id="phone-number"
                  v-model="form.mobile"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Phone Number"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>-->
      </b-row>
    </validation-observer>
    <div class="mb-1">
      By continuing, you agree to the LandLcok <span
        v-b-modal.user-account-agreement-modal
        class="text-primary"
        style="font-weight: 600"
      >
        User Account Agreement
      </span> and <span
        v-b-modal.privacy-policy-modal
        class="text-primary"
        style="font-weight: 600"
      >Privacy
        Policy.
      </span></div>
    <div>
      <span>Already started?</span>
      <span class="text-nowrap">
        <router-link
          :to="{ name: 'login-page' }"
          class="text-primary"
          style="font-family:Avenir,sans-serif;  font-weight: bold"
        > Log in
        </router-link> to complete your application.
      </span>
    </div>
    <div>
      <button
        class="wizard-btn my-2 float-right"
        style="background-color: var(--primary) !important;
    border-color: var(--primary) !important; color: white;"
        @click="() => {$emit('next', 1)}"
      >
        <span class="mr-1">Continue</span>
        <b-spinner
          v-if="signingUp"
          style="width: 17px; height: 17px"
        />
        <feather-icon
          v-else
          icon="ArrowRightIcon"
        />
      </button>
    </div>
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
import { password, required, confirmed } from '@validations'
import {
  BCol,
  BFormGroup,
  BFormInput,
  BRow,
  BInputGroup,

  // BFormSelect,
  BButton,
  BSpinner, VBModal,
  BModal,
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
    UserAccountAgreement,
    PrivacyPolicy,
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
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
    togglePassword() {
      this.showPassword = !this.showPassword
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
              mobile: this.form.mobile,
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
</style>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
@import '~@core/scss/vue/libs/vue-wizard.scss';
</style>
