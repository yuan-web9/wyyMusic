<template>
  <div class="detail-title">
    <div class="detail-img">
      <img class="auto-img" :src="img" />
    </div>
    <div class="detail-msg">
      <div class="detail-msg-title">
        <h1>{{title}}</h1>
      </div>
      
      <!-- 标题下插槽 -->
      <slot name="underTitle"></slot>

      <!-- 榜单更新日期,没传入数据时不渲染 -->
      <div
        class="detail-update"
        v-if="!!updateDate && !!frequency"
      >最近更新:{{updateDate}}({{frequency}})</div>

      <!-- 创建者信息,无id是不渲染 -->
      <div class="detail-creator" v-if="!!creatorId">
        <div class="detail-creator-img">
          <img :src="creatorImg" />
        </div>
        <div class="detail-creator-name">{{creatorName}}</div>
        <div class="detail-create-date">{{createDate}}创建</div>
      </div>

      <!-- 5个详情按钮 -->
      <div class="detail-btn-box">
        <el-button class="play-btn" size="small" plain icon="el-icon-video-play" @click="playAll">播放</el-button>
        <el-button size="small" plain icon="el-icon-folder-add">{{!!collectCount?'('+collectCount+')':'收藏'}}</el-button>
        <el-button size="small" plain icon="el-icon-share">{{!!shareCount?'('+shareCount+')':'分享'}}</el-button>
        <el-button size="small" plain icon="el-icon-download">下载</el-button>
        <el-button size="small" plain icon="el-icon-chat-dot-round">{{!!commentCount?'('+commentCount+')':'分享'}}</el-button>
      </div>

      <slot name="supplement"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTitle",
  props: {
    title: {
      // 标题
      type: String,
      default: "1",
    },
    // 歌单更新时间
    updateDate: {
      type: String,
      // default:'1',
    },
    // 歌单更新周期
    frequency: {
      type: String,
      default: "1",
    },
    // 收藏数
    collectCount: {
      type: Number,
      // default: 1,
    },
    // 分享数
    shareCount: {
      type: Number,
      // default: 1,
    },
    // 评论数
    commentCount: {
      type: Number,
      default: 0,
    },
    // 左侧图片
    img: {
      type: String,
    },

    // 创建者id(没人则不渲染所有创建者内容)
    creatorId: {
      type: Number | String,
    },
    // 创建者头像
    creatorImg: {
      type: String,
      default: "",
    },
    // 创建者昵称
    creatorName: {
      type: String,
      default: "",
    },
    // 创建日期
    createDate: {
      type: String,
      default: "",
    },
  },
  methods: {
    playAll() {
      this.$emit("playAll");
    },
  },
};
</script>

<style lang="less" scoped>
.detail-title {
  // background-color: skyblue;
  width: 100%;
  box-sizing: border-box;
  // padding: 40px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .detail-img {
    width: 180px;
    float: left;
  }
  .detail-msg {
    float: left;
    margin-left: 30px;
    width: calc(~'100% - 210px');
    // height: 30px;
    .detail-msg-title {
      height: 40px;
      line-height: 40px;
      &>h1{
        overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
    .detail-update {
      color: #ccc;
      font-size: 14px;
    }
    .detail-btn-box {
      height: 80px;
      line-height: 80px;
    }

    .detail-creator {
      // float: left;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .detail-creator-img {
        width: 30px;
        float: left;
        margin-right: 15px;
        & > img {
          display: block;
          width: 100%;
        }
      }
      .detail-creator-name {
        float: left;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        margin-right: 15px;
      }
      .detail-create-date {
        float: left;
        font-size: 14px;
        color: #999;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>