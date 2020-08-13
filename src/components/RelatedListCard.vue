<template>
  <div class="related-list-card">
    <div class="pic-box" v-if="!!img">
      <img :src="img" />
    </div>
    <div class="msg-box">
      <div class="msg-title" v-if="!!title">
        <span>{{title}}</span>
      </div>
      <div class="msg-note" v-if="!!note">
        <span>{{note}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RelatedListCard",
  props: {
    title: {
      type: String,
    },
    note: {
      type: String,
    },
    img: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.related-list-card {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  height: 70px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .pic-box {
    width: 20%;
    float: left;
    & > img {
      width: 100%;
      display: block;
      cursor: pointer;
    }
  }
  .msg-box {
    float: left;
    box-sizing: border-box;
    padding-left: 10px;
    width: 80%;
    & > div {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .msg-title span{
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
    .msg-note{
        color:#999;
        &>span{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
  }
}
</style>