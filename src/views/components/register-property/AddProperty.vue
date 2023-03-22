<template>
  <!-- <property-flow-form :adding-property="true" /> -->
  <div>
    <!-- <b-row>
      <b-col cols="12">
          <Sidebar :step="step" />
      </b-col>
      <b-col cols="7">

      </b-col>
    </b-row> -->
    <Sidebar />
  </div>
</template>

<script>
import {
    BRow,
    BCol,
    BButton,
    BImg,
    BSpinner,
} from 'bootstrap-vue'
import PropertyFlowForm from '@/views/components/register-property/PropertyFlowForm.vue'
import { mapState } from 'vuex'
import Sidebar from './Sidebar/index.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BImg,
    BSpinner,
    PropertyFlowForm,
    Sidebar
  },
  directives: {
  },
  data() {
    return {
      errors: [],
      email: null,
      step: 1
    }
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  methods: {},
}
</script>

<style>

</style>
