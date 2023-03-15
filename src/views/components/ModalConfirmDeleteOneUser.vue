<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-delete-one-user"
    size="sm"
    title="Please Confirm"
    centered
    cancel-variant="outline-secondary"
    ok-title="Yes"
    cancel-title="No"
    @ok="handleOk"
  >
    <b-card-text>Please confirm that you want to delete this User.</b-card-text>

  </b-modal>

</template>

<script>
import {
  BModal, VBModal, BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import UsersService from '../../services/UsersService'

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
    user: Object,
  },
  data() {
    return {
      messageEr: '',
    }
  },
  methods: {
    getResults() {
      this.$store.dispatch('user/fetchAllUsers').then(
        res => {
          console.log(res.data)
        },
        error => {
          this.loading = false
          this.message = (
            error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()
        },
      )
    },

    handleOk() {
      this.removeUser(this.user.id)
    },

    removeUser(id) {
      console.log(id)
      UsersService.deleteUser(id)
        .then(response => {
          console.log(response)
          // console.log(this.$store.state.property.properties.data.filter(x => x.id !== id))
          this.$store.state.user.users.data.filter(x => x.id !== id)
          this.getResults()
        })
        .catch(error => {
          this.messageEr = (
            error.response
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
