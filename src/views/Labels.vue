<template>
  <div>
    <layout>
      <div class="tags">
        <router-link
          class="tag"
          v-for="tag in tags"
          :key="tag.id"
          :to="`/labels/edit/${tag.id}`"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" />
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button @click="createTag">新建标签</Button>
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import Vue from "vue";
import Component from "vue-class-component";
import Button from '@/components/Button.vue';

tagListModel.fetch();
@Component({
  components: {
    Button,
  },
})
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        window.alert("标签名重复吖");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background: rgb(245, 245, 245);
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }

</style>