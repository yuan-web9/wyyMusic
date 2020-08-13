<template>
  <div class="music-list-item" v-if="!!track" @click="changeMusic(track)">
    <el-row class="item-row" :class="track.state?'active':''">
      <el-col :span="1" class="col">
        <div class="grid-content bg-purple-dark">
            <i class="fa fa-play play-icon" :class="track.state?'active':''"></i>
        </div>
      </el-col>
      <el-col :span="15" class="col">
        <div class="grid-content bg-purple-dark">
            {{track.name}}
        </div>
      </el-col>
      <el-col :span="4" class="col">
        <div class="grid-content bg-purple-dark">
            {{track.songer}}
        </div>
      </el-col>
      <el-col :span="4" class="col">
        <div class="grid-content bg-purple-dark">
            {{track.dt==undefined?'04:12':track.dt}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MusicListItem",
  props:{
      track:{
          type:Object,
      }
  },
  methods:{
      changeMusic(item){
          console.log(item.id);
          this.$emit('changeMusic',item.id);
      },
  }
};
</script>

<style lang="less" scoped>
.item-row{
    // height: 30px;
    // line-height: 30px;
    &:hover{
        color:#fff;
    }
}
.grid-content{
    // height: 30px;
    // line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 4px 0;
    font-size: 14px;
}
.play-icon{
    display: none;
    color: #b80a0a;
    height: 28px;
    line-height: 28px;
}
.play-icon.active{
    display: block;
}
.item-row.active{
    color: #fff;
}
.col{
    height: 28px;
    line-height: 28px;
}
</style>