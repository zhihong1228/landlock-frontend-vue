// Single question template and logic

<template>
  <div
    ref="qanimate"
    class="vff-animate q-form"
    :class="mainClasses"
  >
    <div class="q-inner">
      <div :class="{'f-section-wrap': question.type === QuestionType.SectionBreak}">
        <div :class="{'fh2': question.type !== QuestionType.SectionBreak}">
          <span
            v-if="question.tagline"
            class="f-tagline"
          >{{ question.tagline }}</span>

          <template v-if="question.title">
            <span
              v-if="question.type === QuestionType.SectionBreak"
              class="fh2"
            >{{ question.title }}</span>
            <span
              v-else
              class="f-text"
              :class="{'text-left-question': question.autoFillAddress === true}"
            >
              {{ question.title }}&nbsp;
              <!-- Required questions are marked by an asterisk (*) -->
              <span
                v-if="question.required"
                class="f-required"
                :aria-label="language.ariaRequired"
                role="note"
              ><span aria-hidden="true">*</span></span>

              <span
                v-if="question.inline"
                class="f-answer"
              >
                <component
                  :is="question.type"
                  ref="questionComponent"
                  v-model="dataValue"
                  :question="question"
                  :language="language"
                  :active="active"
                  @next="onEnter"
                />
              </span>
            </span>
          </template>

          <span
            v-if="showHelperText"
            class="f-sub"
          >
            <span v-if="question.subtitle">{{ question.subtitle }}</span>

            <span
              v-if="question.type === QuestionType.LongText && !isMobile"
              class="f-help"
              v-html="question.helpText || language.formatString(language.longTextHelpText)"
            />

            <span
              v-if="question.type === QuestionType.MultipleChoice && question.multiple"
              class="f-help"
            >{{ question.helpText || language.multipleChoiceHelpText }}</span>
            <span
              v-else-if="question.type === QuestionType.MultipleChoice"
              class="f-help"
            >{{ question.helpText || language.multipleChoiceHelpTextSingle }}</span>
          </span>
          <div style="font-size: 18px;color: red">
            <slot name="error" />
          </div>

          <div
            v-if="!question.inline"
            class="f-answer f-full-width mx-auto"
          >
            <component
              :is="question.type"
              ref="questionComponent"
              v-model="dataValue"
              :question="question"
              :language="language"
              :active="active"
              @next="onEnter"
            />
          </div>
        </div>
        <p
          v-if="question.description || question.descriptionLink.length !== 0"
          class="f-description"
        >
          <span v-if="question.description">{{ question.description }}</span>
          <a
            v-for="(link, index) in question.descriptionLink"
            :key="'m' + index"
            class="f-link"
            :href="link.url"
            :target="link.target"
          >{{ link.text || link.url }}</a>
        </p>

        <slot />
      </div>
      <div
        v-if="showOkButton()"
        class="vff-animate f-fade-in f-enter"
        style="display: flex;justify-content: center"
      >
        <button
          ref="button"
          class="o-btn-action"
          type="button"
          href="#"
          :aria-label="language.ariaOk"
          @click.prevent="onEnter"
        >
          <span v-if="question.type === QuestionType.SectionBreak">{{ language.continue }}</span>
          <span v-else-if="showSkip()">{{ language.skip }}</span>
          <span v-else>{{ language.ok }}</span>
          <span
            style="margin-left: 5px"
          >
            <b-spinner
              v-if="processing"
              style="width: 18px;height: 18px"
              type="grow"
              label="Saving..."
              class=""
            />
          </span>

        </button>
        <a
          v-if="question.type !== QuestionType.LongText || !isMobile"
          class="f-enter-desc"
          href="#"
          @click.prevent="onEnter"
          v-html="language.formatString(language.pressEnter)"
        />
      </div>

      <div
        v-if="showInvalid()"
        class="f-invalid d-flex justify-content-center"
        role="alert"
        aria-live="assertive"
      >
        {{ language.invalidPrompt }}
      </div>
    </div>
  </div>
</template>

<script>
/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://github.com/ditdot-dev/vue-flow-form
    https://www.ditdot.hr/en
  */

import { BSpinner } from 'bootstrap-vue'
import LanguageModel from '../models/LanguageModel'
import QuestionModel, { QuestionType, LinkOption } from '../models/QuestionModel'
import FlowFormDropdownType from './QuestionTypes/DropdownType.vue'
import FlowFormEmailType from './QuestionTypes/EmailType.vue'
import FlowFormLongTextType from './QuestionTypes/LongTextType.vue'
import FlowFormMultipleChoiceType from './QuestionTypes/MultipleChoiceType.vue'
import FlowFormSliderType from './QuestionTypes/SliderType.vue'
import FlowFormMultipleQuestionsType from './QuestionTypes/MultipleQuestionsType.vue'
import FlowFormMultiplePictureChoiceType from './QuestionTypes/MultiplePictureChoiceType.vue'
import FlowFormPaymentType from './QuestionTypes/PaymentType.vue'
import FlowFormNumberType from './QuestionTypes/NumberType.vue'
import FlowFormPasswordType from './QuestionTypes/PasswordType.vue'
import FlowFormPhoneType from './QuestionTypes/PhoneType.vue'
import FlowFormSectionBreakType from './QuestionTypes/SectionBreakType.vue'
import FlowFormTextType from './QuestionTypes/TextType.vue'
import FlowFormUrlType from './QuestionTypes/UrlType.vue'
import FlowFormDateType from './QuestionTypes/DateType.vue'
import { IsMobile } from '../mixins/IsMobile'

