<template>
  <div
    style="padding: 0 20px 20px; overflow:hidden; height: calc(100vh - 170px);"
    class="d-flex flex-column"
  >
    <flow-form
      ref="flowForm"
      :standalone="true"
      :language="language"
      :questions="questions"
      :on-answer="onAnswer"
      :on-set-question="onSetQuestion"
      @submit="onSubmit"
    >
      <template v-slot:error>
        <div
          v-if="qError"
          class="p-0"
        >
          {{ qError }}
        </div>
      </template>
    </flow-form>
    <modal-certif
      v-if="property && ID"
      :property="property"
      :i-d="ID"
    />
    <VerifyPersonaForCert
      v-if="showPersona"
      @complete="generateCertificate"
    />
  </div>
</template>

<script>
import { VBModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { required } from '@validations'
import { mapState } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ModalCertif from '@/views/components/certificate/ModalCertif.vue'
import VerifyPersonaForCert from '@/views/components/certificate/VerifyPersonaForCert.vue'
import FlowForm from '../../../../vue-flow-form/src/components/FlowForm.vue'
import QuestionModel, { QuestionType } from '../../../../vue-flow-form/src/models/QuestionModel'
import LanguageModel from '../../../../vue-flow-form/src/models/LanguageModel'
import PropertyService from '../../../services/PropertyService'

const bcrpyt = require('bcryptjs')

export default {
  components: {
    VerifyPersonaForCert,
    FlowForm,
    ModalCertif,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      property: null,
      ID: null,
      qError: null,
      showPersona: false,
      data: {
        firstName: '',
        lastName: '',
        street: '',
        state: '',
        city: '',
        zip: null,
        dob: '',
        ssn: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: '',
        password: '',
      },
      required,
      partition: 0,
      errMessage: '',
      isLoading: false,
      language: new LanguageModel({
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
        submitText: 'Download Certificate',
        thanksText: 'Thank you for your verification, you can download your certificate now.',
      }),
      questions: [
        // First Name
        new QuestionModel({
          id: 'firstName',
          title: 'What’s your first name?',
          type: QuestionType.Text,
          required: true,
        }),
        // Last Name
        new QuestionModel({
          id: 'lastName',
          title: 'What’s your last name?',
          type: QuestionType.Text,
          required: true,
        }),
        // Date Of Birth
        new QuestionModel({
          id: 'dob',
          title: 'What’s your date of birth?',
          placeholder: 'MM/DD/YYYY',
          type: QuestionType.Date,
          required: true,
        }),
        // SSN
        new QuestionModel({
          id: 'ssn',
          title: 'What is your Social Security Number? ',
          type: QuestionType.Text,
          required: true,
          placeholder: 'XXX-XX-XXXX',
          mask: '###-##-####',
        }),
        // Question 1
        new QuestionModel({
          id: 'question1',
          title: 'question1',
          type: QuestionType.Text,
          required: true,
        }),
        // Question 2
        new QuestionModel({
          id: 'question2',
          title: 'question2',
          type: QuestionType.Text,
          required: true,
        }),
        // Question 3
        new QuestionModel({
          id: 'question3',
          title: 'question3',
          type: QuestionType.Text,
          required: true,
        }),
        // Question 4
        new QuestionModel({
          id: 'question4',
          title: 'question4',
          type: QuestionType.Text,
          required: true,
        }),
        // Question 5
        new QuestionModel({
          id: 'question5',
          title: 'question5',
          type: QuestionType.Text,
          required: true,
        }),
        // Password
        new QuestionModel({
          id: 'password',
          title: 'Please confirm the login password?',
          type: QuestionType.Password,
          required: true,
        }),
      ],
      answers: {},
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    console.log(this.ID, this.$route.params.id, '88')
    if (!this.user) {
      setTimeout(() => {
        this.setSecurityQuestions()
      }, 1000)
    } else this.setSecurityQuestions()
    PropertyService.findOne(this.$route.params.id)
      .then(response => {
        console.log(response)
        this.ID = response.data.data.generatedID
        this.property = response.data.data
      })
      .catch(error => {
        this.messageEr = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message
            || error.toString()
        console.log(this.messageEr)
      })
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  methods: {
    setSecurityQuestions() {
      const index = this.questions.findIndex(question => question.id === 'question1')
      this.questions[index].title = this.user.question1
      this.questions[index + 1].title = this.user.question2
      this.questions[index + 2].title = this.user.question3
      this.questions[index + 3].title = this.user.question4
      this.questions[index + 4].title = this.user.question5
    },
    async onSubmit(questionsList) {
      console.log('onSubmit', questionsList)

      this.$bvModal.show('modal-certif')
      const response = await PropertyService.findOne(this.$route.params.id)
        .catch(error => {
          console.error(error)
          this.messageEr = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message
                || error.toString()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.messageEr,
              icon: 'CheckIcon',
              variant: 'danger',
            },
          })
        })

      console.log(response)
      this.ID = response.data.data.generatedID
      this.property = response.data.data

      if (!this.property || !this.ID) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'a property not selected',
            icon: 'CheckIcon',
            variant: 'danger',
          },
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Verified Successfully',
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
      }

      this.isLoading = false
      console.log('prop', this.property, this.ID)
      // this.$refs['verif-cert-modal'].hide()
    },
    showError(error) {
      this.qError = error
      /* this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Error',
          icon: 'ErrorIcon',
          variant: 'danger',
          message: error,
        },
      }) */
    },
    async onAnswer(question) {
      this.qError = null
      console.log(question)
      console.log(this.$store.state.user.user)
      switch (question.id) {
        case 'firstName':
          if (!this.equal(question.answer, this.user.firstName)) {
            this.showError('First name is not correct')
            return false
          }
          break
        case 'lastName':
          if (!this.equal(question.answer, this.user.lastName)) {
            this.showError('Last name is not correct')
            return false
          }
          break
        case 'dob': {
          const [year, month, day] = question.answer.split('-')
          this.answers[question.id] = [month, day, year].join('-')
        }
          break
        case 'ssn':
          this.answers[question.id] = question.answer
          break
        case 'question1':
          this.answers[question.id] = question.answer
          break
        case 'question2':
          this.answers[question.id] = question.answer
          break
        case 'question3':
          this.answers[question.id] = question.answer
          break
        case 'question4':
          this.answers[question.id] = question.answer
          break
        case 'question5':
          this.answers[question.id] = question.answer
          break
        case 'userID':
          this.answers[question.id] = question.answer
          break
        case 'password':
          this.answers[question.id] = question.answer
          if (await this.checkAnswers()) {
            console.log('password is correct')
            this.showPersona = true
          } else {
            this.showError('Some answers were wrong, please try again.')
            this.$refs.flowForm.goToQuestion(0)
            return false
          }
          break
        default:
          break
      }
      return true
    },
    async generateCertificate() {
      try {
        const response = await PropertyService.generateCertificate(this.property.id, this.answers)
        if (response.data) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Certificate Generated Successfully',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          await this.$router.push({ name: 'view-property', params: { id: this.property.id } })
        }
      } catch (error) {
        console.log(error)
        console.log(
          (error.response && error.response.data && error.response.data.message)
              || error.message
              || error.toString(),
        )
      }
    },
    async checkAnswers() {
      console.log('checking answers')
      let correctAnswers = 0
      console.log(this.answers)
      for (let i = 0; i < this.questions.length; i += 1) {
        const question = this.questions[i]
        console.log('loop', question)
        console.log(question.id, question.answer)
        switch (question.id) {
          case 'dob': {
            const [year, month, day] = question.answer.split('-')
            const dateOfBirth = [month, day, year].join('-')
            if (this.equal(dateOfBirth, this.user.dob)) {
              correctAnswers += 1
              console.log('dob is correct')
            } else {
              console.log('dob is not correct')
            }
          }
            break
          case 'ssn':
            // eslint-disable-next-line no-await-in-loop
            if ((await this.comparePassword(question.answer.replace(/-/g, ''), this.user.ssn))) {
              correctAnswers += 1
              console.log('ssn is correct')
            } else {
              console.log('ssn is not correct')
            }
            break
          case 'question1':
            console.log('ques1', question.answer, this.user.question1)
            if (this.equal(question.answer, this.user.answer1)) {
              correctAnswers += 1
            }
            break
          case 'question2':
            console.log('ques2', question.answer, this.user.answer2)
            if (this.equal(question.answer, this.user.answer2)) {
              correctAnswers += 1
            }
            break
          case 'question3':
            console.log(this.user.answer3)
            this.answers[question.id] = question.answer
            if (this.equal(question.answer, this.user.answer3)) {
              correctAnswers += 1
            }
            break
          case 'question4':
            this.answers[question.id] = question.answer
            if (this.equal(question.answer, this.user.answer4)) {
              correctAnswers += 1
            }
            break
          case 'question5':
            this.answers[question.id] = question.answer
            if (this.equal(question.answer, this.user.answer5)) {
              correctAnswers += 1
            }
            break
          case 'userID':
            this.answers[question.id] = question.answer
            // eslint-disable-next-line no-await-in-loop
            if (this.equal(question.answer, this.user.email)) {
              correctAnswers += 1
            }
            break
          case 'password':
            this.answers[question.id] = question.answer
            // eslint-disable-next-line no-await-in-loop
            if ((await this.comparePassword(question.answer, this.user.password))) {
              correctAnswers += 1
            }
            break
          default:
            break
        }
      }
      console.log('correct answers', correctAnswers)
      return correctAnswers >= 3
    },
    // eslint-disable-next-line no-unused-vars
    async onSetQuestion(question) {
      // console.log('onSetQuestion', question)
      // if (question.id && question.id.endsWith('-name')) {
      //   console.log(question.title)
      //   return new QuestionModel({
      //     ...question,
      //     title: 'sdjflklsdk',
      //   })
      // }
      // return question
    },
    // function to compare 2 nullable strings, check case
    equal(a, b) {
      if (a === null && b === null) {
        return true
      }
      if ((a === null && b !== null) || (a !== null && b === null)) {
        return false
      }
      return a?.toLowerCase() === b?.toLowerCase()
    },
    async comparePassword(a, existingPassword) {
      return bcrpyt.compare(a, existingPassword)
    },
    submit(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler verifCert
      // this.validationStep1()
    },
    validationStep1() {
      this.isLoading = true
      return new Promise((resolve, reject) => {
        this.$refs.step1Rules.validate().then(success => {
          PropertyService.step1(this.data)
            .then(response => {
              console.log(response)
              if (success && response.data.data) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: response.data.message,
                    icon: 'CheckIcon',
                    variant: 'success',
                  },
                })
                this.isLoading = false
                resolve(true)
                this.$bvModal.show('modal-certif')
                this.$refs['verif-cert-modal'].hide()
              } else {
                this.isLoading = false
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: response.data.message,
                    icon: 'CheckIcon',
                    variant: 'warning',
                  },
                })
                this.partition = response.data.part
                this.errMessage = response.data.message
                reject()
              }
            })
        })
      })
    },
  },
}
</script>
<style>

</style>

<style lang="scss">
@import '../../../../vue-flow-form/src/assets/css/themes/theme-minimal.css';
@import '../../../../vue-flow-form/src/assets/css/themes/theme-purple.css';

@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';

.modal .modal-footer {
  justify-content: space-between;
}
</style>
