<template>
  <div>
    <div style="height: 130px;">
      <b-button
        class="home-btn d-block"
        @click="redirectHome"
      >
        Home
      </b-button>
      <b-button class="logout-btn">
        <feather-icon
          icon="LogOutIcon"
          size="15"
          @click="logout"
        />
      </b-button>
    </div>
    <div class="center-card">
      <b-card
        title="Verification"
        sub-title="you need to verify this form"
        deck
      >
        <b-card-text>
          <b-form
            ref="verifForm"
            class="custom-control-pky"
          >
            <h4 class="mb-2">
              ID - {{ $route.params.id }}
            </h4>

            <h5>Name</h5>
            <b-row>
              <b-col cols="6">
                <b-form-group
                  aria-label="First Name"
                  label-for="first-name"
                >
                  <b-form-input
                    id="first-name"
                    v-model="firstName"
                    name="firstName"
                    placeholder="First Name"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  aria-label="Last Name"
                  label-for="last-name"
                >
                  <b-form-input
                    id="last-name"
                    v-model="lastName"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <h5>Last 4 number of your Social Security Number</h5>
            <b-form-group
              label-for="ssn"
            >
              <b-form-input
                id="ssn"
                v-model="ssn"
                name="ssn"
                placeholder="Last 4 nmber of SSN Number"
                type="number"
                :formatter="formatSSN"
              />
            </b-form-group>
            <h5>Date of Birth</h5>
            <b-form-group
              label-for="dob"
            >
              <b-form-input
                id="dob"
                v-model="selectedDOB"
                name="dob"
                placeholder="MM-DD-YYYY"
                :formatter="formatDOB"
                @input="someHandler($event)"
              />
            </b-form-group>
            <h5>Mother's Maiden Name</h5>
            <b-form-group
              label-for="mmn"
            >
              <b-form-input
                id="mmn"
                v-model="mmn"
                name="mmn"
                placeholder="Mother's Maiden Name"
              />
            </b-form-group>

          </b-form>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            style="padding: 16px 100px"
            type="submit"
            block
            variant="outline-success"
            @click="submit()"
          >
            Verify
            <b-spinner
              v-if="verifying"
              small
              style="margin:1px 3px"
            />
          </b-button>

        </b-card-text>

      </b-card>
    </div>
    <!--    <modal-warning-->
    <!--      :i-d="ID"-->
    <!--    />-->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  BButton, BCol, BForm, BFormGroup, BSpinner, BFormInput, BRow, BCard, BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import { errMessage } from '@/utils/errMessage'
// import ModalWarning from '@/views/components/ModalWarning.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import PropertyService from '../services/PropertyService'
import AuthService from '../services/AuthService'

export default {
  components: {
    BForm,
    BFormInput,
    BFormGroup,
    // vSelect,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BCard,
    BCardText,
    // ModalWarning,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      verifying: false,
      firstName: '',
      lastName: '',
      ssn: '',
      mmn: '',
      selectedDOB: '',
      ID: null,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    this.ID = this.$route.params.id
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    ...mapMutations({
      logoutUser: 'user/LOGOUT_USER',
    }),
    formatDOB(e) {
      return String(e).substring(0, 10)
    },
    formatSSN(e) {
      return String(e).substring(0, 4)
    },
    someHandler(event) {
      this.selectedDOB = event
      if (this.selectedDOB.length === 2) {
        this.selectedDOB = `${event}-`
      }
      if (this.selectedDOB.length === 5) {
        this.selectedDOB = `${event}-`
      }
      console.log(this.selectedDOB)
    },
    submit() {
      this.verifying = true
      try {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          ssn: this.ssn,
          mmn: this.mmn,
          dob: this.selectedDOB,
          generatedID: this.$route.params.id,
        }
        console.log(data)

        PropertyService.verifForm(data)
          .then(response => {
            this.verifying = false
            if (response.data.type === 'success') {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.message,
                  icon: 'CheckIcon',
                  variant: 'success',
                },
              })
            } else {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: response.data.message,
                  icon: 'CheckIcon',
                  variant: 'warning',
                },
              })
            }
          })
          .catch(error => {
            this.verifying = false
            this.messageEr = errMessage(error)
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'CheckIcon',
                variant: 'warning',
                text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
              },
            })
          })
      } finally {
        this.verifying = false
      }
    },
    redirectHome() {
      console.log('55')
      this.$router.push({ name: 'home' })
    },
    logout() {
      AuthService.logout()
        .then(response => {
          console.log(response)
          this.logoutUser()
          window.location.href = '/login-page'
          // console.log(this.$store.state.user.user)
          // switch (`${window.location.href}`) {
          //   case `${process.env.VUE_APP_BACKOFFICE_LOCAL}verif-form`:
          //     window.location.replace(process.env.VUE_APP_FRONT_LOCAL)
          //     break
          //   case `${process.env.VUE_APP_BACKOFFICE_MAIN}verif-form`:
          //     window.location.replace(process.env.VUE_APP_FRONT_MAIN)
          //     break
          //   case `${process.env.VUE_APP_BACKOFFICE_PROD}verif-form`:
          //     window.location.replace(process.env.VUE_APP_FRONT_MAIN)
          //     break
          //   default:
          //     console.log('<-->')
          // }
        })
        .catch(error => {
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Error',
              icon: 'CheckIcon',
              variant: 'warning',
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

.center-card{
  display: flex;
  justify-content: center;
  //margin-top: 15vh;
}
.home-btn{
  position: absolute;
  left: 20%;
  top: 5%;
}
.logout-btn{
  position: absolute;
  right: 20%;
  top: 5%;
}
</style>
