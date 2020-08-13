<template>
  <!-- 分类歌单页面的歌单卡片 -->
  <div class="song-list-cart">
    <div class="pic-box">
      <img class="pic-box-img" :src="img" @click="goDetail()"/>
      <div class="cart-tag" v-if="cartTag">
        <div class="play-count">
          <i class="el-icon-headset"></i>
          {{playCount}}
        </div>
        <div class="play-icon">
          <i class="el-icon-video-play"></i>
        </div>
      </div>
    </div>
    <div class="cart-msg">
      <div class="cart-title" @click="goDetail()">{{title}}</div>
      <div class="cart-creator">
        by
        <span @click="goCreator">{{creator}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListCart",
  props: {
    img: {
      type: String,
      default: "",
    },
    listId:{
        type:String|Number,
        default:''
    },
    cartTag: {
      type: Boolean,
      default: false,
    },
    playCount: {
      type: Number | String,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    creator: {
      type: String,
      default: "",
    },
    creatorId: {
      type: String|Number,
      default: "",
    },
  },

  methods:{
      goDetail(){
          this.$emit('goDetail',{data:this.listId});
      },

      goCreator(){
          this.$emit('goCreator',{data:this.creatorId})
      }
  }
};
</script>

<style lang="less" scoped>
.song-list-cart {
  display: inline-block;
  height: 188px;
  width: 140px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .pic-box {
    width: 140px;
    position: relative;
    .pic-box-img {
      width: 100%;
      display: block;
      cursor: pointer;

    }
    .cart-tag {
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #cacaca;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 5px;
      box-sizing: border-box;
      font-size: 12px;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .play-count {
        float: left;
      }
      .play-icon {
        float: right;
        font-size: 16px;
      }
    }
  }
  .cart-msg {
    .cart-title {
      width: 100;
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    &:hover{
            text-decoration: underline;
        }
    }
    .cart-creator {
      color: #999;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      & > span {
        margin-left: 5px;
        &:hover{
            text-decoration: underline;
        }
      }
    }
  }
}
</style>