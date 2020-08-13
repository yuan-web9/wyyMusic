<template>
  <div class="category-btn">
    <el-popover placement="bottom" trigger="click">
      <div class="category-box">
        <div class="top-all-btn">
          <el-button>选择全部</el-button>
        </div>
        <div class="category-row" v-for="(item,index) in categoryData" :key="index">
          <div class="row-title">
            <div class="icon-box">
              <img class="icon-img" :src="item.img" />
            </div>
            {{item.title}}
          </div>
          <div class="row-content">
            <span
              class="choice-tag "
              v-for="(citem,cindex) in item.data"
              :key="cindex"
              @click="outCategory(citem)"
            ><span class="word" :class="citem.isActive?'active':''">{{citem.name}}</span></span>
          </div>
        </div>
      </div>
      <el-button class="open-btn" slot="reference">
        选择分类
        <i class="el-icon-arrow-down el-icon--down"></i>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "CategorySelector",
  props: {
    categoryData: {
      type: Object,
      default: {},
    },
  },

  methods:{
      outCategory(data){
          console.log(data);
          if(data.isActive){
              return;
          }
          this.$emit('outCategory',{data:data.name});
      }
  }
};
</script>

<style lang="less" scoped>
.open-btn {
  margin-left: 20px;
}
.category-box {
  &::after {
    content: "";
    display: block;
    clear: both;
  }

  .top-all-btn {
    padding-left: 20px;
    //   height: 50px;
    //   line-height: 50px;
    padding-bottom: 10px;
    // margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .category-row {
    // padding-top: 20px;
    &::after {
      content: "";
      display: block;
      clear: both;
      //   padding:10px 0;
    }
    .row-title {
      float: left;
      height: 25px;
      line-height: 25px;
      width: 80px;
      text-align: center;
      .icon-box {
        width: 25px;
        float: left;
      }
      .icon-box .icon-img {
        width: 100%;
        display: block;
      }
    }
    .row-content {
      width: 600px;
      float: left;
      //   margin-top: 5px;
      padding: 4px 0;
      padding-bottom: 15px;
      border-left: 1px solid #ccc;
      //   line-height: 30px;
      //   line-height: 28px;
      // margin: 10px 0;
      & >.choice-tag {
        float: left;
        //   line-height: auto;
        margin-bottom: 10px;
        border-right: 1px solid #ccc;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        &>.word{
            padding:2px 5px;
            border-radius: 5px;

        }
        .active{
          color:#fff;
          background-color: #666;
      }
      }
      
    }
  }
}
</style>