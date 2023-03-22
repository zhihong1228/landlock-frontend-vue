<template>
  <!--  <b-modal-->
  <!--    v-model="showModal"-->
  <!--    hide-footer-->
  <!--    title="Register Property"-->
  <!--    size="lg"-->
  <!--    centered-->
  <!--    hide-headerssss-->
  <!--  >-->
  <div
    style="padding: 0 20px 20px; overflow:hidden; height: calc(100vh - 170px);"
    class="d-flex flex-column"
  >
    <!--    <div
      v-if="showLogout"
      class="position-logo-logout"
    >
      <img
        src="../../../assets/images/logo/logo-landlock.png"
        class="width-logo"
      >
      <feather-icon
        v-b-tooltip.hover.bottom="'Home'"
        icon="HomeIcon"
        size="25"
        @click="$router.push('/')"
      />
    </div>-->
    <flow-form
      v-show="showModal"
      ref="flowForm"
      :standalone="true"
      :language="language"
      :questions="questions"
      :progressbar="false"
      :on-answer="onAnswer"
      :on-set-question="onSetQuestion"
      :is-loading="isLoading"
      @submit="onSubmit"
    >

      <template v-slot:payment>
        <div>
          <!-- Payment Card -->
          <b-card-title class="text-uppercase text-center text-primary font-weight-bold">
            Payment Options
          </b-card-title>
          <h4 class="card-holder-name mb-1 text-center mb-3">
            {{ fullName }} - Amount to Pay: $995
          </h4>
          <div>
            <div
              v-if="loadingCard"
              class="d-flex justify-content-between"
            >
              <b-skeleton
                border-radius="10px"
                class="rounded"
                height="43px"
                no-aspect
                width="68%"
              />
              <b-skeleton
                border-radius="10px"
                class="rounded"
                height="43px"
                no-aspect
                width="15%"
              />
              <b-skeleton
                border-radius="10px"
                class="rounded"
                height="43px"
                no-aspect
                width="15%"
              />
            </div>
            <div
              id="payment-element"
            />
            <b-button
              variant="black"
              class="btn-block mt-3"
              :disabled="isLoading"
              @click="payWithCard"
            >
              <b-spinner
                v-if="isLoading"
                variant=""
                small
                class="mr-1"
              />
              <span>Pay Now</span>
            </b-button>
          </div>
        </div>
      </template>
      <template v-slot:error>
        <transition name="fade">
          <div
            v-if="qError"
            class="p-0"
          >
            <feather-icon
              icon="AlertTriangleIcon"
              size="16"
            />
            {{ qError }}
          </div>
        </transition>
      </template>
    </flow-form>
    <!-- <modal-warning
      :property="property"
    /> -->
    <b-row
      v-if="!showModal"
      class="auth-inner mt-5 pt-5"
    >
      <div
        class="d-flex flex-column align-items-center justify-content-center w-100 h-100 mt-5"
      >
        <b-spinner
          style="width: 3rem; height: 3rem"
          variant="primary"
        />
        <h4 class="mt-2">
          Please wait...
        </h4>
      </div>
    </b-row>

    <!--    <modal-warning-->
    <!--      v-if="property"-->
    <!--      :property="property"-->
    <!--    />-->
  </div>
  <!--  </b-modal>-->
</template>

<script>
// import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
// import ModalWarning from '@/views/components/ModalWarning.vue'
import {
  VBTooltip, BSpinner, BSkeleton, BCardTitle, BRow, BButton,
} from 'bootstrap-vue'
import { mapMutations } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import REGISTER_PROPERTY_QUESTIONS from '@/views/components/register-property/constants'
import { errMessage } from '@/utils/errMessage'
import FlowForm from '../../../../vue-flow-form/src/components/FlowForm.vue'
import QuestionModel from '../../../../vue-flow-form/src/models/QuestionModel'
import LanguageModel from '../../../../vue-flow-form/src/models/LanguageModel'
import PropertyService from '../../../services/PropertyService'

