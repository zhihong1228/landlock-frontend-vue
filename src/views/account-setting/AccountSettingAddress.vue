<template>
  <b-card>
    <!-- form -->
    <b-form
      ref="address"
    >
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="FlagIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Address
            </h4>
          </div>
        </b-col>

        <!-- website -->
        <b-col md="6">
          <b-form-group
            label-for="street"
            label="Street"
          >
            <b-form-input
              id="autocomplete"
              ref="autocomplete"
              v-model="localOptions.street"
              placeholder="Street"
            />
          </b-form-group>
        </b-col>
        <!--/ website -->

        <!-- city -->
        <b-col md="6">
          <b-form-group
            label-for="city"
            label="City"
          >
            <b-form-input
              id="city"
              ref="city"
              v-model="localOptions.city"
              placeholder="City"
            />
          </b-form-group>
        </b-col>
        <!-- city -->

        <!-- state -->
        <b-col md="6">
          <b-form-group
            label-for="state"
            label="State"
          >
            <b-form-input
              id="state"
              ref="state"
              v-model="localOptions.state"
              placeholder="State"
            />
          </b-form-group>
        </b-col>
        <!-- state -->

        <!-- zip -->
        <b-col md="6">
          <b-form-group
            label-for="zip"
            label="Zip"
          >
            <b-form-input
              id="zip"
              ref="zip"
              v-model="localOptions.zip"
              placeholder="Zip"
            />
          </b-form-group>
        </b-col>
        <!-- zip -->

        <b-col cols="12">
          <b-button
            v-b-modal.modal-verif-password-address
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click.prevent="submitForm"
          >
            Save changes
          </b-button>
          <b-button
            v-b-modal.modal-verif-password-address
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1"
            variant="outline-secondary"
            @click.prevent="resetForm"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <modal-verif-password-address :data="selectedData" />
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ModalVerifPasswordAddress from '../components/ModalVerifPasswordAddress.vue'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    ModalVerifPasswordAddress,
  },
  directives: {
    Ripple,
  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      countryOption: ['USA', 'India', 'Canada'],
      localOptions: JSON.parse(JSON.stringify(this.informationData)),
      clevePhone: {
        phone: true,
        phoneRegionCode: 'US',
      },
      selectedData: null,
    }
  },
  mounted() {
    console.log(this.$refs.autocomplete)
    setTimeout(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete.$el,
        {
          fields: ['address_components', 'geometry'],
          types: ['address'],
        },
      )

      console.log(this.autocomplete)
      console.log('adding listner')
      this.autocomplete.addListener('place_changed', this.getResults)
    }, 500)
  },
  methods: {
    getResults() {
      const place = this.autocomplete.getPlace()
      console.log('place found', place)
      if (!place) return
      let address1 = ''
      let postcode = ''
      for (const component of place.address_components) {
        const componentType = component.types[0]
        // eslint-disable-next-line default-case
        switch (componentType) {
          case 'street_number': {
            address1 = `${component.long_name} ${address1}`
            break
          }

          case 'route': {
            address1 += component.short_name
            break
          }

          case 'postal_code': {
            postcode = `${component.long_name}${postcode}`
            break
          }

          // case 'postal_code_suffix': {
          //   postcode = `${postcode}-${component.long_name}`
          //   break
          // }
          case 'locality':
            this.localOptions.city = component.long_name
            break
          case 'administrative_area_level_1': {
            this.localOptions.state = component.short_name
            break
          }
        //   case 'country':
        //     this.property1.country = component.long_name
        //     break
        }
      }
      this.localOptions.street = address1
      this.localOptions.zip = postcode
    },

    submitForm() {
      console.log(this.$refs.address.autocomplete.value)
      const data = {
        street: this.$refs.address.autocomplete.value,
        city: this.$refs.address.city.value,
        state: this.$refs.address.state.value,
        zip: this.$refs.address.zip.value,
      }
      this.selectedData = data
      console.log(data)
      // UsersService.updateUser(data)
      //   .then((response) => {
      //     console.log(response.data.data)
      //     console.log(this.$store.state.user.user)
      //     this.$store.state.user.user = response.data.data
      //     this.$toast({
      //       component: ToastificationContent,
      //       props: {
      //         title: response.data.message,
      //         icon: 'CheckIcon',
      //         variant: 'success',
      //       },
      //     })
      //     this.messageEr = ''
      //   })
      //   .catch((error) => {
      //     this.messageEr =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //         error.message ||
      //         error.toString()
      //     console.log(this.messageEr)
      //   })
    },
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.informationData))
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
