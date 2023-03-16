<template>
  <section>
    <div>
      <b-row
        align-h="center"
        align-v="center"
        style="height: 100%"
        class=""
      >
        <b-row
          align-h="center"
          align-v="center"
          style="height: calc(100vh - 130px);"
        >
          <b-col
            cols="11"
            class="auth-card"
            style="padding: 30px;"
          >
            <RegisterUser />
          </b-col>
        </b-row>
      </b-row>
    </div>
  </section>
</template>

<style scoped>
input {
  font-weight: bold;
}
</style>

<script>
import RegisterUser from '@/views/components/register-user/RegisterAllSteps.vue'
import { BRow, BCol } from 'bootstrap-vue'
// import AuthService from '../services/AuthService'

export default {
  name: 'Register',
  components: {
    BRow,
    BCol,
    RegisterUser,
  },
  data() {
    return {
      messageEr: '',
      message: '',
      windowWidth: window.innerWidth,
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  methods: {},
}
</script>

<style></style>
