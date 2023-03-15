/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Global data store

export const QuestionType = Object.freeze({
  Date: 'FlowFormDateType',
  Dropdown: 'FlowFormDropdownType',
  Email: 'FlowFormEmailType',
  LongText: 'FlowFormLongTextType',
  MultipleChoice: 'FlowFormMultipleChoiceType',
  Slider: 'FlowFormSliderType',
  MultiplePictureChoice: 'FlowFormMultiplePictureChoiceType',
  Payment: 'FlowFormPaymentType',
  MultipleQuestions: 'FlowFormMultipleQuestionsType',
  Number: 'FlowFormNumberType',
  Password: 'FlowFormPasswordType',
  Phone: 'FlowFormPhoneType',
  SectionBreak: 'FlowFormSectionBreakType',
  Text: 'FlowFormTextType',
  Url: 'FlowFormUrlType',
  Test: 'FlowFormTestType',
})

export const DropdownOptionBlank = Object.freeze({
  label: '',
  value: '',
  disabled: true,
})

export const MaskPresets = Object.freeze({
  Date: '##/##/####',
  DateIso: '####-##-##',
  PhoneUs: '(###) ###-####',
})

export class QuestionSetOption {
  constructor(options) {
    this.label = ''
    this.id = null
    this.title = 'Enter title'
    this.type = 'text'
    this.masked = false
    this.money = null
    this.value = null
    this.selected = false
    this.imageSrc = null
    this.imageAlt = null

    Object.assign(this, options)
  }
}

export class ChoiceOption {
  constructor(options) {
    this.label = ''
    this.value = null
    this.disabled = false
    this.selected = false
    this.imageSrc = null
    this.imageAlt = null

    Object.assign(this, options)
  }

  choiceLabel() {
    return this.label || this.value
  }

  choiceValue() {
    // Returns the value if it's anything other than the default (null).
    if (this.value !== null) {
      return this.value
    }

    // Returns any other non-empty property if the value has not been set.
    return this.label || this.imageAlt || this.imageSrc
  }

  toggle() {
    if (this.disabled) return
    this.selected = !this.selected
  }
}

export class LinkOption {
  constructor(options) {
    this.url = ''
    this.text = ''
    this.target = '_blank'

    Object.assign(this, options)
  }
}

export default class QuestionModel {
  constructor(options) {
    this.id = null
    this.answer = null
    this.answered = false
    this.index = 0
    this.questions = []
    this.options = []
    this.description = ''
    this.className = ''
    this.maxWidth = '100%'
    this.maxWidthPC = this.maxWidth
    this.width = '100%'
    this.widthPC = this.width
    this.autoFillAddress = false
    this.autoFillTexts = []
    this.type = null
    this.html = null
    this.required = false
    this.readonly = false
    this.jump = null
    this.placeholder = null
    this.mask = ''
    this.masked = false
    this.money = null
    this.multiple = false
    this.allowOther = false
    this.other = null
    this.language = null
    this.tagline = null
    this.title = null
    this.subtitle = null
    this.content = null
    this.inline = false
    this.helpText = null
    this.helpTextShow = true
    this.descriptionLink = []
    this.min = null
    this.max = null
    this.interval = null
    this.nextStepOnAnswer = false

    Object.assign(this, options)

    // Sets default mask and placeholder value on PhoneType question
    if (this.type === QuestionType.Phone) {
      if (!this.mask) {
        this.mask = MaskPresets.Phone
      }
      if (!this.placeholder) {
        this.placeholder = this.money || this.mask
      }
    }

    if (this.type === QuestionType.Url) {
      this.mask = null
    }

    if (this.type === QuestionType.Date && !this.placeholder) {
      this.placeholder = 'yyyy-mm-dd'
    }

    if (this.multiple && !Array.isArray(this.answer)) {
      this.answer = this.answer ? [this.answer] : []
    }

    this.resetOptions()
  }

  getJumpId() {
    let nextId = null

    if (typeof this.jump === 'function') {
      nextId = this.jump(this)
    } else if (this.jump[this.answer]) {
      nextId = this.jump[this.answer]
    } else if (this.jump._other) {
      nextId = this.jump._other
    }

    return nextId
  }

  setAnswer(answer) {
    if (this.type === QuestionType.Number && answer !== '' && !isNaN(+answer)) {
      answer = +answer
    }

    this.answer = answer
  }

  setIndex(index) {
    if (!this.id) {
      this.id = `q_${index}`
    }

    this.index = index
  }

  resetOptions() {
    if (this.options) {
      const isArray = Array.isArray(this.answer)
      let numSelected = 0

      this.options.forEach(o => {
        const optionValue = o.choiceValue()

        if (this.answer === optionValue || (isArray && this.answer.indexOf(optionValue) !== -1)) {
          o.selected = true
          ++numSelected
        } else {
          o.selected = false
        }
      })

      if (this.allowOther) {
        let otherAnswer = null

        if (isArray) {
          if (this.answer.length && this.answer.length !== numSelected) {
            otherAnswer = this.answer[this.answer.length - 1]
          }
        } else if (this.options.map(o => o.choiceValue()).indexOf(this.answer) === -1) {
          otherAnswer = this.answer
        }

        if (otherAnswer !== null) {
          this.other = otherAnswer
        }
      }
    }
  }

  resetAnswer() {
    this.answered = false
    this.answer = this.multiple ? [] : null
    this.other = null

    this.resetOptions()
  }
}
