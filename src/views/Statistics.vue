<template>
  <Layout>
    <Tabs classPreifx="type" :dataSource="recordTypeList" :value.sync="type" />
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          <span>{{ beautify(group.title) }}</span
          ><span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span> ￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import Tabs from "@/components/Statistics/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
  }
  beautify(string: string) {
    const now = new Date();
    if (dayjs(string).isSame(now, "day")) {
      return "今天";
    } else if (dayjs(string).isSame(now.valueOf() - 86400 * 1000)) {
      return "昨天";
    } else if (dayjs(string).isSame(now.valueOf() - 86400 * 1000 * 2)) {
      return "前天";
    } else if (dayjs(string).isSame(now, "year")) {
      return dayjs(string).format("M月D日");
    } else {
      return dayjs(string).format("YYYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    const result: Result[] = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreated() {
    this.$store.commit("fetchRecord");
  }
  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
  background: #d6d6d6;
  justify-content: center;
}
.record {
  @extend %item;
  background: white;
}
.notes {
  @extend %item;
  background: white;
  margin-right: auto;
  margin-left: 10px;
  color: #999;
}
h3 {
  font-weight: normal;
}
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
    border-top: 1px solid #a3a3a3;
  }
}
</style>