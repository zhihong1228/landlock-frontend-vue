<!--UseLess Deprecated-->
<template>
  <b-modal
    id="editPropertyModal"
    ref="editPropertyModal"
    centered
    size="lg"
    scrollable
    hide-header-close
    :hide-footer="true"
  >

    <div
      slot="modal-header"
      class="d-flex p-0 w-100 item"
    >
      <div
        class="item d-flex px-1 w-100"
        style="box-shadow: rgba(0, 0, 0, 0.2) 0 calc(1px) 15px; padding-top: 1.1rem; padding-bottom: 1.1rem"
      >
        <feather-icon
          icon="XIcon"
          size="25"
          class="text-dark"
          @click="$refs['editPropertyModal'].hide()"
        />
        <div
          class="d-inline ml-1 font-circular text-dark"
          style="font-size: 1.3rem; white-space: nowrap; text-overflow: ellipsis; width: 85%;
                overflow: hidden;-webkit-line-clamp: 1;"
        >
          Edit Property
        </div>
      </div>
    </div>
    <register-property
      :property-data="property"
      :show-logout="false"
    />
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
  },
  data() {
    return {

    }
  },
  created() {
  },
  mounted() {
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';

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
