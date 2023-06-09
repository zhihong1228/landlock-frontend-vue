// Used as the basis and extended by other Question Type components

<script>
/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import QuestionModel, { QuestionType } from '../../models/QuestionModel'
import LanguageModel from '../../models/LanguageModel'
import { IsMobile } from '../../mixins/IsMobile'

export default {
  name: 'FlowFormBaseType',
  mixins: [
    IsMobile,
  ],
  props: {
    language: LanguageModel,
    question: QuestionModel,
    active: Boolean,
    value: [String, Array, Boolean, Number, Object],
  },
  data() {
    return {
      dirty: false,
      dataValue: null,
      answer: null,
      enterPressed: false,
      allowedChars: null,
      alwaysAllowedKeys: ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'],
      focused: false,
      canReceiveFocus: false,
    }
  },

  computed: {
    placeholder() {
      return this.question.placeholder || this.language.placeholder
    },

    hasValue() {
      return this.checkValue(this.dataValue)
    },
  },
  mounted() {
    if (this.question.answer) {
      this.dataValue = this.answer = this.question.answer
    } else if (this.question.multiple) {
      this.dataValue = []
    }
  },
  methods: {
    /**
     * This method can be overriden in custom components to
     * change the answer before going through validation.
     */
    fixAnswer(answer) {
      return answer
    },

    getElement() {
      let el = this.$refs.input

      // Sometimes the input is nested so we need to find it
      while (el && el.$el) {
        el = el.$el
      }

      return el
    },

    setFocus() {
      this.focused = true
    },

    // eslint-disable-next-line no-unused-vars
    unsetFocus($event) {
      this.focused = false
    },

    focus() {
      if (!this.focused) {
        const el = this.getElement()

        if (el && el.focus) {
          el.focus()
        }
      }
    },

    blur() {
      const el = this.getElement()

      if (el && el.blur) {
        el.blur()
      }
    },

    onKeyDown($event) {
      this.enterPressed = false
      clearTimeout(this.timeoutId)

      if ($event) {
        if ($event.key === 'Enter' && !$event.shiftKey) {
          this.unsetFocus()
        }

        if (this.allowedChars !== null) {
          // Check if the entered character is allowed.
          // We always allow keys from the alwaysAllowedKeys array.
          if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
            $event.preventDefault()
          }
        }
      }
    },

    onChange($event, index, value) {
      console.log('onChangex', $event, index, value)
      this.dirty = true
      if (index != null) {
        if (!this.dataValue) {
          this.dataValue = []
        }
        if (value !== undefined) {
          this.dataValue[index] = value
        } else this.dataValue[index] = $event.target.value
      } else if (value !== undefined) {
        this.dataValue = value
      } else {
        this.dataValue = $event.target.value
      }

      this.onKeyDown()
      this.setAnswer(this.dataValue)
    },

    onEnter() {
      this._onEnter()
    },

    _onEnter() {
      this.enterPressed = true

      this.dataValue = this.fixAnswer(this.dataValue)
      this.setAnswer(this.dataValue)
      this.isValid() ? this.blur() : this.focus()
    },

    setAnswer(answer) {
      this.question.setAnswer(answer)

      this.answer = this.question.answer
      this.question.answered = this.isValid()

      this.$emit('input', this.answer)
    },

    showInvalid() {
      return this.dirty && this.enterPressed && !this.isValid()
    },

    isValid() {
      if (this.question.type === QuestionType.MultipleQuestions) {
        return this.question.questions.every((q, i) => !q.required || !(!this.checkValue(this.dataValue)
        || !this.checkValue(this.dataValue[i])))
      }
      if (!this.question.required && !this.hasValue && this.dirty) {
        return true
      }

      if (this.validate()) {
        return true
      }

      return false
    },

    /**
     * This method validates the input and is meant to be overriden
     * in custom question types.
     */
    validate() {
      if (this.question.type === QuestionType.MultipleQuestions) {
        return this.question.questions.every((q, i) => !q.required || !(!this.checkValue(this.dataValue)
          || !this.checkValue(this.dataValue[i])))
      }

      return !this.question.required || this.hasValue
    },
    checkValue(value) {
      if (value !== null && value !== undefined) {
        const v = value
        if (v.trim) {
          // Don't allow empty strings
          return v.trim().length > 0
        }

        if (Array.isArray(v)) {
          // Don't allow empty arrays
          return v.length > 0
        }

        // All other non-null values are allowed to pass through
        return true
      }

      return false
    },
  },
}
</script>

<style></style>
