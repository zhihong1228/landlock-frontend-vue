<template>
    <div>
        <div
            class="d-flex flex-column align-items-center"
            style="background: rgba(217, 217, 217, 0.44);border-radius: 109px; height: 200px; width: 33px; padding-top: 5px;"
        >
            <div class="d-flex justify-content-center align-items-center active-step">1</div>
            <div class="active-step-sub"></div>
        </div>
        <div></div>
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
export default {
    components: {
        BRow,
        BCol
    },
    data () {
        return {
            step: 1
        }
    },
    methods: {

    }
}
</script>
<style>
.active-step {
    width: 26px;
    height: 26px;
    background: #3243B2;
    color: white;
    font-size: 14px;
    border-radius: 13px;
    text-align: center;
    align-items: center;
}
.active-step-sub {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #3243B2;
}
</style>