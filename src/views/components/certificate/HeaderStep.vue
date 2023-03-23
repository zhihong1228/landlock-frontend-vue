<template>
    <div
        v-if="stepValue > 0"
        :class="`d-flex justify-content-center align-items-center ${status === 'active' ? 'bg-blue' : 'outline-blue'} `"
        style="width: 40px; height: 40px; border-radius: 20px;"
    >
        <span :class="`${status === 'active' ? 'color-light' : 'color-blue'} f-medium`" style="font-size: 20px;">{{ stepValue }}</span>
    </div>
    <div v-else>
        <div v-if="status === 'progress'" class="d-flex flex-row">
            <div class="bg-blue" style="width: 50px; height: 5px; border-radius: 200px;" />
            <div class="bg-lightblue" style="width: 50px; height: 5px; border-radius: 200px;" />
        </div>
        <div v-else :class="`${status === 'active' ? 'bg-blue' : 'bg-lightblue'}`" style="width: 100px; height: 5px; border-radius: 200px;" />
    </div>
</template>
<script>
export default {
    props: {
        status: {
            type: String
        },
        stepValue: {
            type: Number
        }
    }
}
</script>
