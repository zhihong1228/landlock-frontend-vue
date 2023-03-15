<template>
  <section>
    <div class="">
      <validation-observer
        ref="ForgetPasswordRules"
        tag="form"
      >
        <b-row>
          <b-col
            v-if="dialog"
            md="12"
            class="mb-1"
          >
            <b-form-group
              label="Mobile OTP"
              label-for="otp"
              style="font-family: 'Avenir-SemiBold',sans-serif;"
              label-size="lg"
            >
              <validation-provider
                #default="{ errors }"
                name="otp"
                vid="otp"
                rules="required|length:6"
              >

                <b-input-group
                  class="mt-0"
                  style=""
                  size="lg"
                >
                  <b-form-input
                    id="otp"
                    v-model.number="data.otp"
                    type="number"
                    name="otp"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter OTP received on mobile"
                  />

                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            md="12"
            class="mb-1"
          >
            <b-form-group
              label="New Password"
              label-for="password"
              style="font-family: 'Avenir-SemiBold',sans-serif;"
              label-size="lg"
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
                  size="lg"
                >
                  <b-form-input
                    id="password"
                    v-model="data.newPassword"
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter Strong Password"
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
          <b-col
            md="12"
            class="mb-1"
          >
            <b-form-group
              label="Confirm New Password"
              label-for="confirmPassword"
              style="font-family: 'Avenir-SemiBold';"
              label-size="lg"
            >
              <validation-provider
                #default="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:password"
              >
                <b-form-input
                  id="confirmPassword"
                  v-model="data.confirmNewPassword"
                  type="password"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Enter New Password Again"
                  data-vv-as="password"
                  size="lg"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </validation-observer>
    </div>
    <div class="">
      <p class="mt-1">
        <small
          class="text-dark font-weight-bold"
        >Remember your password? </small>
        <router-link
          :to="{ name: 'login-page' }"
          class="text-dark font-weight-bolder"
        >Sign in
        </router-link>
      </p>
    </div>
    <div class="">
      <div
        v-if="message === ''"
        class="d-flex justify-content-center align-items-end flex-column"
      >
        <b-button
          variant="primary"
          @click="recoverPassword"
        >
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
          />
          <span v-else>Change Password</span>
        </b-button>
      </div>
    </div>
    <div
      v-if="message !== ''"
      class="alert alert-success mt-2"
      role="alert"
    >
      {{ message }}
    </div>
    <div>
      <div
        v-if="messageEr !== ''"
        class="alert alert-danger mt-2 "
        role="alert"
      >
        {{ messageEr }}
      </div>
    </div>
    <div style="height: 30px" />
  </section>
</template>

<script>

import {
  BRow, BCol, BButton, BFormInput, BInputGroup, BFormGroup,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  password, required, confirmed, length, integer,
} from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AuthService from '../../../services/AuthService'

export default {
  name: 'RecoverPassword',
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BInputGroup,
    BFormGroup,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: {
        otp: null,
        required,
        password,
        confirmed,
        length,
        integer,
        newPassword: '',
        confirmNewPassword: '',
        token: window.location.search.substring(
          window.location.search.indexOf('=') + 1,
          window.location.search.lastIndexOf('&'),
        ),
        userId: window.location.search.split('userId=')[1],
      },
      showPassword: false,
      isLoading: false,
      message: '',
      messageEr: '',
    }
  },
  computed: {
    token() {
      return window.location.search.substring(
        window.location.search.indexOf('=') + 1,
        window.location.search.lastIndexOf('&'),
      )
    },
    userId() {
      return window.location.search.split('userId=')[1]
    },
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    recoverPassword() {
      this.isLoading = true

      this.$refs.ForgetPasswordRules.validate().then(() => {
        if (this.email) this.data.email = this.email
        AuthService.changePassword(this.data)
          .then(response => {
            this.isLoading = false
            this.message = response.data.message
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Password updated Successfully!',
                icon: 'CheckIcon',
                variant: 'success',
              },
            })
            this.$router.push({ name: 'login-page' })
          })
          .catch(error => {
            this.isLoading = false
            this.messageEr = (error.response
                      && error.response.data
                      && error.response.data.message)
                  || error.message
                  || error.toString()
          })
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<style scoped>

</style>
