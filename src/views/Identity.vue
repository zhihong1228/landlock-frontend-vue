<template>
  <div>
    <steps />

  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { VBModal } from 'bootstrap-vue'
import { mapMutations, mapState } from 'vuex'
import Steps from '@/views/components/verify-identity/VerifyIdentity.vue'
import { errMessage } from '@/utils/errMessage'
import AuthService from '../services/AuthService'

export default {
  components: {
    Steps,

  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    getUser() {
      AuthService.getUser()
        .then(response => {
          // console.log(response)
          this.updateUser(response.data.userData.user)
        })
        .catch(error => {
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        })
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';

</style>
