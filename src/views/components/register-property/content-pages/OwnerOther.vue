<template>
    <div style="width: 100%;">
        <div
            v-if="page==='ask'"
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
        <div
            v-if="page==='form'"
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark" style="font-size: 18px; width: 100%;">
                Please enter the other owner's information
            </span>
            <span class="f-regular color-dark mb-2" style="font-size: 13px; width: 100%;">
                This step is optional
            </span>

            <span class="f-medium color-dark mb-1" style="font-size: 18px; width: 100%;">
                Name
            </span>
            <b-row class="mb-1">
                <b-col cols="6">
                    <b-form-input
                        id="name"
                        v-model="data.firstName"
                        placeholder="First name"
                        style="width: 100%; background: transparent;"
                    />
                </b-col>
                <b-col cols="6">
                    <b-form-input
                        id="name"
                        v-model="data.lastName"
                        placeholder="Last name"
                        style="width: 100%; background: transparent;"
                    />
                </b-col>
            </b-row>

            <span class="f-medium color-dark mb-1" style="font-size: 18px; width: 100%;">
                Email
            </span>
            <b-row style="width: 100%;">
                <b-col cols="12" style="padding: 0;">
                    <b-form-input
                        id="name"
                        v-model="data.email"
                        placeholder="Email address"
                        style="width: 100%; background: transparent;"
                    />
                </b-col>
            </b-row>
            
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
    BFormInput,
    BSpinner,
} from 'bootstrap-vue'

import SelectItem from './SelectItem.vue'

export default {
    components: {
        BRow,
        BCol,
        BButton,
        BFormInput,
        SelectItem
    },
    data () {
        return {
            page: 'ask',
            value: true,
            items: [
                { value: true, title: 'Yes, I solely own the property' },
                { value: false, title: 'No, I am not the sole owner of the property' }
            ],
            data: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    },
    emits: ['onAction'],
    methods: {
        handleSelectItem (value) {
            this.value = value
        },
        handleAction () {
            if(this.value === true && this.page === 'ask') {
                this.page = 'form'
            } else {
                this.$emit('onAction', this.data)
            }
        }
    }
}
</script>
<style>
</style>