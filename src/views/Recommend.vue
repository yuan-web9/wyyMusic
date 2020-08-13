<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <div class="banner c2">
      <div class="block">
        <!-- <span class="demonstration">Click 指示器触发</span> -->
        <el-carousel trigger="click" height="370px">
          <el-carousel-item class="banner-img-box" v-for="(item,index) in bannerData" :key="index">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <a href="javascript:;">
              <img :src="item.imageUrl" class="auto-img" />
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 主体内容部分 -->
    <div class="recommend-content c2 clearfix">
      <div class="content-left fl">
        <!-- 热门部分 -->
        <div class="hot">
          <div class="hot-header clearfix">
            <div class="hot-header-title fl">
              <span>热门推荐</span>
            </div>
            <div class="hot-header-nav fl">
              <ul class="clearfix">
                <li
                  class="hot-category-item fl"
                  v-for="(item,index) in hotCategory"
                  :key="index"
                  @click="goPage('SongList',{cat:item})"
                >
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
            <div class="hot-header-more fr">
              <span>更多</span>
              <i class="el-icon-right more-icon"></i>
            </div>
          </div>
          <div class="hot-main">
            <ul class="clearfix">
              <li class="hot-main-item fl" v-for="(item,index) in hotData" :key="index">
                <div class="dish-box">
                  <div class="dish-img">
                    <img
                      class="auto-img"
                      :src="item.picUrl"
                      @click="goPage('SongListDetail',{id:item.id})"
                    />
                    <div class="play-count">
                      <i class="el-icon-headset"></i>
                      <span class="count">{{item.playCount}}万</span>
                      <i class="el-icon-video-play fr"></i>
                    </div>
                  </div>
                  <div
                    class="dish-word"
                    @click="goPage('SongListDetail',{id:item.id})"
                  >{{item.name}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 个性推荐部分 -->
        <!-- <div class="personal">
                <div class="personal-header clearfix">
                    <div class="personal-header-title fl">
                        <span>个性化推荐</span>
                    </div>
                    <div class="personal-header-nav fl">
                        <ul class="clearfix">
                            <li class="personal-category-item fl"><span>hhh</span></li>
                        </ul>
                    </div>
                </div>
        </div>-->

        <!-- 新碟上架部分 -->
        <div class="new">
          <div class="show-header clearfix">
            <div class="show-header-title fl">
              <span>新碟上架</span>
            </div>
            <div class="show-header-more fr">
              <span>更多</span>
              <i class="el-icon-right more-icon"></i>
            </div>
          </div>
          <div class="new-content">
            <div class="block">
              <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
              <el-carousel height="200px" arrow="always" :autoplay="false">
                <el-carousel-item v-for="item in 3" :key="item">
                  <!-- <h3 class="small">{{ item }}</h3> -->
                  <ul class="new-dish-list clearfix">
                    <li
                      class="new-dish-box fl"
                      v-for="(citem,index) in newData.slice((item-1)*5,(item-1)*5+5)"
                      :key="index"
                    >
                      <img
                        class="auto-img"
                        :src="citem.blurPicUrl"
                        @click="goPage('Album',{id:citem.id})"
                      />
                      <div class="new-dish-word">
                        <p class="new-dish-name">{{citem.name}}</p>
                        <p class="new-dish-songer">{{citem.artist.name}}</p>
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>

        <!-- 榜单部分 -->
        <div class="rank clearfix">
          <!-- 顶部标题 -->
          <div class="show-header clearfix">
            <div class="show-header-title fl">
              <span>榜单</span>
            </div>
            <div class="show-header-more fr">
              <span>更多</span>
              <i class="el-icon-right more-icon"></i>
            </div>
          </div>

          <!-- 榜单内容 -->
          <div class="list-content-container clearfix">
            <div class="list-box fl" v-for="(item,index) in listData" :key="index">
              <div class="list-title clearfix">
                <div class="list-pic fl">
                  <img class="auto-img" :src="item.pic" />
                </div>
                <div class="list-word fl">
                  <div class="list-title-word">{{item.name}}</div>
                  <div class="list-title-icon">
                    <i class="el-icon-video-play"></i>
                    <i class="el-icon-folder-add"></i>
                  </div>
                </div>
              </div>
              <div class="list-content">
                <div class="list-content-item" v-for="(citem,cindex) in item.tracks" :key="cindex">
                  <span class="item-index">{{cindex+1}}</span>
                  <span class="item-name" @click="goPage('Song',{id:citem.id})">{{citem.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right fl">
        <div class="song-list">
          <div class="song-list-title">
            入驻歌手
            <span class="more fr">查看全部 ></span>
          </div>
          <!-- <div class="more">查看全部</div> -->
          <div class="song-list-content">
            <!-- <related-list-card class="related-card" :title="item.name" :img="item.picUrl" v-for="(item,index) in hotSonger" :key="index"></related-list-card> -->
            <div class="r-card" v-for="(item,index) in hotSonger" :key="index">
              <div class="pic-box">
                <img :src="item.picUrl" />
              </div>
              <div class="msg-box">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/recommend.less";
import RelatedListCard from "../components/RelatedListCard";
export default {
  name: "Recommend",

  data() {
    return {
      //   页面固定的数据
      hotCategory: ["华语", "流行", "摇滚", "民谣", "电子"],

      //   获取的数据
      bannerData: [],
      hotData: [],
      newData: [],
      listData: [],
      hotSonger: [],
    };
  },

  components: {
    RelatedListCard,
  },

  created() {
    this.getBannerData();
    this.getHotData();
    this.getNewData();
    this.getTopList();
    this.getHotSonger();
  },

  methods: {
    // 获取5个热门歌手
    getHotSonger() {
      this.axios({
        method: "GET",
        url: "/top/artists",
        // params:{
        //   limit:n,
        // }
      })
        .then((result) => {
          console.log("5个热门歌手==>", result);
          if ((result.data.code = 200)) {
            let data = [];
            for (let i = 0; i < 5; i++) {
              let obj = {};
              let r = result.data.artists[i];
              obj.id = r.id;
              obj.name = r.name;
              obj.picUrl = r.img1v1Url;
              data.push(obj);
            }
            this.hotSonger = data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    //   获取榜单摘要
    getTopListDetail(dataObj) {
      this.axios({
        method: "GET",
        url: "/playlist/detail",
        params: {
          id: dataObj.id,
        },
      })
        .then((result) => {
          // console.log("result==>", result);
          if (result.data.code == 200) {
            let obj = {};
            let data = [];
            for (let i = 0; i < 10; i++) {
              data.push(result.data.playlist.tracks[i]);
            }
            obj.id = dataObj.id;
            obj.name = dataObj.name;
            obj.pic = dataObj.pic;
            obj.tracks = [];
            obj.tracks = data;
            this.listData.push(obj);
            // console.log('obj===>',this.listData);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    //   获取榜单
    getTopList() {
      this.axios({
        method: "GET",
        url: "/toplist",
      })
        .then((result) => {
          console.log("result==>", result);
          if (result.data.code == 200) {
            let data = [];
            //   this.newData = data;
            for (let i = 0; i < 3; i++) {
              let obj = {};
              obj.id = result.data.list[i].id;
              obj.name = result.data.list[i].name;
              obj.pic = result.data.list[i].coverImgUrl;
              this.getTopListDetail(obj);
            }
            console.log("resultList==>", result);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
    //   获取新碟上架数据
    getNewData() {
      this.axios({
        method: "GET",
        url: "/top/album",
        params: {
          limit: 15,
          offset: 0,
        },
      })
        .then((result) => {
          console.log("result==>", result);
          if (result.data.code == 200) {
            let data = result.data.albums;
            this.newData = data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    //   获取推荐歌单数据
    getHotData() {
      this.axios({
        method: "GET",
        url: "/personalized",
        params: {
          limit: 8,
        },
      })
        .then((result) => {
          //   console.log('result==>',result);
          if (result.data.code == 200) {
            let data = result.data.result;
            for (let i = 0; i < data.length; i++) {
              data[i].playCount = this.playCountFormat(data[i].playCount);
            }
            this.hotData = data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    //   获取轮播图数据
    getBannerData() {
      this.axios({
        method: "GET",
        url: "/banner",
      })
        .then((result) => {
          console.log("result==>", result);
          if (result.data.code == 200) {
            this.bannerData = result.data.banners;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    //   跳转页面
    goPage(name, data) {
      this.$router.push({ name: name, query: data });
    },

    // 跳转歌单详细
    goSongList() {
      this.$router.push();
    },

    // 榜单跳转单曲
  },
};
</script>
