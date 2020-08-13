<template>
    <div class="my-rank-list">
        <div class="my-list-title">{{title}}</div>
        <div class="my-list-content">
            <my-rank-cart @goListDetail="goRankDetail" v-for="(item,index) in contentData" :key="index" :title="item.name" :update="item.updateFrequency" :img="item.coverImgUrl" :rankId='item.id'></my-rank-cart>
        </div>
    </div>
</template>

<script>
import MyRankCart from '../components/MyRankCard';
    export default {
        name:'MyRankList',
        props:{
            title:{
                type:String,
            },
            contentData:{
                type:Array,
                default:[],
            }
        },
        components:{
            MyRankCart,
        },
        data(){
            return{

            }
        },
        methods:{
            goRankDetail(e){
                this.$emit('goRankDetail',e);
            }
        },

    }
</script>

<style lang="less" scoped>
    .my-rank-list{
        .my-list-title{
            height: 24px;
            line-height: 24px;
            margin-top: 20px;
            padding-left: 16px;
            box-sizing: border-box;
            font-size: 18px;
            font-weight: bold;
        }
        
    }
</style>