export default {
  name: 'RegisterProperty',
  components: {
    FlowForm,
    BSpinner,
    BSkeleton,
    BCardTitle,
    BRow,
    BButton,
    // BModal,
    // ModalWarning,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    propertyData: {
      type: Object,
      required: false,
      default: () => null,
    },
    showLogout: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    addingProperty: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      messageEr: null,
      elements: null,
      isLoading: false,
      loadingCard: true,
      qError: null,
      showModal: false,
      fullName: null,
      language: new LanguageModel({
        multipleChoiceHelpTextSingle: '',
        thankYouText:
            'Congratulations! Your property is now registered on LandLock. You will be redirected to the warning page. Please Download the warning, print it and attach it to your deed.',
        submitText: 'Take me there',
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
      }),
      questions: REGISTER_PROPERTY_QUESTIONS,
      namePairs: {
        llc: ['Limited Liability Company', 'LLC'],
        corp: ['Corporation', 'Incorporated', 'Limited', 'Corp.', 'Corp', 'Inc.', 'Inc', 'Ltd.', 'Ltd'],
        part: ['Limited Partnership', 'General Partnership', 'Limited Liability Partnership', 'LP', 'GP',
          'LLP'],
      },
      ownerIndex: 0,
      percentage: 0,
      corpName: '',
      llcName: '',
      partName: '',
      trustName: '',
      data: {
        name: null,
        category: null,
        price: null,
        street: null,
        state: null,
        city: null,
        zip: null,
        departmentNumber: null,
        fullAddress: null,
        numberBlock: null,
        numberLot: null,
        numberParcel: null,
        ownership: true,
      },
      owners: [{
        name: null,
        type: null,
        percentage: null,
        role: null,
        entityName: null,
        ein: null,
      }],
      currentProperty: null,
      property: null,
    }
  },
  computed: {
    username() {
      if (localStorage.getItem('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'))
        return `${userData.firstName} ${userData.lastName}`
      }
      return ''
    },

  },
  mounted() {
    console.log('mounted')
    this.$refs.flowForm.reset()
    if (this.propertyData) {
      this.currentProperty = this.propertyData
      this.insertAnswers(this.propertyData).then(() => {
        this.showModal = true
      }).catch(err => {
        this.messageEr = errMessage(err)
        this.showError(this.messageEr, false)
      })
    } else this.getUserProperty()
  },
  methods: {
    ...mapMutations({
      logoutUser: 'user/LOGOUT_USER',
    }),
    addIDToLocation(id) {
      window.history.pushState(
        {},
        null,
        this.$route.path.replace('null', id),
      )
    },
    async getUserProperty() {
      const newPropertyID = parseInt(this.$route.params.id, 10)
      if (newPropertyID) {
        try {
          const response = await PropertyService.findOne(newPropertyID)
          console.log(response.data)
          if (!response.data) {
            this.showModal = true
            return
          }
          this.currentProperty = response.data.data
          if (this.currentProperty) await this.insertAnswers(this.currentProperty)
          else await this.insertAnswers({ owners: [] })
          this.showModal = true
        } catch (error) {
          this.messageEr = errMessage(error)
          this.showError(this.messageEr, false)
        }
      } else {
        this.showModal = true
      }
    },
    async insertAnswers(property) {
      console.log('inserting answers')
      Object.keys(this.questions)
        .forEach(k => {
          console.log('k', k, this.questions[k].id, this.questions[k].answer)
          // eslint-disable-next-line default-case
          switch (this.questions[k].id) {
            case 'fullAddress':
              if (property.fullAddress) {
                this.questions[k].answer = [property.fullAddress, property.departmentNumber]
                this.questions[k].answered = true
              }
              break
            case 'price':
              if (property.price) {
                this.questions[k].answer = parseInt(property.price, 10) / 100
                this.questions[k].answered = true
              }
              break
            case 'titleCompany':
              if (property.titleCompany != null) {
                this.questions[k].answer = property.titleCompany
                this.questions[k].answered = true
              }
              break
            case 'propertyType': {
              if (property.category != null) {
                this.questions[k].answer = property.category
                this.questions[k].options = this.questions[k].options.map(o => {
                  // eslint-disable-next-line no-param-reassign
                  if (o.value === property.category) o.selected = true
                  return o
                })
                this.questions[k].answered = true
              }
              break
            }
            case 'alreadyOwned': {
              if (property.ownership != null) {
                this.questions[k].answer = property.ownership
                this.questions[k].options = this.questions[k].options.map(o => {
                  // eslint-disable-next-line no-param-reassign
                  if (o.value === property.ownership) o.selected = true
                  return o
                })
                this.questions[k].answered = true
              } else console.error('property.ownership is null')
              break
            }
            case 'addNewOwner': {
              if (property.addNewOwner != null) {
                this.questions[k].answer = property.addNewOwner
                this.questions[k].options = this.questions[k].options.map(o => {
                  // eslint-disable-next-line no-param-reassign
                  if (o.value === property.addNewOwner) o.selected = true
                  return o
                })
                this.questions[k].answered = true
              }
              break
            }
            case 'paymentOptions': {
              if (property.paymentOptions != null) {
                this.questions[k].answer = property.paymentOptions
                this.questions[k].options = this.questions[k].options.map(o => {
                  console.log(o.value, property.paymentOptions)
                  // eslint-disable-next-line no-param-reassign
                  if (o.value === property.paymentOptions) o.selected = true
                  return o
                })
                this.questions[k].answered = true
              } else console.error('no payment options')
              break
            }
            case 'knowBlockLot': {
              if (property.knowBlockLot != null) {
                this.questions[k].answer = property.knowBlockLot
                this.questions[k].options = this.questions[k].options.map(o => {
                  // eslint-disable-next-line no-param-reassign
                  if (o.value === property.knowBlockLot) o.selected = true
                  return o
                })
                this.questions[k].answered = true
              }
              break
            }
            case 'lot':
              this.questions[k].answer = [property.numberLot, property.numberBlock, property.numberParcel]
              break
            case '0-name':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].name
              break
            case '0-personName':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].name
              break
            case '0-percentage':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].percentage
              break
            case '0-TrustEIN' || '0-LLCEIN' || '0-CorpEIN' || '0-PartEIN' || '0-EstateEIN':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].ein
              break
            case '0-TrustEntityName' || '0-LLCEntityName' || '0-CorpEntityName' || '0-PartEntityName' || '0-EstateEntityName':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].entityName
              break
            case '0-ownerTypeTrust' || '0-ownerTypeLLC' || '0-ownerTypeCorp' || '0-personName' || '0-ownerTypePart' || '0-ownerTypeEstate':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].role
              break
            case '0-ownershipType':
              if (property.owners && property.owners[0]) this.questions[k].answer = property.owners[0].type
              this.questions[k].options = this.questions[k].options.map(o => {
                // eslint-disable-next-line no-param-reassign
                if (o.value === property.owners[0]?.type) o.selected = true
                return o
              })
              break
          }
        })
      console.log('after inserting answers', 'k')
      // TODO: skip answered questions
      /* setTimeout(async () => {
        console.log('going to price question')
        this.$refs.flowForm.goToQuestion('price')
        await this.$nextTick()
        console.log('going to price question')
        this.$refs.flowForm.goToQuestion('price')
      }, 1000) */
    },
    async updateProperty(updateData) {
      try {
        const response = await PropertyService.updateProp(this.currentProperty.id, updateData)
        console.log(response)
        return true
      } catch (error) {
        this.messageEr = errMessage(error)
        this.showError(`${this.messageEr || 'something went wrong!'}`, false)
        return false
      }
    },
    async onSubmit(/* questionsList */) {
      await this.$router.replace({ name: 'view-property', params: { id: this.currentProperty.id } })
    },
    // eslint-disable-next-line no-unused-vars
    async onSetQuestion(question) {
      if (!question) {
        return
      }
      console.log('onSetQuestion', question)
      if (question.id === 'payment') {
        this.$nextTick(() => {
          this.initCard()
        })
      }
      // if (question.id && question.id.endsWith('-name')) {
      // return new QuestionModel({
      //   ...question,
      //   title: 'sdjflklsdk',
      // })
      // }
      // return question
    },
    async onAnswer(question) {
      this.qError = ''
      const nextQuestion = this.questions[question.index + 1]
      console.log('onAnswer - current question', this.questions[question.index])
      console.log('onAnswer - next question', nextQuestion)

      /* const nextQuestionPlusOne = this.questions[question.index + 2]
      console.log('nextqu+1 id', nextQuestion.id)
      if (nextQuestion && nextQuestion.id && (nextQuestion.id.endsWith('-name')
        || nextQuestion.id.endsWith('-personName'))) {
        console.log(this.username)
        this.fullName = this.username
        this.questions[question.index + 2].answer = this.username
      } */

      const personQuestion = this.questions.find(q => q.id && q.id.endsWith('-personName'))
      if (personQuestion)personQuestion.answer = this.username

      const nameQuestion = this.questions.find(q => q.id && q.id.endsWith('-name'))
      if (nameQuestion)nameQuestion.answer = this.username

      if (question.id === 'alreadyOwned') {
        if (question.answer === false) {
          this.questions.find(q => q.id === '0-ownershipType').title = 'Who will own the property?'
        } else {
          this.questions.find(q => q.id === '0-ownershipType').title = 'Who owns the property?'
        }
      }

      // if (this.currentProperty && nextQuestionPlusOne && nextQuestionPlusOne.id === 'propertyType') {
      //   console.log(this.questions[question.index + 2].answer, this.currentProperty.category)
      //   // this.questions[k].answer = this.currentProperty.category
      // }

      // Checks if entity name is valid
      if (question.id && question.id.toLowerCase()
        .endsWith('entityname')) {
        const namePairKey = Object.keys(this.namePairs)
          .find(pair => question.id.toLowerCase()
            .includes(pair.toLowerCase()))
        const namePair = this.namePairs[namePairKey]
        if (namePair) {
          const matched = namePair.find(name => question.answer.toLowerCase()
            .includes(name.toLowerCase()))
          if (!matched) {
            this.qError = `Entity name must include one of the following: ${namePair.join(', ')}`
            return false
          }
        }
      }

      if (question.id && question.id
          === '0-addNewOwnerEmail') {
        console.log('addNewOwnerEmail', question.answer)
        if (question.answer) {
          this.$refs.flowForm.goToQuestion('addNewOwner')
        }
        return false
      }

      switch (question.id) {
        case '0-LLCEntityName':
          this.owners[0].entityName = question.answer
          this.questions = this.questions.map(q => {
            if (q.id === '0-isOwnerLLC') {
              return new QuestionModel({
                ...q,
                title: `Are you the Manager, Managing Member, Officer or Owner/Member of ${question.answer}?`,
              })
            }
            return q
          })
          break
        case '0-CorpEntityName':
          this.owners[0].entityName = question.answer
          this.questions = this.questions.map(q => {
            if (q.id === '0-isOwnerCorp') {
              return new QuestionModel({
                ...q,
                title: `Are you the President, Vice President, Officer or Owner/Shareholder of ${question.answer}?`,
              })
            }
            return q
          })
          break
        case '0-PartEntityName':
          this.owners[0].entityName = question.answer
          this.questions = this.questions.map(q => {
            if (q.id === '0-isOwnerPart') {
              return new QuestionModel({
                ...q,
                title: `Are you a General Partner, Partner/Owner or Officer of ${question.answer}?`,
              })
            }
            return q
          })
          break
        case '0-EstateEntityName':
          this.owners[0].entityName = question.answer
          this.questions = this.questions.map(q => {
            if (q.id === '0-isOwnerEstate') {
              return new QuestionModel({
                ...q,
                title: `Are you the Executor, Executrix or Administrator of the ${question.answer}?`,
              })
            }
            return q
          })
          break
        case '0-TrustEntityName':
          this.owners[0].entityName = question.answer
          this.questions = this.questions.map(q => {
            if (q.id === '0-isOwnerTrust') {
              return new QuestionModel({
                ...q,
                title: `Are you the Trustee of ${question.answer}?`,
              })
            }
            return q
          })
          break
        default:
      }

      let updateData = {}
      let result = false
      // eslint-disable-next-line default-case
      switch (question.id) {
        case 'fullAddress': {
          if (!question.answer) break
          const [address, apartment, location] = question.answer
          this.data.fullAddress = address
          this.data.departmentNumber = apartment
          this.data.lat = location?.lat
          this.data.lng = location?.lng
          updateData = {
            fullAddress: address,
            departmentNumber: apartment,
            lat: location?.lat,
            lng: location?.lng,
            category: this.data.category,
          }
          if (this.currentProperty) {
            result = await this.updateProperty(updateData)
            if (!result) return false
          } else {
            try {
              const response = await PropertyService.create(this.data)
              this.currentProperty = response.data
              this.addIDToLocation(`${this.currentProperty.id}`)
              // TODO:IMPORTANT check meaning of next line, it may finish the form accidentally
              // this.$emit('complete', this.property)
            } catch (error) {
              this.messageEr = errMessage(error)
              this.showError(`${this.messageEr || 'something went wrong!'}`, false)
              return false
            }
          }
          break
        }
        case 'lot':
          updateData = {
            numberLot: question.answer[0] ? parseInt(question.answer[0], 10) : null,
            numberBlock: question.answer[1] ? parseInt(question.answer[1], 10) : null,
            numberParcel: question.answer[2] ? parseInt(question.answer[2], 10) : null,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        case 'propertyType': {
          this.data.category = question.answer
          const addressQuestion = this.questions.find(q => q.id.toLowerCase().endsWith('fulladdress'))
          if (question.answer !== 'Condominium') {
            addressQuestion.questions[1].type = 'none'
          } else {
            addressQuestion.questions[1].type = 'apartment'
          }
          if (!this.currentProperty) break
          updateData = {
            category: this.data.category,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        }
        // TODO: skip answered questions
        /* setTimeout(() => {
            console.log('going to price 2')
            this.$refs.flowForm.goToQuestion('knowBlockLot')
          }, 3000) */
        case 'price':
          if (question.answer != null && question.answer !== '' && !isNaN(question.answer)) {
            this.data.price = parseInt(question.answer, 10) * 100
            updateData = {
              price: this.data.price,
            }
            result = await this.updateProperty(updateData)
            if (!result) return false
          }
          break
        case 'alreadyOwned':
          this.data.ownership = question.answer
          updateData = {
            ownership: this.data.ownership,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        case 'titleCompany':
          this.data.titleCompany = question.answer
          updateData = {
            titleCompany: this.data.titleCompany,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        case 'paymentOptions':
          this.data.paymentOptions = question.answer
          updateData = {
            paymentOptions: this.data.paymentOptions,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        case 'knowBlockLot':
          this.data.knowBlockLot = question.answer
          updateData = {
            knowBlockLot: this.data.knowBlockLot,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false
          break
        case '0-ownershipType':
          this.owners[0].type = question.answer
          if (question.answer === 'Person') {
            this.owners[0].name = this.username
          }
          break
        case '0-TrustEntityName' || '0-LLCEntityName' || '0-CorpEntityName' || '0-PartEntityName' || '0-EstateEntityName':
          this.owners[0].entityName = question.answer

          break
        case '0-EstateEIN' || '0-TrustEIN' || '0-LLCEIN' || '0-CorpEIN' || '0-PartEIN':
          this.owners[0].ein = question.answer
          break
        case '0-ownerTypeEstate' || '0-ownerTypeTrust' || '0-ownerTypeLLC' || '0-ownerTypeCorp' || '0-ownerTypePart':
          this.owners[0].role = question.answer
          break
        case '0-personName':
          this.owners[0].name = question.answer

          break
        // case '0-percentage': {
        //   this.owners[0].percentage = question.answer
        case 'addNewOwner': {
          // update answer
          this.data.addNewOwner = question.answer
          updateData = {
            addNewOwner: this.data.addNewOwner,
          }
          result = await this.updateProperty(updateData)
          if (!result) return false

          // update owners
          // TODO update percentage based on 0-percentage answer
          this.owners[0].percentage = 100

          if (this.currentProperty && this.currentProperty.owners) {
            for (let i = 0; i < Object.keys(this.currentProperty.owners).length; i += 1) {
              const k = Object.keys(this.currentProperty.owners)[i]
              // TODO: check, why owners are being deleted?
              // eslint-disable-next-line no-await-in-loop
              await PropertyService.deleteOwner(this.currentProperty.owners[k].id)
            }
          }
          try {
            const response = await PropertyService.updatePropOwner(this.currentProperty.id, this.owners)
            console.log(response)
          } catch (error) {
            this.messageEr = errMessage(error)
            this.showError(`${this.messageEr || 'something went wrong!'}`, false)
            return false
          }

          // update payment status to false and property status to true if payment not required right now.
          if (this.data.paymentOptions === false) {
            this.data.payment = false
            this.data.status = true
            updateData = {
              status: this.data.status,
              payment: this.data.payment,
            }
            result = await this.updateProperty(updateData)
            if (!result) return false
            this.$refs.flowForm.goToQuestion('_submit')
          }
          break
        }
        case 'addNewOwnerEmail':
          try {
            const response = PropertyService.sendMailToOwner(question.answer)
            console.log(response)
            if (this.data.paymentOptions === false) {
              this.data.payment = false
              this.data.status = true
              updateData = {
                status: this.data.status,
                payment: this.data.payment,
              }
              result = await this.updateProperty(updateData)
              if (!result) return false
              this.$refs.flowForm.goToQuestion('_submit')
            }
          } catch (error) {
            this.messageEr = errMessage(error)
            this.showError(`${this.messageEr || 'something went wrong!'}`, false)
            return false
          }
          break
      }
      return true
    },
    async initCard() {
      try {
        this.isLoading = true
        const { clientSecret } = (
          await PropertyService.stripe()
        ).data
        this.isLoading = false

        this.elements = this.$stripe.elements({
          clientSecret,
        })
        // this.$refs.flowForm.setPaymentStatus('completed')
        // card === paymentElement
        this.card = this.elements.create('payment')
        this.card.on('ready', () => {
          this.loadingCard = false
          // if (event.error) {
          //   this.cardErrors = event.error.message
          // } else {
          //   this.cardErrors = ''
          // }
        })
        // Stripe injects an iframe into the DOM
        this.card.mount('#payment-element')
        this.card.on('change', () => {
          // Disable the Pay button if there are no card details in the Element
          //   document.querySelector('#payWithCardButton').disabled = event.empty
          //   document.querySelector('#card-error').textContent = event.error
          //     ? event.error.message
          //     : ''
        })
        this.$refs.flowForm.setPaymentStatus('init')
      } catch (error) {
        this.isLoading = false
        console.error(error)
      }
    },
    async payWithCard() {
      try {
        this.isLoading = true
        try {
          const result = await this.$stripe
            .confirmPayment({
              elements: this.elements,
              confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: 'http://localhost:4242/checkout.html',
              },
              redirect: 'if_required',
            })

          console.log(result)
          this.isLoading = false
          if (result.error) {
            // Show error to your customer
            this.showError(result.error.message)
            return false
          }
          const updateData = {
            status: true,
            payment: true,
          }
          await PropertyService.updateProp(this.currentProperty.id, updateData)
          this.$refs.flowForm.setPaymentStatus('completed')
          this.$refs.flowForm.goToNextQuestion()
          // The payment succeeded!
          this.showSuccessful('Payment Successful')
          return true
        } catch (error) {
          this.messageEr = errMessage(error)
          this.showError(this.messageEr || 'something went wrong!')
          return false
        }
      } catch (e) {
        this.messageEr = errMessage(e)
        this.showError(this.messageEr || 'something went wrong!')
        return false
      }
    },
    showError(errorMsgText, updateLoading = true, title = 'Error!') {
      if (updateLoading) this.isLoading = false
      this.$toast({
        component: ToastificationContent,
        position: 'top-right',
        props: {
          title,
          text: errorMsgText,
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    },
    showSuccessful(text, updateLoading = true) {
      if (updateLoading) this.isLoading = false
      this.$toast({
        component: ToastificationContent,
        position: 'top-center',
        props: {
          title: text,
          icon: 'CheckIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../../../vue-flow-form/src/assets/css/themes/theme-minimal.css';
@import '../../../../vue-flow-form/src/assets/css/themes/theme-purple.css';
</style>

<style>

.position-logo-logout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7% 5% 0;
}

@media screen and (min-width: 768px) {
  .position-logo-logout {
    padding: 7% 10% 0;
  }
}

@media screen and (min-width: 992px) {
  .position-logo-logout {
    padding: 7% 15% 0;
  }
}

.width-logo {
  width: 250px;
}

@media (max-width: 480px) {
  .width-logo {
    width: 150px;
  }

  /* .vff-footer div.footer-inner-wrap-child {
    background-color: black;
  } */

  .vff .f-prev {
    background-color: black;
    color: white;
    opacity: 1;
  }
}
</style>
