// Form template and logic

<template>
  <div
    :class="{'vff-not-standalone': !standalone, 'vff-is-mobile': isMobile, 'vff-is-ios': isIos}"
    class="vff"
  >
    <div class="f-container">
      <div class="f-form-wrap">
        <flow-form-question
          v-for="(q, index) in questionList"
          ref="questions"
          :key="'q' + index"
          v-model="q.answer"
          style="margin-top: 5vh;"
          :active="q.index === activeQuestionIndex"
          :language="language"
          :question="q"
          :reverse="reverse"
          :processing="processing"
          @answer="onQuestionAnswered"
        >
          <template v-slot:default>
            <slot
              v-if="q.type === 'FlowFormPaymentType'"
              name="payment"
            />
          </template>
          <template v-slot:error>
            <div style="min-height: 30px">
              <slot name="error" />
            </div>
          </template>
        </flow-form-question>

        <slot />

        <!-- Complete/Submit screen slots -->
        <div
          v-if="isOnLastStep"
          class="vff-animate f-fade-in-up field-submittype"
        >
          <slot name="complete">
            <!-- Default content for the "complete" slot -->
            <div class="f-section-wrap">
              <p>
                <span class="fh2">{{ language.thankYouText }}</span>
              </p>
            </div>
          </slot>

          <slot name="completeButton">
            <!-- Default content for the "completeButton" slot -->
            <button
              v-if="!submitted"
              ref="button"
              class="o-btn-action"
              href="#"
              type="button"
              :aria-label="language.ariaSubmitText"
              @click.prevent="submit()"
            >
              <span>{{ language.submitText }}</span>
            </button>
            <a
              v-if="!submitted"
              class="f-enter-desc"
              href="#"
              @click.prevent="submit()"
              v-html="language.formatString(language.pressEnter)"
            />
            <p
              v-if="submitted"
              class="text-success"
            >
              {{ language.successText }}
            </p>
          </slot>
        </div>
      </div>
    </div>

    <div class="vff-footer">
      <div
        class="footer-inner-wrap"
        style=""
      >
        <div
          v-if="progressbar && $screen.width <= 500"
          class="f-progress"
          :class="{'not-started': percentCompleted === 0, 'completed': percentCompleted === 100}"
        >
          <div class="f-progress-bar">
            <div
              class="f-progress-bar-inner"
              :style="'width: ' + percentCompleted + '%;'"
            />
          </div>
          {{ language.percentCompleted.replace(':percent', percentCompleted.toString()).replace('completed', '') }}
        </div>
        <div
          class="footer-inner-wrap-child"
          style="min-width: 200px"
        >
          <div
            v-if="navigation"
            class="f-nav"
          >
            <a
              class="f-prev"
              href="#"
              role="button"
              :aria-label="language.ariaPrev"
              :disabled="activeQuestionIndex === 0 || submitted || processing"
              :class="{'f-disabled': activeQuestionIndex === 0 || submitted || processing}"
              @click.prevent="goToPreviousQuestion()"
            >
              <!--            <svg-->
              <!--              version="1.1"-->
              <!--              xmlns="http://www.w3.org/2000/svg"-->
              <!--              xmlns:xlink="http://www.w3.org/1999/xlink"-->
              <!--              x="0px"-->
              <!--              y="0px"-->
              <!--              width="42.333px"-->
              <!--              height="28.334px"-->
              <!--              viewBox="78.833 5.5 42.333 28.334"-->
              <!--              aria-hidden="true"-->
              <!--            >-->
              <!--              <path-->
              <!--                d="M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z"-->
              <!--              />-->
              <!--            </svg>-->
              <span
                aria-hidden="true"
                class="f-nav-prev-text nav-button-text"
              >{{ language.prev }}</span>
            </a>
          </div>
          <div
            v-if="progressbar && $screen.width > 500"
            class="f-progress"
            :class="{'not-started': percentCompleted === 0, 'completed': percentCompleted === 100}"
          >
            <div class="f-progress-bar">
              <div
                class="f-progress-bar-inner"
                :style="'width: ' + percentCompleted + '%;'"
              />
            </div>
            {{ language.percentCompleted.replace(':percent', percentCompleted).replace('completed', '') }}
          </div>
          <div
            v-if="navigation"
            class="f-nav ml-1"
          >
            <!--            :disabled="!isNextQuestionAvailable() || processing"-->
            <!--            :class="{'f-disabled': !isNextQuestionAvailable() || processing}"-->
            <a
              class="f-next"
              href="#"
              role="button"
              :aria-label="language.ariaNext"
              @click.prevent="goToNextQuestion()"
            >
              <!--            <svg-->
              <!--              version="1.1"-->
              <!--              xmlns="http://www.w3.org/2000/svg"-->
              <!--              xmlns:xlink="http://www.w3.org/1999/xlink"-->
              <!--              x="0px"-->
              <!--              y="0px"-->
              <!--              width="42.333px"-->
              <!--              height="28.334px"-->
              <!--              viewBox="78.833 5.5 42.333 28.334"-->
              <!--              aria-hidden="true"-->
              <!--            >-->
              <!--              <path-->
              <!--                d="M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z"-->
              <!--              />-->
              <!--            </svg>-->
              <span
                aria-hidden="true"
                class="f-nav-next-text nav-button-text"
              >{{ language.next }}</span>
              <span
                style="margin-left: 5px"
              >
                <b-spinner
                  v-if="processing"
                  style="width: 15px;height: 15px"
                  label="Saving..."
                  class=""
                />
              </span>
            </a>
          </div>
        </div>
        <div
          v-if="timer"
          class="f-timer"
        >
          <span>{{ formatTime(time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import { BSpinner } from 'bootstrap-vue'
import FlowFormQuestion from './FlowFormQuestion.vue'
import QuestionModel, { ChoiceOption, LinkOption, QuestionType } from '../models/QuestionModel'
import LanguageModel from '../models/LanguageModel'
import { IsMobile } from '../mixins/IsMobile'

export default {
  name: 'FlowForm',
  components: {
    FlowFormQuestion,
    BSpinner,
  },

  mixins: [
    IsMobile,
  ],

  props: {
    questions: {
      type: Array,
      validator: value => value.every(q => q instanceof QuestionModel),
    },
    language: {
      type: LanguageModel,
      default: () => new LanguageModel(),
    },
    onAnswer: {
      type: Function,
      default: async () => true,
    },
    onSetQuestion: {
      type: Function,
      default: async () => null,
    },
    progressbar: {
      type: Boolean,
      default: true,
    },
    standalone: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    navigation: {
      type: Boolean,
      default: true,
    },
    timer: {
      type: Boolean,
      default: false,
    },
    timerStartStep: [String, Number],
    timerStopStep: [String, Number],
  },

  data() {
    return {
      completed: false,
      submitted: false,
      activeQuestionIndex: 0,
      questionList: [],
      questionListActivePath: [],
      reverse: false,
      timerOn: false,
      timerInterval: null,
      time: 0,
      processing: false,
      paymentStatus: null,
    }
  },

  computed: {
    numActiveQuestions() {
      return this.questionListActivePath.length
    },

    activeQuestion() {
      return this.questionListActivePath[this.activeQuestionIndex]
    },

    activeQuestionId() {
      const question = this.questionModels[this.activeQuestionIndex]

      if (this.isOnLastStep) {
        return '_submit'
      }

      if (question && question.id) {
        return question.id
      }

      return null
    },

    numCompletedQuestions() {
      let num = 0

      this.questionListActivePath.forEach(question => {
        if (question.answered) {
          ++num
        }
      })

      return num
    },

    percentCompleted() {
      if (!this.numActiveQuestions) {
        return 0
      }

      return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
    },

    isOnLastStep() {
      return this.numActiveQuestions > 0 && this.activeQuestionIndex === this.questionListActivePath.length
    },

    isOnTimerStartStep() {
      if (this.activeQuestionId === this.timerStartStep) {
        return true
      }

      if (!this.timerOn && !this.timerStartStep && this.activeQuestionIndex === 0) {
        return true
      }

      return false
    },

    isOnTimerStopStep() {
      if (this.submitted) {
        return true
      }

      if (this.activeQuestionId === this.timerStopStep) {
        return true
      }

      return false
    },

    questionModels: {
      cache: false,

      get() {
        if (this.questions && this.questions.length) {
          return this.questions
        }

        const questions = []

        if (!this.questions) {
          const classMap = {
            options: ChoiceOption,
            descriptionLink: LinkOption,
          }

          this
            .$slots
            .default
            .filter(q => q.tag && q.tag.indexOf('Question') !== -1)
            .forEach(q => {
              const { attrs } = q.data
              let model = new QuestionModel()

              if (q.componentInstance.question !== null) {
                model = q.componentInstance.question
              }

              if (q.data.model) {
                model.answer = q.data.model.value
              }

              Object.keys(model).forEach(key => {
                if (attrs[key] !== undefined) {
                  if (typeof model[key] === 'boolean') {
                    model[key] = attrs[key] !== false
                  } else if (key in classMap) {
                    const
                      classReference = classMap[key]
                    const options = []

                    attrs[key].forEach(option => {
                      const instance = new classReference()

                      Object.keys(instance).forEach(instanceKey => {
                        if (option[instanceKey] !== undefined) {
                          instance[instanceKey] = option[instanceKey]
                        }
                      })

                      options.push(instance)
                    })

                    model[key] = options
                  } else {
                    switch (key) {
                      case 'type':
                        if (Object.values(QuestionType).indexOf(attrs[key]) !== -1) {
                          model[key] = attrs[key]
                        } else {
                          for (const questionTypeKey in QuestionType) {
                            if (questionTypeKey.toLowerCase() === attrs[key].toLowerCase()) {
                              model[key] = QuestionType[questionTypeKey]
                              break
                            }
                          }
                        }
                        break

                      default:
                        model[key] = attrs[key]
                        break
                    }
                  }
                }
              })

              q.componentInstance.question = model

              model.resetOptions()

              questions.push(model)
            })
        }

        return questions
      },
    },
  },

  watch: {
    completed() {
      this.emitComplete()
    },

    submitted() {
      this.stopTimer()
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDownListener)
    document.addEventListener('keyup', this.onKeyUpListener, true)
    window.addEventListener('beforeunload', this.onBeforeUnload)

    this.setQuestions().then(() => {
      this.checkTimer()
    })
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDownListener)
    document.removeEventListener('keyup', this.onKeyUpListener, true)
    window.removeEventListener('beforeunload', this.onBeforeUnload)

    this.stopTimer()
  },

  methods: {

    setActiveQuestion(question) {
      this.questionListActivePath[this.activeQuestionIndex] = question
      this.questionList[this.activeQuestionIndex] = question
    },
    /**
     * Returns currently active question component (if any).
     */
    activeQuestionComponent() {
      if (this.$refs.questions) {
        return this.$refs.questions[this.activeQuestionIndex]
      }

      return null
    },

    async setQuestions() {
      this.processing = true
      await this.setQuestionListActivePath()
      this.setQuestionList()
      this.processing = false
    },

    /**
     * This method goes through all questions and sets the ones
     * that are in the current path (taking note of logic jumps)
     */
    async setQuestionListActivePath() {
      const questions = []

      if (!this.questionModels.length) {
        return
      }

      let
        index = 0
      let serialIndex = 0
      let nextId

      do {
        const question = this.questionModels[index]

        question.setIndex(serialIndex)
        question.language = this.language

        questions.push(question)

        if (!question.jump) {
          ++index
        } else if (question.answered) {
          nextId = question.getJumpId()
          if (nextId) {
            if (nextId === '_submit') {
              index = this.questionModels.length
            } else {
              for (let i = 0; i < this.questionModels.length; i++) {
                if (this.questionModels[i].id === nextId) {
                  index = i
                  break
                }
              }
            }
          } else {
            ++index
          }
        } else {
          index = this.questionModels.length
        }

        ++serialIndex
      } while (index < this.questionModels.length)

      const result = await this.onSetQuestion(questions[this.activeQuestionIndex])
      if (result) {
        console.log(result, questions[this.activeQuestionIndex])
        questions[this.activeQuestionIndex] = result
      }
      this.questionListActivePath = questions
    },

    /**
     * Sets the question list array
     * (all questions up to, and including, the current one)
     */
    setQuestionList() {
      const questions = []

      for (let index = 0; index < this.questionListActivePath.length; index++) {
        const question = this.questionListActivePath[index]

        questions.push(question)

        if (!question.answered) {
          if (this.completed) {
            // The "completed" status changed - user probably changed an
            // already entered answer.
            this.completed = false
          }
          break
        }
      }

      this.questionList = questions
    },

    /**
     * If we have any answered questions, notify user before leaving
     * the page.
     */
    onBeforeUnload(event) {
      if (this.activeQuestionIndex > 0 && !this.submitted) {
        event.preventDefault()
        event.returnValue = ''
      }
    },

    /**
     * Global key listeners, listen for Enter or Tab key events.
     */
    onKeyDownListener(e) {
      if (e.key !== 'Tab' || this.submitted) {
        return
      }

      if (e.shiftKey) {
        e.stopPropagation()
        e.preventDefault()

        if (this.navigation) {
          this.goToPreviousQuestion()
        }
      } else {
        const q = this.activeQuestionComponent()

        if (q.shouldFocus()) {
          e.preventDefault()

          q.focusField()
        } else {
          e.stopPropagation()

          this.emitTab()
          this.reverse = false
        }
      }
    },

    onKeyUpListener(e) {
      if (e.shiftKey || ['Tab', 'Enter'].indexOf(e.key) === -1 || this.submitted) {
        return
      }

      const q = this.activeQuestionComponent()

      if (e.key === 'Tab' && q.shouldFocus()) {
        q.focusField()
      } else {
        if (e.key === 'Enter') {
          this.emitEnter()
        }

        e.stopPropagation()
        this.reverse = false
      }
    },

    emitEnter() {
      const q = this.activeQuestionComponent()

      if (q) {
        // Send enter event to the current question component
        q.onEnter()
      } else if (this.completed && this.isOnLastStep) {
        // We're finished - submit form
        this.submit()
      }
    },

    emitTab() {
      const q = this.activeQuestionComponent()

      if (q) {
        // Send tab event to the current question component
        q.onTab()
      } else {
        this.emitEnter()
      }
    },

    submit() {
      this.emitSubmit()
      this.submitted = true
    },

    emitComplete() {
      this.$emit('complete', this.completed, this.questionList)
    },

    emitSubmit() {
      this.$emit('submit', this.questionList)
    },

    setPaymentStatus(status) {
      this.paymentStatus = status
      this.questionList[this.activeQuestionIndex].answer = 'completed'
    },

    /**
     * Checks if we have another question and if we
     * can jump to it.
     */
    isNextQuestionAvailable() {
      if (this.submitted) {
        return false
      }

      const q = this.activeQuestion
      if (q && !q.required) {
        return true
      }

      if (this.completed && !this.isOnLastStep) {
        return true
      }

      return (this.activeQuestion && this.activeQuestion.type === 'FlowFormPaymentType' && this.paymentStatus === 'completed') || this.activeQuestionIndex < this.questionList.length - 1
    },

    /**
     * Triggered by the "answer" event in the Question component
     */
    async onQuestionAnswered(question) {
      try {
        this.processing = true
        if (question.isValid() && await this.onAnswer(question.question)) {
          this.$emit('answer', question.question)

          if (this.activeQuestionIndex < this.questionListActivePath.length) {
            ++this.activeQuestionIndex
          }

          this.$nextTick(async () => {
            await this.setQuestions()
            this.checkTimer()
            // Nested $nextTick so we're 100% sure that setQuestions
            // actually updated the question array
            this.$nextTick(async () => {
              const q = this.activeQuestionComponent()

              if (q) {
                q.focusField()
                this.activeQuestionIndex = q.question.index
              } else if (this.isOnLastStep) {
                // No more questions left - set "completed" to true
                this.completed = true
                this.activeQuestionIndex = this.questionListActivePath.length

                this.$refs.button && this.$refs.button.focus()
              }

              // const result = await this.onSetQuestion(this.activeQuestion)
              /* console.log(result, this.activeQuestion)
              if(result) {
                this.setActiveQuestion(result)
                this.$emit('step', this.activeQuestionId, result)
              }
              else */
              this.$emit('step', this.activeQuestionId, this.activeQuestion)
            })
          })
        } else if (this.completed) {
          this.completed = false
        }
      } catch (e) {
        throw e
      } finally {
        this.processing = false
      }
    },

    /**
     * Jumps to previous question.
     */
    goToPreviousQuestion() {
      this.blurFocus()

      if (this.activeQuestionIndex > 0 && !this.submitted) {
        if (this.isOnTimerStopStep) {
          this.startTimer()
        }

        --this.activeQuestionIndex

        this.reverse = true

        this.checkTimer()
      }
    },

    /**
     * Jumps to next question.
     */
    goToNextQuestion() {
      if (!this.isNextQuestionAvailable() || this.processing) {
        return
      }
      this.blurFocus()
      if (this.isNextQuestionAvailable()) {
        this.emitEnter()
      }

      this.reverse = false
    },
    /**
     * Jumps to question with specific index.
     */
    goToQuestion(index) {
      console.log(this.questionListActivePath)
      if (isNaN(+index)) {
        console.log('Invalid question index', 'trying id', index)
        let questionIndex = this.activeQuestionIndex
        this.questionListActivePath.forEach((question, _index) => {
          console.log(question.id, _index, index, question.id === index)
          if (question.id === index) {
            questionIndex = _index
          }
        })
        index = questionIndex
      }
      console.log(index, 'index')
      // if (index !== this.activeQuestionIndex) {
      this.blurFocus()

      if (!this.submitted && index <= this.questionListActivePath.length - 1) {
        // Check if we can actually jump to the wanted question.
        do {
          const previousQuestionsAnswered = this
            .questionListActivePath
            .slice(0, index)
            .every(q => q.answered)
          if (previousQuestionsAnswered) {
            break
          }
          --index
        } while (index > 0)
        this.reverse = index < this.activeQuestionIndex
        this.activeQuestionIndex = index
        this.checkTimer()
      }
      // }
    },

    /**
     * Removes focus from the currently focused DOM element.
     */
    blurFocus() {
      document.activeElement && document.activeElement.blur && document.activeElement.blur()
    },

    checkTimer() {
      if (this.timer) {
        if (this.isOnTimerStartStep) {
          this.startTimer()
        } else if (this.isOnTimerStopStep) {
          this.stopTimer()
        }
      }
    },

    startTimer() {
      if (this.timer && !this.timerOn) {
        this.timerInterval = setInterval(this.incrementTime, 1000)
        this.timerOn = true
      }
    },

    stopTimer() {
      if (this.timerOn) {
        clearInterval(this.timerInterval)
      }

      this.timerOn = false
    },

    incrementTime() {
      ++this.time

      this.$emit('timer', this.time, this.formatTime(this.time))
    },

    formatTime(seconds) {
      let
        startIndex = 14
      let length = 5

      if (seconds >= 60 * 60) {
        startIndex = 11
        length = 8
      }

      return new Date(1000 * seconds).toISOString().substr(startIndex, length)
    },
    setDisabled(state) {
      this.disabled = state
    },
    reset() {
      this.questionModels.forEach(question => question.resetAnswer())
      this.goToQuestion(0)
    },
  },
}
</script>

<style lang="css">
@import '../assets/css/common.css';
</style>
