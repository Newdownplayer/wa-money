<template>
    <svg class="icon" @click="$emit('click',$event)">
        <use v-bind:xlink:href="'#'+name" />
    </svg>
</template>

<script lang="ts">
//导入一个目录
let importAll = (requireContext:__WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));}catch(error){console.log(error)}
export default {
    props:['name'],
    name:'Icon'
};
</script>

<style lang="scss" scoped>
    .icon{
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        overflow: hidden;
    }
</style>