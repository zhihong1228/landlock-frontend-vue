<template>
    <div class="d-flex flex-row" style="margin-left: 28px">
        <div
            class="d-flex flex-column align-items-center property-register"
            style="height: 300px; width: 220px; padding-top: 5px;  margin-right: 100px;"
        >
            <step-item :stepValue="1" :status="`${step > 2 ? 'complete' : 'active'}`" stepStr="Property details" />
            <step-item :stepValue="0" :status="`${step === 1 ? 'active' : `${step > 1 ? 'complete' : 'deactive'}`}`" stepStr="Property type" />
            <step-item :stepValue="0" :status="`${step === 2 ? 'active' : `${step > 2 ? 'complete' : 'deactive'}`}`" stepStr="Property address" />
            
            <step-item :stepValue="2" :status="`${step < 3 ? 'deactive' : `${step > 5 ? 'complete' : 'active'}`}`" stepStr="Property ownership" />
            <step-item :stepValue="0" :status="`${step === 3 ? 'active' : `${step > 3 ? 'complete' : 'deactive'}`}`" stepStr="Ownership information" />
            <step-item :stepValue="0" :status="`${step === 4 ? 'active' : `${step > 4 ? 'complete' : 'deactive'}`}`" stepStr="Owner type" />
            <step-item :stepValue="0" :status="`${step === 5 ? 'active' : `${step > 5 ? 'complete' : 'deactive'}`}`" stepStr="Other owners" />

            <step-item :stepValue="3" :status="`${step < 6 ? 'deactive' : `${step > 6 ? 'complete' : 'active'}`}`" stepStr="Payment" />
            <step-item :stepValue="4" :status="`${step < 7 ? 'deactive' : 'active'}`" stepStr="Overview" />
        </div>
        <div
            class="d-flex flex-column"
            style="width: 440px;"
        >
            <div v-if="step===1">
                <property-type @onAction="handleContentAction" />
            </div>
            <div v-if="step===2">
                <property-address @onAction="handleContentAction" />
            </div>
            <div v-if="step===3">
                <owner-information @onAction="handleContentAction" />
            </div>
            <div v-if="step===4">
                <owner-type @onAction="handleContentAction" />
            </div>
            <div v-if="step===5">
                <owner-other @onAction="handleContentAction" />
            </div>
            <div v-if="step===6">
                <payment @onAction="handleContentAction" />
            </div>
            <div v-if="step===7">
                <overview @onAction="handleContentAction" />
            </div>
        </div>
    </div>
</template>
<script>
import {
    BRow,
    BCol,
    BButton,
    BSpinner,
} from 'bootstrap-vue'
import StepItem from './StepItem.vue'
import PropertyType from '../content-pages/PropertyType.vue'
import PropertyAddress from '../content-pages/PropertyAddress.vue'
import OwnerInformation from '../content-pages/OwnerInformation.vue'
import OwnerType from '../content-pages/OwnerType.vue'
import OwnerOther from '../content-pages/OwnerOther.vue'
import Payment from '../content-pages/Payment.vue'
import Overview from '../content-pages/Overview.vue'

export default {
    components: {
        BRow,
        BCol,
        StepItem,
        PropertyType,
        PropertyAddress,
        OwnerInformation,
        OwnerType,
        OwnerOther,
        Payment,
        Overview
    },
    data () {
        return {
            step: 1
        }
    },
    methods: {
        handleContentAction (data) {
            console.log("handleContentAction log: ", data)
            if(this.step === 7)
                this.step = 1
            else
                this.step += 1
        }
    }
}
</script>
<style>
</style>