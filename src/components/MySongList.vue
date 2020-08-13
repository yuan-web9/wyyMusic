<template>
  <div class="my-song-list">
    <div class="song-list-title" v-if="listHeader">
      <div class="list-title">{{!!listTitle?listTitle:'歌曲列表'}}</div>
      <div class="song-count">{{!!trackCount?trackCount:tracks.length}}首歌</div>
      <div class="song-play-time" v-if="!!playTime">
        播放
        <span>{{playTime}}</span>次
      </div>
    </div>
    <div class="table-box" v-if="type=='list' && !!type">
      <div class="table-th-box" v-if="tableHeader">
        <el-row class="table-th">
          <el-col :span="index==0?2:index==1?14:4" v-for="(item,index) in thListA" :key="index">
            <div class="grid-content bg-purple-dark">{{item}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-row class="table-tr" v-for="(item,index) in tracks" :key="index">
          <el-col :span="2" class="table-td">
            <div class="grid-content bg-purple-dark">
              <span>{{index+1}}</span>
              <!-- <i class="play-btn el-icon-video-play" @click="playSelected(item.id)"></i> -->
            </div>
          </el-col>
          <el-col :span="14" class="table-td">
            <div class="grid-content bg-purple-dark">
              <i @click="pushSong(item)" :class="item.song.id==playingId?'playing':''" class="list-play-btn el-icon-video-play" ></i>
              <span class="song-name" @click="getSongId(item)">{{item.song.name}}</span>
            </div>
          </el-col>
          <el-col :span="4" class="table-td">
            <div class="grid-content bg-purple-dark">
              <span class="time-word">{{item.song.dt}}</span>
              <div class="song-btn">
                <i class="el-icon-plus"></i>
                <i class="el-icon-folder-add"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-download"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="4" class="table-td">
            <div class="grid-content bg-purple-dark">{{item.songer.name}}</div>
          </el-col>
          <!-- <el-col :span="4" class="table-td">
              <div class="grid-content bg-purple-dark">{{item.al.name}}</div>
          </el-col>-->
        </el-row>
      </div>
    </div>


    <div class="table-box album" v-else-if="type=='album' && !!type">
      <div class="table-th-box" v-if="tableHeader">
        <el-row class="table-th" >
          <el-col :span="index==0?2:index==1?10:4" v-for="(item,index) in thListB" :key="index">
            <div class="grid-content bg-purple-dark">{{item}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="table-content">
        <el-row class="table-tr" v-for="(item,index) in tracks" :key="index">
          <el-col :span="2" class="table-td">
            <div class="grid-content bg-purple-dark">
              <span>{{index+1}}</span>
              <!-- <i class="play-btn el-icon-video-play" @click="playSelected(item.id)"></i> -->
            </div>
          </el-col>
          <el-col :span="10" class="table-td">
            <div class="grid-content bg-purple-dark">
              <i @click="pushSong(item)" :class="item.song.id==playingId?'playing':''" class="list-play-btn el-icon-video-play"></i>
              <span class="song-name" @click="getSongId(item)" v-html="$options.filters.heightLight(item.song.name,keyWord)"></span>
            </div>
          </el-col>
          <el-col :span="4" class="table-td">
            <div class="grid-content bg-purple-dark">
              <span class="time-word">{{item.song.dt}}</span>
              <div class="song-btn">
                <i class="el-icon-plus"></i>
                <i class="el-icon-folder-add"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-download"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="4" class="table-td">
            <div class="grid-content bg-purple-dark" v-html="$options.filters.heightLight(item.songer.name,keyWord)"></div>
          </el-col>
          <el-col :span="4" class="table-td">
              <div class="grid-content bg-purple-dark"><span class="album-word" @click="goAlbum(item)" v-html="$options.filters.heightLight(item.album.name,keyWord)"></span></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import MusicListUpdate from "../assets/js/MusicListUpdate.js";
export default {
  name: "MySongList",
  props: {
    // songCount: {
    //   type: Number,
    //   default: 0,
    // },
    type: {
      // 参数有list和album
      type: String,
      default: "list",
    },
    // keyWord:{
    //   type:String,
    //   // default:''
    // },

    listHeader:{
      type:Boolean,
      default:true,
    },

    tableHeader:{
      type:Boolean,
      default:true
    },

    playTime: {
      type: Number|String,
      // default: 0,
    },
    trackCount:{
      type:Number|String
    },
    tracks: {
      // 格式:
      // obj={
      //   song:{
      //     id,name,dt,
      //   },
      //   songer:{
      //     id,name,
      //   },
      //   album:{
      //     id,name,picUrl
      //   }
      // }

      type: Array,
      default: [],
    },
    listTitle:{
      type:String,
    }

  },
  filters:{
    heightLight:function(value,key){
      if(!value&&!!key)return value;
        let re=new RegExp(key,'gi');
        // let key=key;
        let res='';
        let data='';
        console.log(key);
        if(re.test(key)){
          res=`<span style="color:#0c73c2">${key}</span>`;
          data=value.replace(re,res);
        console.log(data);
          return data;
        }else{
          return value;
        }
    }
  },
  created(){
    // console.log(key)
  },
  computed:{
    playingId(){
      return this.$store.state.playingId;
    },
    keyWord(){
      return this.$store.state.keyWord;
    }
  },
  data() {
    return {
      thListA: ["　", "标题", "时长", "歌手"],
      thListB: ["　", "标题", "时长", "歌手", "专辑"],
    };
  },
  methods: {
    goAlbum(item){
      this.$emit('goAlbum',item.album.id);
    },

    pushSong(item) {
      // console.log("bofang");
      let data = {};
      data.id = item.song.id;
      data.name = item.song.name;
      data.songer = item.songer.name;
      data.songImg = item.album.picUrl;
      data.dt=item.song.dt;
      //   MusicListUpdate.addMusic([data]);
      // console.log(data);
      this.$emit("add-one-song", data);
    },

    getSongId(item){
      this.$emit('getSongId',item.song.id);
    }
  },
};
</script>

<style lang="less" scoped>
.playing{
  color:#c70c0c;
}


// 列表头部
.my-song-list {
  width: 100%;
  .song-list-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #c20c0c;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .list-title {
      font-size: 18px;
      font-weight: bold;
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .song-count {
      color: #aaa;
      font-size: 14px;
      float: left;
      margin-left: 30px;
      height: 40px;
      line-height: 40px;
    }
    .song-play-time {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      float: right;
      & > span {
        color: #ce3b3b;
        font-weight: bold;
      }
    }
  }

  //   列表表头
  .table-box {
    border: 1px solid #ccc;
  }
  .table-th-box {
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to top, #ccc 0%, #fdfdfd 100%);
    .table-th > .el-col {
      box-sizing: border-box;
      padding-left: 10px;
      border-left: 1px solid #ccc;
    }
    .table-th > .el-col:first-of-type::after {
      border-left: none;
    }
  }

  // 列表内容
  .table-content .table-tr {
    height: 30px;
    line-height: 30px;
    &:nth-of-type(odd) {
      background-color: #fff;
    }
    &:nth-of-type(even) {
      background-color: #f7f7f7;
    }
    .table-td > .grid-content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
    }
    .grid-content {
      padding-left: 10px;
      & > .song-btn {
        display: none;
        color: #999;
        & > i {
          margin-right: 4px;
          cursor: pointer;
        }
      }
      & > .list-play-btn {
        color: #999;
        cursor: pointer;
        margin-right: 10px;
        font-weight: bold;
      }
      & > .list-play-btn:hover {
        color: #555;
        cursor: pointer;
      }
      &>.song-name{
        cursor: pointer;
      }
      &>.song-name:hover{
        text-decoration: underline;
      }
    }
    &:hover .time-word {
      display: none;
    }
    &:hover .song-btn {
      display: block;
    }
  }
  .album-word{
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }

  .playing{
    color:#d31111!important;
  }
}
</style>