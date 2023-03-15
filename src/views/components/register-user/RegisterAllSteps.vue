<template>
  <div class="custom-form-wizard">
    <div
      v-if="isLoading"
      style="height: 50vh"
      class=" d-flex flex-column justify-content-center align-items-center"
    >
      <b-spinner
        variant="primary"
        style="width: 37px; height: 37px"
      />
      <h2 class="text-primary mt-2">
        Loading...
      </h2>

    </div>
    <form-wizard
      v-show="!isLoading"
      ref="wizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      :start-index="startIndex"
      shape="square"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="formSubmitted"
    >
      <!-- Basic Info -->
      <template>
        <tab-content
          v-if="user && user.step1 === 'complete'"
          title="Basic Info"
          icon="feather icon-check text-primary"
          :before-change="
            () => {
              return $refs.step1Modal.complete()
            }
          "
        >
          <step1
            ref="step1Modal"
            @next="next"
            @complete="step1Complete"
          />
        </tab-content>

        <tab-content
          v-else
          title="Basic Info"
          :before-change="
            () => {
              return $refs.step1Modal.complete()
            }
          "
        >
          <step1
            ref="step1Modal"
            @next="next"
            @complete="step1Complete"
          />
        </tab-content>

        <!-- Email Verification -->
        <tab-content
          v-if="user && user.confirmedEmail"
          title="Email Verification"
          icon="feather icon-check text-primary"
          class="test"
          :before-change="
            () => {
              return $refs.step2Modal.complete()
            }
          "
        >
          <step2
            ref="step2Modal"
            @next="next"
          />
        </tab-content>
        <tab-content
          v-else
          title="Email Verification"
          :before-change="
            () => {
              return $refs.step2Modal.complete()
            }
          "
        >
          <step2
            ref="step2Modal"
            @next="next"
          />
        </tab-content>

        <!-- Phone Verification -->
        <tab-content
          v-if="user && user.confirmedMobile"
          title="Phone Verification"
          icon="feather icon-check text-primary"
          :before-change="
            () => {
              return $refs.step3Modal.complete()
            }
          "
        >
          <step3
            ref="step3Modal"
            @next="next"
          />
        </tab-content>
        <tab-content
          v-else
          title="Phone Verification"
          :before-change="
            () => {
              return $refs.step3Modal.complete()
            }
          "
        >
          <step3
            ref="step3Modal"
            @next="next"
          />
        </tab-content>

        <!-- KYC -->
        <tab-content title="KYC">
          <step4
            ref="phone-verification"
            @next="next"
          />
        </tab-content>
      </template>

      <div slot="prev" />
      <div slot="next" />
      <div slot="finish">
        <div class="wizard-card-footer clearfix">
          <div class="wizard-footer-left">
            <span
              role="button"
              tabindex="0"
            ><div /></span>
          </div>
          <div class="wizard-footer-right">
            <span
              role="button"
              tabindex="0"
            ><button
              tabindex="-1"
              type="button"
              class="wizard-btn"
              style="
                "
            >
              Take me there
            </button></span>
          </div>
        </div>
      </div>
    </form-wizard>
  </div>
</template>
<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import { VBTooltip, BSpinner } from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import step1 from '@/views/components/register-user/Step1.vue'
import step2 from '@/views/components/register-user/Step2.vue'
import step3 from '@/views/components/register-user/Step3.vue'
import step4 from '@/views/components/register-user/Step4.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapActions, mapMutations, mapState } from 'vuex'
import AuthService from '@/services/AuthService'
import { errMessage } from '@/utils/errMessage'

