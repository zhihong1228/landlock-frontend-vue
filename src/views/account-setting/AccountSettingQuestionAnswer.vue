<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="ClipboardIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Security Questions
            </h4>
          </div>
        </b-col>

        <!-- Question 1 -->
        <b-col md="7">
          <b-form-group
            label-for="question-1"
            label="Question 1"
          >
            <b-form-input
              id="question-1"
              v-model="socialData.question1"
              placeholder="Question 1"
              disabled
            />
          </b-form-group>
        </b-col>
        <!--/ Question 1 -->

        <!-- Response 1 -->
        <b-col md="5">
          <b-form-group
            label-for="response-1"
            label="Response 1"
          >
            <b-form-input
              id="response-1"
              v-model="socialData.answer1"
              placeholder="Response 1"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 1 -->

        <!-- Question 2 -->
        <b-col md="7">
          <b-form-group
            label-for="question-2"
            label="Question 2"
          >
            <v-select
              id="q5"
              v-model="socialData.question2"
              :options="questions.filter(quest => quest !== socialData.question1 && quest !== socialData.question3 && quest !== socialData.question4 && quest !== socialData.question5 && quest !== socialData.question6)"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </b-form-group>
        </b-col>
        <!--/ Question 2 -->

        <!-- Response 2 -->
        <b-col md="5">
          <b-form-group
            label-for="response-2"
            label="Response 2"
          >
            <b-form-input
              id="response-2"
              v-model="socialData.answer2"
              placeholder="Response 2"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 2 -->

        <!-- Question 3 -->
        <b-col md="7">
          <b-form-group
            label-for="question-3"
            label="Question 3"
          >
            <v-select
              id="q5"
              v-model="socialData.question3"
              :options="questions.filter(quest => quest !== socialData.question1 && quest !== socialData.question2 && quest !== socialData.question4 && quest !== socialData.question5 && quest !== socialData.question6)"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </b-form-group>
        </b-col>
        <!--/ Question 3 -->

        <!-- Response 3 -->
        <b-col md="5">
          <b-form-group
            label-for="response-3"
            label="Response 3"
          >
            <b-form-input
              id="response-3"
              v-model="socialData.answer3"
              placeholder="Response 3"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 3 -->

        <!-- Question 4 -->
        <b-col md="7">
          <b-form-group
            label-for="question-4"
            label="Question 4"
          >
            <v-select
              id="q5"
              v-model="socialData.question4"
              :options="questions.filter(quest => quest !== socialData.question1 && quest !== socialData.question2 && quest !== socialData.question3 && quest !== socialData.question5 && quest !== socialData.question6)"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </b-form-group>
        </b-col>
        <!--/ Question 4 -->

        <!-- Response 4 -->
        <b-col md="5">
          <b-form-group
            label-for="response-4"
            label="Response 4"
          >
            <b-form-input
              id="response-4"
              v-model="socialData.answer4"
              placeholder="Response 4"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 4 -->

        <!-- Question 5 -->
        <b-col md="7">
          <b-form-group
            label-for="question-5"
            label="Question 5"
          >
            <v-select
              id="q5"
              v-model="socialData.question5"
              :options="questions.filter(quest => quest !== socialData.question1 && quest !== socialData.question2 && quest !== socialData.question3 && quest !== socialData.question4 && quest !== socialData.question6)"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </b-form-group>
        </b-col>
        <!--/ Question 5 -->

        <!-- Response 5 -->
        <b-col md="5">
          <b-form-group
            label-for="response-5"
            label="Response 5"
          >
            <b-form-input
              id="response-5"
              v-model="socialData.answer5"
              placeholder="Response 5"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 5 -->

        <!-- Question 6 -->
        <b-col md="7">
          <b-form-group
            label-for="question-6"
            label="Question 6"
          >
            <v-select
              id="q5"
              v-model="socialData.question6"
              :options="questions.filter(quest => quest !== socialData.question1 && quest !== socialData.question2 && quest !== socialData.question3 && quest !== socialData.question4 && quest !== socialData.question5)"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </b-form-group>
        </b-col>
        <!--/ Question 6 -->

        <!-- Response 6 -->
        <b-col md="5">
          <b-form-group
            label-for="response-6"
            label="Response 6"
          >
            <b-form-input
              id="response-6"
              v-model="socialData.answer6"
              placeholder="Response 6"
            />
          </b-form-group>
        </b-col>
        <!--/ Response 6 -->

        <b-col cols="12">
          <hr class="my-2">
        </b-col>

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-b-modal.modal-verif-password
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click.prevent="submitForm"
          >
            Save changes
          </b-button>
          <b-button
            v-b-modal.modal-verif-password-qa
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1 ml-25"
            variant="outline-secondary"
            @click.prevent="resetForm"
          >
            Cancel
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
    <modal-verif-password-question-answer :data="selectedData" />
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import ModalVerifPasswordQuestionAnswer from '../components/ModalVerifPasswordQuestionAnswer.vue'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    vSelect,
    ModalVerifPasswordQuestionAnswer,
  },
  directives: {
    Ripple,
  },
  props: {
    socialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedData: null,
      localOptions: JSON.parse(JSON.stringify(this.socialData)),
      questions: [
        'In what city were you born?',
        'What is the name of your favorite pet?',
        'What high school did you attend?',
        'What is the name of your first school?',
        'What was the make of your first car?',
        'What was your favorite food as a child?',
        'Where did you meet your spouse?',
      ],
      error: '',
    }
  },
  methods: {
    submitForm() {
      const questions = [
        this.socialData.question1,
        this.socialData.question2,
        this.socialData.question3,
        this.socialData.question4,
        this.socialData.question5,
        this.socialData.question6,
      ]

      const answers = [
        this.socialData.answer1,
        this.socialData.answer2,
        this.socialData.answer3,
        this.socialData.answer4,
        this.socialData.answer5,
        this.socialData.answer6,
      ]

      if (questions.some(item => item === null)) {
        this.error = 'Please select all questions.'
      } else if (questions.some((item, index) => questions.indexOf(item) !== index)) {
        this.error = 'All questions must be unique!'
      } else if (answers.some(item => item.trim() === '')) {
        this.error = 'Please answer all questions.'
      } else {
        this.error = ''
        const data = {
          questions,
          answers,
        }
        const data1 = {
          question1: data.questions[0],
          question2: data.questions[1],
          question3: data.questions[2],
          question4: data.questions[3],
          question5: data.questions[4],
          question6: data.questions[5],
          answer1: data.answers[0],
          answer2: data.answers[1],
          answer3: data.answers[2],
          answer4: data.answers[3],
          answer5: data.answers[4],
          answer6: data.answers[5],
        }
        this.selectedData = data1
        // console.log(questions, '-------')
        this.$root.$emit('bv::show::modal', 'modal-verif-password-qa')

        // UsersService.updateUser(data1)
        //   .then((response) => {
        //     console.log(response.data.data)
        //     console.log(this.$store.state.user.user)
        //     this.$store.state.user.user = response.data.data
        //     this.$toast({
        //       component: ToastificationContent,
        //       props: {
        //         title: response.data.message,
        //         icon: 'CheckIcon',
        //         variant: 'success',
        //       },
        //     })
        //     this.messageEr = ''
        //   })
        //   .catch((error) => {
        //     this.messageEr =
        //     (error.response &&
        //       error.response.data &&
        //       error.response.data.message) ||
        //       error.message ||
        //       error.toString()
        //     console.log(this.messageEr)
        //   })
      }
    },

    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.socialData))
    },
  },
}
</script>
