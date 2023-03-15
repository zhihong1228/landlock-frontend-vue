<template>
  <div>
    <div>
      <b-card
        v-if="!loadingData"
        title="Edit User"
        sub-title="you can update user"
        deck
      >
        <b-row class="d-flex justify-content-end">
          <b-form-checkbox v-model="userStatus" name="check-button" switch style="margin-right: 20px;">
            <b v-if="userStatus"> Active </b>
            <b v-if="!userStatus"> Deactive </b>
          </b-form-checkbox>
        </b-row>
        <b-card-text>
          <validation-observer
            ref="userRules"
            tag="form"
          >

            <b-row>
              <b-col cols="6">
                <b-form-group
                  class="font-weight-bold"
                  label="Fist Name"
                  label-for="firstName"
                >
                  <validation-provider
                    name="firstName"
                  >
                    <b-form-input
                      id="firstName"
                      v-model="selectedUser.firstName"
                    />
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group
                  class="font-weight-bold"
                  label="Last Name"
                  label-for="lastName"
                >
                  <validation-provider
                    name="lastName"
                  >
                    <b-form-input
                      id="lastName"
                      v-model="selectedUser.lastName"
                    />

                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col md="6">
                <b-form-group
                  class="font-weight-bold"
                  label="Date of Birth"
                  label-for="dob"
                >
                  <validation-provider
                    name="dob"
                  >
                    <b-form-input
                      id="dob"
                      v-model="selectedUser.dob"
                    />

                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  class="font-weight-bold"
                  label="Mobile"
                  label-for="mobile"
                >
                  <validation-provider
                    name="mobile"
                  >
                    <b-form-input
                      id="mobile"
                      v-model="selectedUser.mobile"
                    />

                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <hr>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group
                  class="font-weight-bold"
                  label-for="street"
                >
                  <template>
                    <div class="label-size">
                      Street <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="street"
                    rules="required"
                  >
                    <b-form-input
                      id="autocomplete"
                      ref="autocomplete"
                      v-model="selectedUser.street"
                      autocomplete="off"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  class="font-weight-bold"
                  label-for="city"
                >
                  <template>
                    <div class="label-size">
                      City <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="city"
                    rules="required"
                  >
                    <b-form-input
                      id="city"
                      v-model="selectedUser.city"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group
                  class="font-weight-bold"
                  label-for="state"
                >
                  <template>
                    <div class="label-size">
                      State <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="state"
                    rules="required"
                  >
                    <b-form-input
                      id="state"
                      v-model="selectedUser.state"
                      :state="errors.length > 0 ? false:null"
                      placeholder=""
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  class="font-weight-bold"
                  label-for="zip"
                >
                  <template>
                    <div class="label-size">
                      Zip Code <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="Zip Code"
                    rules="required"
                  >
                    <b-form-input
                      id="zip"
                      v-model="selectedUser.zip"
                      :state="errors.length > 0 ? false:null"
                      type="number"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  class="font-weight-bold"
                  label-for="departmentNumber"
                >
                  <template>
                    <div class="label-size">
                      apt/suite <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="apt/suite"
                  >
                    <b-form-input
                      id="departmentNumber"
                      v-model="selectedUser.mobile"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>

        </b-card-text>
        <b-button
          type="submit"
          @click="updateUser"
        >
          Save
          <b-spinner
            v-if="isLoadingSubmit"
            small
            style="margin:1px 3px"
          />
        </b-button>
      </b-card>
      <b-spinner
        v-else
        small
        style="margin:1px 3px"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  BButton, BCol, BForm, BFormGroup, BSpinner, BFormInput, BRow, BCard, BCardText, BFormCheckbox, BFormRadio,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import UsersService from '../services/UsersService'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
    BFormInput,
    BFormGroup,
    // vSelect,
    BRow,
    BCol,
    BButton,
    BSpinner,
    BCard,
    BCardText,
    BFormCheckbox,

  },
  directives: {
    Ripple,
  },
  data() {
    return {

      propertyType: [
        {
          value: null,
          text: 'Select Owner Type',
          disabled: true,
        },
        {
          value: 'condominium unit',
          text: 'Condominium unit',
        },
        {
          value: 'vacant land',
          text: 'Vacant land',
        },
        {
          value: '1-2 family house',
          text: '1-2 family house',
        },
        {
          value: 'multy family house',
          text: 'multy family house',
        },
        {
          value: 'mixed use building',
          text: 'mixed use building',
        },
        {
          value: 'commercial building',
          text: 'commercial building',
        },
      ],
      selectedUser: null,
      loadingData: true,
      isLoadingSubmit: false,
      userStatus: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    this.selectedUser = this.$store.state.user.users.data.filter(i => i.id === this.$route.query.id)[0]
    console.log(this.selectedUser)
    this.loadingData = false
    if (this.selectedUser.step1 === 'complete' && this.selectedUser.step2 === 'complete' && this.selectedUser.step3 === 'complete') {
      this.userStatus = true
    } else {
      this.userStatus = false
    }
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
        this.selectedDOB = event + '-'
      }
      if (this.selectedDOB.length === 5) {
        this.selectedDOB = event + '-'
      }
      console.log(this.selectedDOB)
    },
    updateUser() {
      this.isLoadingSubmit = true
      if (this.userStatus === true) {
        this.selectedUser.step1 = 'complete'
        this.selectedUser.step2 = 'complete'
        this.selectedUser.step3 = 'complete'
      } else {
        this.selectedUser.step1 = 'incomplete'
        this.selectedUser.step2 = 'incomplete'
        this.selectedUser.step3 = 'incomplete'
      }
      console.log(this.selectedUser)
      UsersService.updateUserInfo(this.selectedUser.id, this.selectedUser)
        .then(response => {
          console.log(response.data.data)
          console.log(this.$store.state.user.users)
          this.$store.state.user.users.data.filter(i => {
            if (i.id === this.selectedUser.id) {
              // eslint-disable-next-line no-param-reassign
              i = this.selectedUser
            }
          })
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.data.message,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.hideModal()
          this.messageEr = ''
          this.isLoadingSubmit = false
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
      this.isLoadingSubmit = false
    },
  },
}
</script>
<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';

</style>
