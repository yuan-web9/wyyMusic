<template>
  <div class="rank-list c2 clearfix">
    <div class="left-list fl">
      <my-rank-list
        :title="'云音乐特色榜'"
        :contentData="rankList.special"
        @goRankDetail="showRankDetail"
      ></my-rank-list>
      <my-rank-list :title="'全球媒体榜'" :contentData="rankList.global" @goRankDetail="showRankDetail"></my-rank-list>
    </div>
    <div class="right-list fl">
      <div class="right-list-title">
        <detail-title
          :title="rightTitle"
          :updateDate="rightUpdata"
          :img="rightImg"
          :frequency="frequency"
          :collectCount="collectCount"
          :shareCount="shareCount"
          :commentCount="commentCount"
          @playAll="addAllSong()"
        ></detail-title>
      </div>
      <div class="right-song-list">
        <my-song-list :playTime="playCount" :tracks="tracks" @add-one-song="addSong" @getSongId="goSongPage"></my-song-list>
      </div>
    </div>
  </div>
</template>

<script>
import DetailTitle from "../components/DetailTitle";
import MyRankList from "../components/MyRankList";
import MySongList from "../components/MySongList";
import TimeFormat from "../assets/js/TimeFormat.js";

export default {
  name: "RankList",
  data() {
    return {
      rankList: {
        special: [],
        global: [],
      },
      rightTitle: "",
      rightImg: "",
      rightUpdata: "",
      frequency: "",
      collectCount: 0,
      shareCount: 0,
      commentCount: 0,
      playCount: 0,
      tracks: [],
    };
  },
  components: {
    MyRankList,
    MySongList,
    DetailTitle,
  },
  computed:{
    newPlayId(){
      return this.$store.state.playingId;
    }
  },
  created() {
    this.getToplist();
    this.setRightData();
    console.log(this.newPlayId);
  },
  methods: {
    // 获取所有榜单
    getToplist() {
      this.axios({
        method: "GET",
        url: "/toplist/detail",
      })
        .then((result) => {
          console.log("排行榜数据==>", result);
          if (result.data.code == 200) {
            let res = result.data.list;
            let sp = [];
            let gl = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].ToplistType != undefined) {
                sp.push(res[i]);
              } else {
                gl.push(res[i]);
              }
            }
            this.rankList.special = sp;
            this.rankList.global = gl;
            console.log(this.rankList);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 设置右边内容
    setRightData() {
      let lID = this.$route.query.id;
      if (lID == undefined) {
        lID = "19723756";
      }
      console.log(lID);
      this.axios({
        method: "GET",
        url: "/playlist/detail",
        params: {
          id: lID,
        },
      })
        .then((result) => {
          console.log("榜单详细==>", result);
          if (result.data.code == 200) {
            this.rightTitle = result.data.playlist.name;
            this.rightImg = result.data.playlist.coverImgUrl;
            this.collectCount = result.data.playlist.subscribedCount;
            this.shareCount = result.data.playlist.shareCount;
            this.playCount = result.data.playlist.playCount;
            this.commentCount = result.data.playlist.commentCount;

            // 格式化时间
            let songData = [];
            for (let i = 0; i < result.data.playlist.tracks.length; i++) {
              let obj = {};
              obj.song = {};
              obj.songer = {};
              obj.album = {};
              obj.song.id = result.data.playlist.tracks[i].id;
              obj.song.name = result.data.playlist.tracks[i].name;
              obj.song.dt = TimeFormat.timeStampFormat(
                result.data.playlist.tracks[i].dt
              );
              obj.songer.id = result.data.playlist.tracks[i].ar[0].id;
              obj.songer.name = result.data.playlist.tracks[i].ar[0].name;
              obj.album.id=result.data.playlist.tracks[i].al.id;
              obj.album.name=result.data.playlist.tracks[i].al.name;
              obj.album.picUrl=result.data.playlist.tracks[i].al.picUrl;
              songData.push(obj);
            }


            // for (let i = 0; i < songData.length; i++) {
            //   songData[i].dt = TimeFormat.timeStampFormat(songData[i].dt);
            // }
            this.tracks = songData;

            let isHas = false;
            if (!isHas) {
              for (let i = 0; i < this.rankList.special.length; i++) {
                if (this.rankList.special[i].id == lID) {
                  isHas = true;
                  this.frequency = this.rankList.special[i].updateFrequency;
                  break;
                }
              }
            }
            if (!isHas) {
              for (let i = 0; i < this.rankList.global.length; i++) {
                if (this.rankList.global[i].id == lID) {
                  isHas = true;
                  this.frequency = this.rankList.global[i].updateFrequency;
                  break;
                }
              }
            }
            // this.rightUpdata=result.data.playlist.frequency;

            // 设置更新时间
            this.rightUpdata = TimeFormat.dateFormat(
              result.data.playlist.updateTime
            );
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取选的歌曲信息
    addSong(data) {
      // console.log('1')
      // console.log('获取歌信息==>',data);
      let songData = data;
      this.$emit("addSong", songData);
      // this.$router.push({name:'Main',params:{songId:songId}});
    },

    // 添加所有歌曲到列表
    addAllSong() {
      let allSong = [];
      for (let i = 0; i < this.tracks.length; i++) {
        let obj = {};
        obj.id = this.tracks[i].song.id;
        obj.name = this.tracks[i].song.name;
        obj.songImg = this.tracks[i].album.picUrl;
        obj.songer = this.tracks[i].songer.name;
        obj.dt=this.this.tracks[i].song.dt;
        allSong.push(obj);
      }
      this.$emit("addAllSong", { allSong });
    },

    // 转跳排行榜详细
    showRankDetail(e) {
      // console.log("eee==>", e);
      this.$router.push({ query: { id: e } });
      this.setRightData();
    },

    // 跳转歌曲详细页
    goSongPage(e){
      this.$router.push({name:'Song',query:{id:e}});
    }
  },
};
</script>

<style lang="less" scoped>
.rank-list {
  // box-sizing: border-box;
  border: 1px solid #ccc;
  margin-bottom: 80px;
  .left-list {
    width: 240px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    padding-bottom: 20px;
  }
  .right-list {
    width: 760px;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
    padding-bottom: 20px;
    .right-list-title {
      padding: 30px;
    }
    .right-song-list {
      padding: 0 30px;
    }
  }
}
</style>