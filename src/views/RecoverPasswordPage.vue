<template>
  <section
    class="container position-fixed position-top-0 position-left-0 position-right-0 position-bottom-0 "
  >
    <b-row
      align-h="center"
      align-v="center"
      style="height: 100%"
    >
      <b-col
        cols="11"
        class=" box-shadow-6"
        style="background-color: white; max-width: 400px; border-radius: 23px"
      >
        <h3
          class="login-heading mb-3"
          style="font-family: Avenir-Medium,sans-serif; font-size:32px"
        >
          Recover Account
        </h3>

        <div
          class="login-form mt-1"
        >
          <div class="px-2 pb-0">
            <!--            <h4 class="login-heading mb-2 font-weight-bold">
              Please enter your new Password
            </h4>-->
            <RecoverPassword />
          </div>
          <div style="height: 30px" />
        </div>
      </b-col>
    </b-row>
  </section>
  <!--end section-->
  <!-- Hero End -->
</template>

<style scoped>
input {
  font-weight: bold;
}

.form-label, .form-check-label {
  font-family: 'Avenir-SemiBold';
  font-weight: 700;
  font-size: 15px;
  color: #484848;
}

.login-heading {
  color: black;
  margin: 70px 0;
  display: flex;
  justify-content: center;
}

.small, small {
  font-size: 90%;
}

.fw-bolder {
  font-weight: bolder !important;
}
</style>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import RecoverPassword from '@/views/components/account/RecoverPassword.vue'

export default {
  name: 'RecoverPasswordPage',
  components: {
    RecoverPassword,
    BRow,
    BCol,
  },
}
</script>

<style></style>
