<template>
  <div class="play-list-box" v-if="!!playListData">
    <el-row class="item-row" v-for="(item,index) in playListData" :key="index">
      <el-col :span="1" class="play-icon">
        <div class="grid-content bg-purple">
          <i class="fa fa-play-circle-o"></i>
        </div>
      </el-col>
      <el-col :span="1" class="img-box">
        <div class="grid-content bg-purple-light">
          <img :src="item.picUrl" />
        </div>
      </el-col>
      <el-col :span="11" class="list-msg">
        <div class="grid-content bg-purple">
          <span class="msg-word" @click="goPlayList(item.id)"  v-html="$options.filters.heightLight(item.name,keyWord)"></span>
        </div>
      </el-col>
      <el-col :span="2" class="list-count">
        <div class="grid-content bg-purple-light">{{item.trackCount+'首'}}</div>
      </el-col>
      <el-col :span="3" class="creator">
        <div class="grid-content bg-purple-light">
          by
          <span class="creator-word">{{item.creator.nickname}}</span>
        </div>
      </el-col>
      <el-col :span="3" class="collect-count">
        <div class="grid-content bg-purple">{{'收藏：'+item.collectCount}}</div>
      </el-col>
      <el-col :span="3" class="play-count">
        <div class="grid-content bg-purple-light">{{'收听：'+item.playCount}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SearchPlayList",
  props: {
    playListData: {
      type: Array,
    },
  },
  computed: {
    keyWord() {
      return this.$store.state.keyWord;
    },
  },
  filters: {
    heightLight: function (value, key) {
      if (!value && !!key) return value;
      let re = new RegExp(key, "gi");
      // let key=key;
      let res = "";
      let data = "";
      console.log(key);
      if (re.test(key)) {
        res = `<span style="color:#0c73c2">${key}</span>`;
        data = value.replace(re, res);
        console.log(data);
        return data;
      } else {
        return value;
      }
    },
  },
  methods:{
      goPlayList(id){
          this.$emit('goPlayList',id);
      }
  },
};
</script>

<style lang="less" scoped>
.item-row {
  padding: 5px 0;
  height: 60px;
  .grid-content {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding:0 10px;
  }
  &:nth-of-type(odd) {
    background-color: #fff;
  }
  &:nth-of-type(even) {
    background-color: #f7f7f7;
  }
  .play-icon {
    text-align: center;
    // vertical-align: middle;
    height: 50px;
    line-height: 50px;
    & i {
      color: #b2b2b2;
      font-size: 20px;
      line-height: 50px;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
  .list-msg .grid-content {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    font-size: 14px;
    color: #000;
    .msg-word {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .creator .grid-content {
    .creator-word {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.img-box>.grid-content {
  padding: 5px 0;
  vertical-align: middle;

}
.img-box img {
  width: 100%;
  display: block;
    cursor: pointer;
}
</style>