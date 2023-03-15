<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-delete-all"
    size="sm"
    title="Please Confirm"
    centered
    cancel-variant="outline-secondary"
    ok-title="Yes"
    cancel-title="No"
    @ok="handleOk"
  >
    <b-card-text>Please confirm that you want to delete everything.</b-card-text>

  </b-modal>

</template>

<script>
import {
  BModal, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import PropertyService from '../../services/PropertyService'

export default {
  components: {
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {

    }
  },
  methods: {
    getResults() {
      this.$store.dispatch('property/fetchAllProperties').then(
        (res) => {
          console.log(res.data)
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        },
      )
    },

    handleOk() {
      // Prevent modal from closing
    // bvModalEvt.preventDefault()
      // Trigger submit handler
      this.deleteAllProperty()
    },

    deleteAllProperty() {
      PropertyService.deleteAllProp()
        .then((response) => {
          console.log(response)
          this.getResults()
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
