<template>
  <div class="my-introduce">
    <div class="introduce-content" :class="trigger.isHide?'hide':''">{{'介绍：'+content}}{{content}}</div>
    <div class="introduce-btn" ><span @click="showOrHide">{{trigger.word}}</span></div>
  </div>
</template>

<script>
export default {
  name: "MyIntroduce",
  props: {
    content: {
      type: String,
      default: "简介内容",
    },
  },
  data() {
    return {
      trigger: {
        word: "展开",
        isHide: true,
      },
    };
  },
  methods: {
    showOrHide() {
        this.trigger.isHide=this.trigger.isHide?false:true;
        this.trigger.word=this.trigger.isHide?'展开':'收起'
    },
  },
};
</script>

<style lang="less" scoped>
.my-introduce {
  width: 100%;
  font-size: 12px;
  .introduce-content {
      color:#666;
  }
  .hide {
    // width: 200px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3; /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .introduce-btn {
    text-align: right;
    color: #0c73c2;
    cursor: pointer;
  }
}
</style>