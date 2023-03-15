<template>
  <section
    class="position-fixed position-top-0 position-left-0 position-right-0 position-bottom-0 auth-bg"
  >
    <b-row
      align-h="center"
      align-v="center"
      style="height: 100%"
    >
      <b-col
        cols="11"
        class="auth-card"
      >
        <div class="d-flex justify-content-center auth-body">
          <form
          class="login-form"
          >
            <div class="px-2 pb-0">
              <div class="">
                <h3
                  class="login-heading"
                  style="font-family: Avenir-Medium,sans-serif; font-size:32px"
                >
                  Reset password
                </h3>
                <div
                  v-if="!message"
                  style=""
                  class="mb-3"
                >
                  <div style="">
                    <div class="position-relative">
                      <input
                        v-model="v$.email.$model"
                        type="email"
                        class="form-control ps-5 form-input"
                        placeholder="Email"
                        name="email"
                        required=""
                      >
                    </div>
                    <div
                      v-for="(error, index) of v$.email.$errors"
                      :key="index"
                      style="color: red"
                      class="input-errors"
                    >
                      <div class="error-msg">
                        {{ error.$message }}
                      </div>
                    </div>
                  </div>
                  <br>
                </div>
              </div>
              <!--end col-->
              <div class="">
                <div
                  v-if="!message"
                  class="d-flex justify-content-center align-items-end flex-column"
                >
                  <b-button
                    variant="primary"
                    @click="resetPsswd"
                    class="form-btn"
                  >
                    <span>Send reset instructions</span>
                    <span
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    />
                  </b-button>
                </div>
              </div>
              <div
                v-if="message"
                class="alert alert-success mt-2"
                role="alert"
              >
                {{ message }}
              </div>
              <div>
                <div
                  v-if="messageEr"
                  class="alert alert-danger mt-2 "
                  role="alert"
                >
                  {{ messageEr }}
                </div>
              </div>
              <!--end col-->
              <div class="">
                <p class="mt-2 mb-1 justify-content-center" style="text-align: center;">
                  <small
                    class="text-dark font-weight-bold"
                  >Remember your password? </small>
                  <router-link
                    :to="{ name: 'login-page' }"
                    class="text-primary font-weight-bolder"
                  >Sign in
                  </router-link>
                </p>
                <p class="mb-3 mt-1 d-flex flex-row align-items-center justify-content-center text-center">
                  <small
                    class="text-dark me-2 text-center"
                    style="font-family: Avenir, sans-serif; font-weight: 500; font-size: 16px;"
                  >
                    New to Landlock? &nbsp;
                  </small>
                  <router-link
                    :to="{ name: 'register-page' }"
                    class="text-primary"
                    style="
                      font-family: Avenir, sans-serif;
                      font-weight: 600;
                      margin-top: 2px;
                      font-size: 15px;
                      color: var(--primary) !important;
                    "
                  >
                    Sign up
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>

      </b-col>
      <!--end col-->
    </b-row>
    <!--end row-->

    <b-modal
      v-model="showRecoverModal"
      centered
      title="Recover Password"
      hide-footer
      size="sm"
    >
      <RecoverPassword
        :dialog="true"
        :email="email"
      />
    </b-modal>
  </section>
  <!--end section-->
  <!-- Hero End -->
</template>

<style scoped>
input {
  font-weight: bold;
}

.form-label, .form-check-label {
  font-family: 'Avenir-SemiBold';
  font-weight: 700;
  font-size: 15px;
  color: #484848;
}

.login-heading {
  color: black;
  margin: 70px 0;
  display: flex;
  justify-content: center;
}

.small, small {
  font-size: 90%;
}

.fw-bolder {
  font-weight: bolder !important;
}
</style>

<script>
import {
  BRow, BCol, BButton, BFormRadioGroup,
} from 'bootstrap-vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { errMessage } from '@/utils/errMessage'
import RecoverPassword from '@/views/components/account/RecoverPassword.vue'
import AuthService from '../services/AuthService'

export default {
  name: 'ForgetPassword',
  components: {
    RecoverPassword,
    BRow,
    BCol,
    BButton,
    BFormRadioGroup,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      showRecoverModal: false,
      message: '',
      messageEr: '',
      email: '',
      channel: 'email',
    }
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  validations() {
    return {
      email: { required, email },
      channel: { required },
    }
  },
  methods: {
    resetPsswd() {
      // return this.showRecoverModal = true
      this.isLoading = true

      AuthService.resetPassword({ email: this.email, channel: this.channel })
        .then(response => {
          this.isLoading = false
          if (response.data.type === 'success') {
            this.message = response.data.display
            this.messageEr = null
            if (this.channel === 'sms') {
              this.showRecoverModal = true
            }
          } else {
            this.messageEr = response.data.display
          }
        })
        .catch(error => {
          this.isLoading = false
          this.message = null
          this.messageEr = errMessage(error)
        })
    },
  },
}
</script>

<style></style>
