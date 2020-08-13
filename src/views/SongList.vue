<template>
  <!-- 歌单页面 -->
  <div class="song-list c2">
    <div class="song-list-title">
      <my-header :title="newCategory">
          <template v-slot:title-right>
              <category-selector @outCategory="changCategory" class="category-btn" :categoryData="category"></category-selector>
          </template>
      </my-header>
    </div>
    <div class="song-list-content">
      <song-list-cart class="content-cart"
        v-for="(item,index) in newSongList"
        :key="index"
        :listId="item.id"
        :img="item.img"
        :title="item.name"
        :cartTag="true"
        :creator="item.creator"
        :creatorId="item.creatorId"
        :playCount="item.playCount"
        @goDetail="goDetail"
        @goCreator="goCreator"
      ></song-list-cart>
    </div>
    <div class="song-list-page">
      <el-pagination class="page-selector" background layout="prev, pager, next" :total="newSongListTotal" :page-size="25" :current-page="newPage" @current-change="pageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import MyHeader from "../components/MyHeader";
import CategorySelector from "../components/CategorySelector";
import SongListCart from "../components/SongListCart";
import CountFormat from '../assets/js/CountFormat.js'
export default {
  name: "SongList",
  components: {
    MyHeader,
    SongListCart,
    CategorySelector,
  },
  data() {
    return {
      category: {},
      newSongList: [],
      newSongListTotal:0,
      newPage:1,
      newCategory:'全部',
    };
  },
  created() {
    this.getPlayListCategory();
    this.getPlayList();
  },
  methods: {
    // 获取分类信息
    getPlayListCategory() {
      this.axios({
        method: "GET",
        url: "playlist/catlist",
      })
        .then((result) => {
          console.log("分类信息==>", result);
          if(result.data.code==200){
              let res=result.data.sub;
              let data={};
              data[0]={};
              data[1]={};
              data[2]={};
              data[3]={};
              data[4]={};

              data[0].title='语种';
              data[0].num=0;
              data[0].data=[];
              data[0].img=require('../assets/icons/global.png');

              data[1].title='风格';
              data[1].num=1;
              data[1].data=[];
              data[1].img=require('../assets/icons/piano.png');
              
              data[2].title='场景';
              data[2].num=2;
              data[2].data=[];
              data[2].img=require('../assets/icons/scene.png');
              
              data[3].title='情感';
              data[3].num=3;
              data[3].data=[];
              data[3].img=require('../assets/icons/smile.png');

              data[4].title='主题';
              data[4].num=4;
              data[4].data=[];
              data[4].img=require('../assets/icons/music.png');
              
              for(let i=0;i<res.length;i++){
                //   console.log('循环1');
                  for(let key in data){
                //   console.log(data[key].num);
                      if(data[key].num==res[i].category){
                        //   console.log('加1')
                        res[i].isActive=false;
                          data[key].data.push(res[i]);
                        //   data[key].data
                          break;
                      }
                  }
              }

              this.category=data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取类别歌单信息
    getPlayList() {
        let tag=this.$route.query.cat;
        let offset=this.$route.query.offset;
        console.log(tag,offset)
        if(tag==undefined)tag='全部';
        if(offset==undefined)offset=0;

        this.newCategory=tag;
        this.newPage=offset/25+1;

      this.axios({
        method: "GET",
        url: "/top/playlist",
        params: {
          cat: tag,
          limit: 25,
          order: 'hot',
          offset: offset,
        },
      })
        .then((result) => {
          console.log("分类歌单==>", result);
          if (result.data.code == 200) {
            this.newSongListTotal=result.data.total;
            let data = [];
            
            let res = result.data.playlists;

            for (let i = 0; i < res.length; i++) {
              let obj = {};
              obj.id = res[i].id;
              obj.name = res[i].name;
              obj.img = res[i].coverImgUrl;
              obj.creator = res[i].creator.nickname;
              obj.creatorId = res[i].creator.userId;
              obj.playCount = CountFormat.countFormat(res[i].playCount);
              data.push(obj);
            }
            this.newSongList = data;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 传参页数修改页数
    pageChange(e){
        console.log('页数==>',e);
        this.newPage=e;
        this.pushParam();
        
    },

    // 设置分类已选的标识
    changCategory(e){
        console.log('选择的分类==>',e);
        for(let key in this.category){
            for(let i=0;i<this.category[key].data.length;i++){
                if(this.category[key].data[i].name==e.data){
                    this.category[key].data[i].isActive=true;
                }else{
                    this.category[key].data[i].isActive=false;
                }
            }
        };
        this.newCategory=e.data;
        this.newPage=1;
        this.pushParam();
    },

    // 传参
    pushParam(){
        console.log(this.newCategory,(this.newPage-1)*25)
        this.$router.push({query:{cat:this.newCategory,offset:(this.newPage-1)*25}});
        this.getPlayList();
        this.$router.go(0);
        // window.location.reload();
        
    },

    // 跳转歌单详细页
    goDetail(e){
        console.log('跳转歌单详情页==>',e);
        this.$router.push({name:'SongListDetail',query:{id:e.data}})
    },
    goCreator(e){
        console.log('跳转创建者详情页==>',e);
    },
  },
};
</script>

<style lang="less" scoped>

.song-list {
  border: 1px solid #ccc;
  padding: 30px 20px;
  box-sizing: border-box;
  margin-bottom: 80px;
  .song-list-title{
      margin-bottom: 20px;
      .category-btn{
          margin-left: 20px;
      }
  }
  .song-list-content .content-cart{
      padding-left: 64.5px;
      padding-bottom: 25px;
      &:nth-of-type(5n+1){
          padding-left: 0;
        // border: 1px solid #000;
      }
  }
  .song-list-page .page-selector{
      margin: 0 auto;
      margin-top: 20px;
      width: 450px;
  }
}

</style>