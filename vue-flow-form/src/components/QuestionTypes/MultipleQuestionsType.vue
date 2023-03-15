<template>
  <div style="display: flex; flex-flow: column wrap; justify-content: center; align-items: center">
    <div
      v-for="(ques, index) of question.questions"
      :key="index"
      :style="{
        display: ques.type === 'lat-long' || ques.type === 'none' ? 'none' : 'flex',
        flexFlow:'column',
        flexGrow: '1',
        justifyContent: 'end',
        maxWidth: $screen.width > 600
          ? ques.maxWidthPC + 'px'
          : ques.maxWidth + 'px',
        width: $screen.width > 600
          ? ques.widthPC + 'px'
          : '100%',
        marginBottom: '50px'}"
    >
      <span
        v-if="ques.title"
        class="f-text"
      >
        {{ ques.title }}&nbsp;
        <!-- Required ques are marked by an asterisk (*) -->
        <span
          v-if="ques.required"
          class="f-required"
          role="note"
          :aria-label="language.ariaRequired"
        ><span
          aria-hidden="true"
        >*</span></span>

        <span
          v-if="ques.inline"
          class="f-answer"
        >
          <component
            :is="ques.type"
            ref="ques"
            v-model="dataValue"
            :active="active"
            :language="language"
            :ques="ques"
            @next="onEnter"
          />
        </span>
      </span>
      <div :style="{margin: '10px'}">
        <span
          v-if="
            ques.type === 'FlowFormDropdownType'"
        ><!--
          <select
            v-if="false"
            ref="input"
            class
            :required="ques.required"
            :value="(dataValue || ['s'])[0]"
            @change="(e) => {
              onChange(e, index);
              refresh = Math.random();
            }"
            @keydown="onKeyDownListener"
            @keyup="onKeyUpListener"
          >
            <option
              v-if="ques.required"
              disabled
              hidden
              label=" "
              selected
              value=""
            >&nbsp;</option>
            <option
              v-for="(option, index) in ques.options"
              :key="'o' + index"
              :disabled="option.disabled"
              :value="option.choiceValue()"
            >
              {{ option.choiceLabel() }}
            </option>
          </select>-->
          <div v-if="true">
            <v-select
              :value=" quesValue(index) || ques.options[0].label"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="op => op.choiceLabel()"
              :options="ques.options"
              class="select-size-md style-chooser"
              @input="onChange2($event, index)"
            />
            <div style="opacity: 0; height: 0; width: 0">{{ refresh }}</div>
          </div>

        </span>
        <money
          v-else-if="ques.money"
          ref="input"
          v-bind="ques.money"
          :masked="ques.masked"
          :max="ques.max"
          :min="ques.min"
          :placeholder="ques.placeholder || placeholder"
          :required="ques.required"
          :type="inputType"
          :value="quesValue(index)"
          @change="quesOnChange($event, index)"
          @keydown.native="onKeyDown"
          @keyup.native="quesOnChange($event, index)"
          @focus.native="setFocus"
          @blur.native="unsetFocus"
          @keyup.native.enter.prevent="onEnter"
          @keyup.native.tab.prevent="onEnter"
        />
        <the-mask
          v-else-if="ques.mask"
          ref="input"
          :mask="ques.mask"
          :masked="false"
          :max="ques.max"
          :min="ques.min"
          :placeholder="ques.placeholder || placeholder"
          :required="ques.required"
          :type="inputType"
          :value="quesValue(index)"
          @change="quesOnChange($event, index)"
          @keydown.native="onKeyDown"
          @keyup.native="quesOnChange($event, index)"
          @focus.native="setFocus"
          @blur.native="unsetFocus"
          @keyup.native.enter.prevent="onEnter"
          @keyup.native.tab.prevent="onEnter"
        />
        <input
          v-else
          ref="input"
          :class="{ 'address-input': question.autoFillAddress }"
          :max="ques.max"
          :min="ques.min"
          :placeholder="ques.placeholder || placeholder"
          :required="ques.required"
          :type="inputType"
          :value="quesValue(index)"
          @blur="unsetFocus"
          @change="quesOnChange($event, index, ques)"
          @focus="setFocus"
          @keydown="onKeyDown"
          @keyup="quesOnChange($event, index, ques)"
          @keyup.enter.prevent="onEnter"
          @keyup.tab.prevent="onEnter"
        >

      </div>
    </div>
  </div>
</template>

<style scoped>
.address-input {
  max-width: 810px!important;
  //width: clamp(300px, 70vw, 700px)!important;
}
</style>

<style>
.style-chooser .vs__dropdown-toggle {
  /*width: clamp(350px, 50%, 500px)!important;*/
  flex-grow: 1;
  border: 1px solid black!important;
  padding: 0.6rem!important;
  border-radius: 0!important;
}
.style-chooser .vs__dropdown-menu {
  max-height: 250px;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: white!important;
  border: none;
  color: var(--primary) !important;
}
.style-chooser .vs__dropdown-option--selected {
  background: var(--primary) !important;
  color: white!important;
}
.style-chooser .vs__dropdown-option {
  padding: 15px 25px !important;
}
.style-chooser .vs__selected {
  color: var(--primary) !important;
}
.style-chooser .vs__clear{
  display: none;
}
.style-chooser .vs__open-indicator {
  fill: var(--primary);
  font-weight: 300;
  margin-right: 8px;
}

.style-chooser .vs__search {
  width: clamp(350px, 50%, 500px)!important;
  display: none;
}
</style>

<script>
/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import TheMask from 'vue-the-mask/src/component.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import BaseType from './BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'
import { Money } from '../../v-money'

export default {
  name: QuestionType.Text,
  components: {
    TheMask,
    Money,
    VSelect: vSelect,
  },
  extends: BaseType,

  data() {
    return {
      refresh: null,
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
    answerLabel() {
      if (this.question.type !== QuestionType.Dropdown) return ''
      for (let i = 0; i < this.question.questions[0].options.length; i++) {
        const option = this.question.options[i]

        if (this.dataValue && option.choiceValue() === this.dataValue[0]) {
          return option.choiceLabel()
        }
      }

      return this.question.questions[0].placeholder
    },
  },
  mounted() {
    if (this.question.autoFillAddress) {
      setTimeout(() => {
        this.autocomplete = new window.google.maps.places.Autocomplete(
          this.$refs.input[0],
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
    onKeyDownListener($event) {
      if ($event.key === 'ArrowDown' || $event.key === 'ArrowUp') {
        this.setAnswer(this.dataValue)
      } else if ($event.key === 'Enter' && this.hasValue) {
        this.focused = false
        this.blur()
      }
    },
    onKeyUpListener($event) {
      if ($event.key === 'Enter' && this.isValid()) {
        $event.stopPropagation()
        this._onEnter()
        this.$emit('next')
      }
    },
    getResults() {
      const place = this.autocomplete.getPlace()
      console.log(place)
      setTimeout(() => {
        this.onChange(undefined, 0, this.$refs.input[0].value)
        this.onChange(undefined, 2, { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
      }, 10)
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
    quesOnChange(event, index, ques) {
      if (this.question.autoFillAddress && ques.autoFillAddress) return false
      this.onChange(event, index)
      return true
    },
    quesValue(index) {
      if (this.value) return this.value[index]
      return null
    },
    onChange2(value, index) {
      if (value === 'Select Question') {
        this.onChange(undefined, index, null)
      } else this.onChange(undefined, index, value)
      this.$nextTick(() => {
        this.refresh = Math.random()
      })
    },
    // validate() {
    //   console.log('validate')
    //   return false
    //   return !this.question.required || this.hasValue
    // },
  },
}
</script>
