<template>
  <div class="comment-card" v-if="!!commentData">
    <div class="container">
      <div class="avatar-box">
        <img
          :src="commentData.user.avatarUrl"
        />
      </div>
      <div class="comment-msg">
        <div class="comment-content">
          <span class="comment-user">{{commentData.user.nickname}}：</span>
          <span
            class="comment-word"
          >{{commentData.content}}</span>
        </div>
        <div class="comment-bottom">
          <div class="comment-time">{{commentData.time}}</div>
          <div class="comment-operation">
            <i class="thumbs fa fa-thumbs-o-up"></i>
            <span class="thumbs-count">({{commentData.likedCount}})</span>
            <span class="line">|</span>
            <span class="reply">回复</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    commentData: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.comment-card {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  // .container{

  // }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .avatar-box {
    width: 50px;
    float: left;
    height: 100%;
    & > img {
      width: 100%;
      display: block;
    }
  }
  .comment-msg {
    float: left;
    margin-left: 20px;
    font-size: 14px;
    width: calc(~"100% - 70px");
    .comment-content {
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .comment-user {
        color: #2c85ca;
        cursor: pointer;
      }
    }

    .comment-bottom {
      margin-top: 10px;
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .comment-time {
        float: left;
      }
      .comment-operation {
        float: right;
        .thumbs {
          color: #2c85ca;
          margin-right: 10px;
          cursor: pointer;
        }
        .line {
          padding: 0 10px;
        }
        .reply{
          cursor: pointer;
          &:hover{
              text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>