<template>
  <div class="my-search-from">
    <input v-model="inputWord" type="text" class="input-box" @keypress="enterKeyDown" @input="inputKey" @focus="changeFocu(true)" @blur="changeFocu(false)"/>
    <div class="search-btn" @click="submitKey">
      <i class="fa fa-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySearchForm",
  data() {
    return {
      inputWord: "",
    };
  },
  methods: {
    // 输入关键字
    inputKey() {
        this.$emit('inputKey',this.inputWord);
    },

    // 提交关键字
    submitKey(){
      this.$emit('submitKey',this.inputWord);
    },

    // 回车提交
    enterKeyDown(e){
      console.log(e.keyCode);
      if(e.keyCode==13){
        this.submitKey();
      }
      // this.submitKey();
    },

    // 失焦获焦事件
    changeFocu(boo){
      if(this.inputWord==''){
        return;
      }
      this.$emit('changeFocu',boo);
    }
  },
};
</script>

<style lang="less" scoped>
.my-search-from {
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .input-box {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: none;
    outline: none;
    width: 460px;
    box-sizing: border-box;
    color: #999;
  }
  .search-btn {
    float: right;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
    background-image: linear-gradient(to top, #ededed, #fff);
    text-align: center;
  }
}
</style>