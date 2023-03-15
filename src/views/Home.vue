<template>
  <div class="">
    <WelcomeHeader
      :all-properties="AllProperties"
      :user="user"
    />
    <hr>
    <div class="d-flex justify-content-between">
      <div class="section-title mb-2">
        Properties
      </div>
    </div>
    <!--    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input v-model="searchKey" class="form-control" placeholder="Search .. " type="text"
                 @input="searchBy"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
                    @click="searchBy"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>-->
    <div
      v-if="!AllProperties"
      style="height: 30vh"
      class="d-flex align-items-center justify-content-center flex-column"
    >
      <b-spinner
        variant="dark"
        style="width: 53px; height: 53px"
      />
      <h3 class="mt-2 text-dark">
        Loading properties</h3>
    </div>
    <div
      v-else-if="AllProperties.length > 0"
      class=""
    >
      <div>
        <b-card-group
          deck
          class="ml-auto mr-auto d-flex flex-row flex-wrap justify-content-center justify-content-md-start"
        >
          <!--        v-b-modal.addProperty-->
          <b-card
            class="mb-2 box-property"
            style="cursor: pointer"
            @click="visitProperty('null')"
          >
            <div class="h-100 w-100 d-flex justify-content-center align-items-center">
              <feather-icon
                style="color: var(--primary)"
                icon="PlusCircleIcon"
                size="120"
              />
            </div>
          </b-card>
          <b-card
            v-for="prop in AllProperties"
            :key="prop.id"
            class="mb-2 box-property p-1"
            no-body
          >
            <div>
              <div
                class="d-flex justify-content-between"
                style="height: 62px"
              >
                <div class="d-flex flex-column">
                  <div class="box-property-address mb-0">
                    {{ prop.fullAddress.split(',')[0] }}
                  </div>
                  <div
                    style="
                      font-family: 'Avenir', sans-serif;
                      font-style: normal;
                      font-weight: 600;
                      font-size: 12px;
                      color: #282828;
                    "
                  >
                    {{ prop.fullAddress.split(',').slice(1).join(', ') }}
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <div
                    v-if="prop.status && user && user.step3 === 'complete'"
                    class="btn btn-sm btn-success d-none"
                  >
                    Complete
                  </div>
                  <div
                    v-else
                    class="btn btn-sm btn-danger"
                  >
                    Incomplete
                  </div>
                </div>
              </div>
              <div
                class="position-relative"
                title="edit image"
                style="padding: -1.5rem"
              >
                <!--            @click="() => {
              property = prop;
              showGoogleImageModal = true
            }"-->
                <img
                  style="max-height: 200px; width: 100%; object-fit: cover"
                  :src="
                    prop.lat && prop.lng
                      ? `https://maps.googleapis.com/maps/api/staticmap?center=${prop.lat},${
                        prop.lng
                      }&markers=${prop.lat},${
                        prop.lng
                      }&zoom=${16}&size=${1280}x${720}&maptype=default&key=AIzaSyCX5PUFP0oDSJsd_L-E80BEdRaVUkrLuEs`
                      : 'https://picsum.photos/600/300/?image=25'
                  "
                  alt="Image"
                >
                <!--            <feather-icon
              title="edit image"
              class="position-absolute zindex-4 bg-white"
              style="right: 0px; bottom: 0px"
              size="25"
              icon="EditIcon"
            />-->
              </div>
            </div>
            <section class="mt-1">
              <div
                class="d-flex justify-content-between my-0"
              >
                <!--              @click="getValue(prop, true)"-->
                <div
                  v-if="!prop.status"
                  v-b-modal.modal-delete-one
                  style="
                    cursor: pointer;
                    font-family: 'Lato', sans-serif;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    background: #4a4a4a;
                    border: 1px solid #000000;
                    border-radius: 40px;
                    padding: 5px 16px;
                    color: white;
                  "
                  class="d-flex flex-column align-items-center text-center"
                  @click="property = prop"
                >
                  <b-spinner
                    v-if="generatingCertificate"
                    variant="primary"
                    small
                    class="align-middle"
                  />
                  <span>Delete</span>
                </div>
                <div
                  v-if="!prop.status"
                  style="
                    cursor: pointer;
                    z-index: 10;
                    font-family: 'Lato', sans-serif;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    background: var(--primary);
                    border: 1px solid #000000;
                    border-radius: 40px;
                    padding: 5px 16px;
                    color: white;
                  "
                  class="text-center"
                  @click="visitProperty(prop.id)"
                >
                  <!--openEditProperty(prop)--><!--
                  v-b-modal.editPropertyModal-->
                  <span>Complete</span>
                  <feather-icon
                    style="margin-bottom: 2px; margin-left: 6px"
                    size="20"
                    icon="ArrowRightIcon"
                  />
                </div>
                <div
                  v-if="prop.status"
                  style="
                    cursor: pointer;
                    z-index: 10;
                    font-family: 'Lato', sans-serif;
                    display: block;
                    width: 100%;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    background: var(--primary);
                    border: 1px solid #000000;
                    border-radius: 40px;
                    padding: 5px 16px;
                    color: white;
                  "
                  class="text-center"
                  @click="$router.push({ name: 'view-property', params: { id: prop.id } })"
                >
                  <span>Property Details</span>
                  <feather-icon
                    style="margin-bottom: 2px; margin-left: 6px"
                    size="20"
                    icon="ArrowRightIcon"
                  />
                </div>
                <!--                <div
                  v-if="!prop.status"
                  style="cursor:pointer;"
                  class="d-flex flex-column align-items-center text-center"
                  @click="chooseFiles(prop)"
                >
                  <feather-icon
                    style="margin-bottom: 2px"
                    icon="UploadIcon"
                  />
                  <span>upload deed</span>
                  <input
                    id="fileUpload"
                    hidden
                    type="file"
                    @change="handleFileChange($event)"
                  >

                </div>-->

                <!--              v-b-modal.custom-modal-->
                <!--                <div
                  v-if="prop.status"
                  style="cursor:pointer;"
                  class="d-flex flex-column align-items-center text-center"
                  @click="getValue(prop)"
                >
                  <feather-icon
                    v-if="!generatingCertificate"
                    style="margin-bottom: 2px"
                    icon="PrinterIcon"
                  />
                  <b-spinner
                    v-else
                    variant="dark"
                    small
                    class="align-middle"
                  />
                  <span style="">&lt;!&ndash;Generate&ndash;&gt; Certificate</span>
                </div>-->
              </div>
            </section>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <div
      v-else
      class="mt-5 h-100 w-100 d-flex flex-column justify-content-center align-items-center"
    >
      <div>
        <img
          src="../../src/assets/images/icons/no-property.svg"
          alt="No Property"
          style="height: 100px; margin-bottom: 8px"
        >
      </div>
      <div style="font-size: 14px; color: black">
        No properties added yet
      </div>
      <b-button
        variant="primary"
        size="lg"
        class="mt-2"
        style="font-size: 15px"
        @click="visitProperty('null')"
      >
        <feather-icon
          icon="PlusCircleIcon"
          size="18"
          style="margin-right: 5px"
        />
        Register a new property
      </b-button>
    </div>

    <!-- <template v-if="AllProperties.length !== 0">
        <b-button v-b-modal.modal-delete-all class="mb-1" variant="danger">
          <div class="text-nowrap d-flex align-items-center">
            <span class="mr-1">Remove All</span>
            <feather-icon icon="TrashIcon" size="15" />
          </div>
        </b-button>
      </template> -->
    <!--    <modal-edit-property :property="property" />-->
    <modal-confirm-delete-all-property />
    <modal-confirm-delete-one-property :property="property" />
    <!-- <modal-certif :property="property" :ID="ID" /> -->
    <modal-verif-cert
      v-if="ID"
      ref="modalVerifCert"
      :i-d="ID"
    />
    <map-image
      v-if="showGoogleImageModal"
      :property="property"
      @refresh="getResults()"
      @close="showGoogleImageModal = false"
    />
  </div>
