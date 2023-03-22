<template>
    <div :class="`d-flex flex-row align-items-center step-item ${stepValue > 1 && 'item-margin-top'}`">
        <div class="d-flex justify-content-center item-left">
            <div
                v-if="stepValue > 0"
                :class="`d-flex justify-content-center align-items-center active-step ${status === 'active' ? 'bg-blue' : `${status === 'complete' ? 'bg-green' : 'bg-light'}` }`"
            >
                <span v-if="status==='complete'">
                    <img src="../../../../assets/images/icons/check.png" />
                </span>
                <span v-else :class="`${status === 'deactive' && 'color-dark f-medium'}`">
                    {{ stepValue }}
                </span>

            </div>
            <div v-else :class="`step-left-sub ${status === 'active' ? 'bg-blue' : `${status === 'complete' ? 'bg-green' : 'bg-gray'}`}`" ></div>
        </div>
        <div class="item-right">
            <span :class="`${stepValue > 0 ? 'f-medium' : 'f-regular'} ${stepValue === 0 && status === 'active' && 'color-blue'} ${stepValue > 0 && 'color-dark'} ${status === 'deactive' && 'color-dark'}`" style="font-size: 16px;">
                {{ stepStr }}
            </span>
        </div>
        <div :class="`item-gray ${stepValue === 1 && 'item-top'} ${stepValue === 4 && 'item-bottom'}`"></div>
    </div>
</template>
<script>
import {
    BRow,
    BCol
} from 'bootstrap-vue'

export default {
    components: {
        BRow,
        BCol
    },
    props: {
        status: {
            type: String,
        },
        stepValue: {
            type: Number,
            default: 0
        },
        stepStr: {
            type: String
        },
    },
}
</script>
<style>
.step-item {
    width: 250px;
    /* margin: auto; */
    position: relative;
    padding: 5px 0;
}
.active-step {
    width: 26px;
    height: 26px;
    color: white;
    font-size: 14px;
    border-radius: 13px;
    text-align: center;
    align-items: center;
}
.item-left {
    width: 40px;
    margin-right: 17px;
    z-index: 5;
}
.item-right {
    z-index: 5;
    width: 200px;
}
.step-left-sub {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin: auto;
}
.item-gray {
    background: rgba(217, 217, 217, 0.44);
    /* border-radius: 109px; */
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 40px;
    z-index: 1;
}
.item-top {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.item-bottom {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.item-margin-top {
    padding-top: 30px;
}
</style>