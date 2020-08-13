<template>
  <div class="search-box" v-if="!!suggest">
      <div class="search-user" v-if="!!searchKey">搜"{{searchKey}}"相关用户></div>
    <div class="suggest-row" v-for="(item,index) in suggest.order" :key="index">
      <div class="suggest-title" v-if="!!titleData[item].title">
        <i :class="titleData[item].icon"></i>
        {{titleData[item].title}}
      </div>
      <div class="suggest-content">
        <div
          class="suggest-item"
          v-for="(citem,cindex) in suggest[item]"
          :key="cindex"
          @click="goPage(item,citem.id)"
        >{{citem.name}}{{!!citem.artists?"-"+citem.artists:''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    // 输入的内容
    searchKey:{
        type:String,
        default:''
    },

    suggest: {
      type: Object,
    },
  },
  data() {
    return {
      titleData: {
        songs: {
          title: "单曲",
          icon: "fa fa-music",
        },
        artists: {
          title: "歌手",
          icon: "fa fa-user-o",
        },
        albums: {
          title: "专辑",
          icon: "fa fa-dot-circle-o",
        },
        playlists: {
          title: "歌单",
          icon: "fa fa-wpforms",
        },
      },
    };
  },
  created() {
    console.log(this.suggest);
  },
  methods: {
    goPage(type,id){
      // console.log(type,id);
      this.$emit('goPage',{type:type,id:id});
    }
  },
};
</script>

<style lang="less" scoped>
.search-box {
  width: 500px;
  // max-width: 500px;
  background-color: #fff;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 5px 5px 1px #999;
  .search-user{
      color: #aaa;
      padding:10px;
      border-bottom:1px solid #ccc;
  }
  .suggest-row {
    line-height: 30px;
    position: relative;

    &::after {
      content: "";
      display: block;
      clear: both;
    }
    &:nth-of-type(odd) .suggest-content {
      background-color: #ffffff;
    }
    &:nth-of-type(even) .suggest-content {
      background-color: #f9f8f8;
    }
    .suggest-title {
      float: left;
      width: 80px;
      text-align: center;
    //   background-color: powderblue;
      height: 100%;
      color:#7b7a7a;

    }
    .suggest-content {
      border-left: 1px solid #ccc;
      box-sizing: border-box;
      float: left;

      width: 420px;
      & > .suggest-item {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        font-size: 14px;
      padding: 0 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc   ;
      }
      &>.suggest-item:hover{
          background-color: #e3e5e7;
      }
    }
  }
}
</style>