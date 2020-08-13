import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.min.css'



// import 'vue-awesome/icons'

// import Icon from 'vue-awesome/components/Icon'
// Vue.component('icon', Icon)

// 导入elementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 注册element-ui框架的组件
Vue.use(ElementUI);

// 注册axios
Vue.use(VueAxios, axios);

// 配置请求基础路径
// axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1'
axios.defaults.baseURL = 'http://localhost:3000'

// 配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// axios.interceptors.request.use(config => {
//         //此处读取上文存储的token并设置请求头
//         config.headers.Authorization = localStorage.getItem('_Tk')
//             // 这里需要注意，必须return config才能生效
//         return config
//     })
// 发起请求之前的处理
axios.interceptors.request.use(config => {
    if (config.method == 'post') {
        let paramsString = '';
        // post请求参数序列化,转化一个字符串
        for (let key in config.data) {
            paramsString += key + '=' + config.data[key] + '&';
        }
        config.data = paramsString.slice(0, -1);
    }
    return config;
})

Vue.prototype.playCountFormat = (count) => {
    return Math.floor(count / 10000);
}

// Vue.prototype.player = new Audio();
// Vue.prototype.timer;
// Vue.prototype.timeSave = 0;

// Vue.prototype.player = {
//     musicId: '',
//     musicUrl: '',

//     player: new Audio(),

//     setMusic(id, url) {
//         player.id = id;
//         player.src = url
//         player.load();
//     },

//     getDuration() {
//         player.oncanplay = () => {
//             return player.duration;
//         }
//         player.load()
//             // return player.duration;
//     },
//     getCurrentTime() {
//         return player.currentTime;
//     },
//     getPause() {
//         return player.paused;
//     },

//     play() {
//         player.play();
//     },
//     pause() {
//         player.pause();
//     }



// }


// 音乐播放地址
Vue.prototype.musicUrl = {
    id: '',
    url: '',
    pic: '',
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')