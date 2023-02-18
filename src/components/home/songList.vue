<template>
    <div class="songList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">发现更多</div>
        </div>
        <van-swipe class="musicList" :loop="false" :width="95" :show-indicators='false'>
            <van-swipe-item class="song" v-for="(item,index) in state.songList" :key="index">
                <router-link :to="{path: '/songList', query: {id: item.id}}">
                <img :src="item.picUrl" alt="">
                <span class="imgIcon">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <span class="playCount">{{playCount(item.playCount)}}</span>
                </span>
                <span class="name">{{item.name}}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
    </div>    
</template>
<script>
import api from '@/fetch/api'
import {reactive, onMounted} from 'vue'
export default {
    setup(){
        const state = reactive({
            songList: []
        });
        onMounted(async () => {
            await api.getIndexRecommendSongList.then(res => {
                // console.log(res)
                state.songList = res.data.result
            })
        });
        function playCount(num){
            if(num>=100000000){
                return (num/100000000).toFixed(1)+'亿'
            }else if(num>=10000){
                return (num/10000).toFixed(1)+'万'
            }
        };
        return { state, playCount }
    }
}
</script>
<style lang="less" scoped>
.songList{
    width: 100%;
    height: 5rem;
    padding: .2rem;
    .musicTop{
        width: 100%;
        height: .6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
        .title{
            font-size: .4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            text-align: center;
            line-height: .6rem;
            padding: 0 .2rem;
            border-radius: .4rem;
        }
    }
    .musicList{
        width: 100%;
        height: 4rem;
        // margin-left: -.2rem;
        .song{
            // padding: 0 .2rem;

            img{
                width: 2rem;
                height: 2rem;
                border-radius: .2rem;
            }
            .imgIcon{
                position: absolute;
                z-index: 10;
                margin-top: .1rem;
                margin-left: -1.6rem;
                color: #fff;
                .icon{
                    width: .3rem;
                    height: .3rem;
                    line-height: .3rem;
                    vertical-align: middle;
                    fill: #fff;
                }
                .playCount{
                    margin-left: .1rem;
                    font-size: .24rem;
                }
            }
            .name{
                padding: 0 .1rem;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
            }
            
        }
    }
}
</style>