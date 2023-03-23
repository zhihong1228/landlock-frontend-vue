<template>
  <div
    style="padding: 0 20px 20px; overflow:hidden; height: calc(100vh - 170px); width: 100%;"
    class="d-flex flex-column "
  >
    <div class="d-flex flex-column justify-content-center verify-card" style="margin: auto; width: 100%;">
      <div class="d-flex flex-column justify-content-center my-5" style="margin: auto; width: 80%;">
        <div v-if="verifyShowStep === 1" class="d-flex flex-column justify-content-center">
          <h1
            class="mb-3 mt-3 login-heading f-semibold"
            style="font-size: 60px; text-align: left;"
          >
            Great,<br> Let's keep going
          </h1>
          <h1
            class="login-heading f-medium mb-5"
            style="font-size: 22px; text-align: left;"
          >
            Before we can register your property, we need to learn more about you
          </h1>
          <b-button
            variant="primary"
            class="common-btn"
            @click="handleStart"
          >
            Continue
          </b-button>
          <span class="mt-1 mb-3 f-semibold" style="font-size: 18px;">
            Your progress will be automatically saved
          </span>
        </div>
        <!-- <div v-if="verifyShowStep==2" class="d-flex flex-column justify-content-center"> -->
        <div v-if="verifyShowStep === 2" class="d-flex flex-column justify-content-center">
          <h1
            class="mb-3 mt-3 login-heading f-semibold"
            style="font-size: 35px; text-align: left;"
          >
            General information
          </h1>
          <validation-observer
            ref="general"
            tag="form"
            class="d-flex flex-column justify-content-center"
          >
            <b-row
              class="d-flex flex-row"
            >
              <b-col cols="6">
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Logal first name</label>
                  <validation-provider
                    #default="{ errors }"
                    name="First Name"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.firstName"
                      :state="errors.length > 0 ? false:null"
                      placeholder="John"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Logal last name</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Last Name"
                    rules="required"
                  >
                    <b-form-input
                      id="lastName"
                      v-model="data.lastName"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Smith"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Residential address</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Full Address"
                    rules="required"
                  >
                    <b-form-input
                      id="lastName"
                      v-model="data.fullAddress"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Street number and name"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <validation-provider
                    #default="{ errors }"
                    name="City"
                    rules="required"
                  >
                    <b-form-input
                      id="lastName"
                      v-model="data.city"
                      :state="errors.length > 0 ? false:null"
                      placeholder="City"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Social security number</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Social Security Number"
                    rules="required"
                  >
                    <b-form-input
                      id="lastName"
                      v-model="data.ssn"
                      :state="errors.length > 0 ? false:null"
                      placeholder="00-0000000"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
              </b-col>
              <b-col cols="6">
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Logal middle name</label>
                  <input
                    id="floatingInput"
                    v-model="middleName"
                    class="form-control common-input"
                    placeholder="Optional"
                    type="email"
                    style="font-size: 1rem;"
                  >
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  ><span>Date of birth:</span></label>
                  <b-row>
                    <b-col cols="12" class="d-flex flex-row justify-content-between">
                      <div style="width: 25%;">
                        <validation-provider
                          #default="{ errors }"
                          name="Month"
                          rules="required"
                        >
                          <b-form-input
                            id="lastName"
                            type="number"
                            v-model="dobMonth"
                            :state="errors.length > 0 ? false:null"
                            placeholder="MM"
                            class="common-input"
                            style="text-align: center;"
                          />
                        </validation-provider>
                      </div>
                      <div style="width: 25%;">
                        <validation-provider
                          #default="{ errors }"
                          name="Day"
                          rules="required"
                        >
                          <b-form-input
                            id="lastName"
                            type="number"
                            v-model="dobDay"
                            :state="errors.length > 0 ? false:null"
                            placeholder="DD"
                            class="common-input"
                            style="text-align: center;"
                          />
                        </validation-provider>
                      </div>
                      <div style="width: 40%;">
                        <validation-provider
                          #default="{ errors }"
                          name="Day"
                          rules="required"
                        >
                          <b-form-input
                            id="lastName"
                            type="number"
                            v-model="dobYear"
                            :state="errors.length > 0 ? false:null"
                            placeholder="YYYY"
                            class="common-input"
                            style="text-align: center;"
                          />
                        </validation-provider>
                      </div>
                    </b-col>
                  </b-row>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  ><span style="color: transparent;">Department Number</span></label>
                  <input
                    id="floatingInput"
                    v-model="data.departmentNumber"
                    class="form-control common-input"
                    placeholder="Apt, suite, floor (optional)"
                    type="email"
                    style="font-size: 1rem;"
                  >
                </div>
                <div class="mb-1">
                  <b-row>
                    <b-col cols="6">
                      <validation-provider
                        #default="{ errors }"
                        name="State"
                        rules="required"
                      >
                        <b-form-input
                          id="lastName"
                          v-model="data.state"
                          :state="errors.length > 0 ? false:null"
                          placeholder="State"
                          class="common-input"
                          style="width: 100%;"
                        />
                      </validation-provider>
                    </b-col>
                    <b-col cols="6">
                      <validation-provider
                        #default="{ errors }"
                        name="Zip code"
                        rules="required"
                      >
                        <b-form-input
                          id="lastName"
                          v-model="data.zip"
                          :state="errors.length > 0 ? false:null"
                          placeholder="Zip code"
                          class="common-input"
                          style="width: 100%;"
                        />
                      </validation-provider>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </validation-observer> 
          <b-row class="mt-2">
            <b-col cols="12" class="d-flex flex-row justify-content-between">
              <b-button
                variant="primary"
                class="common-btn"
                @click="handleBack"
              >
                Back
              </b-button>
              <b-button
                variant="primary"
                class="common-btn"
                @click="handleContinue"
              >
                Continue
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div v-if="verifyShowStep === 3" class="d-flex flex-column justify-content-center">
          <h1
            class="mb-3 mt-1 login-heading f-semibold"
            style="font-size: 35px; text-align: left;"
          >
            Security questions
          </h1>
          <validation-observer
            ref="sq"
            tag="form"
            class="d-flex flex-column justify-content-center"
          >
            <b-row
              class="d-flex flex-row"
            >
              <b-col cols="6">
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Choose a security question:</label>
                  <!-- <validation-provider
                    #default="{ errors }"
                    name="Question1"
                    rules="required"
                  > -->
                    <b-form-select v-model="data.question1" :options="sqOptons" class="common-input" placeholder="Select a Security Question">
                    </b-form-select>
                  <!-- </validation-provider> -->
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Choose a security question:</label>
                  <!-- <validation-provider
                    #default="{ errors }"
                    name="Question2"
                    rules="required"
                  > -->
                    <b-form-select v-model="data.question2" :options="sqOptons" class="common-input">
                    </b-form-select>
                  <!-- </validation-provider> -->
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Choose a security question:</label>
                  <!-- <validation-provider
                    #default="{ errors }"
                    name="Question3"
                    rules="required"
                  > -->
                    <b-form-select v-model="data.question3" :options="sqOptons" class="common-input">
                    </b-form-select>
                  <!-- </validation-provider> -->
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Choose a security question:</label>
                  <!-- <validation-provider
                    #default="{ errors }"
                    name="Question4"
                    rules="required"
                  > -->
                    <b-form-select v-model="data.question4" :options="sqOptons" class="common-input">
                    </b-form-select>
                  <!-- </validation-provider> -->
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Choose a security question:</label>
                  <!-- <validation-provider
                    #default="{ errors }"
                    name="Question5"
                    rules="required"
                  > -->
                    <b-form-select v-model="data.question5" :options="sqOptons" class="common-input">
                    </b-form-select>
                  <!-- </validation-provider> -->
                </div>
              </b-col>
              <b-col cols="6">
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Answer</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Answer1"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.answer1"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Answer"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Answer</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Answer2"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.answer2"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Answer"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Answer</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Answer3"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.answer3"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Answer"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Answer</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Answer4"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.answer4"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Answer"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
                <div class="mb-1">
                  <label
                    class="form-label common-input-label"
                    for="floatingInput"
                  >Answer</label>
                  <validation-provider
                    #default="{ errors }"
                    name="Answer5"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="data.answer5"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Answer"
                      class="common-input"
                      style="width: 100%;"
                    />
                  </validation-provider>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="12" class="d-flex flex-row justify-content-between">
                <b-button
                  variant="primary"
                  class="common-btn"
                  @click="handleBack"
                >
                  Back
                </b-button>
                <b-button
                  variant="primary"
                  class="common-btn"
                  @click="handleContinue"
                >
                  Continue
                </b-button>
              </b-col>
            </b-row>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FlowForm, {
//   ChoiceOption, LanguageModel, QuestionModel, QuestionType,
// } from '@ditdot-dev/vue-flow-form'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BButton, BRow, BCol, BFormSelect, BFormInput, BFormGroup
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { $themeConfig } from '@themeConfig'
import { VBTooltip } from 'bootstrap-vue'
import AuthService from '@/services/AuthService'
import { mapMutations, mapActions, mapState } from 'vuex'
import { password, required, confirmed } from '@validations'
import FlowForm from '../../../../vue-flow-form/src/components/FlowForm.vue'
import QuestionModel, { ChoiceOption, QuestionType } from '../../../../vue-flow-form/src/models/QuestionModel'
import LanguageModel from '../../../../vue-flow-form/src/models/LanguageModel'
// import UsersService from '../../../services/UsersService'

export default {
  name: 'VerifyIdentity',
  components: {
    ValidationProvider,
    ValidationObserver,
    FlowForm,
    BButton,
    BRow,
    BCol,
    BFormSelect,
    BFormGroup,
    BFormInput
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      required,
      showModal: true,
      errorMsg: '',
      language: new LanguageModel({
        name: 'en',
        pressEnter: '',
        submitText: 'Take me there',
        thankYouText: `Your identity verification is almost complete 🎉.\n
          The last step is verifying your ID.`,
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
      }),
      sqOptons: [
        { valule: null, text: 'Select Question' },
        { value: 'In what city were you born?', text: 'In what city were you born?' },
        { value: 'What was your favorite food as a child?', text: 'What was your favorite food as a child?' },
        { value: 'What is the name of your favorite pet?', text: 'What is the name of your favorite pet?' },
        { value: 'What high school did you attend?', text: 'What high school did you attend?' },
        { value: 'What is the name of your first school?', text: 'What is the name of your first school?' },
        { value: 'Where did you meet your spouse?', text: 'Where did you meet your spouse?' },
        { value: 'What was your childhood nickname?', text: 'What was your childhood nickname?' },
        { value: 'In what city did you meet your spouse/significant other?', text: 'In what city did you meet your spouse/significant other?' },
        { value: 'What is the name of your favorite childhood friend?', text: 'What is the name of your favorite childhood friend?' },
        { value: 'What street did you live on in third grade?', text: 'What street did you live on in third grade?' },
        { value: 'What is your oldest sibling’s birthday month and year? (e.g., January 1900)', text: 'What is your oldest sibling’s birthday month and year? (e.g., January 1900)' },
        { value: 'What is the middle name of your youngest child?', text: 'What is the middle name of your youngest child?' },
        { value: 'What is your oldest sibling\'s middle name?', text: 'What is your oldest sibling\'s middle name?' },
        { value: 'What school did you attend for sixth grade?', text: 'What school did you attend for sixth grade?' },
        { value: 'What was your childhood phone number including area code? (e.g., 000-000-0000)', text: 'What was your childhood phone number including area code? (e.g., 000-000-0000)' },
        { value: 'What is your oldest cousin\'s first and last name?', text: 'What is your oldest cousin\'s first and last name?' },
        { value: 'What was the name of your first stuffed animal?', text: 'What was the name of your first stuffed animal?' },
        { value: 'In what city or town did your mother and father meet?', text: 'In what city or town did your mother and father meet?' },
        { value: 'Where were you when you had your first kiss?', text: 'Where were you when you had your first kiss?' },
        { value: 'What is the first name of the boy or girl that you first kissed?', text: 'What is the first name of the boy or girl that you first kissed?' },
        { value: 'What was the last name of your third grade teacher?', text: 'What was the last name of your third grade teacher?' },
        { value: 'In what city does your nearest sibling live?', text: 'In what city does your nearest sibling live?' },
        { value: 'What is your youngest brother’s birthday month and year? (e.g., January 1900)', text: 'What is your youngest brother’s birthday month and year? (e.g., January 1900)' },
        { value: 'What is your maternal grandmother\'s maiden name?', text: 'What is your maternal grandmother\'s maiden name?' },
        { value: 'In what city or town was your first job?', text: 'In what city or town was your first job?' },
        { value: 'What is the name of the place your wedding reception was held?', text: 'What is the name of the place your wedding reception was held?' },
        { value: 'What is the name of a college you applied to but didn\'t attend?', text: 'What is the name of a college you applied to but didn\'t attend?' },
        { value: 'Where were you when you first heard about 9/11?', text: 'Where were you when you first heard about 9/11?' },
      ],
      sqList: [
        'Select Question',
        'In what city were you born?',
        'What was your favorite food as a child?',
        'What is the name of your favorite pet?',
        'What high school did you attend?',
        'What is the name of your first school?',
        'Where did you meet your spouse?',
        'What was your childhood nickname?',
        'In what city did you meet your spouse/significant other?',
        'What is the name of your favorite childhood friend?',
        'What street did you live on in third grade?',
        'What is your oldest sibling’s birthday month and year? (e.g., January 1900)',
        'What is the middle name of your youngest child?',
        'What is your oldest sibling\'s middle name?',
        'What school did you attend for sixth grade?',
        'What was your childhood phone number including area code? (e.g., 000-000-0000)',
        'What is your oldest cousin\'s first and last name?',
        'What was the name of your first stuffed animal?',
        'In what city or town did your mother and father meet?',
        'Where were you when you had your first kiss?',
        'What is the first name of the boy or girl that you first kissed?',
        'What was the last name of your third grade teacher?',
        'In what city does your nearest sibling live?',
        'What is your youngest brother’s birthday month and year? (e.g., January 1900)',
        'What is your maternal grandmother\'s maiden name?',
        'In what city or town was your first job?',
        'What is the name of the place your wedding reception was held?',
        'What is the name of a college you applied to but didn\'t attend?',
        'Where were you when you first heard about 9/11?',
      ],
      questions: [
        new QuestionModel({
          id: 'FirstName',
          title: 'What’s your first name?',
          type: QuestionType.Text,
          required: true,
        }),
        new QuestionModel({
          id: 'LastName',
          title: 'What’s your last name?',
          type: QuestionType.Text,
          required: true,
        }),
        new QuestionModel({
          id: 'MMN',
          title: 'What’s you mother maiden name?',
          type: QuestionType.Text,
          required: true,
        }),
        new QuestionModel({
          id: 'DoB',
          title: 'What’s your date of birth?',
          placeholder: 'MM/DD/YYYY',
          type: QuestionType.Date,
          required: true,
        }),
        new QuestionModel({
          id: 'SSN',
          title: 'What’s your Social Security Number?',
          type: QuestionType.Number,
          required: true,
        }),
        // new QuestionModel({
        //   id: 'address',
        //   title: 'Address',
        //   type: QuestionType.MultipleQuestions,
        //   required: true,
        //   questions: [
        //     new QuestionModel({
        //       id: 'street',
        //       title: 'What’s your street name?',
        //       type: QuestionType.Text,
        //       required: true,
        //     }),
        //     new QuestionModel({
        //       id: 'state',
        //       title: 'What’s your state name?',
        //       type: QuestionType.Text,
        //       required: true,
        //     }),
        //     new QuestionModel({
        //       id: 'city',
        //       title: 'What’s your city name?',
        //       type: QuestionType.Text,
        //       required: true,
        //     }),
        //     new QuestionModel({
        //       id: 'zip',
        //       title: 'What’s your zip number?',
        //       type: QuestionType.Number,
        //       required: true,
        //     }),
        //     new QuestionModel({
        //       id: 'apt',
        //       title: 'What’s your APT address?',
        //       type: QuestionType.Text,
        //       required: false,
        //     }),
        //   ],
        // }),
        new QuestionModel({
          id: 'addressFull',
          title: '',
          type: QuestionType.MultipleQuestions,
          autoFillAddress: true,
          required: true,
          questions: [
            new QuestionModel({
              id: 'address',
              title: 'What’s your home address?',
              placeholder: 'Address',
              autoFillAddress: true,
              type: QuestionType.Text,
              required: true,
            }),
            new QuestionModel({
              id: 'apartmentNumber',
              placeholder: 'Apt/ Suite No',
              type: 'apartment',
              required: false,
            }),
          ],
        }),
        new QuestionModel(
          {
            id: 'security_questions_1',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            answer: ['Select Question', null],
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_1',
                  // title: 'Please choose a security question',
                  title: 'Please answer a security question (1/5)',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [
                    /* new ChoiceOption({
                          label: 'Select Question',
                          value: 'Select Question',
                        }),
                        new ChoiceOption({
                          label: 'In what city were you born?',
                          value: 'In what city were you born?',
                        }),
                        new ChoiceOption({
                          label: 'What was your favorite food as a child?',
                          value: 'What was your favorite food as a child?',
                        }),
                        new ChoiceOption({
                          label: 'What is the name of your favorite pet?',
                          value: 'What is the name of your favorite pet?',
                        }),
                        new ChoiceOption({
                          label: 'What high school did you attend?',
                          value: 'What high school did you attend?',
                        }),
                        new ChoiceOption({
                          label: 'What is the name of your first school?',
                          value: 'What is the name of your first school?',
                        }),
                        new ChoiceOption({
                          label: 'Where did you meet your spouse?',
                          value: 'Where did you meet your spouse?',
                        }), */
                  ],
                },
              ),
              new QuestionModel({
                id: 'answer_1',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ),
        new QuestionModel(
          {
            id: 'security_questions_2',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_2',
                  // title: 'One more',
                  title: 'Please answer a security question (2/5)',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [],
                },
              ),
              new QuestionModel({
                id: 'answer_2',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ),
        new QuestionModel(
          {
            id: 'security_questions_3',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_3',
                  // title: 'One more please, it’s for your security',
                  title: 'Please answer a security question (3/5)',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [],
                },
              ),
              new QuestionModel({
                id: 'answer_3',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ),
        new QuestionModel(
          {
            id: 'security_questions_4',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_4',
                  // title: 'Almost there 🎉',
                  title: 'Please answer a security question (4/5)',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [],
                },
              ),
              new QuestionModel({
                id: 'answer_4',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ),
        new QuestionModel(
          {
            id: 'security_questions_5',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_5',
                  // title: 'Last one, I promise 🤓',
                  title: 'Please answer a security question (5/5)',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [],
                },
              ),
              new QuestionModel({
                id: 'answer_5',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ),
        /* new QuestionModel(
          {
            id: 'security_questions_6',
            title: '',
            type: QuestionType.MultipleQuestions,
            required: false,
            questions: [
              new QuestionModel(
                {
                  id: 'security_questions_6',
                  title: 'One more, for your security',
                  type: QuestionType.Dropdown,
                  required: true,
                  options: [
                    new ChoiceOption({
                      id: 'security_questions_6_1',
                      value: 'What is your favorite color?',
                    }),
                  ],
                },
              ),
              new QuestionModel({
                id: 'answer_6',
                placeholder: 'Answer',
                type: QuestionType.Text,
                required: true,
              }),
            ],
          },
        ), */
      ],

      ssnData: {
        FirstName: '',
        LastName: '',
        dob: '',
        SSN: null,
      },
      middleName: '',
      subAddress: '',
      dobMonth: '',
      dobDay: '',
      dobYear: '',
      data: {
        firstName: '',
        lastName: '',
        ssn: '',
        dob: '',
        city: '',
        street: '',
        zip: '',
        state: '',
        fullAddress: '',
        departmentNumber: '',
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        question6: null,
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: '',
        step1: '',
        step2: '',
      },
      verifying: false,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      verifyStep: state => state.user.verifyStep,

    }),
    verifyShowStep() {
      let startIndex = 0
      if(this.verifyStep === 'start') startIndex = 1
      else if (this.verifyStep === 'general') startIndex = 2
      else if (this.verifyStep === 'security') startIndex = 3
      else if (this.verifyStep === 'almost') startIndex = 4
      console.log("verifyStep: ", this.verifyStep, startIndex)
      return startIndex
    },
    appName() {
      return $themeConfig.app.appName
    },
    appLogoImage() {
      return $themeConfig.app.appLogoImage
    },
    securityQuestions() {
      return this.sqList.map(item => new ChoiceOption({
        label: item,
        value: item,
      }))
    },
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  created() {
    // this.questions = this.questions.map(q => {
    //   if (q.id === 'FirstName') {
    //     // eslint-disable-next-line no-param-reassign
    //     q.answer = this.user.firstName
    //   } else if (q.id === 'LastName') {
    //     // eslint-disable-next-line no-param-reassign
    //     q.answer = this.user.lastName
    //   }
    //   return q
    // })
    // const firstSQIndex = this.questions.findIndex(item => item.id === 'security_questions_1')
    // this.questions[firstSQIndex].questions[0].options = this.securityQuestions
  },
  methods: {
    ...mapMutations({
      logoutUser: 'user/LOGOUT_USER',
      updateUser: 'user/UPDATE_USER',
    }),
    ...mapActions({
      updateVerifyStep: 'user/updateVerifyStep'
    }),
    handleStart() {
      this.updateVerifyStep('general')
    },
    handleAlmostStart() {

    },
    handleBack() {
      if (this.verifyShowStep === 2)
        this.updateVerifyStep('start')
      else if (this.verifyShowStep === 3)
        this.updateVerifyStep('general')
    },
    async handleContinue() {
      if (this.verifyShowStep === 2) {
        return new Promise((resolve, reject) => {
          this.$refs.general.validate().then(success => {
            if(success) {
              console.log("general information success: ")
              this.updateVerifyStep('security')
              resolve(true)
            } else {
              reject()
            }
          })
        })
      } else if (this.verifyShowStep === 3) {
        return new Promise((resolve, reject) => {
          this.$refs.sq.validate().then(success => {
            console.log("$req.sq.Validate(): ", success)
            if(success) {
              console.log("general information success: ")
              // this.updateVerifyStep('almost')
              this.onSubmit()
              resolve(true)
            } else {
              reject()
            }
          })
        })
      }
    },
    logout() {
      AuthService.logout()
        .then(() => {
          this.logoutUser()
          window.location.href = '/login-page'
        })
        .catch(error => {
          const messageEr = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message
                || error.toString()
          console.log(messageEr)
        })
    },
    async complete(data) {
      try {
        this.verifying = true
        console.log(data)
        const { data: response } = await this.$http.post('/auth/step1', data)
        if (response.type === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.display,
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.updateUser({
            ...this.user,
            ...data,
          })
          this.$emit('complete', data)
          await this.$router.push('verif-persona')
          return true
        }
        throw new Error(response.display)
      } catch (e) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: e.message,
            icon: 'AlertTriangeIcon',
            variant: 'error',
          },
        })
        return false
      } finally {
        this.verifying = false
      }
    },

    // onSubmit(questionsList) {
    onSubmit() {
      console.log('onSubmit', this.data)
      // Object.keys(questionsList)
      //   .forEach(k => {
      //     this.data.step1 = 'complete'
      //     // console.log('-----id---->', questionsList[k].id)
      //     // console.log(questionsList[k].title, '------', questionsList[k].answer[0])
      //     // console.log('-----title---->', questionsList[k])

      //     // eslint-disable-next-line default-case
      //     switch (questionsList[k].id) {
      //       case 'security_questions_1':
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.question2 = questionsList[k].answer[0]
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.answer2 = questionsList[k].answer[1]
      //         break
      //       case 'security_questions_2':
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.question3 = questionsList[k].answer[0]
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.answer3 = questionsList[k].answer[1]
      //         break
      //       case 'security_questions_3':
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.question4 = questionsList[k].answer[0]
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.answer4 = questionsList[k].answer[1]
      //         break
      //       case 'security_questions_4':
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.question5 = questionsList[k].answer[0]
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.answer5 = questionsList[k].answer[1]
      //         break
      //       case 'security_questions_5':
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.question6 = questionsList[k].answer[0]
      //         // eslint-disable-next-line prefer-destructuring
      //         this.data.answer6 = questionsList[k].answer[1]
      //         break
      //     }
      //   })
      this.data.dob = `${this.dobDay}-${this.dobYear}-${this.dobMonth}`
      this.data.step1 = 'complete'
      this.data.step2 = 'complete'
      this.data.step3 = 'incomplete'
      this.complete(this.data)
    },
    async onAnswer(question) {
      console.error('onAnswer', question)
      this.errorMsg = ''

      const nextQuestion = this.questions[question.index + 1]
      if (question.id && question.id.toLowerCase().startsWith('security_questions_')) {
        console.error('it is security question')
        if (nextQuestion && nextQuestion.id && nextQuestion.id.startsWith('security_questions_')) {
          const filteredOptions = this.securityQuestions
            .filter(option => !this.questions.find(q => q.id && q.id.startsWith('security_questions_')
                  && q.index <= question.index && q.answer && q.answer[0] === option.value))
          this.questions[question.index + 1].questions[0].options = filteredOptions
          this.questions[question.index + 1].answer = [filteredOptions[0].value, null]
          console.log(this.questions[question.index + 1].questions)
        }
        return true
      }

      // eslint-disable-next-line default-case
      switch (question.id) {
        case 'FirstName':
          if (question.answer !== this.user.firstName) {
            this.errorMsg = 'First name should be same as in your ID as well as the name used while creating your account'
            return false
          }
          this.ssnData.FirstName = question.answer
          this.data.firstName = question.answer
          break
          // eslint-disable-next-line no-duplicate-case
        case 'LastName':
          if (question.answer !== this.user.lastName) {
            this.errorMsg = 'Last name should be same as in your ID as well as the name used while creating your account'
            return false
          }
          this.data.lastName = question.answer
          break
          // eslint-disable-next-line no-duplicate-case
        case 'DoB': {
          const [year, month, day] = question.answer.split('-')
          this.data.dob = [month, day, year].join('-')
          break
        }
        // eslint-disable-next-line no-duplicate-case
        case 'SSN':
          this.data.ssn = question.answer
          break
          // eslint-disable-next-line no-duplicate-case
          // case 'DoB':
          //   this.data.dob = question.answer
          //   break
          // eslint-disable-next-line no-duplicate-case
        case 'address':
          console.log(question.answer)
          this.data.street = question?.answer[0]
          this.data.state = question?.answer[1]
          this.data.city = question?.answer[2]
          this.data.zip = question?.answer[3]
          this.data.departmentNumber = question?.answer[4]
          break
          // eslint-disable-next-line no-duplicate-case
        case 'addressFull':
          console.log(question.answer)
          this.data.fullAddress = question?.answer[0]
          this.data.departmentNumber = question?.answer[1]
          break
          // eslint-disable-next-line no-duplicate-case
        case 'MMN':
          this.data.question1 = question.title
          this.data.answer1 = question.answer
          break
          // eslint-disable-next-line no-duplicate-case
          // case 'question2':
          //   this.data.question2 = question.title
          //   this.data.answer2 = question.answer
          //   break
          // eslint-disable-next-line no-duplicate-case
          // case 'question3':
          //   this.data.question3 = question.title
          //   this.data.answer3 = question.answer
          //   break
          // eslint-disable-next-line no-duplicate-case
          // case 'question4':
          //   this.data.question4 = question.title
          //   this.data.answer4 = question.answer
          //   break
          // eslint-disable-next-line no-duplicate-case
          // case 'question5':
          //   this.data.question5 = question.title
          //   this.data.answer5 = question.answer
          //   break
          // eslint-disable-next-line no-duplicate-case
          // case 'question6':
          //   this.data.question6 = question.title
          //   this.data.answer6 = question.answer
          //   break
      }

      if (question.id === 'FirstName') {
        this.ssnData.FirstName = question.answer
      }
      if (question.id === 'LastName') {
        this.ssnData.LastName = question.answer
      }
      if (question.id === 'SSN') {
        this.ssnData.SSN = question.answer
        // UsersService.verifSSN(this.ssnData)
        //   .then(response => {
        //     console.log(response)
        //     if (response.data.response.Status === 1) {
        //       this.$refs.flowForm.goToPreviousQuestion()
        //       this.$toast('SSN doesn’t exist/not found.', {
        //         type: 'warning',
        //       })
        //     }
        //     if (response.data.response.Status === 2) {
        //       this.$refs.flowForm.goToPreviousQuestion()
        //       this.$toast('SSN exists, but provided first name or last name doesn’t match the retrieved information.', {
        //         type: 'warning',
        //       })
        //     }
        //     if (response.data.response.Status === 3) {
        //       this.$refs.flowForm.goToPreviousQuestion()
        //       this.$toast('SSN exists and provided first/last name matches the retrieved information, but the person is registered as deceased so, it is likely a fraud attempt.', {
        //         type: 'warning',
        //       })
        //     }
        //     if (response.data.response.Status === 4) {
        //       this.$refs.flowForm.goToPreviousQuestion()
        //       this.$toast('An error has happened during the query. It could be a transitory issue so a retry could be attempted.', {
        //         type: 'warning',
        //       })
        //     }
        //   })
        //   .catch(error => {
        //     this.messageEr = (error.response
        //     && error.response.data
        //     && error.response.data.message)
        //     || error.message || error.toString()
        //     console.log(this.messageEr)
        //   })
      }
      return true
    },
  },
}
</script>

<style>

@import '../../../../vue-flow-form/src/assets/css/themes/theme-minimal.css';

@import '../../../../vue-flow-form/src/assets/css/themes/theme-purple.css';
</style>
