<template>
    <div class="d-flex flex-column align-items-start" style="text-align: left; height: 380px; position: relative;">
        <span class="f-medium color-dark mb-1" style="font-size: 30px;">
            Disclaimer
        </span>
        <span class="f-regular color-dark" style="font-size: 22px;">
            Before you generate your certificate, please note that you only need to do so if someone requests it while you are trying to make a transaction on the property. It's important to keep the certificate in a safe place and only provide it to the interested party. If you have any questions or need help, please don't hesitate to reach out to us at <span style="text-decoration: underline;"> help@landlock.us</span>.
        </span>
        <!-- <b-form-checkbox
            id="checkbox-1"
            v-model="agreed"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
            class="mt-2"
            size="lg"
        >
            <span class="f-regular color-dark" style="font-size: 18px;">
                I agree to test tsetsttt test I agree to test tsetsttt test test
            </span>
        </b-form-checkbox> -->
        <div class="d-flex flex-row align-items-center mt-2">
            <input type="checkbox" v-model="agreed" style="width: 20px; height: 20px; margin-right: 10px;" />
            <span class="f-regular color-dark" style="font-size: 22px;" @click="toggleAgreed">
                I agree to test tsetsttt test I agree to test tsetsttt test test
            </span>
        </div>
        <b-button
            variant="primary"
            class="common-btn" 
            style="position: absolute; bottom: 0; right: 0;"
            block
            @click="handleContinue"
        >
            Continue
        </b-button>
    </div>
</template>
<script>
import {
  BFormCheckbox,
  // BFormSelect,
  BButton,
} from 'bootstrap-vue'
export default {
    components: {
        BFormCheckbox,
        BButton
    },
    data() {
        return {
            agreed: false,
        }
    },
    emits: ['continue'],
    methods: {
        handleContinue () {
            console.log("checkbox status: ", this.agreed)
            if (this.agreed) {
                this.$emit('continue')
            }
        },
        toggleAgreed () {
            this.agreed = !this.agreed
        }
    }
}
</script>
