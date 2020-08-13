<template>
  <!-- 底部播放条 -->
  <div class="music-player">
    <!-- <audio :src="'http://m8.music.126.net/20200721143119/7ace09c5c7ce515c7fab22713b0e05e2/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'" controls></audio> -->

    <div class="player-content clearfix c2">
      <div class="control-box fl">
        <i class="fa fa-step-backward song-change"></i>
        <i class="fa fa-play song-pause" v-show="isPause" @click="play"></i>
        <i class="fa fa-pause song-pause" v-show="!isPause" @click="play"></i>
        <i class="fa fa-step-forward song-change" @click="endChange()"></i>
      </div>
      <div class="msg-box fl">
        <div class="pic-box fl">
          <img class="auto-img" :src="newSongImg" />
        </div>
        <div class="slide-box fl">
          <div class="name-singer">
            <span>{{newSongName}}</span>
            <span>{{newMusicSonger}}</span>
          </div>
          <div class="slide-control">
            <div class="slide">
              <el-slider v-model="slideValue" :show-tooltip="false" @change="changePercent"></el-slider>
            </div>
          </div>
        </div>
        <div
          class="timeout fl"
        >{{songCurrent?songCurrent:'00:00'}}/{{songLength?songLength:'00:00'}}</div>
      </div>
      <div class="other fl">
        <div class="userShare fl">
          <div class="icons-pic music-play-icon">
            <img class="auto-img" src="../assets/icons/collect.png" />
          </div>
          <div class="icons-pic music-play-icon">
            <img class="auto-img" src="../assets/icons/music_play_share.png" />
          </div>
        </div>
        <div class="music-player-set fl">
          <div class="volume-btn fl" @mouseover="showVolume" @mouseleave="hideVolume">
            <div class="icons-pic music-play-icon" v-show="volume>0">
              <img class="auto-img" src="../assets/icons/music_play_voice_m.png" />
            </div>
            <div class="icons-pic music-play-icon" v-show="volume==0">
              <img class="auto-img" src="../assets/icons/music_play_voice_n.png" />
            </div>

            <div class="volume-slider" v-show="isShowVolume">
              <el-slider
                v-model="volume"
                vertical
                :min="0"
                :max="1"
                :step="0.1"
                :show-tooltip="false"
                height="70px"
                @input="changeVolume"
              ></el-slider>
            </div>
          </div>
          <div class="play-mode fl" @click="changePlayMode">
            <div class="icons-pic music-play-icon" v-show="playMode==0">
              <img class="auto-img" src="../assets/icons/music_play_xunhuan.png" />
            </div>
            <div class="icons-pic music-play-icon" v-show="playMode==1">
              <img class="auto-img" src="../assets/icons/music_play_suiji.png" />
            </div>
            <div class="icons-pic music-play-icon" v-show="playMode==2">
              <img class="auto-img" src="../assets/icons/music_play_danqu.png" />
            </div>
          </div>

          <div class="play-list-btn fl">
            <i class="fa fa-list" @click="showListChange"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 播放器列表 -->
    <div class="play-list" v-show="showList">
      <div class="music-list">
        <div class="music-list-title">
          播放列表({{tracks.length}})
          <div class="music-list-title-btn">
            <span>
              <i class="el-icon-folder-add"></i>收藏全部
            </span>
            <span @click="clearSongList">
              <i class="el-icon-delete"></i>清除
            </span>
          </div>
        </div>
        <div class="music-list-content">
          <music-list-item
            @changeMusic="listChange"
            v-for="(item,index) in tracks"
            :key="index"
            :track="item"
          ></music-list-item>
        </div>
      </div>
      <div class="lyr-list">
        <div class="lyr-list-title">{{!!newSongName?newSongName:'歌词列表'}}</div>
        <div class="lyr-list-content" ref="lyrBox">
          <!-- {{lryData}} -->
          <div
            class="lyr-card"
            :class="item.isActive?'active':''"
            v-for="(item,index) in lyrArr"
            :key="index"
          >{{item.word}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/musicPlayer.less";
import MusicListItem from "../components/MusicPlayList/MusicListItem";
import TimeFormat from "../assets/js/TimeFormat.js";
let myPlayer = new Audio();
let timer;
// myPlayer.url='哈哈哈';
export default {
  name: "MusicPlayer",
  props: {
    // musicTitle: {
    //   type: String,
    // },
    // songer: {
    //   type: String,
    // },
    trigger: {
      type: Boolean,
    },
  },

  components: {
    MusicListItem,
  },

  created() {
    // this.inId=this.musicId;
    // console.log(this.musicId);
  },

  mounted() {
    this.$nextTick(() => {
      // this.getMusicUrl();
      this.getMusicUrlLocal();
    });
  },

  data() {
    return {
      inId: "",

      // 进度条
      slideValue: 0,

      // 音量
      volume: 0.5,

      playMode: 0, //0为顺序播放,1为随机播放,2位单曲循环

      // 是否暂停
      isPause: true,

      isShowVolume: false,

      // 显示列表
      showList: false,

      // 歌曲列表数据
      tracks: [],

      // 当前歌曲歌词数据
      lryData: "",

      // 当前歌曲歌词数组
      lyrArr: [],

      // 歌词高度
      scrollH: 0,

      // 歌词突出显示
      lyrActive: false,

      // 当前时间戳
      currentTime: 0,

      songUrl: [],

      // 当前播放歌曲的信息
      newSongName: "",
      newMusicSonger: "",
      newSongImg: "",

      // 是否首次加载
      isfirst: true,

      // playingIndex: 0,

      // timer:'',
      timeSave: "",

      // 播放中歌曲对象
      playingSong: {},


      songCurrent: "",
      songLength: "",
      len: 0,
    };
  },
  computed: {
    // 列表长度
    length: function () {
      return myPlayer.duration;
    },
  },
  watch: {
    // musicId: function (newValue) {
    //   this.getMusicUrl();
    //   console.log(this.musicId);
    // },
    trigger: function () {
      this.getMusicUrlLocal();
    },

    currentTime: function () {
      // 设置歌词突出显示
      this.isLyrActive();
    },
  },
  methods: {
    // 清除歌曲列表
    clearSongList(){
      console.log('清空列表');
      localStorage.removeItem('__music-list');
      this.tracks=[];
    },

    // 列表失焦切换
    changeShow(boo){
      console.log('a');
      if(boo){
      console.log(1);
        this.showList=true;
      }else if(!boo){
      console.log(0);
        this.showList=false;
      }
    },


    // 修改播放中标识的id
    changePlayIcon(id){
      this.$store.commit('changePlayId',id);
    },

    // 歌曲列表显示切换
    showListChange() {
      this.showList = this.showList ? false : true;
    },

    // 列表切换音乐
    listChange(id) {
      console.log(id);
      let local = JSON.parse(localStorage.getItem("__music-list"));
      for (let i = 0; i < local.length; i++) {
        local[i].state = false;
        if (local[i].id == id) {
          local[i].state = true;
        }
      }
      localStorage.setItem("__music-list", JSON.stringify(local));
      this.getMusicUrlLocal();
    },
    // initSlider(){

    // },

    // play2(){
    //   if(this.isPause){
    //     if(myPlayer.src != undefined && myPlayer.src != ""){
    //       return;
    //     }
    //     this.isPause=false;
    //     if(myPlayer.currentTime!=undefined&&myPlayer.currentTime!=0){
    //       myPlayer.oncanplay = () => {
    //           console.log(this.timeFormat(myPlayer.duration));
    //           this.len = myPlayer.duration;
    //           this.songLength = this.timeFormat(myPlayer.duration);

    //         };

    //     }

    //   }
    // },

    // 播放事件
    play() {
      // 拦截付费歌曲
      // if (
      //   myPlayer.src.split("/")[myPlayer.src.split("/").length - 1] == "null"
      // ) {
      //   // alert("这是付费歌曲，没有数据。(;-;)");
      //   this.$message('这是付费歌曲，没有数据。(;-;)');
      //   this.endChange();
      //   return;
      // }

      if (myPlayer.src != undefined && myPlayer.src != "") {
        // console.log(url);
        // console.log(myPlayer.src);
        // myPlayer.pause();
        if (myPlayer.paused) {
          this.isPause = false;
          if (this.timeSave == "" && this.timeSave == 0) {
            myPlayer.oncanplay = () => {
              console.log(this.timeFormat(myPlayer.duration));
              this.len = myPlayer.duration;
              this.songLength = this.timeFormat(myPlayer.duration);
            };
            myPlayer.load();
            myPlayer.play();
            // myPlayer.load();
            // console.log(myPlayer.src);

            // myPlayer.play();
            timer = setInterval(() => {
              // console.log("当前进度==>", this.timeFormat(myPlayer.currentTime));
              this.songCurrent = this.timeFormat(myPlayer.currentTime);
              this.slideValue = Math.floor(
                (myPlayer.currentTime / myPlayer.duration) * 100
              );
              this.currentTime = myPlayer.currentTime;
              // console.log('当前进度==>',myPlayer.currentTime);
              if (myPlayer.ended) {
                myPlayer.pause();
                this.isPause = true;
                clearInterval(timer);
                timer = null;
                // let index = 0;
                // for (let i = 0; i < this.songUrl.length; i++) {
                //   if (this.songUrl[i].url == myPlayer.src) {
                //     index = i == this.songUrl.length - 1 ? 0 : i + 1;
                //     break;
                //   }
                // }
                // myPlayer.src = this.songUrl[index].url;
                // this.play();
                this.endChange();
              }
              // console.log(this.slideValue);
            }, 500);
          } else {
            console.log("暂停");
            this.isPause = false;
            myPlayer.play();
            timer = setInterval(() => {
              // console.log("当前进度==>", this.timeFormat(myPlayer.currentTime));
              this.songCurrent = this.timeFormat(myPlayer.currentTime);
              this.slideValue = Math.floor(
                (myPlayer.currentTime / myPlayer.duration) * 100
              );
              this.currentTime = myPlayer.currentTime;
              // console.log('当前进度==>',myPlayer.currentTime);
              if (myPlayer.ended) {
                myPlayer.pause();
                this.isPause = true;
                clearInterval(timer);
                timer = null;
                // let index = 0;
                // for (let i = 0; i < this.songUrl.length; i++) {
                //   if (this.songUrl[i].url == myPlayer.src) {
                //     index = i == this.songUrl.length - 1 ? 0 : i + 1;
                //     break;
                //   }
                // }
                // myPlayer.src = this.songUrl[index].url;
                // this.play();
                this.endChange();
              }
              // console.log(this.slideValue);
            }, 500);
          }
        } else {
          console.log("暂停");
          myPlayer.pause();
          this.isPause = true;
          this.timeSave = myPlayer.currentTime;
          clearInterval(timer);
        }
        // myPlayer.src = ''
        // // myPlayer.src = url;
        // myPlayer.muted = "muted";

        // myPlayer.load();
      }
    },

    // 结束播放时切换
    endChange() {
        // console.log(localStorage.getItem('__music-list'))
      if(localStorage.getItem('__music-list')==null){
        // console.log('列表空')
        return;
      }
      this.scrollH= 0;
      // console.log(this.playMode);
      // console.log(this.songUrl);
      myPlayer.pause();
      this.isPause = true;
      myPlayer.src = "";
      myPlayer.load();
      clearInterval(timer);
      timer = null;
      this.isPause = true;

      let index = 0;
      switch (this.playMode) {
        // 顺序播放
        case 0:
          // for (let i = 0; i < this.songUrl.length; i++) {
          //   // console.log('顺序播放i==>',i);
          //   // console.log(myPlayer.src);
          //   // console.log(this.songUrl[0].url.url);
          //   if (this.songUrl[i].url.url == myPlayer.src) {
          //     // index = i == this.songUrl.length - 1 ? 0 : i + 1;
          //     // console.log(this.songUrl.length);
          //     index =
          //       this.songUrl.length <= 1
          //         ? 0
          //         : i >= this.songUrl.length - 1
          //         ? 0
          //         : i + 1;
          //     // console.log('index==>',index);

          //     // 当获取付费歌曲时会重新播放第一首Bug
          //     if (
          //       this.songUrl[index].url.url == null ||
          //       this.songUrl[index].url.url == undefined
          //     ) {
          //       this.$message("付费歌曲,没有数据");
          //       index++;
          //       index = index >= this.songUrl.length ? 0 : index;
          //     }
          //     break;
          //   }
          // }
          // // console.log(myPlayer.src);
          // // console.log(this.songUrl[index].url.url);
          // console.log("顺序循环", index);
          // myPlayer.src = this.songUrl[index].url.url;
          // this.setNewSongMsg(
          //   this.songUrl[index].name,
          //   this.songUrl[index].songer,
          //   this.songUrl[index].songImg
          // );
          // this.play();

          let locA = JSON.parse(localStorage.getItem("__music-list"));
          // let ran=Math.floor(Math.random()*local.length);
          let index = 0;
          for (let i = 0; i < locA.length; i++) {
            if (locA[i].state) {
              index = i;
              locA[i].state = false;
            }
          }

          if (index + 1 == locA.length) index = -1;
          index = index + 1;

          locA[index].state = true;
          localStorage.setItem("__music-list", JSON.stringify(locA));
          this.getMusicUrlLocal();
          // this.play();

          break;

        // 随机播放
        case 1:
          // index = Math.floor(Math.random() * this.songUrl.length);
          // console.log("随机==>", index);
          // myPlayer.src = this.songUrl[index].url.url;
          // this.setNewSongMsg(
          //   this.songUrl[index].name,
          //   this.songUrl[index].songer,
          //   this.songUrl[index].songImg
          // );
          // this.play();

          let locB = JSON.parse(localStorage.getItem("__music-list"));
          let ran = Math.floor(Math.random() * locB.length);
          for (let i = 0; i < locB.length; i++) {
            locB[i].state = false;
          }
          locB[ran].state = true;
          localStorage.setItem("__music-list", JSON.stringify(locB));
          this.getMusicUrlLocal();
          this.play();
          break;
        // 单曲循环
        case 2:
          console.log("单曲循环", index);
          // this.play();
          break;
      }
    },

    // 修改歌名和歌手
    setNewSongMsg(name, songer, img) {
      this.newSongName = name;
      this.newMusicSonger = songer;
      this.newSongImg = img;
    },

    // 本地缓存获取url
    getMusicUrlLocal() {
      console.log("反复横跳");
      // if (
      //   localStorage.getItem("__music-list") == undefined ||
      //   JSON.parse(localStorage.getItem("__music-list")).length == 0
      // ) {
      //   console.log("反复横跳2");
      //   return;
      // }
      // console.log("反复横跳1");
      if(localStorage.getItem("__music-list")==undefined){return;}

      let musicMsgArr = JSON.parse(localStorage.getItem("__music-list"));
      console.log("播放器获取列表", musicMsgArr);
      this.tracks = musicMsgArr;
      // 取出歌曲id
      // let idArr = [];
      // for (let i = 0; i < musicMsgArr.length; i++) {
      //   idArr.push(musicMsgArr[i].id);
      // }
      // console.log(idArr)

      // let l = JSON.parse(localStorage.getItem("__music-list"));
      let index = 0;
      for (let i = 0; i < musicMsgArr.length; i++) {
        if (musicMsgArr[i].state) {
          index = i;
          break;
        }
      }
      let id = musicMsgArr[index].id;

      this.axios({
        method: "GET",
        url: "/song/url",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("result==>", result);

          if (result.data.code == 200) {
            this.playingSong.id = musicMsgArr[index].id;
            this.playingSong.name = musicMsgArr[index].name;
            this.playingSong.songer = musicMsgArr[index].songer;
            this.playingSong.picUrl = musicMsgArr[index].songImg;
            this.playingSong.url = result.data.data[0].url;

            // 获取歌词
            this.getLyr(musicMsgArr[index].id);

            console.log("playingSong==>", this.playingSong);
            myPlayer.src = result.data.data[0].url;

            this.setNewSongMsg(
              this.playingSong.name,
              this.playingSong.songer,
              this.playingSong.picUrl
            );
            this.changePlayIcon(this.playingSong.id);
            console.log('播放中的id==>',this.playingSong.id);
            if (this.isfirst) {
              this.isfirst = false;
            } else {
              this.play();
            }
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 获取当前歌曲歌词
    getLyr(id) {
      this.axios({
        method: "GET",
        url: "/lyric",
        params: {
          id: id,
        },
      })
        .then((result) => {
          console.log("播放器获取的歌词", result);
          if (result.data.code == 200) {
            let data = "";
            data = result.data.lrc.lyric;
            this.lryData = this.getLyrWord(data);
            this.lyrArr = this.getLyrArray(data);
            // this.lryData=data;
            // console.log('歌词数组==>',this.getLyrArray(data));
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 筛选歌词文字
    getLyrWord(lyr) {
      let p = /\[.*?\]/g;
      let q = /\n/g;
      //   console.log()
      return lyr.replace(p, "").replace(q, "<br/>");
    },

    // 歌词转换为对象数组
    getLyrArray(lyr) {
      let p = /\[.\d:?\]/g;
      let q = /\n/g;
      let timeParrent = /\d{2}:\d{2}.\d{3}/;
      // let wordParrent = /[\u0800-\u9fa5\s\w:]{0,}$/;
      let wordParrent = /\[\d{2}:\d{2}.\d{3}\]/;
      let surcLyr = lyr.split(q);
      // surcLyr.splice(0, 2);
      
      // 去掉部分头部非歌词内容
        let index=0;
      for(let i=0;i<surcLyr.length;i++){
        if(timeParrent.test(surcLyr[i])){
          console.log(surcLyr[i]);
          index=i;
          break;
        }        
      }
      surcLyr=surcLyr.slice(index);
      // console.log(surcLyr);

      // 整合歌词内容数组
      let data = [];
      for (let i = 0; i < surcLyr.length; i++) {
        let obj = {};
        let time = timeParrent.exec(surcLyr[i]);
        if (time == null) {
          continue;
        }
        // 歌词文字内容
        let word = surcLyr[i].replace(wordParrent,'');
        // console.log(word);
        obj.time = TimeFormat.lyrTimeFormat(time["0"]);
        obj.word = word;
        obj.isActive = false;
        // let t=new Date(obj.time).getTime();
        // console.log(obj);
        data.push(obj);
      }
      return data;
    },

    //歌词活动判断
    isLyrActive() {
      for (let i = 0; i < this.lyrArr.length; i++) {
        // if(i>0){
        //   this.lyrArr[0].isActive = false;
        //   this.lyrArr[i-1].isActive = false;
        // }
        if (
          this.lyrArr[i].time <= this.currentTime &&
          this.lyrArr[i + 1] == undefined
        ) {
          if (this.lyrArr[i - 1] != undefined) {
            for(let j=0;j<i;j++){
            this.lyrArr[j].isActive = false;
            }
          }
          if(this.lyrArr[i].isActive){
            console.log(1);
            return;
          }
          this.lyrArr[i].isActive = true;
          
          // 歌词滚动
          if (i < 4) {
            this.scrollH=0;
            this.$refs.lyrBox.scrollTop = this.scrollH;
          } else {
            let lyrTime = 0;
            let lyrTimerA;
            this.scrollH=i*30-120;
            let l=(this.scrollH-this.$refs.lyrBox.scrollTop)/10;
            lyrTimerA = setInterval(() => {
              lyrTime = lyrTime + 1;
              
              if (lyrTime >= 10) {
                clearInterval(lyrTimerA);
                lyrTimerA = null;
              }
              console.log('a');
              console.log(l,this.$refs.lyrBox.scrollTop,lyrTime);
              this.$refs.lyrBox.scrollTop+=l;
            }, 30);
          }
        } else if (
          this.lyrArr[i].time <= this.currentTime &&
          this.lyrArr[i + 1].time > this.currentTime
        ) {
          if (this.lyrArr[i - 1] != undefined) {
            for(let j=0;j<i;j++){
            this.lyrArr[j].isActive = false;
            }
          }
          if(this.lyrArr[i].isActive){
            // console.log(1);
            return;
          }
          this.lyrArr[i].isActive = true;

          // 歌词滚动
          if (i < 4) {
            this.$refs.lyrBox.scrollTop = 0;
          } else {
            let lyrTime = 0;
            let lyrTimerA;

            this.scrollH=i*30-120;
            let l=(this.scrollH-this.$refs.lyrBox.scrollTop)/10;

            lyrTimerA = setInterval(() => {
              lyrTime = lyrTime + 1;
              if (lyrTime >= 10) {
                clearInterval(lyrTimerA);
                lyrTimerA = null;
              }

              this.$refs.lyrBox.scrollTop+=l;

            }, 30);
          }
        }
      }
    },

    lyrAnimal() {
      let lyrTime = 0;
      let lyrTimerA;
      timerA = setInterval(() => {
        time = time + 1;
        this.$refs.lyrBox.scrollTop = this.$refs.lyrBox.scrollTop + 15;
        if (time > 10) {
          clearInterval(lyrTimerA);
          lyrTimerA = null;
        }
      }, 10);
    },

    changeScroll() {
      this.$refs.lyrBox.scrollTop;
    },

    // 下一首
    nextSong() {
      if (this.playMode == 2) {
        this.playMode = 0;
        this.endChange();
        this.playMode = 2;
      } else {
        this.endChange();
      }
    },

    // 上一首

    // 调节音量
    changeVolume(value) {
      myPlayer.volume = value;
      this.volume = value;
    },

    // 调节进度
    changePercent(value) {
      if (myPlayer.src == undefined) {
        return;
      }
      let len = this.len;
      // let current=0;
      // current=myPlayer.currentTime;
      let res = (value / 100) * myPlayer.duration;
      myPlayer.currentTime = res;
      console.log(length);
      // console.log(current);
      // console.log(res);
    },

    // 格式化时间
    timeFormat(time) {
      let minute = Math.floor(time / 60);
      let second = Math.floor(time % 60);
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      let res = minute + ":" + second;
      return res;
    },

    // 切换循环方式
    changePlayMode() {
      this.playMode++;
      if (this.playMode >= 3) this.playMode = 0;
    },
    // 喇叭
    hideVolume() {
      this.isShowVolume = false;
    },
    showVolume() {
      this.isShowVolume = true;
    },
  },
};
</script>
