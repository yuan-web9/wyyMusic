<template>
  <div class="song-list-detail clearfix c2">
    <div class="left-box fl">
      <div class="list-msg-box clearfix">
        <detail-title
          :title="detailTitle.title"
          :colloctCount="detailTitle.collectCount"
          :shareCount="detailTitle.shareCount"
          :commentCount="detailTitle.commentCount"
          :img="detailTitle.img"
          :creatorId="detailTitle.creatorId"
          :creatorImg="detailTitle.creatorImg"
          :creatorName="detailTitle.creatorName"
          :createDate="detailTitle.createDate"
          @playAll="playAll"
        >
          <template v-slot:supplement>
            <div class="tag">
              <tag-box :tagData="detailTitle.tags" @goSongCategory="goSongCategory"></tag-box>
            </div>
            <div class="introduce">
              <my-introduce :content="detailTitle.description"></my-introduce>
            </div>
          </template>
        </detail-title>
      </div>
      <div class="list-content-box">
        <my-song-list
          :type="'album'"
          :trackCount="songCount"
          :playTime="playTime"
          :tracks="songData"
          @add-one-song="addSong"
        ></my-song-list>
      </div>
    </div>
    <div class="right-box fl">
      <!-- <div class="like-user">
        <div class="like-title">喜欢这个歌单的人</div>
      </div>-->
      <like-user-box :userData="likeUser"></like-user-box>

      <div class="relevant-list">
        <div class="related-title">相关推荐</div>
        <related-list-card
          :title="item.name"
          :note="'by '+item.creator.nickname"
          :img="item.picUrl"
          v-for="(item,index) in relatedList"
          :key="index"
        ></related-list-card>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/songListDetail.less";
import MusicListUpdate from "../assets/js/MusicListUpdate.js";
import TimeFormat from "../assets/js/TimeFormat.js";
import GetCookie from "../assets/js/GetCookie.js";
import DetailTitle from "../components/DetailTitle";
import TagBox from "../components/TagBox";
import MyIntroduce from "../components/MyIntroduce";
import MySongList from "../components/MySongList";
import LikeUserBox from "../components/LikeUserBox";
import RelatedListCard from "../components/RelatedListCard";
export default {
  name: "SongListDeetail",
  data() {
    return {
      detailTitle: {},
      songData: [],
      playTime: "",
      songCount: 0,
      likeUser: [],
      relatedList: [],
    };
  },
  components: {
    DetailTitle,
    MySongList,
    TagBox,
    MyIntroduce,
    LikeUserBox,
    RelatedListCard,
  },
  created() {
    this.getListDetail(this.$route.query.id);
    this.getRelatedList();
  },
  methods: {
    // 获取相关歌单推荐
    getRelatedList() {
      let id = this.$route.query.id;
      this.axios({
        method: "GET",
        url: "/related/playlist",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("相关歌单推荐==>", result);
          if (result.data.code == 200) {
            let listData = [];
            let r = result.data.playlists;
            for (let i = 0; i < r.length; i++) {
              let obj = {};
              obj.id = r[i].id;
              obj.name = r[i].name;
              obj.picUrl = r[i].coverImgUrl;
              obj.creator = {};
              obj.creator.userId = r[i].creator.userId;
              obj.creator.nickname = r[i].creator.nickname;
              listData.push(obj);
            }
            this.relatedList = listData;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取歌单详细页
    getListDetail(id, s) {
      let c = GetCookie.getCookie("MUSIC_U");
      if (c == undefined || c == "") {
        c = "";
      }
      this.axios({
        method: "GET",
        url: "/playlist/detail",
        params: {
          id: id,
          s: s,
          cookie: c,
        },
      })
        .then((result) => {
          console.log("歌单详情页获取歌单详情==>", result);
          if (result.data.code == 200) {
            let res = result.data.playlist;

            // 选择顶部歌单详细信息
            let data = {};
            data.title = res.name;
            data.collectCount = res.subscribedCount;
            data.shareCount = res.shareCount;
            data.commentCount = res.commentCount;
            data.img = res.coverImgUrl;
            data.creatorId = res.creator.userId;
            data.creatorImg = res.creator.avatarUrl;
            data.creatorName = res.creator.nickname;
            data.createDate = TimeFormat.dateFormat(res.createTime);
            data.id = res.id;
            data.tags = res.tags;
            data.description = res.description;
            // console.log('data==>',data);
            this.detailTitle = data;

            // 选择歌单歌曲信息
            let thData = [];
            let songData = [];
            for (let i = 0; i < res.tracks.length; i++) {
              let obj = {};
              obj.song = {};
              obj.songer = {};
              obj.album = {};
              obj.song.id = res.tracks[i].id;
              obj.song.name = res.tracks[i].name;
              obj.song.dt = TimeFormat.timeStampFormat(res.tracks[i].dt);
              obj.songer.id = res.tracks[i].ar[0].id;
              obj.songer.name = res.tracks[i].ar[0].name;
              obj.album.id = res.tracks[i].al.id;
              obj.album.name = res.tracks[i].al.name;
              obj.album.picUrl = res.tracks[i].al.picUrl;

              songData.push(obj);
            }

            // 取出喜欢歌单的用户信息
            let user = [];
            for (let i = 0; i < res.subscribers.length; i++) {
              let obj = {};
              let r = res.subscribers[i];
              obj.id = r.userId;
              obj.name = r.nickname;
              obj.picUrl = r.avatarUrl;
              user.push(obj);
            }

            this.songData = songData;
            this.playTime = res.playCount;
            this.songCount = res.trackCount;
            this.likeUser = user;

            console.log("歌数据==>", songData);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    goSongCategory(e) {
      this.$router.push({ name: "SongList", query: { cat: e } });
    },

    addSong(e) {
      console.log(e);
      // MusicListUpdate.addMusic(e);
      this.$emit("addSong", e);
    },

    playAll() {
      let allSong = [];
      for (let i = 0; i < this.songData.length; i++) {
        let obj = {};
        obj.id = this.songData[i].song.id;
        obj.name = this.songData[i].song.name;
        obj.songer = this.songData[i].songer.name;
        obj.songImg = this.songData[i].album.picUrl;
        obj.dt=this.songData[i].song.dt;
        allSong.push(obj);
      }
      // console.log(allSong);
      this.$emit("addAllSong", { allSong });
    },
  },
};
</script>

<style lang="less" scoped>
.song-list-detail {
  border: 1px solid #ccc;
  margin-bottom: 70px;
  .left-box {
    width: 720px;
    height: 100%;
    border-right: 1px solid #ccc;
    // background-color: pink;
    padding: 40px;
    box-sizing: border-box;
    .list-msg-box {
      width: 100%;

      .introduce {
        margin-top: 20px;
      }
    }
  }
  .right-box {
    width: 280px;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    // background-color: skyblue;
  
    .related-title{
      padding:10px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>