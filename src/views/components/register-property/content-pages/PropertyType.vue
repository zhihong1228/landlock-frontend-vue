<template>
    <div style="width: 100%;">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark mb-1" style="font-size: 18px;">
                What type of property are you looking to protect?
            </span>
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
            value: 'Condominium',
            items: [
                'Condominium',
                '1-3 Family Hous',
                'Mixed-use Building',
                'Vacant Land',
                'Commerical Building',
                'Other'
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