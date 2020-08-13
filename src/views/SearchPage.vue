<template>
  <div class="searchPage c2">
    <!-- 搜索页面 -->
    <div class="top-search-box">
      <my-search-form @inputKey="inputKey" @submitKey="submitKey" @changeFocu="changeShow"></my-search-form>
      <search-box
        @goPage="searchBoxGo"
        v-show="showSuggest"
        class="search-box"
        :suggest="suggest"
        :searchKey="formData"
      ></search-box>
    </div>
    <div class="top-search-result">
      <!-- 调用标签项组件 -->
      <!-- <icon name='music'></icon> -->
      <el-tabs type="border-card" :value="currentTab" :stretch="true" @tab-click="changeType">
        <el-tab-pane name="1" label="单曲">
          <my-song-list
            @goAlbum="goAlbum"
            @getSongId="goSongId"
            @add-one-song="addSong"
            :keyWord="key"
            :type="'album'"
            :listHeader="false"
            :tableHeader="false"
            :tracks="tracks"
          ></my-song-list>
        </el-tab-pane>
        <el-tab-pane name="10" label="专辑">
          <div class="album-box clearfix">
            <div class="album-item fl" v-for="(item,index) in albums" :key="index">
              <search-card @goAlbum="goAlbum" :data="item"></search-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="100" label="歌手">
          <div class="songer-box clearfix">
            <div class="songer-item fl" v-for="(item,index) in songer" :key="index">
              <search-card :type="'songer'" :data="item"></search-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="1000" label="歌单">
          <search-play-list @goPlayList="goPlayList" :playListData="songList"></search-play-list>
        </el-tab-pane>
        <el-pagination
          @current-change="pageChange"
          :total="pageCount"
          :page-size="30"
          class="page-select"
          background
          layout="prev, pager, next"
        ></el-pagination>
        <!-- <el-pagination background layout="prev, pager, next" :total="pageCount"></el-pagination> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MySearchForm from "../components/MySearchForm";
