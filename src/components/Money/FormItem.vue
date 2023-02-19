<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input
        type="text"
        v-model="value"
        maxlength="24"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  value = "";
  @Prop({required:true}) fieldName!:string;
  @Prop() placeholder?:string;
  @Watch('value')
  onValueChanged(value:string){
    this.$emit('update:value',value)
  }
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.formItem {
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>