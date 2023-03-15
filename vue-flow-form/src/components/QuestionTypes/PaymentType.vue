<template>
  <div></div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

  import BaseType from './BaseType.vue'
  import { QuestionType } from '../../models/QuestionModel'
  const { google } = window

  export default {
    extends: BaseType,
    name: QuestionType.Text,
    components: {
    },

    data() {
      return {
        inputType: 'text',
        canReceiveFocus: true,
        autocomplete: null,
        property1: {
          name: '',
          category: null,
          price: '',
          street: '',
          state: '',
          city: '',
          zip: null,
          departmentNumber: '',
          numberBlock: null,
          numberLot: null,
          ownership: true,
          owners: [],
        },
      }
    },
    mounted() {
      // this.onChange(null, null, 'completed')
    },
    methods: {
      validate() {
        if (this.question.mask && this.hasValue) {
          if (Array.isArray(this.question.mask)) {
            return this.question.mask.some(mask => mask.length === this.dataValue.length)
          }

          return this.dataValue.length === this.question.mask.length
        }
        console.log(this.question.answer)
        return !this.question.required || this.question.answer === 'completed'
      }
    }
  }
</script>
