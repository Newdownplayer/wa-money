<template>
  <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="labels"/>
            标签
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            统计
        </router-link>
  </nav>
</template>

<script lang="ts">
export default {
    name:'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
    Nav {
        font-size: 12px;
        display: flex;
        box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.25);
        flex-direction: row;
        > .item {
            padding: 5px 0;
            width: 33.333333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .icon{
                width: 28px;
                height: 28px;
            }
        }
        
        > .item.selected{
                color: $color-highlight;
        }
    }
</style>