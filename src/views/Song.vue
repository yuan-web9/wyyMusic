<template>
  <div class="song-detail c2 clearfix">
    <div class="left-box fl">
      <div class="song-msg">
        <detail-title :title="songData.song.name" :img="songData.album.picUrl" @playAll="playSong">
          <template v-slot:supplement>
            <div class="lyr-box" :class="lyrShow?'hide':''" v-html="lyrFormat(lyr)"></div>
            <div class="lyr-open-btn" @click="lyrHide">{{lyrShow?'收起':'展开'}}</div>
          </template>
          <template v-slot:underTitle>
            <div class="songer-msg">
              歌手：
              <span>{{songData.songer.name}}</span>
            </div>
            <div class="album-msg">
              所属专辑：
              <span @click="goPage('Album',{id:songData.album.id})">{{songData.album.name}}</span>
            </div>
          </template>
        </detail-title>
      </div>

      <!-- 评论 -->
      <div class="comment-box">
        <my-header :title="'评论'">
          <template v-slot:title-right>
            <div class="comment-count">共{{commentCount}}条评论</div>
          </template>
        </my-header>
        <div class="hot" v-if="currentPage==1">
          <div class="line">
            <p>精彩评论</p>
            <hr />
          </div>
          <comment-list class="hotComment" :commentData="hotCommentData"></comment-list>
        </div>
        <div class="common">
          <div class="line">
            <p>最新评论</p>
            <hr />
          </div>
          <comment-list class="commonComment" :commentData="commentData"></comment-list>
        </div>

        <div class="page-select">
          <el-pagination
            @current-change="pageChange"
            :current-page="currentPage"
            :page-size="20"
            background
            layout="prev, pager, next"
            :total="commentCount"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 右边相关信息部分 -->
    <div class="right-box fl">
      <!-- <div class="contain-list"></div> -->
      <div class="relevant-song">
        <div class="list-title">相似歌曲</div>
        <similar-song-card @goSong="goSong" v-for="(item,index) in similarSong" :key="index" :data="item"></similar-song-card>
      </div>

    </div>
  </div>
</template>

