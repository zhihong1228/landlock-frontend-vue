<template>
  <div style=" display: flex;justify-content: center">
    <div
      class=""
      style="max-width: 999450px; width: 100%; text-align: left; vertical-align: center;"
    >
      <!--      <b-form-datepicker
        id="datepicker-dateformat2"
        v-model="date"
        :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit', }"
        locale="en"
        size="lg"
        :placeholder="question.placeholder"
        show-decade-nav
        label-prev-decade="-10 years"
        label-next-decade="+10 years"
      />-->

      <div class="flex-grow-1 d-flex flex-wrap justify-content-center w-100 custom-dob">
        <b-form-select
          id="select"
          v-model="month"
          :options="monthOptions"
          size="custom-size"
          :placeholder="question.placeholder"
          class="custom-size month"
          style=""
          @change="onChange2"
        />
        <b-form-input
          id="input"
          v-model="day"
          type="number"
          :min="1"
          :max="2"
          size="lg"
          :formatter="formatDay"
          :placeholder="'DD'"
          class="custom-size day"
          style=""
          @input="onChange2"
        />
        <b-form-input
          id="input2"
          v-model="year"
          type="number"
          :formatter="formatYear"
          size="lg"
          :placeholder="'YYYY'"
          class="custom-size year"
          @input="onChange2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {

  opacity: 1!important;

}
.custom-size {
  display: inline-block !important;
  height: 70px!important;
  border: 2px solid var(--primary)!important;
  font-size: .6em!important;
  font-weight: bold!important;
  color: var(--primary);
}
.custom-size::placeholder {
  color: rgba(64, 124, 81, 0.64);
  font-weight: bold;
}
.custom-dob .day, .custom-dob .year, .custom-dob .month {
  border-radius: 10px!important;
}
@media (max-width: 768px) {
  .custom-size {
    max-width: 300px!important;
    margin: 10px 10px!important;
    border-bottom: 0!important;
    border-top:0!important;
    box-shadow: 0 3px 10px 0 #407c5199!important;
  }
  .custom-dob .day {
  }
}
@media (min-width: 768px) {
  .custom-size {
    max-width: 170px!important;
    margin: 10px 0px!important;
  }
  .custom-dob .month {
    border-radius: 10px 0 0 10px!important;
  }
  .custom-dob .day {
    border-radius: 0!important;
    border-left: 0!important;
    border-right: 0!important;
  }
  .custom-dob .year {
    border-radius: 0 10px 10px 0!important;
  }
}
</style>

<style>
.b-form-btn-label-control.form-control > label {
  display: flex;
  align-items: center;
}
</style>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import { BFormDatepicker, BFormInput, BFormSelect } from 'bootstrap-vue'
import TextType from './TextType.vue'
import { QuestionType } from '../../models/QuestionModel'

export default {
  name: QuestionType.Date,
  components: {
    BFormDatepicker,
    BFormInput,
    BFormSelect,
  },
  extends: TextType,
  data() {
    return {
      inputType: 'date',
      month: 1,
      day: null,
      year: null,
      monthOptions: [
        {
          value: 1,
          text: 'January',
        },
        {
          value: 2,
          text: 'February',
        },
        {
          value: 3,
          text: 'March',
        },
        {
          value: 4,
          text: 'April',
        },
        {
          value: 5,
          text: 'May',
        },
        {
          value: 6,
          text: 'June',
        },
        {
          value: 7,
          text: 'July',
        },
        {
          value: 8,
          text: 'August',
        },
        {
          value: 9,
          text: 'September',
        },
        {
          value: 10,
          text: 'October',
        },
        {
          value: 11,
          text: 'November',
        },
        {
          value: 12,
          text: 'December',
        },
      ],
    }
  },
  computed: {
    /* date: {
      get() {
        if (!this.dataValue) {
          return null
        }
        const split = this.dataValue.split('-')
        return `${split[2]}-${split[0]}-${split[1]}`
      },
      set(value) {
        if (!value) return
        const split = value.split('-')
        const formatted = `${split[1]}-${split[2]}-${split[0]}`
        this.onChange(undefined, undefined, formatted)
      },
    }, */
  },
  created() {
    if (this.dataValue) {
      const split = this.dataValue.split('-')
      this.year = parseInt(split[2], 10)
      this.day = parseInt(split[1], 10)
      this.month = parseInt(split[0], 10)
    }
  },
  methods: {

    formatYear(e) {
      return String(e).substring(0, 4)
    },
    formatDay(e) {
      return String(e).substring(0, 2)
    },
    onChange2() {
      const { year } = this
      const day = (`0${this.day}`).slice(-2)
      const month = (`0${this.month}`).slice(-2)
      if (!isNaN(this.month)
         && !isNaN(parseInt(this.day))
         && !isNaN(parseInt(this.year))) {
        const formatted = `${month}-${day}-${year}`
        console.log(`formatted: ${formatted}`, this.month, month, this.day, day, this.year)
        this.onChange(undefined, undefined, formatted)
      }
    },
    validate() {
      console.log('validate', this.question.min, this.question.max, this.dataValue)
      if (this.question.min && this.dataValue < this.question.min) {
        return false
      }
      if (this.day < 1 || this.day > 31) {
        return false
      }
      if (this.year < 1900 || this.year > 2022) {
        return false
      }

      if (this.question.max && this.dataValue > this.question.max) {
        return false
      }

      return !this.question.required || this.hasValue
    },
  },
}
</script>
