<template>
  <div class="like-user">
    <div class="like-title">喜欢这个歌单的人</div>
    <div class="user-pic">
        <div class="pic-box" v-for="(item,index) in userData" :key="index">
            <img :src="item.picUrl" :title="item.name">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikeUserBox",
  props: {
    // 结构
    // array:{
    //     id:xxx,
    //     name:xxx,
    //     picUrl:xxx,
    // }
    userData: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.like-title{
    padding:10px 0;
    border-bottom: 1px solid #ccc;
    // margin-bottom: 8px;
}
.user-pic{
    display: flex;
    flex-wrap: wrap;
        padding: 20px 0;
        &::after{
            content:'';
            display:block;
            clear: both;
        }
    .pic-box{
        // float: left;
        width: 55px;
        padding: 5px;
        margin-bottom: 10px;
        // margin-left: 4px;
        &:nth-of-type(4n+1){
            margin-left: 0;
        }
        &>img{
            width: 100%;
            display: block;
        }
    }
}
</style>