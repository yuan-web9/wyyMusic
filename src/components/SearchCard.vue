<template>
  <div class="card-box">
    <div class="search-card" v-if="!!data&&type=='album'">
      <div class="pic-box">
        <img :src="data.album.picUrl" @click="goAlbum(data.album.id)" />
        <span class="play-icon fa fa-play-circle-o"></span>
      </div>
      <div class="msg">
        <div class="msg-name" @click="goAlbum(data.album.id)" v-html="$options.filters.heightLight(data.album.name,keyWord)"></div>
        <div class="msg-songer">
          <span v-for="(citem,cindex) in data.songer" :key="cindex" v-html="$options.filters.heightLight(citem.name,keyWord)"></span>
        </div>
      </div>
    </div>

    <div class="search-card" v-if="!!data&&type=='songer'">
      <div class="pic-box">
        <img :src="data.picUrl" @click="goSonger(data.id)" />
        <!-- <span class="play-icon fa fa-play-circle-o"></span> -->
      </div>
      <div class="msg">
        <div class="songer-msg-name">
          <span @click="goSonger(data.id)" v-html="$options.filters.heightLight(data.name,keyWord)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchCard",
  props: {
    type: {
      type: String,
      default: "album",
    },
    data: {
      type: Object,
      // default:
    },
  },
  computed: {
    keyWord() {
      return this.$store.state.keyWord;
    },
  },
  filters: {
    heightLight: function (value, key) {
      if (!value && !!key) return value;
      let re = new RegExp(key, "gi");
      // let key=key;
      let res = "";
      let data = "";
      console.log(key);
      if (re.test(key)) {
        res = `<span style="color:#0c73c2">${key}</span>`;
        data = value.replace(re, res);
        console.log(data);
        return data;
      } else {
        return value;
      }
    },
  },
  methods: {
    goAlbum(id) {
      this.$emit("goAlbum", id);
    },
    goSonger(id) {
      this.$emi("goSonger", id);
    },
  },
};
</script>

<style lang="less" scoped>
.search-card {
  width: 130px;
  height: 185px;
  .pic-box {
    width: 130px;
    height: 130px;
    line-height: 130px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px solid #000;
    position: relative;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 100%;
      // height: 100%;
      // line-height: 100%;

      display: block;
      // margin: auto 0;
    }
    .play-icon {
      background: rgba(0, 0, 0, 0.7);
      margin: 0;
      padding: 0;
      color: #ccc;
      font-size: 24px;
      font-weight: 100px;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      text-align: center;
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: none;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    &:hover > .play-icon {
      display: block;
    }
  }
  .msg {
    .msg-name {
      margin: 6px 0;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        text-decoration: underline;
      }
    }
    .msg-songer {
      color: #999;
    }
    .msg-songer > span {
      cursor: pointer;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .msg-songer > span:hover {
      text-decoration: underline;
    }
  }
}
</style>