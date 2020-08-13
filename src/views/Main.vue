<template>
  <div class="home">
    <!-- 容器 -->
    <el-container>
      <!-- 页面头部 -->
      <el-header class="main-header">
        <div class="c container clearfix">
          <div class="logo fl">网易云音乐</div>
          <!-- <button @click="aaa">aaaaa</button> -->
          <div class="menu-nav">
            <ul class="fl">
              <li
                class="menu-nav-item fl"
                :class="item.isActive?'active':''"
                v-for="(item,index) in menuData"
                :key="index"
                @click="handleSelect(item)"
              >{{item.title}}</li>
            </ul>
          </div>

          <!-- 搜索框 -->
          <div class="search-box fl">
            <input class="search-input" v-model="keyWord" type="text" placeholder="请输入搜索内容"  @keypress="enterKeyDown"/>
            <el-button icon="el-icon-search" size="small" circle @click="goSearch"></el-button>
          </div>

          <!-- 登录按钮或头像 -->
          <div class="login-box fl">
            <div class="login-avatar" v-if="isOnline">
              <el-avatar
                class="avatar-pic"
                :size="30"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </div>
            <div class="login-link" v-else @click="openLogin">登录</div>
          </div>
        </div>

        <!-- 导航栏底部的子导航 -->
        <div class="child-nav">
          <ul class="child-nav-list c clearfix">
            <!-- <li class="active">推荐</li>
            <li>排行榜</li>
            <li>歌单</li>
            <li>主播电台</li>
            <li>歌手</li>
            <li>新歌上架</li>-->
            <li
              :class="item.isActive?'active':''"
              v-for="(item,index) in childMenu"
              :key="index"
              @click="changeNav(item)"
            >{{item.title}}</li>
          </ul>
        </div>
      </el-header>

      <el-main class="main-main">
        <router-view @addSong="addToSongList" @addAllSong="addAllToSongList"></router-view>
      </el-main>

      <el-dialog class="login-dialog" :title="isLogin?'用户登录':'用户注册'" :visible.sync="dialogTableVisible">
        <my-login-form v-if="isLogin" :submitBtnTitle="'登录'" :resetTrigger="dialogTableVisible" :captchaState="captchaState" @sendCaptcha="sendCaptcha" @submitLogin="existencePhone"></my-login-form>
        <my-register v-else :submitBtnTitle="'注册'" :resetTrigger="dialogTableVisible" :captchaState="captchaState" @sendCaptcha="sendCaptcha"></my-register>
        <div class="login-change"><span @click="loginChange">{{isLogin?'注册':'登录'}}</span></div>
      </el-dialog>

      <!-- 底部播放条 -->
      <my-music-player :center="true" ref="musicPlayer" :trigger="trigger"></my-music-player>

      <!-- <el-footer class="main-footer">Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import "../assets/css/main.less";
