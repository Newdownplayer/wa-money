<template>
    <div>
        <div>
            !!!当前页面不存在，请确认网址是否正确!!!
        </div>
        <div>
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name:'NotFound'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
</style>