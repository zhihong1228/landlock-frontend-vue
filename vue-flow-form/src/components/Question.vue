<script>
export default {
  name: 'Question',

  data() {
    return {
      question: null,
    }
  },

  watch: {
    'question.answer': function (val) {
      this.$emit('input', val)
    },
  },

  render() {
    return null
  },
}
</script>
