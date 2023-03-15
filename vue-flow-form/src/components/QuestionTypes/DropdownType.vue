<template>
  <span class="faux-form">
    <select
      ref="input"
      class
      :value="dataValue"
      :required="question.required"
      @change="onChange"
      @keydown="onKeyDownListener"
      @keyup="onKeyUpListener"
    >
      <option
        v-if="question.required"
        label=" "
        value=""
        disabled
        selected
        hidden
      >&nbsp;</option>
      <option
        v-for="(option, index) in question.options"
        :key="'o' + index"
        :disabled="option.disabled"
        :value="option.choiceValue()"
      >
        {{ option.choiceLabel() }}
      </option>
    </select>
    <span>
      <span
        class="f-empty"
        :class="{'f-answered': this.question.answer && this.question.answered}"
      >{{ answerLabel }}</span>
      <span class="f-arrow-down">
        <svg
          id="Capa_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="-163 254.1 284.9 284.9"
          style
          xml:space="preserve"
        >
          <g>
            <path d="M119.1,330.6l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,1-6.6,2.9L-20.5,428.5l-112.2-112.2c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,0.9-6.6,2.9l-14.3,14.3c-1.9,1.9-2.9,4.1-2.9,6.6c0,2.5,1,4.7,2.9,6.6l133,133c1.9,1.9,4.1,2.9,6.6,2.9s4.7-1,6.6-2.9l133.1-133c1.9-1.9,2.8-4.1,2.8-6.6C121.9,334.7,121,332.5,119.1,330.6z" />
          </g>
        </svg>
      </span>
    </span>
  </span>
</template>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import BaseType from './BaseType.vue'
import { QuestionType } from '../../models/QuestionModel'

export default {
  name: QuestionType.Dropdown,
  components: {
  },
  extends: BaseType,
  computed: {
    answerLabel() {
      for (let i = 0; i < this.question.options.length; i++) {
        const option = this.question.options[i]

        if (option.choiceValue() === this.dataValue) {
          return option.choiceLabel()
        }
      }

      return this.question.placeholder
    },
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
  },
}
</script>
