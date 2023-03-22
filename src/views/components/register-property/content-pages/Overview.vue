<template>
    <div style="width: 200%;">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark mb-1" style="font-size: 60px; width: 100%;">
                Congratulations
            </span>
            <span class="f-medium color-dark mb-1" style="font-size: 28px; width: 100%;">
                The property registration process is now complete.
            </span>
            <span class="f-medium color-dark mb-1" style="font-size: 18px; width: 100%;">
                To ensure the protection of your property, it's important to record the warning in the property's deed. On the next page, you'll find instructions on how to properly record the warning in the deed. If you have any questions, please don't hesitate to reach out to us.
            </span>
            <b-button variant="primary" style="width: 50%; border-radius: 5px; margin-top: 30px;" @click="handleAction">
                <span class="color-light">Continue</span>
            </b-button>
        </div>
    </div>
</template>
<script>
import {
    BRow,
    BCol,
    BButton,
    BImg,
    BSpinner,
} from 'bootstrap-vue'
import SelectItem from './SelectItem.vue'

export default {
    components: {
        BRow,
        BCol,
        BButton,
        SelectItem
    },
    data () {
        return {
            value: true,
            data: {

            }
        }
    },
    emits: ['onAction'],
    methods: {
        handleSelectItem (value) {
            this.value = value
        },
        handleAction () {
            this.$emit('onAction', this.value)
        }
    }
}
</script>
<style>
</style>