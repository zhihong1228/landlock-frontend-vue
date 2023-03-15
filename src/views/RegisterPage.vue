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
          style="width: 100%; height: 100%"
        >
          <b-col
            cols="10"
            md="10"
            lg="8"
            xl="6"
            style=""
            class="pl-0 pr-0 mt-0 mt-0 box-shadow-6"
          >
            <div class="">
              <div class="">
                <RegisterUser />
              </div>
            </div>
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
