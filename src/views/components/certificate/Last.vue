<template>
    <div class="d-flex flex-column align-items-start" style="text-align: left; height: 380px; position: relative;">
        <span class="f-medium color-dark mb-1" style="font-size: 30px;">
            Almost there
        </span>
        <span class="f-regular color-dark" style="font-size: 22px;">
            The last step is verifying your government-issued ID, please have it ready.
            A camera will be required
        </span>
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
  BButton,
} from 'bootstrap-vue'
export default {
    components: {
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
            this.$emit('continue')
        },
    }
}
</script>