<script>
import DetailTitle from "../components/DetailTitle";
import MyHeader from "../components/MyHeader";
import CommentList from "../components/comment/CommentList";
import RelevantCard from "../components/RelevantCard";
import SimilarSongCard from "../components/SimilarSongCard";
import TimeFormat from "../assets/js/TimeFormat.js";
export default {
  name: "Song",
  data() {
    return {
      songData: {
        song: {
          name: "标题",
        },
        songer: {
          name: "歌手",
        },
        album: {
          name: "专辑",
          picUrl: "null",
        },
      },
      lyr: "",
      lyrShow: "false",
      
      // 普通数据
      commentData: [],
      
      // 热评数据
      hotCommentData: [],
      
      // 评论条数
      commentCount: 0,
      
      // 评论页数
      currentPage: 1,
      before: 0,

      similarSong:[],


      
    };
  },
  components: {
    DetailTitle,
    MyHeader,
    CommentList,
    RelevantCard,
    SimilarSongCard,
  },
  created() {
    this.getSongMsg();
    this.getComment();
    this.getSimiSong();
  },
  methods: {
    playSong(){
      let data={};
      data.id=this.songData.song.id;
      data.name=this.songData.song.name;
      data.dt=this.songData.song.dt;
      data.songer=this.songData.songer.name;
      data.picUrl=this.songData.album.picUrl;
      this.$emit('addSong',data)
    },

    // 相似音乐song跳转
    goSong(id){
      console.log(id);
      this.$router.push({query:{id:id}});
      this.getSongMsg();
    this.getComment();
    this.getSimiSong();
    },

    // 获取相似音乐
    getSimiSong(){
      let songId=this.$route.query.id;
      this.axios({
        method:'GET',
        url:'/simi/song',
        params:{
          id:songId,
        }
      }).then(result=>{
        console.log('相似音乐==>',result);
        if(result.data.code==200){
          let data=[];
          for(let i=0;i<result.data.songs.length;i++){
            let obj={};
            obj.id=result.data.songs[i].id;
            obj.name=result.data.songs[i].name;
            obj.songer=result.data.songs[i].artists[0].name;
            
            // 歌手数组列表
            // obj.songer=[];
            // for(let j=0;j<result.data.songs[i].artists.length;j++){
            //   let aObj={};
            //   aObj.id=result.data.songs[i].artists[j].id;
            //   aObj.name=result.data.songs[i].artists[j].name;
            //   obj.songer.push(aObj);
            // }
            obj.songImg=result.data.songs[i].album.picUrl;
            data.push(obj);
          }
          this.similarSong=data;
        }
      }).catch(err=>{
        console.log('err==>',err);
      })
    },


    // 分页切换
    pageChange(e) {
      this.currentPage = e;
      console.log("页数改变==>", this.currentPage);
      this.getComment();
      // console.log('页数改变==>',e);
    },

    // 获取歌曲信息
    getSongMsg() {
      let songId = this.$route.query.id;
      this.axios({
        method: "GET",
        url: "/song/detail",
        params: {
          ids: songId,
        },
      })
        .then((result) => {
          console.log("歌曲详情页==>", result);
          if (result.data.code == 200) {
            let data = {};
            data.song = {};
            data.songer = {};
            data.album = {};
            data.song.id = result.data.songs[0].id;
            data.song.name = result.data.songs[0].name;
            data.song.dt = TimeFormat.timeStampFormat(result.data.songs[0].dt);
            data.songer.id = result.data.songs[0].ar[0].id;
            data.songer.name = result.data.songs[0].ar[0].name;
            data.album.id = result.data.songs[0].al.id;
            data.album.name = result.data.songs[0].al.name;
            data.album.picUrl = result.data.songs[0].al.picUrl;

            this.songData = data;
            this.getSongLyric(result.data.songs[0].id);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取专辑封面
    getAlbumPic(id) {
      this.axios({
        method: "GET",
        url: "/album",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("歌曲详情页专辑内容==>", result);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取歌词
    getSongLyric(id) {
      this.axios({
        method: "GET",
        url: "/lyric",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("歌曲详情页歌词==>", result);
          if (result.data.code == 200) {
            //   console.log(result.data.lrc.lyric.replace(p,''));
            this.lyr = result.data.lrc.lyric;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 歌词格式整理
    lyrFormat(data) {
      let p = /\[.*?\]/g;
      let q = /\n/g;
      //   console.log()
      return data.replace(p, "").replace(q, "<br/>");
    },

    // 歌词展示隐藏
    lyrHide() {
      this.lyrShow = this.lyrShow ? false : true;
    },

    // 页面跳转
    goPage(name, data) {
      this.$router.push({ name: name, query: data });
    },

    // 整理歌词

    // 获取评论
    getComment() {
      let params = {};
      let id = this.$route.query.id;
      let offset = (this.currentPage - 1) * 20;
      params.id = id;
      params.offset = offset;
      if (offset >= 5000) {
        params.before = this.before;
      }
      this.axios({
        method: "GET",
        url: "/comment/music",
        params: params,
      })
        .then((result) => {
          console.log("歌曲详情页评论内容==>", result);
          if (result.data.code == 200) {
            let hotData = [];
            let commentData = [];
            console.log(result.data.total);
            this.commentCount = result.data.total;

            // 整理热评
            if (result.data.hotComments != undefined) {
              for (let i = 0; i < result.data.hotComments.length; i++) {
                let obj = {};
                let r = result.data.hotComments[i];
                obj.commentId = r.commentId;
                obj.content = r.content;
                obj.time = TimeFormat.dateFormat(r.time);
                obj.likedCount = r.likedCount;
                obj.liked = r.liked;
                obj.user = {};
                obj.user.userId = r.user.userId;
                obj.user.nickname = r.user.nickname;
                obj.user.avatarUrl = r.user.avatarUrl;
                obj.beReplied = [];
                // obj.beReplied.beRepliedCommentId=r.beReplied
                for (let j = 0; j < r.beReplied.length; j++) {
                  let cobj = {};
                  cobj.beRepliedCommentId = r.beReplied[j].beRepliedCommentId;
                  cobj.content = r.beReplied[j].content;
                  cobj.user = {};
                  cobj.user.userId = r.beReplied[j].user.userId;
                  cobj.user.nickname = r.beReplied[j].user.nickname;
                  cobj.user.avatarUrl = r.beReplied[j].user.avatarUrl;
                  obj.beReplied.push(cobj);
                  // console.log(cobj);
                }
                // console.log(obj);
                hotData.push(obj);
              }
            }

            // 整理评论
            for (let i = 0; i < result.data.comments.length; i++) {
              let obj = {};
              let r = result.data.comments[i];
              obj.commentId = r.commentId;
              obj.content = r.content;
              obj.time = TimeFormat.dateFormat(r.time);
              obj.likedCount = r.likedCount;
              obj.liked = r.liked;
              obj.user = {};
              obj.user.userId = r.user.userId;
              obj.user.nickname = r.user.nickname;
              obj.user.avatarUrl = r.user.avatarUrl;
              obj.beReplied = [];
              // obj.beReplied.beRepliedCommentId=r.beReplied
              for (let j = 0; j < r.beReplied.length; j++) {
                let cobj = {};
                cobj.beRepliedCommentId = r.beReplied[j].beRepliedCommentId;
                cobj.content = r.beReplied[j].content;
                cobj.user = {};
                cobj.user.userId = r.beReplied[j].user.userId;
                cobj.user.nickname = r.beReplied[j].user.nickname;
                cobj.user.avatarUrl = r.beReplied[j].user.avatarUrl;
                obj.beReplied.push(cobj);
                // console.log(cobj);
              }
              // console.log(obj);
              commentData.push(obj);
            }

            let before =
              result.data.comments[result.data.comments.length - 1].time;

            console.log("评论整理结果==>", hotData);
            this.hotCommentData = hotData;
            this.commentData = commentData;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
  },
  filters: {},
};
</script>

<style lang="less" scoped>
.song-detail {
  border: 1px solid #ccc;
  margin-bottom: 70px;
  .left-box {
    width: 720px;
    min-height: 300px;
    // background-color: skyblue;
    border-right: 1px solid #ccc;
    padding: 0 20px;
    box-sizing: border-box;
    .comment-box {
      .comment-count {
        color: #999;
        margin-left: 20px;
        float: left;
      }
    }
    .song-msg {
      padding: 30px;
    }
  }
  .right-box {
    width: 280px;
    padding: 0 10px;
    box-sizing: border-box;
    // height: 100%;
    // background-color: pink;
  }
  .lyr-box {
    font-size: 14px;
    //   text-align: center;
  }
  .hide {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 5; /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .lyr-open-btn {
    text-align: right;
    color: #0c73c2;
    cursor: pointer;
  }
  .songer-msg {
    font-size: 14px;
    & > span {
      cursor: pointer;
      color: #0c73c2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .album-msg {
    font-size: 14px;
    & > span {
      cursor: pointer;
      color: #0c73c2;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .line {
    color: #999;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .page-select{
    margin: 20px 0;
    text-align: center;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  // background-color: #c20c0c;
  background-image: linear-gradient(to top, #cc0b11, #ed1f29);
}

  .list-title{
    padding: 6px 0;
    border-bottom:1px solid #ccc;
  }
}
</style>