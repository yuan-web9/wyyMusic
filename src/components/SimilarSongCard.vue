<template>
    <div class="similar-song">
        <div class="left-msg">
            <div class="msg-title"><span @click="goSong(data.id)">{{data.name}}</span></div>
            <div class="msg-songer"><span>{{data.songer}}</span></div>
        </div>
        <div class="right-btn">
            <i class="fa fa-play"></i>
            <i class="fa fa-plus"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name:'SimilarSongCard',
        props:{
            // title:{
            //     type:String,
            // },
            // songer:{
            //     type:String,
            // },
            data:{
                type:Object,
            }
        },
        methods:{
            goSong(id){
                // consolid.log(e);
                this.$emit('goSong',id)
            },
            goSonger(){

            },
            playSong(){

            },
            addSong(){

            }
        }
    }
</script>

<style lang="less" scoped>
.similar-song{
    height: 50px;
    width: 100%;
    // border: 1px solid #000;
    padding:5px 0;
    &::after{
        content:'';
        display: block;
        clear: both;
    }
    .left-msg{
        float: left;
        width: 75%;
        font-size: 14px;
        &>div{
            height: 25px;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &>div>span{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
        .msg-songer{
            color:#a3a3a3;
        }
    }
    .right-btn{
        float: left;
        width: 25%;
        height: 50px;
        line-height: 50px;
        &>i{
            color: #a3a3a3;
            cursor: pointer;
            margin-right: 30%;
        }
    }
}
</style>