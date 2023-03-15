<template>
  <section
    class="position-fixed position-top-0 position-left-0 position-right-0 position-bottom-0 auth-bg"
  >
    <div
      class="position-absolute d-flexx d-none justify-content-center"
      style="top: 10%;bottom: 10%; right: 0; left: 0;"
    >
      <div
        class="box-shadow-1"
        style="background: lightcoral; flex-grow: 30; border-bottom-right-radius: 23px;
         border-top-right-radius: 23px;margin-top: 30px;margin-bottom: 30px; max-width: 400px;border-radius: 23px"
      />
      <div style="width: clamp(100px, 20%, 200px)" />
      <div
        class="box-shadow-1"
        style="background:  lightcoral; flex-grow: 30; border-bottom-left-radius: 23px;
         border-top-left-radius: 23px;margin-top: 30px;margin-bottom: 30px; max-width: 400px;border-radius: 23px"
      />
    </div>
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
          <div class="login-form">
            <form
              autocomplete="off"
              @submit.prevent="login"
            >
              <!-- <router-link :to="{ name: 'Home' }"
                ><img
                  src="houseLockLogo.png"
                  class="avatar avatar-small mb-4 d-block mx-auto"
                  alt=""
              /></router-link> -->
              <h1
                class="login-heading mb-3"
                style="font-family: Avenir-Medium,serif; font-size: 32px"
              >
                Sign in
              </h1>
              <div class="">
                <div class="mb-2">
                  <!-- <label
                    class="form-label"
                    for="floatingInput"
                  >Email Address</label> -->
                  <input
                    id="floatingInput"
                    v-model="v$.data.email.$model"
                    class="form-control form-input"
                    placeholder="Email"
                    type="email"
                    style="font-size: 1rem;"
                  >
                  <div
                    v-for="(error, index) of v$.data.email.$errors"
                    :key="index"
                    class="input-errors"
                    style="color: red"
                  >
                    <div class="error-msg">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <!-- <label
                    class="form-label"
                    for="floatingPassword"
                  >Password</label> -->
                  <!-- <input
                    id="floatingPassword"
                    v-model="v$.data.password.$model"
                    class="form-control"
                    placeholder="Password"
                    type="password"
                  /> -->
                  <b-input-group>
                    <b-form-input
                      id="floatingPassword"
                      v-model="v$.data.password.$model"
                      :type="showPassword ? 'text' : 'password'"
                      name="password"
                      class="form-control form-input"
                      placeholder="Password"
                    />
                    <!-- <template #append>
                      <b-button
                        variant="outline-dark"
                        @click="togglePassword"
                      >
                        <feather-icon
                          :icon="showPassword ? 'EyeOffIcon' : 'EyeIcon'"
                        />
                      </b-button>
                    </template> -->
                  </b-input-group>
                  <div
                    v-for="(error, index) of v$.data.password.$errors"
                    :key="index"
                    class="input-errors"
                    style="color: red"
                  >
                    <div class="error-msg">
                      {{ error.$message }}
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center container-login-button">
                  <b-button
                    size="lg"
                    variant="primary"
                    class="mb-2 form-btn"
                    type="submit"
                  >
                    <span class="">Sign in</span>
                    <span
                      v-if="isLoading"
                      size="16"
                      style="margin-left: 5px"
                      class="spinner-border spinner-border-sm"
                    />
                    <!-- <feather-icon
                      v-else
                      icon="ArrowRightIcon"
                      size="16"
                      style="margin-left: 5px"
                    /> -->
                  </b-button>
                  <!--                <div class="mb-3">
                    <div class="form-check">
                      <input
                          id="flexCheckDefault"
                          class="form-check-input"
                          type="checkbox"
                          value=""
                      />
                      <label class="form-check-label" for="flexCheckDefault"
                      >Remember me</label
                      >
                    </div>
                  </div>-->
                </div>
                <p class="forgot-pass my-0 text-center">
                  <router-link
                    :to="{ name: 'forget-password-page' }"
                    class="text-dark fw-bolder"
                  >
                    <a
                      class="text-primary font-weight-bold"
                      style="font-family: Avenir-Medium, sans-serif; font-size: 15px"
                    >
                      Forgot password?
                    </a>
                  </router-link>
                </p>
              </div>
              <div class="d-flex flex-column text-center">
                <p class="mb-3 mt-1 d-flex flex-row align-items-center justify-content-center text-center">
                  <small
                    class="text-dark me-2 text-center"
                    style="font-family: Avenir-Medium, sans-serif; font-weight: 500; font-size: 16px;"
                  >
                    New to Landlock? &nbsp;
                  </small>
                  <router-link
                    :to="{ name: 'register-page' }"
                    class="text-primary f-medium"
                    style="margin-top: 2px;font-size: 15px;color: var(--primary) !important;"
                  >
                    Sign up
                  </router-link>
                </p>
              </div>
              <!--              <div
                v-if="messageEr !== ''"
                class="alert alert-danger mt-2"
                role="alert"
              >
                {{ messageEr }}
              </div>-->
              <!--end col-->
            </form>
          </div>
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<style scoped>
input {
  color: black;
  font-weight: bold;
}
input:focus {
  color: black;
}
.form-label,
.form-check-label {
  font-family: 'Avenir-SemiBold';
  font-weight: 700;
  font-size: 15px;
  color: #484848;
}
.login-heading {
  color: black;
  margin: 55px 0;
  display: flex;
  justify-content: center;
}
@media (max-width: 768px) {
  .login-heading {
    margin: 55px 0 !important;
  }
}
@media (max-width: 400px) {
  .login-form {
    max-width: 550px;
    min-width: 300px !important;
  }
}
@media (max-width: 330px) {
  .login-form {
    max-width: 550px;
    min-width: 200px !important;
  }
}
.small,
small {
  font-size: 90%;
}
.fw-bolder {
  font-weight: bolder !important;
}
.login-form {
  max-width: 550px;
  min-width: 350px;
}
.input-group > .input-group-append > .btn {
  border-color: #d8d6de !important;
}
</style>

<script>
import {
  BRow, BCol, BButton, BInputGroup, BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { errMessage } from '@/utils/errMessage'
import AuthService from '../services/AuthService'

export default {
  name: 'LoginPage',
  components: {
    BRow,
    BCol,
    BButton,
    BFormInput,
    BInputGroup,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      showPassword: false,
      messageEr: '',
      isLoading: false,
      message: '',
      data: {
        password: '',
        email: '',
      },
      windowWidth: window.innerWidth,
    }
  },
  beforeCreate() {
    if (localStorage.getItem('token')) {
      if (this.user?.confirmedEmail !== true || this.user?.confirmedMobile !== true) {
        localStorage.removeItem('token')
        this.$router.push({ name: 'register-page' })
      } else this.$router.push({ name: 'home' })
    }
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  validations() {
    return {
      data: {
        email: { required, email },
        password: { required },
      },
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    login() {
      this.isLoading = true
      console.log(this.data)

      AuthService.login(this.data)
        .then(response => {
          console.log(response)
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          // localStorage.setItem("token", response.data.token);
          // alert("Logged in");
          this.message = response.data.message
          window.location.replace(`/Login?key=${response.data.token}`)
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
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
    },
  },
}
</script>

<style></style>
