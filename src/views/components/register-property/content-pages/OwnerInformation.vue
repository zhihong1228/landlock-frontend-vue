<template>
    <div style="width: 100%;">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark mb-1" style="font-size: 18px; width: 100%;">
                Do you already own the property?
            </span>
            <div v-for="item in items" style="width: 100%;">
                <SelectItem :active="value === item.value ? true : false" :title="item.title" @onSelectItem="handleSelectItem(item.value)" />
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
            value: true,
            items: [
                { value: true, title: 'Yes, I already own the property' },
                { value: false, title: 'No, I am in the process of buying the property' }
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