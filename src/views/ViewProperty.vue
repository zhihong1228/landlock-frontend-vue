<template>
  <div>
    <div
      v-if="!property"
      style="height: 30vh"
      class="d-flex align-items-center justify-content-center flex-column"
    >
      <b-spinner
        variant="primary"
        style="width: 53px; height: 53px"
      />
      <h3 class="mt-2 text-primary">
        Loading property
      </h3>
    </div>

    <div v-else>
      <div class="card p-2">
        <!-- <div
          class="mb-4 d-flex flex-wrap justify-content-center justify-content-md-between align-items-center"
        >
          <div class="section-title text-center mb-1 mb-md-0">
            Property Details
          </div>
          <div class="d-flex flex-wrap justify-content-center align-items-center">
            <a
              href="https://mohamedayadi1.wixsite.com/landlock/resume"
              target="_blank"
              class="btn btn-lg btn-primary ml-1 mb-1 mb-md-0"
              style="font-size: 15px"
            >
              Instructions
              <feather-icon
                icon="InfoIcon"
                size="18"
                style="margin-left: 5px"
              />
            </a>
            <b-button
              variant="primary"
              size="lg"
              class="ml-1 mb-1 mb-md-0"
              style="font-size: 15px"
              @click="$router.push('/add/' + propertyID)"
            >
              Edit Property
              <feather-icon
                icon="EditIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button>
            <b-button
              v-if="isCertificateExpired"
              variant="primary"
              size="lg"
              class="ml-1 mb-1 mb-md-0 "
              style="font-size: 15px"
              @click="generateCertificate"
            >
              Generate Certificate
              <feather-icon
                icon="ArrowRightIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button>
          </div>
        </div> -->

        <div class="mb-1">
          <b-row>
            <b-col
              md="6"
              lg="4"
            >
              <div class=" px-0">
                <div class="mb-1 d-flex flex-column">
                  <span class="f-semibold" style="font-size: 18px;">Address:</span>
                  <span class="f-medium  color-dark" style="font-size: 15px;">{{ property.fullAddress }}</span>
                </div>
                <div class="mb-1 d-flex flex-column">
                  <span class="f-semibold" style="font-size: 18px;">Type:</span>
                  <span class="f-medium  color-dark" style="font-size: 15px;">{{ property.category }}</span>
                </div>
                <div class="mb-1 d-flex flex-column">
                  <span class="f-semibold" style="font-size: 18px;">Owner registered:</span>
                  <span class="f-medium  color-dark" style="font-size: 15px;">{{ property.owners[0].name }}</span>
                </div>
                <b-button
                  variant="primary"
                  class="common-btn"
                  style="width: 50%; border-radius: 5px; margin-top: 30px;"
                  @click="generateCertificate"
                >
                  <span class="color-light">Generate certificate</span>
                </b-button>
              </div>
            </b-col>
            <b-col
              md="6"
              lg="8"
              class="text-center"
            >
              <img
                class="img-thumbnail"
                style="max-height: 300px;  width: 100%; object-fit: cover"
                :src="
                  property.lat && property.lng
                    ? `https://maps.googleapis.com/maps/api/staticmap?center=${property.lat},${
                      property.lng
                    }&markers=${property.lat},${
                      property.lng
                    }&scale=2&zoom=${16}&size=${1280}x${720}&maptype=default&key=AIzaSyCX5PUFP0oDSJsd_L-E80BEdRaVUkrLuEs`
                    : 'https://picsum.photos/600/300/?image=25'
                "
                alt="Image"
              >
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="card p-2" style="background-color: #E0EDF1;">
        <b-row>
          <b-col cols="12" class="d-flex flex-column">
            <div class="d-flex flex-row align-items-center mb-1">
              <img src="../assets/images/icons/bulb.png" style="width: 19px; height: 19px; margin-top: -4px; margin-right: 5px;" />
              <span class="f-semibold" style="font-size: 19px;">Instructions:</span>
            </div>
            <div>
              <span class="f-regular color-dark" style="font-size: 15px;">
                Congratulations on taking the important step of protecting your property! Now that you have generated a warning statement, it's time to make sure it's recorded in your property's deed. This will ensure that the warning is officially recognized and that it will be recognized by any future owners of the property. How to record the warning statement?
              </span>
            </div>
            <div>
              <a href="#" class="f-medium color-dark" style="font-size: 15px; text-decoration: underline;">How to record a warning statement</a>
            </div>
          </b-col>
        </b-row>
      </div>

      <div
        v-if="!isCertificateExpired"
        class="card p-2 mb-3"
      >
        <div class="mb-4 d-flex flex-wrap justify-content-center justify-content-md-between align-items-center">
          <div
            class="section-title mb-1 mb-md-0"
          >
            Certificate
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-center">
            <!--<b-button
              variant="primary"
              size="lg"
              class="ml-1 my-1"
              style="font-size: 15px"
            >
              Share
              <feather-icon
                icon="ShareIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button>
            <b-button
              variant="primary"
              size="lg"
              class="ml-1 my-1"
              style="font-size: 15px"
              @click="generateCertificate"
            >
              Print
              <feather-icon
                icon="PrinterIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button>
            <b-button
              variant="primary"
              size="lg"
              class="ml-1 my-1"
              style="font-size: 15px"
              @click="downloadWarning"
            >
              Download
              <feather-icon
                icon="DownloadIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button>-->

          </div>
        </div>
        <div
          v-if="!isCertificateExpired"
          id="certificate"
          ref="certificate"
        />
        <div
          v-else
          class="text-center"
        >
          <div
            class="mb-2"
            style="font-weight: 700; font-size: 24px"
          >
            Certificate Expired
          </div>
          <div
            class="mb-2"
            style="font-weight: 600; font-size: 16px; color: #1160aa"
          >
            Please generate your certificate again.
          </div>
        </div>
      </div>

      <div class="card p-2 mb-3">
        <div class="mb-0 d-flex flex-wrap justify-content-center justify-content-md-between align-items-center">
          <div
            class="section-title mb-1 mb-md-0"
            style="font-size: 24px;"
            @click="handleShowWarn"
          >
            Warning statement
            <!-- <b-button v-b-toggle.collapse-warning class="m-1"> -->
            <!-- <b-button variant="primary" v-b-toggle.collapse-warning class="m-1">
              Warning statement
            </b-button> -->
          </div>
          <div class="d-flex flex-wrap align-items-center justify-content-center">
            
            <!-- <b-button
              variant="primary"
              size="lg"
              class="ml-1 my-1"
              style="font-size: 15px"
              @click="printWarning"
            >
              Print
              <feather-icon
                icon="PrinterIcon"
                size="18"
                style="margin-left: 5px"
              />
            </b-button> -->
            <b-button
              variant="outline-primary"
              size="lg"
              class="ml-1"
              style="font-size: 15px; border-radius: 5px;"
              @click="downloadWarning"
            >
              Download
              <!-- <feather-icon
                icon="DownloadIcon"
                size="18"
                style="margin-left: 5px"
              /> -->
            </b-button>
            <b-button
              variant="outline-primary"
              size="lg"
              class="ml-1"
              style="font-size: 15px; border-radius: 5px;"
            >
              Share
              <img src="../assets/images/icons/share.png" />
            </b-button>
            <img v-if="!showWarn" src="../assets/images/icons/down_dark.png" style="margin-left: 20px; margin-right: 10px;" />
            <img v-else src="../assets/images/icons/up_dark.png" style="margin-left: 20px; margin-right: 10px;" />
          </div>
        </div>
        <div>
        <!-- <b-collapse id="collapse-warning"> -->
          <div
            v-if="showWarn"
            id="warning"
            class="pb-2"
          >
            <div class="d-flex flex-row">
              <h1
                style="
                  font-family: 'Times New Roman',serif;
                  font-weight: 500;
                  color: red;
                  font-size: 85px;
                  margin-right: 20px;
                "
              >
                STOP
              </h1>
              <img src="../assets/images/pages/stop.png" style="width: 90px; height: 90px;" />
            </div>
            <!-- <h1
              class="f-bold"
              style="font-size: 39px; color: black;text-align:justify; text-justify: Avenir-word;"
            > -->
            <div
              class="d-flex flex-column f-bolder"
              style="font-size: 33px; color: black;text-align:justify; text-justify: Avenir-word;"
            >
              <span class="mb-1" style="text-decoration: underline; font-size: 43px; line-height: 60px;">
                FAILURE TO HEED THIS WARNING COULD RESULT IN LEGAL CONSEQUENCES.<br />
              </span>
              <span class="mb-1" style="text-decoration: underline; font-size: 45px;">
                DO NOT IGNORE THIS WARNING!<br />
              </span>
              <span class="mb-1" style="text-decoration: underline; font-size: 45px;">
                IF YOU IGNORE THIS WARNING, YOU MAY BE SUBJECTED TO PROPERTY THEFT WHEN YOU PURCHASE, LEASE OR MORTGAGE THIS PROPERTY.<br />
              </span>
              <span class="mb-1">
                TO HELP PREVENT THEFT OF THIS PROPERTY, __________________
                &nbsp;&nbsp;&nbsp; REGISTERED HIS/HER IDENTIFY WITH LANDLOCK, INC.<br />
              </span>
              <span class="mb-1">
                DO NOT PURCHASE, RENT OR MORTGAGE THIS PROPERTY UNLESS AND UNTIL __________________
                VERIFIES HIS/HER IDENTIFY WITH LANDLOCK, INC.
              </span>
              <span class="mb-1">
                TO VERIFY __________________'S IDENTIFY, __________________
                MUST GO TO <a href="#" style="text-decoration: underline;">LANDLOCK.US</a> TO GENERATE A CERTIFICATE THAT VERIFIES HIS/HER IDENTIFY.<br />
              </span>
              <span style="font-size: 24px;">
                FOR MORE INFORMATION ABOUT LANDLOCK, INC. PLEASE VISIT <a href="#" style="text-decoration: underline;">WWW.LANDLOCK.US</a>
              </span>
            </div>
            <!-- </h1> -->
          </div>
        <!-- </b-collapse> -->
        </div>
      </div>
    </div>
    <!-- <template v-if="AllProperties.length !== 0">
      <b-button v-b-modal.modal-delete-all class="mb-1" variant="danger">
        <div class="text-nowrap d-flex align-items-center">
          <span class="mr-1">Remove All</span>
          <feather-icon icon="TrashIcon" size="15" />
        </div>
      </b-button>
    </template> -->
    <modal-edit-property :property="property" />
    <modal-confirm-delete-all-property />
    <modal-confirm-delete-one-property :property="property" />
    <!-- <modal-certif :property="property" :ID="ID" /> -->
    <modal-verif-cert
      v-if="property && ID"
      ref="modalVerifCert"
      :i-d="ID"
      :property="property"
    />
    <map-image
      v-if="showGoogleImageModal"
      :property="property"
      @close="showGoogleImageModal = false"
    />
  </div>