</template>

<script>
// import { jsPDF } from 'jspdf'

import {
  BButton, BCard, BCardGroup, BSpinner, VBTooltip,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
// import ModalEditProperty from '@/views/components/ModalEditProperty.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ModalConfirmDeleteAllProperty from '@/views/components/ModalConfirmDeleteAllProperty.vue'
import ModalConfirmDeleteOneProperty from '@/views/components/ModalConfirmDeleteOneProperty.vue'
import ModalVerifCert from '@/views/components/certificate/ModalVerifCert.vue'
import MapImage from '@/views/components/register-property/MapImage.vue'
import WelcomeHeader from '@/views/WelcomeHeader.vue'
import { errMessage } from '@/utils/errMessage'
import PropertyService from '../services/PropertyService'

export default {
  components: {
    WelcomeHeader,
    BCard,
    // ModalEditProperty,
    ModalConfirmDeleteAllProperty,
    ModalConfirmDeleteOneProperty,
    ModalVerifCert,
    BCardGroup,
    BSpinner,
    BButton,
    MapImage,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {},

  data() {
    return {
      showGoogleImageModal: false,
      fields: [
        {
          key: 'name',
          label: 'PROPERTY',
        },
        {
          key: 'category',
          label: 'CATEGORY',
        },
        {
          key: 'price',
          label: 'PRICE',
        },
        {
          key: 'deed',
          label: 'DEED',
        },
        {
          key: 'status',
          label: 'STATUS',
        },
        {
          key: 'id',
          label: 'ACTION',
        },
      ],
      tableData: [],
      property: null,
      ID: null,
      searchKey: '',
      isEmpty: false,
      property1: {
        id: null,
        status: true,
      },
      qrValue: 'My secret value',
      generatingCertificate: false,
    }
  },
  computed: {
    ...mapState({
      propertyState: state => state.property,
      user: state => state.user.user,
    }),
    AllProperties() {
      const properties = this.propertyState?.properties
      return properties?.data?.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    },
    /* sortedItems() {
      const properties = this.propertyState?.properties
      return properties?.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .data
    }, */
  },

  mounted() {
    this.getResults()
    console.log(this.$refs.fileUpload)
    // console.log(this.$store.state.property.properties)
    // console.log(this.$store.state.property.properties.length)
  },
  created() {
    // this.fetchAllProperties()
  },
  methods: {
    visitProperty(propertyID) {
      console.log(`visitProperty1: ${propertyID}`)
      // document.location.href = `/add/${propertyID}`
      this.$router.push(`/add/${propertyID}`)
    },
    chooseFiles(property) {
      console.log(property)
      document.getElementById('fileUpload').click()
      this.property1.id = property.id
    },

    getResults() {
      this.$store.dispatch('property/fetchAllProperties').then(
        res => {
          console.log()
          return res.data
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 1)
        },
        error => {
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
        },
      )
    },

    deleteProperty(id) {
      // console.log(id)
      PropertyService.deleteProp(id)
        .then(response => {
          console.log(response)
          // console.log(this.$store.state.property.properties.data.filter(x => x.id !== id))
          this.$store.state.property.properties.data.filter(x => x.id !== id)
          this.getResults()
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

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.card-company-table ::v-deep td .b-avatar.badge-light-company {
  .dark-layout & {
    background: $theme-dark-body-bg !important;
  }
}

.size-font-card-footer {
  font-size: smaller;
}

.warning {
  color: #ffcc00;
}

.padding-left-card-15 {
  padding-left: 15px;
}

td {
  padding: 0.72rem 1rem;
}

.card-footer {
  padding: 1rem 0 !important;
}

</style>
