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
    <tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </layout>
</template>

<script lang="ts">
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Component from "vue-class-component";
import Vue from "vue";
import { Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const version = window.localStorage.getItem("version") || "0";
const recordList: RecordItem[] = recordListModel.fetch();
const tagList = tagListModel.fetch();

if (version === "0.0.1") {
  //数据库升级，数据迁移
  recordList.forEach((record) => {
    record.createAt = new Date(2020, 0, 1);
  });
  //保存数据
  window.localStorage.setItem("recordList", JSON.stringify(recordList));
}
window.localStorage.setItem("version", "0.0.2");

@Component({
  components: { Tags, NumberPad, Types, FormItem },
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
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