</template>

<script>
import { jsPDF } from 'jspdf'

import {
  BRow, BCol, BSpinner, VBTooltip, BButton, BCollapse
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import ModalEditProperty from '@/views/components/ModalEditProperty.vue'
import ModalConfirmDeleteAllProperty from '@/views/components/ModalConfirmDeleteAllProperty.vue'
import ModalConfirmDeleteOneProperty from '@/views/components/ModalConfirmDeleteOneProperty.vue'
import ModalVerifCert from '@/views/components/certificate/ModalVerifCert.vue'
import MapImage from '@/views/components/register-property/MapImage.vue'
import QRCode from 'qrcode'
import format from 'date-fns/format'
import { addMonths } from 'date-fns'
import PropertyService from '../services/PropertyService'

export default {
  components: {
    BRow,
    BCol,
    ModalEditProperty,
    ModalConfirmDeleteAllProperty,
    ModalConfirmDeleteOneProperty,
    ModalVerifCert,
    BSpinner,
    BButton,
    BCollapse,
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
      // properties: [],
      dataUrl: null,
      showWarn: false
    }
  },
  computed: {
    ...mapState({
      propertyState: state => state.property,
      user: state => state.user.user,
    }),
    propertyID() {
      return parseInt(this.$route.params.id, 10)
    },
    url() {
      return `${process.env.VUE_APP_BACKOFFICE_MAIN}verif-form/${this.property?.generatedID}`
    },
    isCertificateExpired() {
      return !this.property?.certificateCreatedAt
        || addMonths(new Date(this.property?.certificateCreatedAt), 1) < new Date()
    },
  },
  mounted() {
    this.init()
    console.log(this.$refs.fileUpload)
    // console.log(this.$store.state.property.properties)
    // console.log(this.$store.state.property.properties.length)
  },
  created() {
    // this.fetchAllProperties()
  },
  methods: {
    async init() {
      await this.getUserProperty(this.propertyID)
      // await this.getProperties()
      QRCode.toDataURL(this.url, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        // quality: 0.3,
        margin: 2,
      }, (err, url) => {
        console.log(err, url)
        this.dataUrl = url
        this.showCertificate()
      })
    },
    handleShowWarn () {
      this.showWarn = !this.showWarn
    },
    showCertificate() {
      console.log(this.url, this.property)
      this.generatingCertificate = true
      const name = this.property.owners?.[0]?.name
      let addressFirstLine = this.property.fullAddress.split(',')[0]
      const addressSecondLine = this.property.fullAddress.split(',').slice(1).join(',')
      if (this.property.departmentNumber) {
        addressFirstLine = ` ${this.property.departmentNumber}, ${addressFirstLine}`
      }
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'mm', [297, 210])
      // const source = document.getElementById('print')
      /* doc.html(source, {
          callback(d) {
            d.autoPrint()
            // doc.save('certificate')
            d.output('dataurlnewwindow')
          },
          x: 15,
          y: 15,
          width: 180,
          windowWidth: 1000,
        }) */
      // eslint-disable-next-line global-require
      doc.addImage(require('@/assets/images/cert2.png'), 'JPEG', 0, 0, 210, 297)

      doc.setFontSize(45).setFont('helvetica', 'bold')
      doc.text('CERTIFICATE', 105, 30, { align: 'center' })

      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('Identification Number: ', 15, 59)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(this.property.generatedID ?? 'testid', 100, 59)
      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('Date Issued: ', 15, 69)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(format(new Date(this.property.certificateCreatedAt), 'MM-dd-yyyy'), 100, 69)

      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('Expiration Date: ', 15, 79)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(format(addMonths(new Date(this.property.certificateCreatedAt), 1), 'MM-dd-yyyy'), 100, 79)

      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('Property address:', 15, 89)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(`${addressFirstLine}\n${addressSecondLine}`, 100, 89)

      doc.setFontSize(16).setFont('helvetica', 'normal')
      doc.text(`${name} successfully verified his/her identity with LandLock\n`
          + 'which satisfies LandLock\'s warning attached to the recorded deed.', 15, 115)

      doc.setFontSize(16).setFont('helvetica', 'normal')
      doc.text('To authenticate this certificate, you MUST download the LandLock app \n'
          + 'available on Apple store and Google Play AND scan the QR code below.\n'
          + 'For assistance, visit https://landlock.us/authenticate .', 15, 140)

      doc.setFontSize(16).setFont('helvetica', 'normal')
      doc.text('It is recommended that you attach this page to the next recorded deed \n '
          + 'and/or mortgage.', 15, 165)

      doc.addImage(this.dataUrl, 'JPEG', 80, 195, 50, 50)

      // doc.save('certificate')
      this.$refs.certificate.innerHTML = `<object style="height: clamp(297px, 141vw, 1188px); width: 100%" data=${
        doc.output('datauristring')} type="application/pdf"></object>`
      // doc.autoPrint()
      // doc.output('dataurlnewwindow')

      this.generatingCertificate = false
    },
    printWarning() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'mm', [297, 210])
      const source = document.getElementById('warning')
      doc.html(source, {
        callback(d) {
          d.autoPrint()
          d.output('dataurlnewwindow')
        },
        x: 15,
        y: 15,
        width: 180,
        windowWidth: 1000,
      })
    },
    downloadWarning() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'mm', [297, 210])
      const source = document.getElementById('warning')
      doc.html(source, {
        callback(d) {
          d.save('warning_.pdf')
        },
        x: 15,
        y: 15,
        width: 180,
        windowWidth: 1000,
      })
    },
    generateCertificate() {
      this.generatingCertificate = true
      this.$router.push({
        path: `/verif-cert/${this.propertyID}`,
        params: {
          ID: this.property.generatedID,
        },
      })
    },
    chooseFiles(property) {
      console.log(property)
      document.getElementById('fileUpload').click()
      this.property1.id = property.id
    },
    handleFileChange(evt) {
      console.log(evt, '---')

      // PropertyService.updateProp(this.property1.id, this.property1)
      //   .then((response) => {
      //     console.log(response)
      //     this.$store.state.property.properties.data.filter(i => {
      //       if (i.id === this.property1.id) {
      //         i.status = true
      //       }
      //     })
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
      // evt.target.files contains Array-like FileList object
    },
    /*    getProperties() {
      this.$store.dispatch('property/fetchAllProperties').then(
        res => {
          // console.log(res.data)
          // res.data.filter((a, b) => {
          //   console.log(new Date(a.createdAt), new Date(b.createdAt));
          // })
          console.log()
          this.properties = res.data
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 1)
        },
        error => {
          this.loading = false
          this.message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        },
      )
    }, */
    /*    searchBy() {
      PropertyService.search(this.searchKey)
        .then(response => {
          console.log(response)
          this.$store.state.property.properties.data = response.data
        })
        .catch(e => {
          console.log(e)
        })
    }, */

    async getUserProperty(id) {
      try {
        const response = await PropertyService.findOne(id)
        if (!response.data) {
          this.showModal = true
          return
        }
        this.property = response.data.data
        console.log(this.property, 'property', response.data, 'response')
        this.showModal = true
      } catch (error) {
        console.log(error)
        console.log(
          (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString(),
        )
      }
    },

    /*    deleteProperty(id) {
      // console.log(id)
      PropertyService.deleteProp(id)
        .then(response => {
          console.log(response)
          // console.log(this.$store.state.property.properties.data.filter(x => x.id !== id))
          // this.$store.state.property.properties.data.filter(x => x.id !== id)
          this.getResults()
        })
        .catch(error => {
          this.messageEr = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
          console.log(this.messageEr)
        })
    }, */
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/_include.scss';
@import '~@core/scss/base/components/_variables-dark.scss';

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

.helloX {
  font-family: 'Avenir', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 23.4634px;
}

.yellow {
  background: yellow;
}

.key {
  font-family: 'Avenir', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: var(--primary);
}

.value {
  font-family: 'Avenir', sans-serif;
  font-style: normal;
  // font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #222;
}
</style>
