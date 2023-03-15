<template>
  <div>
    <div>
      <b-card
        v-if="!loadingData"
        title="Edit property"
        sub-title="you can update property"
        deck
      >
        <b-row class="d-flex justify-content-end">
          <b-form-checkbox v-model="selectedProperty.status" name="check-button" switch style="margin-right: 20px;">
            <b v-if="selectedProperty.status"> Active </b>
            <b v-if="!selectedProperty.status"> Deactive </b>
          </b-form-checkbox>
        </b-row>
        <b-card-text>
          <validation-observer
            ref="propertyRules"
            tag="form"
          >

            <b-row>
              <b-col cols="4">
                <b-form-group
                  class="font-weight-bold"
                  label="Property Name"
                  label-for="name"
                >
                  <validation-provider
                    name="Property name"
                  >
                    <b-form-input
                      id="name"
                      v-model="selectedProperty.name"
                    />
                  </validation-provider>
                  <small class="text-muted">A random ID will be assignedto the property if no named is assigned.</small>
                </b-form-group>
              </b-col>

              <b-col cols="4">
                <b-form-group
                  class="font-weight-bold"
                  label-for="name"
                >
                  <template>
                    <div class="label-size">
                      List Category <span class="text-danger">*</span>
                    </div>
                  </template>
                  <validation-provider
                    #default="{ errors }"
                    name="Category"
                    rules="required"
                  >
                    <b-form-select
                      v-model="selectedProperty.category"
                      :options="propertyType"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  class="font-weight-bold"
                  label="Price"
                  label-for="name"
                >
                  <validation-provider
                    name="Price"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                      <b-form-input
                        id="name"
                        v-model="selectedProperty.price"
                        placeholder="0.00"
                        type="number"
                      />
                    </div>

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
                      v-model="selectedProperty.street"
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
                      v-model="selectedProperty.city"
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
                      v-model="selectedProperty.state"
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
                      v-model="selectedProperty.zip"
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
                    name="departmentNumber"
                  >
                    <b-form-input
                      id="departmentNumber"
                      v-model="selectedProperty.departmentNumber"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
          <b-row>
            <b-col cols="12">
              <hr>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              class="mb-2"
              cols="12"
            >
              <small class="text-muted">Enter the block and lot numbers of ther property for which you are
                registering.</small>
            </b-col>
            <b-col md="6">
              <b-form-group
                class="font-weight-bold"
                label="Block #"
                label-for="block"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Block"
                >
                  <b-form-input
                    id="block"
                    v-model="selectedProperty.numberBlock"
                    :state="errors.length > 0 ? false:null"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                class="font-weight-bold"
                label="Lot #"
                label-for="lot"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Lot"
                >
                  <b-form-input
                    id="lot"
                    v-model="selectedProperty.bumberLot"
                    :state="errors.length > 0 ? false:null"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              class="mb-2"
              cols="12"
            >
              <h5 class="mb-0">
                Ownership
              </h5>
              <small class="text-muted">Do you already own the property Or are you in the process of buying the
                property.</small>
            </b-col>
            <b-col md="6">
              <b-form-group
                label=""
                label-for="address"
              >
                <validation-provider
                  name="Address"
                  rules="required"
                >
                  <b-form-radio
                    v-model="selectedProperty.ownership"
                    name="newProperty"
                    value="true"
                  >
                    I already own the property
                  </b-form-radio>
                  <b-form-radio
                    v-model="selectedProperty.ownership"
                    class="mt-2"
                    name="newProperty"
                    value="false"
                  >
                    I am in the process of buying the property
                  </b-form-radio>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-text>
        <b-button
          type="submit"
          @click="updateProperty"
        >
          Save
          <b-spinner
            v-if="isLoadingSubmit"
            small
            style="margin:1px 3px"
          />
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  BButton, BCol, BForm, BFormGroup, BSpinner, BFormInput, BRow, BCard, BCardText, BFormSelect, BFormRadio, BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import PropertyService from '../services/PropertyService'

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
    BFormSelect,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      checked: false,
      propertyType: [
        { value: null, text: 'Select Owner Type', disabled: true },
        { value: 'condominium unit', text: 'Condominium unit' },
        { value: 'vacant land', text: 'Vacant land' },
        { value: '1-2 family house', text: '1-2 family house' },
        { value: 'multy family house', text: 'multy family house' },
        { value: 'mixed use building', text: 'mixed use building' },
        { value: 'commercial building', text: 'commercial building' },
      ],
      selectedProperty: null,
      loadingData: true,
      isLoadingSubmit: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    console.log(this.$route.query.id)
    // eslint-disable-next-line prefer-destructuring
    this.selectedProperty = this.$store.state.user.properties.data.filter(i => parseInt(i.id) === parseInt(this.$route.query.id))[0]
    // eslint-disable-next-line radix
    console.log(this.selectedProperty)
    this.loadingData = false
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
    updateProperty() {
      this.isLoadingSubmit = true
      console.log(this.selectedProperty)
      PropertyService.updateProp(this.selectedProperty.id, this.selectedProperty)
        .then(response => {
          console.log(response.data.data)
          console.log(this.$store.state.user.properties)
          this.$store.state.user.properties.data.filter(i => {
            if (i.id === this.selectedProperty.id) {
              // eslint-disable-next-line no-param-reassign
              i = this.selectedProperty
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
