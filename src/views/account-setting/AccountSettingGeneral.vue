<template>
  <b-card>

    <!-- form -->
    <b-form
      ref="general"
    >
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="UserIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              General
            </h4>
          </div>
        </b-col>

        <b-col sm="6">
          <b-form-group
            label="First Name"
            label-for="account-firstName"
          >
            <b-form-input
              v-model="optionsLocal.firstName"
              placeholder="First Name"
              name="firstName"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Last Name"
            label-for="account-lastName"
          >
            <b-form-input
              v-model="optionsLocal.lastName"
              name="lastName"
              placeholder="Last Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="E-mail"
            label-for="account-e-mail"
          >
            <b-form-input
              v-model="optionsLocal.email"
              name="email"
              placeholder="Email"
            />

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Mobile"
            label-for="mobile"
          >
            <b-form-input
              v-model="optionsLocal.mobile"
              name="mobile"
              placeholder="Mobile Number"
            />
          </b-form-group>
        </b-col>

        <!-- alert -->
        <b-col
          cols="12"
          class="mt-75"
        >
          <b-alert
            v-if="messageEr!==''"
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              {{ messageEr }}
            </h4>
          </b-alert>
        </b-col>
        <!--/ alert -->

        <b-col cols="12">
          <b-button
            v-b-modal.modal-verif-password-general
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click.prevent="submitForm"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <modal-verif-password-general :data="selectedData" />

  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import ModalVerifPasswordGeneral from '../components/ModalVerifPasswordGeneral.vue'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    ModalVerifPasswordGeneral,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
      messageEr: '',
      selectedData: null,
    }
  },
  methods: {
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
    submitForm() {
      const data = {
        firstName: this.$refs.general.firstName.value,
        lastName: this.$refs.general.lastName.value,
        email: this.$refs.general.email.value,
        mobile: this.$refs.general.mobile.value,
      }
      this.selectedData = data
      console.log(data)
      // UsersService.updateUser(data)
      //   .then((response) => {
      //     console.log(response.data.data)
      //     console.log(this.$store.state.user.user)
      //     this.$store.state.user.user = response.data.data
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: response.data.message,
      //         icon: 'CheckIcon',
      //         variant: 'success',
      //       },
      //     })
      //     this.messageEr = ''
      //   })
      //   .catch((error) => {
      //     this.messageEr =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //         error.message ||
      //         error.toString()
      //     console.log(this.messageEr)
      //   })
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