export default {
  name: 'FlowFormQuestion',
  components: {
    FlowFormDateType,
    FlowFormDropdownType,
    FlowFormEmailType,
    FlowFormLongTextType,
    FlowFormMultipleChoiceType,
    FlowFormSliderType,
    FlowFormMultipleQuestionsType,
    FlowFormMultiplePictureChoiceType,
    FlowFormPaymentType,
    FlowFormNumberType,
    FlowFormPasswordType,
    FlowFormPhoneType,
    FlowFormSectionBreakType,
    FlowFormTextType,
    FlowFormUrlType,
    BSpinner,
  },
  mixins: [
    IsMobile,
  ],
  props: {
    question: QuestionModel,
    language: LanguageModel,
    value: [String, Array, Boolean, Number, Object],
    active: {
      type: Boolean,
      default: false,
    },
    processing: {
      type: Boolean,
      default: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      QuestionType,
      dataValue: null,
      debounced: false,
    }
  },
  computed: {
    mainClasses: {
      cache: false,
      get() {
        const classes = {
          'q-is-active': this.active,
          'q-is-inactive': !this.active,
          'f-fade-in-down': this.reverse,
          'f-fade-in-up': !this.reverse,
          'f-focused': this.$refs.questionComponent && this.$refs.questionComponent.focused,
          'f-has-value': this.$refs.questionComponent && this.$refs.questionComponent.hasValue,
        }

        classes[`field-${this.question.type.toLowerCase().substring(8, this.question.type.length - 4)}`] = true

        return classes
      },
    },

    showHelperText() {
      if (this.question.subtitle) {
        return true
      }

      if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
        return this.question.helpTextShow
      }

      return false
    },
  },
  mounted() {
    this.focusField()
    this.dataValue = this.question.answer

    this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd)
  },
  beforeDestroy() {
    this.$refs.qanimate.removeEventListener('animationend', this.onAnimationEnd)
  },
  methods: {
    /**
       * Autofocus the input box of the current question
       */
    focusField() {
      const el = this.$refs.questionComponent

      el && el.focus()
    },

    onAnimationEnd() {
      this.focusField()
    },

    shouldFocus() {
      const q = this.$refs.questionComponent

      return q && q.canReceiveFocus && !q.focused
    },

    returnFocus() {
      const q = this.$refs.questionComponent

      if (this.shouldFocus()) {
        this.focusField()
      }
    },

    /**
       * Emits "answer" event and calls "onEnter" method on Enter press
       */
    onEnter($event) {
      if (this.processing) return
      this.checkAnswer(this.emitAnswer)
    },

    onTab($event) {
      this.checkAnswer(this.emitAnswerTab)
    },

    checkAnswer(fn) {
      const q = this.$refs.questionComponent

      if (q.isValid() && this.question.nextStepOnAnswer && !this.question.multiple) {
        this.debounce(() => fn(q), 350)
      } else {
        fn(q)
      }
    },

    emitAnswer(q) {
      if (q) {
        if (!q.focused) {
          this.$emit('answer', q)
        }

        q.onEnter()
      }
    },

    emitAnswerTab(q) {
      if (q && this.question.type !== QuestionType.Date) {
        this.returnFocus()
        this.$emit('answer', q)

        q.onEnter()
      }
    },

    debounce(fn, delay) {
      let debounceTimer
      this.debounced = true

      return (() => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(fn, delay)
      })()
    },

    /**
       * Check if the "OK" button should be shown.
       */
    showOkButton() {
      const q = this.$refs.questionComponent

      if (this.question.type === QuestionType.Payment) {
        return false
      }

      if (this.question.type === QuestionType.SectionBreak) {
        return this.active
      }

      if (!this.question.required && this.question.type !== QuestionType.MultipleQuestions) {
        return true
      }

      if (this.question.allowOther && this.question.other) {
        return true
      }

      if (QuestionType.MultipleChoice && !this.question.multiple && this.question.nextStepOnAnswer) {
        return false
      }

      // If there is no question referenced, or dataValue is still set to its default (null).
      // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
      if (!q || this.dataValue === null) {
        return false
      }

      return q.hasValue && q.isValid()
    },

    showSkip() {
      const q = this.$refs.questionComponent

      // We might not have a reference to the question component at first
      // but we know that if we don't, it's definitely empty
      return !this.question.required && (!q || !q.hasValue)
    },

    /**
       * Determins if the invalid message should be shown.
       */
    showInvalid() {
      const q = this.$refs.questionComponent

      if (!q || this.dataValue === null) {
        return false
      }

      return q.showInvalid()
    },
  },
}
</script>
<style>

.vff .text-left-question {
  margin-left: 10px;
  margin-bottom: 0px!important;
}
</style>
