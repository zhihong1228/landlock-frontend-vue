<template>
    <div style="width: 100%;">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark mb-1" style="font-size: 18px; width: 100%;">
                Who owns the property?
            </span>
            <span class="f-medium color-dark" style="font-size: 15px; width: 100%;">
                We are currently unable to register properties owned by LLCs, Corporations, Partnerships, Trusts, Estates.
            </span>
            <div class="d-flex flex-row jusity-content-start" style="width: 100%;">
                <span class="f-semibold color-dark mb-1" style="font-size: 15px; white-space: nowrap; text-decoration: underline;">
                    Join the waitlist
                </span>
                &nbsp;
                <span class="f-medium color-dark mb-1" style="font-size: 15px; width: 100%;">
                    and you will notifies as soon as possible.
                </span>
            </div>
            <div v-for="item in items" style="width: 100%;">
                <SelectItem :active="value === item ? true : false" :title="item" @onSelectItem="handleSelectItem(item)" />
            </div>
            <b-button variant="primary" style="width: 100%; border-radius: 5px; margin-top: 30px;" @click="handleAction">
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
            value: 'Person',
            items: [
                'Person',
                'Partnership',
                'Limited Liability Company',
                'Corporation',
                'Trust',
                'Estate'
            ]
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