export default {
  name: 'RegisterSteps',
  components: {
    FormWizard,
    TabContent,
    step1,
    step2,
    step3,
    step4,
    BSpinner,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    finishButtonText: {
      type: String,
      default: 'Finishh',
    },
  },

  data() {
    return {
      isLoading: true,
      userId: window.location.search.split('=')[1],
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
    startIndex() {
      let startIndex = 0
      if (this.user && this.user.id && localStorage.getItem('token')) {
        if (this.user.step1 === 'incomplete') startIndex = 0
        else if (this.user.confirmedEmail !== true) startIndex = 1
        else if (this.user.confirmedMobile !== true) startIndex = 2
        else startIndex = 3
      }
      console.log('startIndex', startIndex)
      return startIndex
    },
  },

  async mounted() {
    if (this.userId && this.user.confirmedEmail !== true) {
      const response = await AuthService.confirm(this.userId).catch(error => {
        this.messageEr = errMessage(error)
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Error!',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
          },
        })
      })
      console.log('email confirm response', response)
      if (response.status === 200) {
        this.updateUser({
          ...this.user,
          confirmedEmail: true,
        })
      }
    }
    if (this.user && this.user.id && localStorage.getItem('token')) {
      AuthService.getUser()
        .then(response => {
          this.isLoading = false
          this.updateUser(response.data.userData.user)
          if (this.user.confirmedEmail === true) {
            this.next(3)
          }
        })
        .catch(error => {
          this.isLoading = false
          this.messageEr = errMessage(error)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error!',
              icon: 'AlertTriangleIcon',
              variant: 'danger',
              text: `${this.messageEr || 'something went wrong! #878dfgh'}`,
            },
          })
        })
    } else {
      this.isLoading = false
    }
  },
  methods: {
    ...mapMutations({
      updateUser: 'user/UPDATE_USER',
    }),
    ...mapActions({
      toggleLogin: 'user/toggleLogin',
    }),
    async next(event) {
      console.log('event', event)
      this.$refs.wizard.maxStep = event
      this.$refs.wizard.navigateToTab(event)
      // this.$refs.wizard.changeTab(0, 1)
    },
    async step1Complete(user) {
      console.log(user)
      this.updateUser(user)
      // this.step1Data = step1Data
      // // this.startIndex = 1;
      // this.steps[0].status = 'complete'
      // this.verifying = true
    },
    async step2Complete(step2Data) {
      console.log(step2Data)
      // this.startIndex = 2;
      this.steps[1].status = 'complete'
      this.verifying = true
    },
    async step3Complete(step3Data) {
      console.log(step3Data)
      // this.startIndex = 3;
      this.steps[2].status = 'complete'
      this.verifying = true
    },
    async formSubmitted(data) {
      console.log(data)
      await this.$router.push('/identity-verification')
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/vue-wizard.scss';

.vue-form-wizard .wizard-navigation .wizard-nav li.active a .checked {
  width: auto;
  box-shadow: none;
  background-color: white;
}
.vue-form-wizard .wizard-navigation .wizard-nav li a {
  flex-direction: column;
  gap: 15px 0;
}
.custom-form-wizard .wizard-navigation .wizard-nav li {
  margin-right: 0 !important;
}
.vue-form-wizard .wizard-navigation .wizard-nav li.active a {
  width: auto;
  box-shadow: none;
  background-color: white;
}
.vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle .wizard-icon-container {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
.vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}
/*.vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle.checked {
  background-color: var(--primary);
}*/
.custom-form-wizard .stepTitle.active {
  color: var(--primary) !important;
}
.vue-form-wizard .wizard-navigation .wizard-nav li .wizard-icon-circle.checked .wizard-icon {
  color: white;
}
.vue-form-wizard {
  padding: 20px 20px 0px 20px;
}
.vue-form-wizard .wizard-navigation .wizard-nav li a .stepTitle {
  font-family: 'Avenir-Regular';
}

.custom-form-wizard .wizard-nav.wizard-nav-pills {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.custom-form-wizard .wizard-navigation .wizard-nav li:not(:first-child) a::before {
  content: none !important;
}

.custom-form-wizard .wizard-navigation .wizard-nav li a .stepTitle {
  margin-right: 1rem;
}

@media screen and (max-width: 470px) {
  .custom-form-wizard .wizard-navigation .wizard-nav li a {
    flex-direction: row !important;
  }

  .custom-form-wizard .wizard-nav.wizard-nav-pills {
    display: flex;
    flex-direction: column !important;
    justify-content: start;
    align-items: start;
    padding: 10px 20px 0px;
  }
}
</style>
