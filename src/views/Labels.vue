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
import Component, { mixins } from "vue-class-component";
import Button from "@/components/Button.vue";
import { TagHelper } from "@/mixins/TagHelper";

@Component({
  components: { Button },
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreated() {
    this.$store.commit("fetchTags");
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