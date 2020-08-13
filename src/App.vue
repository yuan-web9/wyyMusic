<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
  color: #000;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.c{
  width: 1200px;
  margin: 0 auto;
}
.c2{
  width: 1000px;
  margin: 0 auto;
}
.clearfix::after{
  content:'';
  display: block;
  clear: both;
}
.auto-img{
  display: block;
  width: 100%;
}

</style>
