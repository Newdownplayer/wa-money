<template>
  <layout class-prefix="layout">
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord" />
    <types :type.sync="record.type" />
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <tags />
  </layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  components: { Tags, NumberPad, Types, FormItem },
})
export default class Money extends Vue {
  get recordList() {
      return this.$store.state.recordList;
    };
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  beforeCreated(){
    this.$store.commit('fetchRecord')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  border: 3px solid red($color: #000000);
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px;
  background: #f5f5f5;
}
</style>
