<template>
  <h3> You are almost done. Now, we will ask you some questions to verify your identity. </h3>
</template>

<script>

export default {
  components: {
    // BFormInvalidFeedback,
    // eslint-disable-next-line vue/no-unused-components
  },
  props: {
    property: Object,
    type: String,
  },
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {
  },

  methods: {
  },
}
</script>

<style lang="scss">
  @import "~@core/scss/vue/libs/vue-select.scss";
  @import '~@core/scss/vue/libs/vue-wizard.scss';
</style>
