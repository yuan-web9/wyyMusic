<template>
    <div class="comment-list" v-if="!!commentData">
        <comment-card :commentData="item" v-for="(item,index) in commentData" :key="index"></comment-card>
    </div>
</template>

<script>
import CommentCard from './CommentCard'
    export default {
        name:'CommentList',
        props:{
            commentData:{
                type:Array,
            }
        },
        components:{
            CommentCard,
        }
    }
</script>

<style lang="less" scoped>

</style>