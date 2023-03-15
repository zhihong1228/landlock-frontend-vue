<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-delete-one"
    size="sm"
    title="Please Confirm"
    centered
    cancel-variant="outline-secondary"
    ok-title="Yes"
    cancel-title="No"
    @ok="handleOk"
  >
    <b-card-text>Please confirm that you want to delete property.</b-card-text>

  </b-modal>

</template>

<script>
import {
  BModal, VBModal, BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import PropertyService from '../../services/PropertyService'

export default {
  components: {
    BModal,
    BCardText,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    property: Object,
  },
  data() {
    return {
      messageEr: '',
    }
  },
  methods: {
    getResults() {
      this.$store.dispatch('property/fetchAllProperties').then(
        res => {
          console.log(res.data)
        },
        error => {
          this.loading = false
          this.message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString()
        },
      )
    },

    getResultss() {
      this.$store.dispatch('user/fetchAllProperties').then(
        res => {
          console.log(res.data)
        },
        error => {
          this.loading = false
          this.message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString()
        },
      )
    },
    handleOk() {
      // Prevent modal from closing
    // bvModalEvt.preventDefault()
      // Trigger submit handler
      this.deleteProperty(this.property.id)
    },

    deleteProperty(id) {
      console.log(id)
      PropertyService.deleteProp(id)
        .then(response => {
          console.log(this.$store.state.user.properties)
          console.log(this.$store.state.property.properties)
          // console.log(this.$store.state.property.properties.data.filter(x => x.id !== id))
          this.$store.state.property.properties?.data?.filter(x => x.id !== id)
          this.$store.state.user.properties?.data?.filter(x => x.id !== id)
          this.getResults()
          this.getResultss()
        })
        .catch(error => {
          this.messageEr = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString()
          console.log(this.messageEr)
        })
    },
  },
}
</script>

<style>

</style>