import myMusicPlayer from "../components/MusicPlay";
import MyLoginForm from "../components/MyLoginForm";
import MyRegister from "../components/MyRegister";
import GetCookie from "../assets/js/GetCookie.js";
import MusicListUpdate from "../assets/js/MusicListUpdate.js";
export default {
  name: "Main",

  data() {
    return {
      // slideValue: 0,

      // volume: 0.2,

      // playMode: 0,

      // isPause: true,

      captchaState: {
        title: "发送验证码",
        disabled: false,
        captchaRes: true,
      },

      trigger: false,

      dialogTableVisible:false,

      isLogin:false,

      keyWord:'',

      // isShowVolume: false,

      // songCurrent:'',
      // songLength:'',
      // len:0,

      isOnline: false,
      // mUrl: {
      //   id: "",
      //   url: ""
      // },

      activeIndex: "1",
      menuData: [
        {
          title: "发现音乐",
          isActive: true,
        },
        {
          title: "我的音乐",
          isActive: false,
        },
      ],

      childMenu: [
        { title: "推荐", isActive: false, url: "Recommend" },
        { title: "排行榜", isActive: false, url: "RankList" },
        { title: "歌单", isActive: false, url: "SongList" },
      ],

      addSong: [],
    };
  },

  components: {
    myMusicPlayer,
    MyLoginForm,
    MyRegister,
    GetCookie,
  },
  created() {
    this.checkChildNav();
    this.hasOnline()
  },

  watch: {
    $route:function(){
      this.checkChildNav();
    }
  },

  methods: {
    // 搜索框回车搜索
    enterKeyDown(e){
      if(e.keyCode==13){
        this.goSearch();
      }
    },

    // 跳转搜索页
    goSearch(){
      console.log(window.location)
      this.$router.push({name:'SearchPage',query:{keywords:this.keyWord,type:'1'}})
    },

    // aaa(){
    //   console.log(document.cookie);
    //   console.log(GetCookie.getCookie('MUSIC_U'));
    //   console.log(GetCookie.getCookie('playerId'));
    // },

    // 打开登录窗口
    openLogin(){
      this.dialogTableVisible=true
    },

    // 子导航栏切换
    changeNav(item) {
      if (item.isActive) {
        console.log("拦截");
        return;
      }
      this.childMenu.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
      // this.$router.push({name:item.url});
      this.goPage(item.url);
    },

    // 确认子导航栏标
    checkChildNav() {
      let url = location.hash;
      console.log(url)
      let arr = url.split("/");
      // console.log(arr[])
      switch (arr[arr.length - 1]) {
        case "recommend":
          this.childMenu.forEach((e) => {
            e.isActive = false;
          });
          this.childMenu[0].isActive = true;
          break;
        case "rankList":
          this.childMenu.forEach((e) => {
            e.isActive = false;
          });
          this.childMenu[1].isActive = true;
          break;
        case "songList":
          this.childMenu.forEach((e) => {
            e.isActive = false;
          });
          this.childMenu[2].isActive = true;
          break;
        default:
          this.childMenu.forEach((e) => {
            e.isActive = false;
          });
          break;
        // default:
        //   this.childMenu.forEach((e) => {
        //     e.isActive = false;
        //   });
        //   this.childMenu[0].isActive = true;
        //   break;
      }
    },


    // 修改musicUrl
    changeMusicUrl(id) {
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
            let data = {
              id: result.data.data[0].id,
              url: result.data.data[0].url,
            };
            this.mUrl = data;
            console.log(this.mUrl);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 子路由加歌曲
    addToSongList(e) {
      console.log("主页面输出==>", e);
      let data = e;
      // MusicListUpdate.addMusic([data]);
      MusicListUpdate.addAndPlay([data]);
      this.trigger = this.trigger ? false : true;
    },

    //子路由加所有歌曲
    addAllToSongList(e) {
      console.log("播放全部==>", e);
      MusicListUpdate.addMusic(e.allSong);
      this.trigger = this.trigger ? false : true;
    },

    // 页面跳转
    goPage(name) {
      this.$router.push({ name: name });
    },

    // 发送验证码
    sendCaptcha(phone) {
      // 获取时间戳
      let timestamp = new Date().getTime();

      this.axios({
        method: "POST",
        url: "/captcha/sent",
        data: {
          phone: phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("验证发送结果==>", result);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 验证验证码
    checkCaptcha(e) {
      // 获取时间戳
      let phone=e.phone;
      let captcha=e.captcha;
      let timestamp = new Date().getTime();

      this.axios({
        method: "POST",
        url: "/captcha/verify",
        data: {
          captcha: captcha,
          phone: phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("验证结果==>", result);
          if(result.data.code==200){
            this.captchaState.captchaRes=true;
            this.login(e);
          }else{
            this.captchaState.captchaRes=false;
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 验证手机号是否已注册
    existencePhone(e) {
      let phone=e.phone;
      let timestamp = new Date().getTime();
      this.axios({
        method: "POSt",
        url: "/cellphone/existence/check",
        data: {
          phone: phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("验证结果结果==>", result);
          if(result.data.code==200 && result.data.exist>0){
            this.checkCaptcha(e);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 登录账户
    login(e){
      let phone=e.phone;
      let pass=e.pass;
      let timestamp = new Date().getTime();
      this.axios({
        method:'POST',
        url:'/login/cellphone',
        data:{
          phone:phone,
          password:pass
        }
      }).then(result=>{
        console.log('登录返回结果==>',result);
        if(result.data.code==200){
          let cookie=result.data.cookie;
          let playerId=result.data.profile.userId;

          let time=(new Date((new Date()).getTime()+1000*3600*60*24*3)).toString().split('+')[0]
          document.cookie='MUSIC_U='+cookie+';expires='+time+'; path=/'
          document.cookie="playerId="+playerId+';expires='+time+'; path=/';
        }
      }).catch(err=>{
        console.log('err==>',err);
      })

    },

    // 注册账号
    register(captcha, phone, password, nickname) {
      // 获取时间戳
      let timestamp = new Date().getTime();

      this.axios({
        method: "POST",
        url: "/register/cellphone",
        data: {
          captcha: captcha,
          phone: phone,
          password: password,
          nickname: nickname,
          timestamp,
        },
      })
        .then((result) => {
          console.log("注册结果==>", result);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 切换登录注册窗口
    loginChange(){
      this.isLogin=this.isLogin?false:true;
    },

    // 确定是否已经登录
    hasOnline(){
      let c=GetCookie.getCookie('MUSIC_U');
      if(c==undefined&&c==''){
        this.isOnline=false;
      }else{
        this.isOnline=true;
        
      }
    },

    // getSong() {
    //   this.axios({
    //     method: "GET",
    //     url: "/search",
    //     params: {
    //       s: "大城小爱"
    //       // from:'music'
    //     }
    //   })
    //     .then(result => {
    //       console.log("result==>", result);
    //     })
    //     .catch(err => {
    //       console.log("err==>", err);
    //     });
    // },

    handleSelect(item) {
      if (item.isActive) {
        return;
      }
      this.menuData.forEach((e) => {
        e.isActive = false;
      });
      item.isActive = true;
    },
  },
};
</script>
