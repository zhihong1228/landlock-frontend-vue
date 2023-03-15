<template>
  <!-- add Property Modal -->
  <b-modal
    id="addProperty"
    ref="add-property-modal"
    hide-footer
    title="Register Property"
    size="lg"
    centered
    hide-headerssss
  >
    <register-property :adding-property="true" />
  </b-modal>

</template>

<script>
import {
  BModal, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import RegisterProperty from '@/views/components/register-property/PropertyFlowForm.vue'

export default {
  components: {
    BModal,
    RegisterProperty,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  props: {
    property: Object,
    type: String,
  },
  data() {
    return {
      // property:'property'
    }
  },

  // mounted() {
  //   console.log(this.type)
  // },

}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';
// @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css';
// @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css';

/* Media Query for Mobile Devices */
        @media (max-width: 480px) {
            .modal {
                padding: 0;
            }
            .modal-dialog {
              margin: 0;
            }
            .close {
              font-size: 3rem;
            }
        }

</style>
