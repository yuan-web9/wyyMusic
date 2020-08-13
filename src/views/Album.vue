<template>
  <div class="album-box clearfix c2">
    <div class="left-box">
      <div class="album-msg">
        <detail-title
          @playAll="playAll"
          :title="albumData.name"
          :img="albumData.picUrl"
          :shareCount="albumData.shareCount"
          :commentCount="albumData.commentCount"
        >
          <template v-slot:underTitle>
            <div class="songer-msg">歌手：<span v-for="(item,index) in albumData.songer" :key="index"><span class="line" v-if="index>0">/</span><span class="songer-name">{{item.name}}</span></span></div>
            <div class="publish-date">发行时间：{{albumData.publish}}</div>
            <div class="company">发行公司：{{albumData.company}}</div>
          </template>
        </detail-title>
        <div class="album-description">
          <h4>专辑介绍:</h4>
          <p class="desc" :class="showDesc?'':'hide'">{{albumData.description}}</p>
          <span @click="changeDesc" class="showDesc">{{showDesc?'收起':'展开'}}</span>
        </div>
      </div>
      <div class="album-content">
        <my-song-list @add-one-song="addSong" :listTitle="'包含歌曲列表'" type="list" :tracks="songData"></my-song-list>
      </div>

      <!-- 评论部分 -->
      <div class="comment-box">
        <my-header :title="'评论'">
          <template v-slot:title-right>
            <div class="comment-count">共{{commentCount}}条评论</div>
          </template>
        </my-header>
        <div class="hot" v-if="currentPage==1">
          <div class="line">
            <p>精彩评论</p>
            <hr/>
          </div>
          <comment-list class="hotComment" :commentData="hotCommentData"></comment-list>
        </div>
        <div class="common">
          <div class="line">
            <p>最新评论</p>
            <hr/>
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
    <!-- <div class="right-box"></div> -->
  </div>
</template>

<script>
import DetailTitle from "../components/DetailTitle";
import MySongList from "../components/MySongList";
import CommentList from "../components/comment/CommentList";
import MyHeader from "../components/MyHeader";
import TimeFormat from "../assets/js/TimeFormat.js";
export default {
  name: "Album",
  data() {
    return {
      albumData: {},
      songData: [],
      showDesc:false,

      // 普通数据
      commentData: [],
      
      // 热评数据
      hotCommentData: [],
      
      // 评论条数
      commentCount: 0,
      
      // 评论页数
      currentPage: 1,
      before: 0,
    };
  },
  components: {
    DetailTitle,
    MySongList,
    CommentList,
    MyHeader,
  },
  
  

  created() {
    this.getAlbum();
    this.getAlbumComment();
  },
  methods: {
    // 获取专辑信息
    getAlbum() {
      let id = this.$route.query.id;
      this.axios({
        method: "GET",
        url: "/album",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("专辑详情页内容==>", result);
          if (result.data.code == 200) {
            let data = {};
            data.id = result.data.album.id;
            data.name = result.data.album.name;
            data.picUrl = result.data.album.picUrl;
            data.publish = TimeFormat.dateFormat(result.data.album.publishTime);
            data.company = result.data.album.company;
            // data.songerId = result.data.album.artists[0].id;
            // data.songer = result.data.album.artists[0].name;
            data.songer=[];
            for(let i=0;i<result.data.album.artists.length;i++){
              let obj={};
              obj.id=result.data.album.artists[i].id;
              obj.name=result.data.album.artists[i].name;
              data.songer.push(obj);
            }
            data.shareCount = result.data.album.info.shareCount;
            data.commentCount = result.data.album.info.commentCount;
            data.description = result.data.album.description;

            this.albumData = data;

            //   歌曲数据
            let song = [];
            for (let i = 0; i < result.data.songs.length; i++) {
              let obj = {};
              obj.song = {};
              obj.songer = {};
              obj.album = {};
              obj.song.id = result.data.songs[i].id;
              obj.song.name = result.data.songs[i].name;
              obj.song.dt = TimeFormat.timeStampFormat(result.data.songs[i].dt);
              obj.songer.id = result.data.songs[i].ar[0].id;
              obj.songer.name = result.data.songs[i].ar[0].name;
              obj.album.id = result.data.songs[i].al.id;
              obj.album.name = result.data.songs[i].al.name;
              obj.album.picUrl = result.data.songs[i].al.picUrl;
              //   console.log(obj);
              song.push(obj);
            }
            this.songData = song;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取专辑评论
    getAlbumComment() {
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
        url: "/comment/album",
        params: params,
      })
        .then((result) => {
          console.log("专辑详情页评论内容==>", result);
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

            console.log("专辑评论整理结果==>", hotData);
            this.hotCommentData = hotData;
            this.commentData = commentData;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 播放单首
    addSong(e){
      console.log(e);
      // MusicListUpdate.addMusic(e);
      this.$emit('addSong',e);
    },

    // 播放所有
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
      this.$emit("addAllSong",{allSong});
    },

    // 介绍显示切换
    changeDesc(){
      this.showDesc=this.showDesc?false:true;
    },

    // 分页切换
    pageChange(e) {
      this.currentPage = e;
      console.log("页数改变==>", this.currentPage);
      
      // 调用专辑评论获取方法
      this.getAlbumComment();
      // console.log('页数改变==>',e);
    },
  },
};
</script>

<style lang="less" scoped>
.album-box {
  border: 1px solid #ccc;
  margin-bottom: 70px;
  .left-box {
    // width: 720px;
    .album-msg {
      padding: 30px;
      .songer-msg .songer-name{
        cursor: pointer;
        color:#0c73c2;
        &:hover{
          text-decoration: underline;
        }
        &:hover .line{
          text-decoration: none;
        }
        
        // &:nth-of-type(n+2)::before{
        //   content: '/';
        //   font-size: 20px;
        //   margin: 0 5px;
        //   color:#000;
        //   cursor: none;
        //   &:hover{
        //   text-decoration: none;
        // }
        // }
      }
      .songer-msg .line{
          font-size: 20px;
          margin: 0 5px;
          color:#000;
          // cursor:unset;
        }
    }
    .album-content {
      padding: 30px;
    }
  }
  // .right-box {
  //   width: 280px;
  // }
  .desc{
    font-size: 14px;
    margin: 10px 0;
  }
  .hide {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 5; /*限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .showDesc{
    float: right;
    font-size: 12px;
    color:#0c73c2;
    cursor: pointer;
  }

  // 评论部分样式
  .line {
    color: #999;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .page-select{
    margin: 20px auto;
    // float: left;
    // width: 300px;
    text-align: center;
    
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  // background-color: #c20c0c;
  background-image: linear-gradient(to top, #cc0b11, #ed1f29);
}

  .comment-box {
    padding:0 30px;
      .comment-count {
        color: #999;
        margin-left: 20px;
        float: left;
      }
    }
}
</style>