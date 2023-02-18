<template>
  <layout class-prefix="layout">
    <number-pad />
    <types :xxx="79"/>
    <notes />
    <tags />
  </layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
export default {
  components: { Tags, NumberPad, Types, Notes },
  name: "Money",
};
</script>

<style lang="scss">
.layout-content {
  border: 3px solid red($color: #000000);
  display: flex;
  flex-direction: column-reverse;
}
</style>
