<template>
    <div style="width: 130%;">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 200px; padding-top: 5px;"
        >
            <span class="f-semibold color-dark mb-1" style="font-size: 18px; width: 100%;">
                Payment
            </span>
            <div class="">

            </div>
            <b-row style="width: 100%;">
                <b-col cols="12" class="pl-0 mb-1">
                    <span class="f-semibold color-dark" style="font-size: 13px; width: 100%;">
                        Card number
                    </span>
                    <b-form-input
                      id="name"
                      v-model="data.answer5"
                      placeholder="1234 1234 1234 1234"
                      style="width: 100%; padding-right: 50px;"
                    />
                    <div></div>
                </b-col>
            </b-row>
            <b-row style="width: 100%;">
                <b-col cols="6" class="pl-0 mb-1">
                    <span class="f-semibold color-dark" style="font-size: 13px; width: 100%;">
                        Expiry
                    </span>
                    <b-form-input
                      id="name"
                      v-model="data.expiry"
                      placeholder="MM / YY"
                      style="width: 100%; padding-right: 50px;"
                    />
                </b-col>
                <b-col cols="6" class="pl-0">
                    <span class="f-semibold color-dark" style="font-size: 13px; width: 100%;">
                        CVC
                    </span>
                    <b-form-input
                      id="name"
                      v-model="data.cvc"
                      placeholder="CVC"
                      style="width: 100%; padding-right: 50px;"
                    />
                </b-col>
            </b-row>
            <b-row style="width: 100%;">
                <b-col cols="6" class="pl-0 mb-1">
                    <span class="f-semibold color-dark" style="font-size: 13px; width: 100%;">
                        Unit
                    </span>
                    <b-form-input
                      id="name"
                      v-model="data.expiry"
                      placeholder="Country"
                      style="width: 100%; padding-right: 50px;"
                    />
                </b-col>
                <b-col cols="6" class="pl-0">
                    <span class="f-semibold color-dark" style="font-size: 13px; width: 100%;">
                        Postal code
                    </span>
                    <b-form-input
                      id="name"
                      v-model="data.postalCode"
                      placeholder="90210"
                      style="width: 100%; padding-right: 50px;"
                    />
                </b-col>
            </b-row>
            <b-button variant="primary" class="mt-1" style="width: 100%; border-radius: 5px;" @click="handleAction">
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
    BImg,
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
            value: true,
            data: {
                type: 'card',
                cardNumber: '',
                expiry: '',
                cvc: '',
                country: '',
                postalCode: ''
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