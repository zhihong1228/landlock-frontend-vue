<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-verif-password-general"
    size="sm"
    title="Please Confirm"
    centered
    cancel-variant="outline-secondary"
    ok-title="Yes"
    cancel-title="No"
    @ok="handleOk"
  >
    <b-card-text>Please confirm your password. </b-card-text>

          <b-form-group
            label="Password"
            label-for="password"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="password"
                v-model="passwordValue"
                name="password"
                :type="passwordFieldType"
                placeholder="Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIcon"
                  class="cursor-pointer"
                  @click="togglePassword"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-alert
            v-if="messageEr !== ''"
            variant="danger"
            show
            class="mt-1"
          >
            <div class="alert-body">
              <span> {{ messageEr }} </span>
            </div>
          </b-alert>
  </b-modal>

</template>

<script>
import {
  BModal, VBModal, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardText, BAlert,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import UsersService from '../../services/UsersService'

export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BAlert,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      passwordFieldType: 'password',
      passwordValue: null,
      messageEr: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-verif-password-general')
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      const data = {
        password: this.passwordValue,
      }
      UsersService.verifPassword(data)
        .then((response) => {
          console.log(response.data)
          console.log(this.data)
          this.updateUser(this.data)
        })
        .catch((error) => {
          this.messageEr =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          console.log(this.messageEr)
        })
    },

    updateUser(data) {
      UsersService.updateUser(data)
        .then((response) => {
          console.log(response.data.data)
          console.log(this.$store.state.user.user)
          this.$store.state.user.user = response.data.data
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.hideModal()
          this.messageEr = ''
        })
        .catch((error) => {
          this.messageEr =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          console.log(this.messageEr)
        })
    },
  },
}
</script>

<style>

</style>
