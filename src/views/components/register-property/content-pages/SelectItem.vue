<template>
    <div class="select-item" @click="handleSelectItem">
        <div v-if="active" class="d-flex align-items-center bg-blue">
            <img src="../../../../assets/images/icons/selected.png" />
            <span class="color-light f-medium">{{ title }}</span>
        </div>
        <div v-else class="d-flex align-items-center" style="border: 1px solid #E1E3E6; border-radius: 5px;">
            <img src="../../../../assets/images/icons/unselected.png" />
            <span class="color-dark f-medium">{{ title }}</span>
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

export default {
    components: {
        BRow,
        BCol,
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        }
    },
    emits: [
        'onSelectItem'
    ],
    data () {
        return {
            step: 4
        }
    },
    methods: {
        handleSelectItem () {
            this.$emit("onSelectItem");
        }
    }
}
</script>
<style>
.select-item {
    margin: 5px 0;
    width: 100%;
}
.select-item div {
    height: 35px;
    padding: 0 10px;
    border-radius: 5px;
}
.select-item span {
    font-size: 15px;
    margin-left: 10px;
}
</style>