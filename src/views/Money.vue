<template>
  <layout class-prefix="layout">
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs
      classPreifx="type"
      :dataSource="recordTypeList"
      :value.sync="record.type"
    />
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        :value.sync="record.note"
      />
    </div>
    <tags @update:value="record.tags = $event" />
  </layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Component from "vue-class-component";
import Vue from "vue";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from "@/components/Statistics/Tabs.vue";

@Component({
  components: { Tags, NumberPad, FormItem, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  beforeCreated() {
    this.$store.commit("fetchRecord");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError) {
      this.record.notes = "";
      window.alert("已保存");
    }
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
