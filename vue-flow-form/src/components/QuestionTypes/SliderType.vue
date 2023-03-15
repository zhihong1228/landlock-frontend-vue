<template>
  <div>
    <vue-slider
      ref="input"
      v-bind="options"
      :value="value"
      :required="question.required"
      :min="question.min"
      :max="question.max"
      :tooltip-formatter="kFormatter"
      :interval="question.interval"
      :placeholder="placeholder"
      :tooltip="'none'"
      @change="onChange2"
      @keyup.enter.prevent="onEnter"
      @keyup.tab.prevent="onEnter"
    />
    <money
      v-if="question.money"
      ref="input"
      v-bind="question.money"
      :type="inputType"
      :value="value || 0"
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
      v-else
      ref="input"
      :type="inputType"
      :value="value"
      :required="question.required"
      :min="question.min"
      :max="question.max"
      :placeholder="placeholder"
      @keydown="onKeyDown"
      @keyup="onChange"
      @keyup.enter.prevent="onEnter"
      @keyup.tab.prevent="onEnter"
      @focus="setFocus"
      @blur="unsetFocus"
      @change="onChange"
    >
  </div>
</template>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import VueSlider from 'vue-slider-component'
import BaseType from './BaseType.vue'

import 'vue-slider-component/theme/material.css'
import { QuestionType } from '../../models/QuestionModel'
import { Money } from '../../v-money'
import TheMask from 'vue-the-mask/src/component.vue'

export default {
  name: QuestionType.Text,
  components: {
    VueSlider,
    Money,
    TheMask,
  },
  extends: BaseType,

  data() {
    return {
      inputType: 'text',
      canReceiveFocus: true,
      kFormatter: v => (v === 1000000
        ? '1M'
        : ~~(v / 1000) + (v / 1000 >= 1 ? 'K' : '')),
      options: {
        dotSize: 14,
        width: 'auto',
        height: 4,
        contained: false,
        direction: 'ltr',
        data: null,
        dataLabel: 'label',
        dataValue: 'value',
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        dotAttrs: void 0,
        process: true,
        dotStyle: {
        },
        railStyle: {
          backgroundColor: '#000',
          color: '#000',
          borderRadius: 0,
          opacity: 1,
          height: '4px',
          marginTop: '-10px',
        },
        processStyle: {
        },
        tooltipStyle: {
          borderColor: 'red',
          textShadow: '1px 1px 4px #000000',
          fontSize: '16px',
        },
        stepStyle: {
        },
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      },
    }
  },
  mounted() {
    console.log('mounted', this.value, this.question)
  },

  methods: {
    onChange2(value) {
      if (value < this.question.min) {
        value = null
      } else if (value > this.question.max) {
        value = null
      }
      console.log('onChange3', value)
      this.onChange(null, null, value)
    },
    validate() {
      if (this.question.required) {
        if (this.value === null || this.value === '' || this.value < this.question.min || this.value > this.question.max) {
          return false
        }
      }
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
