<template>
  <property-flow-form :adding-property="true" />
</template>

<script>
import PropertyFlowForm from '@/views/components/register-property/PropertyFlowForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    PropertyFlowForm,
  },
  directives: {
  },
  data() {
    return {
      errors: [],
      email: null,
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
