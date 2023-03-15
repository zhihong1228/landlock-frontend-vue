<template>
  <!-- verify certificate Modal -->
  <b-modal
    id="modal-certif"
    ref="cert-modal"
    size="lg"
    title="CERTIF"
    ok-only
    centered
    ok-title="Download"
    @ok="handleOk"
  >
    <div
      style="max-width: 500px"
      class="d-flex justify-content-center flex-column align-items-center"
    >
      <div
        v-if="!ID"
        class="d-flex justify-content-center flex-column align-items-center"
      >
        <b-spinner
          class="text-primary"
          style="height: 35px;width: 35px"
        />
        Generating Certificate
      </div>

      <div
        v-else
        id="print"
      >
        <h4 class="my-3">
          Please click download button to download your certificate.
        </h4>
        <!--        <div class="position-relative">
          <b-img
            :src="require('@/assets/images/certificate.jpg')"
            fluid
            class="my-1"
          />
          <div
            class="position-absolute"
          >
            &lt;!&ndash;            <vue-qrcode
                          id="qr"
                          style="left: 10%;bottom: 10%;width: 100px"
                          :value="url"
                          :size="110"
                          level="H"
                          render-as="svg"
                        />&ndash;&gt;
          </div>
        </div>-->
      </div>
    </div>

  </b-modal>

</template>

<script>
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'
// import VueQrcode from 'vue-qrcode'
import {
  BModal, VBModal, BSpinner,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BModal,
    // VueQrcode,
    BSpinner,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    property: {
      type: Object,
      required: true,
    },
    // eslint-disable-next-line vue/prop-name-casing
    ID: { type: String, required: true },
  },
  data() {
    return {
      errors: [],
      // qrValue: `${process.env.VUE_APP_BACKOFFICE_MAIN === window.location.href ? process.env.VUE_APP_FRONT_MAIN : process.env.VUE_APP_FRONT_LOCAL}verif-form?id=${this.$store.state.user.user.id}`,
      showModal: false,
      dataUrl: null,
    }
  },
  computed: {
    url() {
      return `${process.env.VUE_APP_BACKOFFICE_MAIN}verif-form/${this.ID}`
    },
  },
  created() {
    console.log(this.property, '.............tg')
  },

  mounted() {
    console.log(this.property, 'hhtg')
    QRCode.toDataURL(this.url, {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      // quality: 0.3,
      margin: 2,
    }, (err, url) => {
      console.log(err, url)
      this.dataUrl = url
    })
    this.showModal = true
  },
  methods: {
    handleOk() {
      const name = this.property.owners?.[0]?.name
      let addressFirstLine = this.property.fullAddress.split(',')[0]
      const addressSecondLine = this.property.fullAddress.split(',')[1]
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
      doc.addImage(require('@/assets/images/certificate.jpg'), 'JPEG', 0, 0, 210, 297)

      doc.addImage(this.dataUrl, 'JPEG', 31, 209, 58, 58)

      doc.setFontSize(46).setFont('helvetica', 'bold')
      doc.text('CERTIFICATE', 105, 55, { align: 'center' })

      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('ID :', 15, 90)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(this.ID, 30, 90)

      doc.setFontSize(20).setFont('helvetica', 'bold')
      doc.text('Property address:', 15, 103)
      doc.setFontSize(20).setFont('helvetica', 'normal')
      doc.text(`${addressFirstLine}\n${
        addressSecondLine}`, 80, 103)

      doc.setFontSize(16).setFont('helvetica', 'normal')
      doc.text(`${name} successfully verified his/her identity with Landlock which\n`
          + 'satisfies Landlock\'s warning attached to the recorded deed.', 15, 145)

      doc.setFontSize(16).setFont('helvetica', 'normal')
      doc.text('To authenticate the certificate, download the LandLock app available on\n'
          + 'Apple store and Google Play.\n'
          + 'For assistance, visit https://landlock.us/authenticate .', 15, 165)

      doc.save('certificate')
      // doc.autoPrint()
      // doc.output('dataurlnewwindow')
    },
  },
}
</script>

<style>

</style>
