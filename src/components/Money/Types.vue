<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  type = "-"; //'-'表示支出，'+'表示收入
  @Prop(Number) xxx: number | undefined;
  //Prop告诉Vue.xxx不是data是prop
  //Number告诉Vue xxx运行时是Number
  //xxx属性名
  ///number|undefined就是TS xxx的编译时类型
  selectType(type: string) {
    //type只能是'-'和'+'中的一个
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.type = type;
  }
  mounted() {}
}
// export default {
//   name: "Types",
//   props:['xxx'],
//   data(){
//     return{
//       type:'-'//'-'表示支出，'+'表示收入
//     }
//   },
//   mounted(){
//     console.log(this.xxx);
//   },
//   methods:{
//     selectType(type){//type只能是'-'和'+'中的一个
//       if(type!=='-'&&type!=='+'){
//         throw new Error('type is unknown')
//       }
//       this.type=type
//     }
//   },
// };
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.nots {
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>