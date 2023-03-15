<template>
  <span :data-placeholder="inputType === 'date' ? placeholder : null">
    <datalist
      id="listxxx"
    >
      <option
        v-for="text in titles
        "
        :key="text"
      >{{ text }}</option>
    </datalist>
    <money
      v-if="question.money"
      ref="input"
      :readonly="question.readonly"
      v-bind="question.money"
      :type="inputType"
      :value="value"
      :required="question.required"
      :placeholder="placeholder"
      :min="question.min"
      :max="question.max"
      @input="onChange2"
      @keydown.native="onKeyDown"
      @focus.native="setFocus"
      @blur.native="unsetFocus"
      @keyup.native.enter.prevent="onEnter"
      @keyup.native.tab.prevent="onEnter"
    />
    <the-mask
      v-else-if="question.mask"
      ref="input"
      :readonly="question.readonly"
      :mask="question.mask"
      :masked="false"
      :type="inputType"
      :value="value"
      :required="question.required"
      :placeholder="placeholder"
      :min="question.min"
      :max="question.max"
      @keydown.native="onKeyDown"
      @keyup.native="onChange"
      @focus.native="setFocus"
      @blur.native="unsetFocus"
      @keyup.native.enter.prevent="onEnter"
      @keyup.native.tab.prevent="onEnter"
      @change="onChange"
    />
    <input
      v-else-if="!question.autoFillTexts || question.autoFillTexts.length === 0"
      ref="input"
      :readonly="question.readonly"
      :type="inputType"
      :value="value"
      :required="question.required"
      :min="question.min"
      :max="question.max"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @keyup="onChange3"
      @keyup.enter.prevent="onEnter"
      @keyup.tab.prevent="onEnter"
      @focus="setFocus"
      @blur="unsetFocus"
      @change="onChange3"
    >
    <input
      v-else
      ref="input"
      list="listxxx"
      :readonly="question.readonly"
      :type="inputType"
      :value="value"
      :required="question.required"
      :min="question.min"
      :max="question.max"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @keyup="onChange3"
      @keyup.enter.prevent="onEnter"
      @keyup.tab.prevent="onEnter"
      @focus="setFocus"
      @blur="unsetFocus"
      @change="onChange3"
    >
  </span>
</template>

<script>
import TheMask from 'vue-the-mask/src/component.vue'
import nycTitles from '@/views/components/register-property/nyc-titles'
import njTitles from '@/views/components/register-property/nj-titles'
import { onlyUnique } from '@/utils'
import BaseType from './BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'
import { Money } from '../../v-money'

const { google } = window

export default {
  name: QuestionType.Text,
  components: {
    TheMask,
    Money,
  },
  extends: BaseType,

  data() {
    return {
      document,
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
  computed: {
    titles() {
      return [...njTitles, ...nycTitles].map(business => business.title).filter(onlyUnique).sort()
    },
  },
  mounted() {
    // console.log('value', this.value, this.dataValue)
    if (this.question.autoFillAddress) {
      setTimeout(() => {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.$refs.input,
          {
            fields: ['address_components', 'geometry'],
            types: ['address'],
          },
        )
        this.autocomplete.addListener('place_changed', this.getResults)
      }, 500)
    }
  },
  methods: {
    getResults() {
      const place = this.autocomplete.getPlace()
      if (!place) return
      let address1 = ''
      let postcode = ''
      for (const component of place.address_components) {
        const componentType = component.types[0]
        // eslint-disable-next-line default-case
        switch (componentType) {
          case 'street_number': {
            address1 = `${component.long_name} ${address1}`
            break
          }

          case 'route': {
            address1 += component.short_name
            break
          }

          case 'postal_code': {
            postcode = `${component.long_name}${postcode}`
            break
          }

          // case 'postal_code_suffix': {
          //   postcode = `${postcode}-${component.long_name}`
          //   break
          // }
          case 'locality':
            this.property1.city = component.long_name
            break
          case 'administrative_area_level_1': {
            this.property1.state = component.short_name
            break
          }
            //   case 'country':
            //     this.property1.country = component.long_name
            //     break
        }
      }
      this.property1.street = address1
      this.property1.zip = postcode
    },
    onChange2(value) {
      console.log('onChange2', value)
      if (!this.value && value === 0) return
      this.onChange(null, null, value)
    },
    onChange3(a, b, c) {
      /* setTimeout(() => {
        const datalist = this.document.querySelector('#listxxxx')
        console.log(datalist)
        if (datalist) datalist.id = 'listxxx'
      }, 1500) */
      console.log('onChange3', a, b, c)
      this.onChange(a, b, c)
    },
    validate() {
      if (this.question.mask && this.hasValue) {
        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(mask => mask.length === this.dataValue.length)
        }

        return this.dataValue.length === this.question.mask.length
      }

      return !this.question.required || this.hasValue
    },
  },
}
</script>
