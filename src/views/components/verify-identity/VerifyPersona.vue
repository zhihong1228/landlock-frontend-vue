<template>
  <div
    class=""
    style=" position: fixed; bottom: 0; left: 0; right: 0;"
  >
    <iframe
      id="the-iframe"
      allow="camera"
      class="h-100 w-100"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
      :src="`/persona.html?personaTempletID=${window.personaTempletID}&&personaENV=${window.personaENV}`"
      style="
        border: 0 solid #fff;
        border-radius: 0;
        margin-top: 0;
        margin-left: 0;
        overflow: hidden;
        /*height: 96vh;*/
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
      "
      width="100%"
    />
  </div>
</template>

<script>

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapMutations, mapState } from 'vuex'
import UsersService from '../../../services/UsersService'
import { filterMatches } from '../../../utils/index'

export default {
  name: 'VerifyPersona',
  components: {
  },
  data() {
    return {
      window,
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  mounted() {
    console.log('this.user.step1', this.user)
    console.log(this.filterMatches('Mohamed ay*di', ['MOHAMED AYEDI']))
  },
  created() {
    window.addEventListener(
      'message',
      e => {
        const eventData = e.data
        console.log(e.origin, eventData)
        if (window.location.href.includes(e.origin)) {
          if (eventData.event) {
            console.log('condition--->',
              this.filterMatches(`${this.user.firstName} ${this.user.lastName}`,
                [`${eventData.data.fields['name-first'].value} ${eventData.data.fields['name-last'].value}`]).length
                > 0)
            if (this.filterMatches(`${this.user.firstName} ${this.user.lastName}`,
              [`${eventData.data.fields['name-first'].value} ${eventData.data.fields['name-last'].value}`]).length
                > 0) {
              console.log('yesssssssssssssssssssssss')
              switch (eventData.event) {
                case 'complete':
                  console.log(eventData)
                  // this.updatePersona(eventData.data)
                  this.step3Complete(eventData.data)
                  this.$router.push('/')
                  this.$router.go(0)
                  break
                case 'error':
                  console.log(eventData)
                  break
                case 'load':
                  console.log(eventData)
                  break
                case 'cancel':
                  break
                default:
                  console.error(`Invalid event ${eventData.event}`, eventData)
              }
            } else {
              console.log('lena lazem delet inqueries and update user to incomplete and j c pas', eventData.data)
              setTimeout(() => {
                this.deleteInquiryPersona(eventData.data)
                this.step3Incomplete(eventData.data)
                this.$router.push('/identity-verification')
              }, 1000)
            }
          }
        }
      },
      false,
    )
  },
  beforeCreate() {
    document.body.classList.add('bluebody')
  },
  beforeDestroy() {
    document.body.classList.remove('bluebody')
  },
  methods: {
    filterMatches,
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    /* updatePersona(dataIn) {
      const data = {
        SSN: this.user.ssn,
        FirstName: this.user.firstName,
        LastName: this.user.lastName,
        YearDOB: this.user.dob,
        inquiryId: dataIn.inquiryId,
      }
      console.log('inquirieId------->', data)
      UsersService.updatePersona(data)
        .then(response => { console.log(response) })
        .catch(err => { console.log(err) })
    }, */

    deleteInquiryPersona(dataIn) {
      const data = {
        inquiryId: dataIn.inquiryId,
      }
      console.log('inquirieId------->', data)
      UsersService.deletePersona(data)
        .then(response => { console.log(response) })
        .catch(err => { console.log(err) })
    },

    async step3Complete(step3Data) {
      console.log('step3Complete', step3Data)
      const data = {
        step3: 'complete',
      }
      const { data: response } = await this.$http.post('/auth/step1', data)
      if (response.type === 'success') {
        console.log(response)
        this.updateUser({
          ...this.user,
          step1: 'complete',
          step2: 'complete',
          step3: 'complete',
        })
        this.$toast({
          component: ToastificationContent,
          props: {
            title: response.display,
            icon: 'CheckIcon',
            variant: 'success',
          },
        })
        this.updateUser(response.user)
        await this.$router.push('/')
        return this.$router.go(0)
      }
      throw new Error(response.display)
    },

    async step3Incomplete(step3Data) {
      console.log('step3Incomplete', step3Data)
      const data = {
        step2: 'incomplete',
        step3: 'incomplete',
      }
      const { data: response } = await this.$http.post('/auth/step1', data)
      if (response.type === 'success') {
        console.log(response)
        this.user.step1 = 'complete'
        this.user.step2 = 'incomplete'
        this.user.step3 = 'incomplete'
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Verification persona name with your name has failed',
            icon: 'CheckIcon',
            variant: 'warning',
          },
        })
        return this.$router.push('/identity-verification')
      }
      throw new Error(response.display)
    },
  },
}
</script>

<style lang="scss">
@media only screen and (min-width: 60.02px) and (min-height: 600.02px){
  .iylGhi iframe {
    max-width: 600px !important;
    max-height: 650px;
}
}
</style>
