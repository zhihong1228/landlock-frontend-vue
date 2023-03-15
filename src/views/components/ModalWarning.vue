<template>
  <!-- add Property Modal -->
  <b-modal
    id="modal-warning"
    ref="warning-modal"
    ok-only
    centered
    ok-title="Download"
    @ok="handleOk"
  >
    <div
      id="print"
      style="max-width: 500px"
      class="d-flex justify-content-center flex-column align-items-center"
    >
      <h4 style="color:red; margin-bottom:10px;">
        WARNING
      </h4>

      <span style="font-weight:bold">

        <span style="text-transform: uppercase;color:red;">
          {{ property.owners[0].name }}
          <span v-if="property.owners.length > 1"> AND <span v-for="(item) in items"> {{ item.name }} </span>  </span>
        </span>
        (THE GRANTEE[S] OR PARTY[IES] OF THE SECOND PART IN THIS DEED/INDENTURE/DOCUMENT) HAS/HAVE REGISTERED ITS/HIS/HER/THEIR IDENTITY(IES) WITH THE DEED REGISTRY LLC D/B/A LANDLOCK.  EVERY PROSPECTIVE PURCHASER, MORTGAGEE AND TENANT OF THE SUBJECT PROPERTY AND ALL OTHER INTERESTED PARTIES SHOULD REQUIRE THAT
        <span style="text-transform: uppercase;color:red;">
          {{ property.owners[0].name }}
          <span v-if="property.owners.length > 1"> AND <span v-for="(item) in items"> {{ item.name }} </span>  </span>
        </span>
        OBTAIN FROM THE DEED REGISTRY LLC D/B/A LANDLOCK, AND PROVIDE, VERIFICATION(S) OF ITS/HIS/HER/THEIR IDENTITY(IES) PRIOR TO COMPLETING ANY PURCHASE, MORTGAGE LOAN, LEASE OR OTHER TRANSACTION WITH RESPECT TO THE PROPERTY.  SUCH VERIFICATION(S) CAN BE OBTAINED ONLY BY THE REGISTRANT(S) FROM THE DEED REGISTRY LLC D/B/A LANDLOCK AT LANDLOCK.US, LANDLOCKUS.COM OR LANDLOCKUSA.COM.
        SUCH VERIFICATION(S) CAN BE AUTHENTICATED BY
        <span style="color:red;">
          {{ property.generatedID }}.
        </span>
      </span>

    </div>

  </b-modal>

</template>

<script>
import { jsPDF } from 'jspdf'
import {
  BModal, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import PropertyService from '@/services/PropertyService'

export default {
  components: {
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    property: Object,
  },
  data() {
    return {
      errors: [],
    }
  },
  computed: {
  },
  created() {
  },

  mounted() {
    console.log('==========>', this.property)
  },
  methods: {
    handleOk() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF()
      const source = document.getElementById('print')
      console.log(source)
      // window.html2canvas = html2canvas
      doc.html(
        source,
        {
          callback: d => {
            d.save('warning')
            this.$router.push('/')
          },
          x: 10,
          y: 10,
          width: 450,
          windowWidth: 1200,
        },
      )
    },
  },
}
</script>

<style>

</style>