import SearchBox from "../components/SearchBox";
import MySongList from "../components/MySongList";
import SearchCard from "../components/SearchCard";
import SearchPlayList from "../components/SearchPlayList";
import TimeFormat from "../assets/js/TimeFormat.js";
export default {
  name: "SearchPage",
  data() {
    return {
      tabData: [
        { title: "单曲", type: "1" },
        { title: "歌手", type: "100" },
        { title: "专辑", type: "10" },
        { title: "歌单", type: "10" },
      ],
      currentTab: "1",
      suggest: {},
      formData: "",
      showSuggest: false,
      tracks: [],
      albums: [],
      songer: [],
      songList: [],
      pageCount: 0,
      currentPage: 1,
      type: 1,
      // key:'',
    };
  },
  components: {
    MySearchForm,
    SearchBox,
    MySongList,
    SearchCard,
    SearchPlayList,
  },
  computed: {
    key: function () {
      let key = !!this.$route.query.keywords ? this.$route.query.keywords : "";
      return key;
    },
  },
  watch: {
    $route: function () {
      this.locationTab();
      this.getSearch(0);
      this.changeKeyWord();
    },
  },
  created() {
    this.locationTab();
    this.getSearch(0);
    this.getSearchSuggest();
    this.changeKeyWord();
  },

  filters: {
    heightLight: function (value) {
      if (!value) return;
    },
  },

  methods: {
    // 改变vuex中的keyword
    changeKeyWord() {
      console.log(this.$route.query.keywords);
      this.$store.commit("changeKeyWord", this.$route.query.keywords);
    },

    // 搜索建议盒子显示切换
    changeShow(boo) {
      this.showSuggest = boo;
    },

    // 歌单列表搜索跳转
    goPlayList(e) {
      console.log(e);
      this.$router.push({ name: "SongListDetail", query: { id: e } });
    },

    // 搜索建议盒子跳转
    searchBoxGo(e) {
      console.log(e.type, e.id);
      switch (e.type) {
        case "songs":
          this.$router.push({ name: "Song", query: { id: e.id } });
          break;
        case "albums":
          this.$router.push({ name: "Album", query: { id: e.id } });
          break;
        case "artists":
          this.$router.push({ name: "Song", query: { id: e.id } });
          break;
        case "playlists":
          this.$router.push({ name: "SongList", query: { id: e.id } });
          break;
      }
    },

    // tab分页定位
    locationTab() {
      let type = this.$route.query.type;
      console.log(typeof type, type);
      if (type == undefined || type == "") {
        type = "1";
      }
      this.currentTab = type.toString();
    },

    // 分页切换
    pageChange(e) {
      console.log("分页切换==>", e);
      this.currentPage = e;
      this.getSearch((this.currentPage - 1) * 30);
    },

    // 跳转专辑页面
    goAlbum(e) {
      console.log(e);
      this.$router.push({ name: "Album", query: { id: e } });
    },

    // 跳转到歌曲详情
    goSongId(e) {
      console.log(e);
      this.$router.push({ name: "Song", query: { id: e } });
    },

    // 单曲列表加一首
    addSong(e) {
      console.log(e);
      this.$emit("addSong", e);
    },

    // 提交关键字
    submitKey(e) {
      // console.log(e);
      if (this.$route.query.keywords == e) {
        return;
      }
      this.$router.push({ query: { keywords: e, type: this.type } });
      this.getSearch();
    },

    // 修改类型
    changeType(e) {
      // if(e.active){
      //   return;
      // }
      // console.log(e.index);
      let t =
        e.index == 0
          ? "1"
          : e.index == 1
          ? "10"
          : e.index == 2
          ? "100"
          : e.index == 3
          ? "1000"
          : "1";
      if (this.type == t) {
        return;
      }
      // let query=this.$route.query.type;
      let keywords = this.$route.query.keywords;
      this.type = t;
      console.log(this.type, keywords);
      this.currentPage = 1;
      this.$router.push({ query: { keywords: keywords, type: this.type } });
      // this.$router.push({query:query});
      console.log("以上没问题");
      this.getSearch(0);
    },

    // 搜索接口调用方法
    getSearch(offset) {
      let key = this.$route.query.keywords;
      let type = this.$route.query.type;
      if (type == undefined || type == "") {
        type = 1;
      }
      if (offset == undefined || offset == "") {
        offset = 0;
      }
      console.log("type的类型==>", typeof type);
      // cons
      this.axios({
        method: "GET",
        url: "/search",
        params: {
          keywords: key,
          type: type,
          offset,
        },
      })
        .then((result) => {
          console.log("搜索结果==>", result);
          if ((result.data.code = 200)) {
            if (type == 1) {
              this.pageCount = result.data.result.songCount;
              this.setData(result.data.result.songs);
            } else if (type == 10) {
              this.pageCount = result.data.result.albumCount;
              this.setData(result.data.result.albums);
            } else if (type == 100) {
              this.pageCount = result.data.result.artistCount;
              this.setData(result.data.result.artists);
            } else if (type == 1000) {
              this.pageCount = result.data.result.playlistCount;
              this.setData(result.data.result.playlists);
            }
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取专辑封面(这个接口的搜索居然没有专辑封面;_;)
    getAlbumPic(index) {
      let id = this.tracks[index].album.id;
      if (id == 0) {
        console.log("这个id有问题");
        return;
      }
      // console.log(id);
      this.axios({
        method: "GET",
        url: "/album",
        params: {
          id: id,
        },
      })
        .then((result) => {
          // console.log('获取专辑封面==>',result);
          if (result.data.code == 200) {
            let data = result.data.album.picUrl;
            this.tracks[index].album.picUrl = data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 设置数据到本地渲染用
    setData(data) {
      // console.log('设置数据==>',data);
      if (data == undefined || data == "") {
        return;
      }
      console.log("设置数据==>", data);

      let type = this.$route.query.type;
      console.log(typeof type);
      console.log(type);

      switch (type) {
        case 1:
        case "1":
          console.log("单曲");

          let songData = [];
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.song = {};
            obj.songer = {};
            obj.album = {};
            obj.song.id = data[i].id;
            obj.song.name = data[i].name;
            obj.song.dt = TimeFormat.timeStampFormat(data[i].duration);
            obj.album.id = data[i].album.id;
            obj.album.name = data[i].album.name;
            obj.songer.id = data[i].artists[0].id;
            obj.songer.name = data[i].artists[0].name;
            songData.push(obj);
          }
          this.tracks = songData;
          for (let j = 0; j < this.tracks.length; j++) {
            this.getAlbumPic(j);
          }
          break;

        case 10:
        case "10":
          console.log("专辑");
          let albumData = [];
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.album = {};
            obj.songer = [];
            obj.album.id = data[i].id;
            obj.album.name = data[i].name;
            obj.album.picUrl = data[i].picUrl;
            // console.log(data.artists)
            for (let j = 0; j < data[i].artists.length; j++) {
              let o = {};
              o.id = data[i].artists[j].id;
              o.name = data[i].artists[j].name;
              obj.songer.push(o);
            }
            // obj.songer.id = data[i].artist.id;
            // obj.songer.name = data[i].artist.name;
            albumData.push(obj);
          }
          this.albums = albumData;
          break;

        case 100:
        case "100":
          console.log("歌手");
          let songerData = [];
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.id = data[i].id;
            obj.name = data[i].name;
            obj.picUrl = data[i].picUrl;
            songerData.push(obj);
          }
          this.songer = songerData;
          break;

        case 1000:
        case "1000":
          console.log("歌单");
          let songListData = [];
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj.id = data[i].id;
            obj.name = data[i].name;
            obj.playCount = data[i].playCount;
            obj.picUrl = data[i].coverImgUrl;
            obj.trackCount = data[i].trackCount;
            obj.collectCount = data[i].bookCount;
            obj.creator = {};
            obj.creator.userId = data[i].creator.userId;
            obj.creator.nickname = data[i].creator.nickname;
            songListData.push(obj);
          }
          this.songList = songListData;
          break;
      }
    },

    // 调用搜索建议接口
    getSearchSuggest(key) {
      if (key == "" || key == undefined) {
        return;
      }
      this.axios({
        method: "GET",
        url: "/search/suggest",
        params: {
          keywords: key,
          // type: 1,
        },
      })
        .then((result) => {
          console.log("搜索建议结果==>", result);
          if (result.data.code == 200) {
            let res = result.data.result;
            let obj = {};
            obj.order = res.order;
            for (let i = 0; i < obj.order.length; i++) {
              obj[obj.order[i]] = {};
              // obj[obj.order[i]].id = res[obj.order[i]].id;
              // obj[obj.order[i]].name = res[obj.order[i]].name;
              // obj[obj.order[i]].artists =
              //   res[obj.order[i]].artists;

              switch (obj.order[i]) {
                case "songs":
                  obj[obj.order[i]] = [];
                  for (let j = 0; j < res[obj.order[i]].length; j++) {
                    let a = {};
                    a.id = res[obj.order[i]][j].id;
                    a.name = res[obj.order[i]][j].name;
                    // a.artists=res[obj.order[i]].name;
                    let arr = [];
                    res[obj.order[i]][j].artists.forEach((e) => {
                      arr.push(e.name);
                    });
                    a.artists = arr.join("\t");
                    obj[obj.order[i]].push(a);
                  }
                  console.log(obj);
                  break;
                case "albums":
                  obj[obj.order[i]] = [];
                  for (let j = 0; j < res[obj.order[i]].length; j++) {
                    let a = {};
                    a.id = res[obj.order[i]][j].id;
                    a.name = res[obj.order[i]][j].name;
                    a.artists = res[obj.order[i]][j].artist.name;
                    obj[obj.order[i]].push(a);
                  }
                  console.log("专辑测试", obj);
                  break;
                case "artists":
                  obj[obj.order[i]] = [];
                  for (let j = 0; j < res[obj.order[i]].length; j++) {
                    let a = {};
                    a.id = res[obj.order[i]][j].id;
                    a.name = res[obj.order[i]][j].name;
                    // a.artists=res[obj.order[i]].artists.name;
                    obj[obj.order[i]].push(a);
                  }
                  console.log(obj);
                  break;
                case "playlists":
                  console.log("歌单数据整理");
                  obj[obj.order[i]] = [];
                  for (let j = 0; j < res[obj.order[i]].length; j++) {
                    let a = {};
                    a.id = res[obj.order[i]][j].id;
                    a.name = res[obj.order[i]][j].name;
                    obj[obj.order[i]].push(a);
                  }
                  console.log(obj);
                  break;
              }
              console.log(obj);
              this.suggest = obj;
            }
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 输入关键词
    inputKey(e) {
      console.log("输入框内容==>", e);
      this.formData = e;
      this.showSuggest = true;
      this.getSearchSuggest(this.formData);
    },
  },
};
</script>

<style lang="less" scoped>
.searchPage {
  margin-bottom: 70px;
}
.top-search-box {
  // text-align:center;
  position: relative;
  width: 500px;
  margin: 20px auto;
  .search-box {
    position: absolute;
    z-index: 100;
    margin-top: 5px;
  }
}
/deep/ .my-song-list .table-box {
  border: none;
}
.page-select {
  margin: 20px auto;
  // width: 400px;
  text-align: center;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  // background-color: #c20c0c;
  background-image: linear-gradient(to top, #cc0b11, #ed1f29);
}

.album-box {
  // display: flex;
  // flex-wrap: wrap;
  .album-item {
    margin-bottom: 15px;
    margin-left: 77px;
    &:nth-of-type(5n + 1) {
      margin-left: 0;
    }
  }
}

.songer-box {
  // display: flex;
  // flex-wrap: wrap;
  .songer-item {
    margin-bottom: 15px;
    margin-left: 77px;
    &:nth-of-type(5n + 1) {
      margin-left: 0;
    }
  }
}

// 搜索结果标签页
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #000;
  border-top: 3px solid #ccc;
  &:hover {
    color: #000;
  }
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  border-top: 3px solid #d13030;
  color: #000;
}
</style>