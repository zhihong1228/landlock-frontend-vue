<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-multi-3"
    size="sm"
    title="Send Invitation to the Owner"
    ok-only
    centered
    ok-title="Send"
    @ok="handleOk"
  >
    <b-form>
      <b-form-group>
        <label for="email">Email:</label>
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email Address"
        />

      </b-form-group>
                <p v-if="errors.length">
    <b>Please correct the following error:</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
    </b-form>
  </b-modal>

</template>

<script>
import {
  BModal, VBModal, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import PropertyService from '../../services/PropertyService'

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
  data() {
    return {
      errors: [],
      email: null,
    }
  },

  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      // Trigger submit handler
      this.errors = []
      if (!this.email) {
        bvModalEvt.preventDefault()
        this.errors.push('Email required.')
      } else if (!this.validEmail(this.email)) {
        bvModalEvt.preventDefault()
        this.errors.push('Valid email required.')
      }
      if (!this.errors.length) {
        console.log(this.email)
        this.sendEmail(this.email)
      }
    },

    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    },

    sendEmail(email) {
      console.log(email)
      PropertyService.sendMailToOwner(email)
        .then((response) => {
          console.log(response)
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
