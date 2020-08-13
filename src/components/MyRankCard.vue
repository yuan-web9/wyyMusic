<template>
  <div class="my-rank-card" @click="showListDetail">
    <div class="my-rank-img">
      <img class="auto-img" :src="img" />
    </div>
    <div class="my-rank-msg">
      <div class="my-rank-title">{{title}}</div>
      <div class="my-rank-update">{{update}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRankCard",
  props: {
    title: {
      type: Number | String,
    },
    update: {
      type: String,
    },
    img: {
      type: String,
    },
    rankId: {
      type: String | Number,
    },
  },

  data() {
    return {};
  },
  methods: {
      showListDetail(){
          console.log('榜单id==>',this.rankId);
          this.$emit('goListDetail',this.rankId);
      }
  },
};
</script>

<style lang="less" scoped>
// 排行榜列表卡片样式
.my-rank-card {
  width: 100%;
  height: 62px;
  padding: 10px 20px;
  box-sizing: border-box;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  &:hover {
    background-color: #e6e6e6;
  }
  .my-rank-img {
    width: 40px;
    // padding: 11px 0;
    box-sizing: border-box;
    float: left;
  }
  .my-rank-msg {
    float: left;
    margin-left: 10px;
    // margin-top: 10px;
    font-size: 12px;
    .my-rank-title {
      height: 20px;
      line-height: 20px;
    }
    .my-rank-update {
      height: 20px;
      line-height: 20px;
      color: #ccc;
    }
  }
}
</style>