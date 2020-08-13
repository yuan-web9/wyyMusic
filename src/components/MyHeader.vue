<template>
  <div class="my-header">
    <!-- 标题 -->
    <div class="my-header-title">{{title}}</div>
    
    <!-- 标题后插槽 -->
    <slot name="title-right"></slot>
    
    <!-- 更多前插槽 -->
    <slot name="more-left"></slot>
    
    <!-- 更多 -->
    <div class="more-tag" v-if="more">
      更多
      <i class="right-tag fa fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    more: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
// 内容部分的头部标题重复样式
.my-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #c20c0c;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .my-header-title {
    float: left;
    font-size: 24px;
    font-weight: bold;
  }
  .more-tag {
    float: right;
    .right-tag {
      color: #c20c0c;
      margin-left: 10px;
    }
  }
}
</style>