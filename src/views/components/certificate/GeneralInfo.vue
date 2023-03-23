<template>
    <div class="d-flex flex-column align-items-start" style="text-align: left;height: 380px; position: relative;">
        <span class="f-medium color-dark mb-1" style="font-size: 30px;">
            General information
        </span>
        <validation-observer
            ref="general"
            tag="form"
            class="d-flex flex-column justify-content-center"
        >
            <b-row
                class="d-flex flex-row"
            >
                <b-col cols="6">
                    <div class="mb-1">
                        <label
                            class="form-label common-input-label f-medium color-dark"
                            for="floatingInput"
                        >Logal first name</label>
                        <validation-provider
                            #default="{ errors }"
                            name="First Name"
                            rules="required"
                        >
                            <b-form-input
                                id="name"
                                v-model="data.firstName"
                                :state="errors.length > 0 ? false:null"
                                placeholder="John"
                                class="common-input"
                                style="width: 100%;"
                            />
                        </validation-provider>
                    </div>
                    <div class="mb-1">
                        <label
                            class="form-label common-input-label f-medium color-dark"
                            for="floatingInput"
                        >Logal last name</label>
                        <validation-provider
                            #default="{ errors }"
                            name="Last Name"
                            rules="required"
                        >
                            <b-form-input
                                id="lastName"
                                v-model="data.lastName"
                                :state="errors.length > 0 ? false:null"
                                placeholder="Smith"
                                class="common-input"
                                style="width: 100%;"
                            />
                        </validation-provider>
                    </div>
                    <div class="mb-1">
                        <label
                        class="form-label common-input-label f-medium color-dark"
                        for="floatingInput"
                        >Social security number</label>
                        <validation-provider
                        #default="{ errors }"
                        name="Social Security Number"
                        rules="required"
                        >
                        <b-form-input
                            id="lastName"
                            v-model="data.ssn"
                            :state="errors.length > 0 ? false:null"
                            placeholder="00-0000000"
                            class="common-input"
                            style="width: 100%;"
                        />
                        </validation-provider>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="mb-1">
                        <label
                            class="form-label common-input-label f-medium color-dark"
                            for="floatingInput"
                        >Logal middle name</label>
                        <input
                            id="floatingInput"
                            v-model="middleName"
                            class="form-control common-input"
                            placeholder="Optional"
                            type="email"
                            style="font-size: 1rem;"
                        >
                    </div>
                    <div class="mb-1">
                        <label
                            class="form-label common-input-label f-medium color-dark"
                            for="floatingInput"
                        >Mother's maiden name</label>
                        <validation-provider
                            #default="{ errors }"
                            name="Maiden Name"
                            rules="required"
                        >
                            <b-form-input
                                id="lastName"
                                v-model="data.maidenName"
                                :state="errors.length > 0 ? false:null"
                                placeholder="Answer"
                                class="common-input"
                                style="width: 100%;"
                            />
                        </validation-provider>
                    </div>
                    <div class="mb-1">
                        <label
                        class="form-label common-input-label f-medium color-dark"
                        for="floatingInput"
                        ><span>Date of birth:</span></label>
                        <b-row>
                        <b-col cols="12" class="d-flex flex-row justify-content-between">
                            <div style="width: 25%;">
                            <validation-provider
                                #default="{ errors }"
                                name="Month"
                                rules="required"
                            >
                                <b-form-input
                                id="lastName"
                                type="number"
                                v-model="dobMonth"
                                :state="errors.length > 0 ? false:null"
                                placeholder="MM"
                                class="common-input"
                                style="text-align: center;"
                                />
                            </validation-provider>
                            </div>
                            <div style="width: 25%;">
                            <validation-provider
                                #default="{ errors }"
                                name="Day"
                                rules="required"
                            >
                                <b-form-input
                                id="lastName"
                                type="number"
                                v-model="dobDay"
                                :state="errors.length > 0 ? false:null"
                                placeholder="DD"
                                class="common-input"
                                style="text-align: center;"
                                />
                            </validation-provider>
                            </div>
                            <div style="width: 40%;">
                            <validation-provider
                                #default="{ errors }"
                                name="Day"
                                rules="required"
                            >
                                <b-form-input
                                id="lastName"
                                type="number"
                                v-model="dobYear"
                                :state="errors.length > 0 ? false:null"
                                placeholder="YYYY"
                                class="common-input"
                                style="text-align: center;"
                                />
                            </validation-provider>
                            </div>
                        </b-col>
                        </b-row>
                    </div>
                    
                </b-col>
            </b-row>
        </validation-observer> 
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
    BRow,
    BCol,
    BFormCheckbox,
    BFormInput,
    // BFormSelect,
    BButton,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    components: {
        BRow,
        BCol,
        BFormInput,
        BFormCheckbox,
        BButton,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            middleName: '',
            dobMonth: '',
            dobDay: '',
            dobYear: '',
            data: {
                firstName: '',
                lastName: '',
                maidenName: '',
                ssn: '',
                dob: '',
                fullAddress: '',
                departmentNumber: '',
            }
        }
    },
    emits: ['continue'],
    methods: {
        handleContinue () {
            this.$refs.general.validate().then(success => {
                console.log("$req.sq.Validate(): ", success)
                if(success) {
                    console.log("general information success: ")
                    this.$emit('continue')
                    resolve(true)
                } else {
                    reject()
                }
            })
        }
    }
}
</script>
