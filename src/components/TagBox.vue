<template>
    <div class="tag-box" v-if="!!tagData">
        标签:
        <el-tag class="my-tag" type="info" @click="goSongCategory(item)" v-for="(item,index) in tagData" :key="index">{{item}}</el-tag>
    </div>
</template>

<script>
    export default {
        name:'TagBox',
        props:{
            tagData:{
                type:Array,
            }
        },
        methods:{
            goSongCategory(item){
                this.$emit('goSongCategory',item);
            }
        }
    }
</script>

<style lang="less" scoped>
.tag-box{
    font-size: 14px;
    .my-tag{
        margin-left: 10px;
        border-radius: 30px;
        // height: 30px;
        // line-height: 30px;
        cursor: pointer;
        color:#555;
        background-image: linear-gradient(to top, #f0f0f0,#fbfbfb);
    }
}
</style>