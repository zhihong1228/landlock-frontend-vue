<template>
    <div class="d-flex flex-column align-items-start" style="text-align: left; height: 380px; position: relative;">
        <span class="f-medium color-dark" style="font-size: 30px;">
            Security questions
        </span>
        <span class="f-medium color-dark mb-2" style="font-size: 14px;">
            Select 3 of the security question previously answered
        </span>
        <validation-observer
            ref="sq"
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
                    >Choose a security question:</label>
                    <!-- <validation-provider
                        #default="{ errors }"
                        name="Question1"
                        rules="required"
                    > -->
                        <b-form-select v-model="question1" :options="sqOptions" class="common-input" placeholder="Select a Security Question">
                        </b-form-select>
                    <!-- </validation-provider> -->
                    </div>
                    <div class="mb-1">
                    <label
                        class="form-label common-input-label f-medium color-dark"
                        for="floatingInput"
                    >Choose a security question:</label>
                    <!-- <validation-provider
                        #default="{ errors }"
                        name="Question2"
                        rules="required"
                    > -->
                        <b-form-select v-model="question2" :options="sqOptions" class="common-input">
                        </b-form-select>
                    <!-- </validation-provider> -->
                    </div>
                    <div class="mb-1">
                    <label
                        class="form-label common-input-label f-medium color-dark"
                        for="floatingInput"
                    >Choose a security question:</label>
                    <!-- <validation-provider
                        #default="{ errors }"
                        name="Question3"
                        rules="required"
                    > -->
                        <b-form-select v-model="question3" :options="sqOptions" class="common-input">
                        </b-form-select>
                    <!-- </validation-provider> -->
                    </div>
                </b-col>
                <b-col cols="6">
                    <div class="mb-1">
                        <label
                            class="form-label common-input-label f-medium color-dark"
                            for="floatingInput"
                        >Answer</label>
                        <validation-provider
                            #default="{ errors }"
                            name="Answer1"
                            rules="required"
                        >
                            <b-form-input
                            id="name"
                            v-model="answer1"
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
                        >Answer</label>
                        <validation-provider
                            #default="{ errors }"
                            name="Answer2"
                            rules="required"
                        >
                            <b-form-input
                            id="name"
                            v-model="answer2"
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
                        >Answer</label>
                        <validation-provider
                            #default="{ errors }"
                            name="Answer3"
                            rules="required"
                        >
                            <b-form-input
                            id="name"
                            v-model="answer3"
                            :state="errors.length > 0 ? false:null"
                            placeholder="Answer"
                            class="common-input"
                            style="width: 100%;"
                            />
                        </validation-provider>
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
    BFormInput,
    // BFormSelect,
    BButton,
    BFormSelect
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    components: {
        BRow,
        BCol,
        BFormInput,
        BButton,
        BFormSelect,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            answer1: '',
            answer2: '',
            answer3: '',
            question1: null,
            question2: null,
            question3: null
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.user,
        }),
        sqList () {
            return [
                { ques: this.user.question1, ans: this.user.answer1 },
                { ques: this.user.question2, ans: this.user.answer2 },
                { ques: this.user.question3, ans: this.user.answer3 },
                { ques: this.user.question4, ans: this.user.answer4 },
                { ques: this.user.question5, ans: this.user.answer5 }
            ]
        },
        sqOptions () {
            return [
                { valule: null, text: 'Select a Security Question' },
                { value: this.user.question1, text: this.user.question1 },
                { value: this.user.question2, text: this.user.question2 },
                { value: this.user.question3, text: this.user.question3 },
                { value: this.user.question4, text: this.user.question4 },
                { value: this.user.question5, text: this.user.question5 }
            ]
        }
    },
    emits: ['continue'],
    methods: {
        handleContinue () {
            if (!this.question1 || !this.question2 || !this.question3) {
                this.answer1 = this.answer2 = this.answer3 = ''
            } else {
                this.$refs.sq.validate().then(success => {
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
}
</script>
