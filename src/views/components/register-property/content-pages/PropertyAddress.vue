<template>
    <div
        class="d-flex flex-column align-items-center property-register"
        style="width: 100%; padding-top: 5px;"
    >
        <validation-observer
            ref="address"
            tag="form"
            class="d-flex flex-column justify-content-center"
            style="width: 100%;"
        >
            <label class="form-label common-input-label f-semibold mb-1" for="floatingInput" style="font-size: 18px;">
                Address
            </label>
            <validation-provider
                #default="{ errors }"
                name="Address line1"
                rules="required"
            >
                <b-form-input
                    id="address1"
                    v-model="data.address1"
                    placeholder="Address line 1"
                    class="mb-1"
                    style="width: 100%; background: transparent;"
                />
            </validation-provider>
            <b-form-input
                id="address2"
                v-model="data.address2"
                placeholder="Address line 2"
                class="mb-1"
                style="width: 100%; background: transparent;"
            />
            <validation-provider
                #default="{ errors }"
                name="City"
                rules="required"
            >
                <b-form-input
                    id="city"
                    v-model="data.city"
                    placeholder="City"
                    class="mb-1"
                    style="width: 100%; background: transparent;"
                />
            </validation-provider>
            <validation-provider
                #default="{ errors }"
                name="State"
                rules="required"
            >
                <b-form-input
                    id="state"
                    v-model="data.state"
                    placeholder="State"
                    class="mb-1"
                    style="width: 100%; background: transparent;"
                />
            </validation-provider>
            <validation-provider
                #default="{ errors }"
                name="Zip"
                rules="required"
            >
                <b-form-input
                    id="zip"
                    v-model="data.zip"
                    placeholder="Zip"
                    class="mb-1"
                    style="width: 100%; background: transparent;"
                />
            </validation-provider>

            <label class="form-label common-input-label f-semibold mb-1  mt-2" for="floatingInput" style="font-size: 18px;">
                Block number
            </label>
            <b-form-input
                id="blockNumber"
                v-model="data.blockNumber"
                placeholder="optional"
                class="mb-1"
                style="width: 100%; background: transparent;"
            />

            <label class="form-label common-input-label f-semibold mb-1 mt-2" for="floatingInput" style="font-size: 18px;">
                Lot number
            </label>
            <b-form-input
                id="lotNumber"
                v-model="data.lotNumber"
                placeholder="optional"
                class="mb-1"
                style="width: 100%; background: transparent;"
            />

            <label class="form-label common-input-label f-semibold mb-1  mt-2" for="floatingInput" style="font-size: 18px;">
                Parcel ID number
            </label>
            <b-form-input
                id="lotNumber"
                v-model="data.parcelIdNumber"
                placeholder="optional"
                class="mb-1"
                style="width: 100%; background: transparent;"
            />

            <b-button variant="primary" style="width: 100%; border-radius: 5px; margin-top: 30px;" @click="handleAction">
                <span class="color-light">Continue</span>
            </b-button>
        </validation-observer>
    </div>
</template>
<script>
import {
    BRow,
    BCol,
    BButton,
    BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { password, required, confirmed } from '@validations'

export default {
    components: {
        BRow,
        BCol,
        BButton,
        BFormInput,
        ValidationProvider,
        ValidationObserver,
    },
    data () {
        return {
            required,
            data: {
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                blockNumber: '',
                lotNumber: '',
                parcelIdNumber: ''
            }
        }
    },
    emits: ['onAction'],
    methods: {
        handleSelectItem (value) {
            this.value = value
        },
        handleAction () {
            console.log("propertyAddress data: ", this.data)
            this.$emit('onAction', this.data)
        }
    }
}
</script>
<style>
</style>