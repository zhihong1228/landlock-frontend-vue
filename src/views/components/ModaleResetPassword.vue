<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-change-password"
    ref="modal-change-password"
    size="sm"
    title="Change Password"
    centered
    hide-footer
  >
    <form
      class="login-form mt-4"
      @submit.prevent="changePsswd(user.id)"
    >
      <div class="row">
        <div class="col-lg-12">
          <p class="text-muted">
            Please enter a new Password.
          </p>
          <div class="mb-3">
            <label
              class="form-label"
            >Password <span class="text-danger">*</span></label>
            <div class="form-icon position-relative">
              <i
                data-feather="mail"
                class="fea icon-sm icons"
              />
              <input
                v-model="v$.data.newPassword.$model"
                type="password"
                class="form-control ps-5"
                placeholder="Enter a Password"
                name="password"
                required=""
              >
            </div>
            <div
              v-for="(error, index) of v$.data.newPassword.$errors"
              :key="index"
              style="color: red"
              class="input-errors"
            >
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label
              class="form-label"
            >Confirm Password
              <span class="text-danger">*</span></label>
            <div class="form-icon position-relative">
              <i
                data-feather="mail"
                class="fea icon-sm icons"
              />
              <input
                v-model="v$.data.confirmNewPassword.$model"
                type="password"
                class="form-control ps-5"
                placeholder="Enter a Password"
                name="password"
                required=""
              >
            </div>
            <div
              v-for="(error, index) of v$.data.confirmNewPassword
                .$errors"
              :key="index"
              style="color: red"
              class="input-errors"
            >
              <div class="error-msg">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>
        <!--end col-->
        <div class="col-lg-12">
          <div
            v-if="message == ''"
            class="d-grid"
          >
            <button
              :disabled="v$.data.$invalid"
              class="btn btn-primary"
            >
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm"
              />
              <span v-else>Save</span>
            </button>
          </div>
        </div>
        <div
          v-if="message !== ''"
          class="alert alert-success mt-2"
          role="alert"
        >
          {{ message }}
        </div>
      </div>
    </form>
  </b-modal>

</template>

<script>
import {
  BModal, VBModal, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import UserService from '../../services/UsersService'

export default {
  components: {
    BModal,
    BFormInput,
    BFormGroup,
    BForm,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    user: Object,
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isLoading: false,
      errors: [],
      message: '',
      data: {
        newPassword: '',
        confirmNewPassword: '',
        userId: '',
      },
    }
  },
  validations() {
    return {
      data: {
        newPassword: { required, minLength: minLength(6) },
        confirmNewPassword: {
          required,
          sameAsPassword: sameAs(this.data.newPassword),
        },
      },
    }
  },
  methods: {

    changePsswd(userId) {
      this.isLoading = true
      console.log(this.data)
      this.data.userId = userId

      UserService.changePassword(this.data)
        .then(response => {
          console.log(response)
          this.isLoading = false
          if (response.data.status === 'success') {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: response.data.message,
                icon: 'CheckIcon',
                variant: 'success',
              },
            })
            this.$refs['modal-change-password'].hide()
          }
          this.message = response.data.message
        })
        .catch(e => {
          console.log(e)
        })
    },

  },
}
</script>

<style>

</style>
