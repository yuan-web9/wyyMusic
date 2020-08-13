<template>
    <div class="RelevantCard">
        <div class="pic-box" v-if="!!img">
            <img :src="img">
        </div>
        <div class="msg-box">
            <div class="msg-title">{{title}}</div>
            <slot name="note"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'RelevantCard',
        props:{
            img:{
                type:String,
            },
            title:{
                type:String,
            },
            // note:{
            //     type:String,
            // }
        }
    }
</script>

<style lang="less" scoped>
.pic-box{
    float:left;
    &>img{
        width: 100%;
        display:block
    }
}
.msg-box{
    float:left;
}
</style>