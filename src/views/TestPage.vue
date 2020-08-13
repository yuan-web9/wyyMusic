<template>
  <div>
    <h1>这是一个测试页面</h1>
    <div class="login-box">
      <my-login-form :captchaState="captchaState" @sendCaptcha="sendCaptcha" @submitLogin="existencePhone"></my-login-form>
    </div>
  </div>
</template>

<script>
import myMusicPlayer from "../components/MusicPlay";
import DetailTitle from "../components/DetailTitle";
import MyLoginForm from "../components/MyLoginForm";
import GetCookie from "../assets/js/GetCookie.js";
import MusicListUpdate from "../assets/js/MusicListUpdate.js";
let n = 0;
export default {
  name: "TestPage",
  data() {
    return {
      captchaState: {
        title: "发送验证码",
        disabled: false,
        captchaRes: true,
      },
    };
  },
  components: {
    myMusicPlayer,
    DetailTitle,
    MyLoginForm,
  },
  watch: {
    // testArr: function () {
    //   console.log(this.testArr);
    // },
  },
  methods: {
    a(){
      // let time=new Date();
      // let s=time.getTime()+3600*1000*24*3;
      // let time2=new Date(s);
      // let time=(new Date(new Date().getTime()+1000*3600*60*24*3)).toString().slice('+')[0];
      let time=new Date(new Date().getTime()+1000*3600*24*3).toString().split('+')[0];
      // console.log(time.toString().split('+')[0]);
      console.log(time);
    },

    b(){
      // let c='MUSIC_U=ab1559263034c03b84fc0b95977026e0bf8ef125202750c73fe5bd682373578533a649814e309366;%20Expires=Fri,%2014-Aug-2020%2008:20:59%20GMT;%20Path=/;__remember_me=true;%20Expires=Fri,%2014-Aug-2020%2008:20:59%20GMT;%20Path=/;__csrf=1d77964ea8b2caec8d791a7404a285f2;%20Expires=Fri,%2014-Aug-2020%2008:21:09%20GMT;%20Path=/';
      // let c='MUSIC_U=ab1559263034c03b84fc0b95977026e0bf8ef125202750c767f23ebeb2051edf33a649814e309366';
      let c=GetCookie.getCookie('MUSIC_U')
      console.log('c==>',c);
      this.axios({
        method:'GET',
        url: "/playlist/detail",
        params: {
          id: '5116018261',
          cookie:c,
        },
      }).then(result=>{
        console.log('登录后结果==>',result);
      }).catch(err=>{
        console.log('err==>',err);
      })
    },


    // 发送验证码
    sendCaptcha(phone) {
      // 获取时间戳
      let timestamp = new Date().getTime();
      console.log(phone)
      this.axios({
        method: "POST",
        url: "/captcha/sent",
        data: {
          phone: phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("验证结果结果==>", result);
          if (result.data.code == 200) {
            // this.captchaRes=
            this.captchaState.disabled = true;
            let time = 60;
            let timer = setInterval(() => {
              this.captchaState.title = time + "s";
              time--;
              if (time < 0) {
                this.captchaState.disabled = false;
                this.captchaState.title = "重新发送验证码";
                clearInterval(timer);
                timer = null;
              }
            }, 1000);
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 验证验证码
    checkCaptcha(e) {
      // 获取时间戳
      let timestamp = new Date().getTime();
      console.log(e)

      this.axios({
        method: "POST",
        url: "/captcha/verify",
        data: {
          captcha: e.captcha,
          phone: e.phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("验证结果结果==>", result);
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },

    // 验证手机号是否已注册
    existencePhone(e) {
      // let phone=e.phone;
      let timestamp = new Date().getTime();
      this.axios({
        method: "POSt",
        url: "/cellphone/existence/check",
        data: {
          phone: e.phone,
          timestamp,
        },
      })
        .then((result) => {
          console.log("手机是否已注册==>", result);
          if(result.data.code==200){
            this.checkCaptcha(e)
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
  },
  created() {
    this.b();
    // this.setMusicList();
  },
  
};
</script>

<style lang="less" scoped>
.login-box {
  width: 500px;
  margin: 50px auto;
}
</style>