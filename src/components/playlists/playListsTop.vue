<template>
  <div>
    <div class="top">
      <img class="bgImg" :src="playlist.coverImgUrl" alt="">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span class="name">歌单</span>
      </div>
      <div class="topRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>
    </div>
    <div class="musicIntroduction">
      <img :src="playlist.coverImgUrl" alt="" class="pic">
      <div class="rightContent">
        <span class="title">{{playlist.name}}</span>
        <div class="avatar">
          <img :src="playlist.creator.avatarUrl" class="creatorPic" alt="">
          <span>{{playlist.creator.nickname}}</span>
        </div>
        <span class="describe">{{playlist.description}}</span>
      </div>
    </div>
    <div class="musicFunc">
      <div class="funcItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <div>{{playlist.commentCount}}</div>
      </div>
      <div class="funcItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <div>{{playlist.shareCount}}</div>
      </div>
      <div class="funcItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <div>下载</div>
      </div>
      <div class="funcItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <div>多选</div>
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted, reactive} from 'vue'

export default {
  setup(props){

    console.log(props)
    const state = reactive({
      data: {}
    })
 //通过props传值，判断如果数据拿不到，就获取sessiongStorage的
    if((props.playlist.creator="")){
      props.playlist.creator = JSON.parse(sessionStorage.getItem('songListDetails').playlist).creator
    }
    onMounted(()=>{
     
      
    })
  },
  props: ['playlist']
}
</script>
<style lang="less" scoped>
.top{
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .topLeft,.topRight{
    margin: 0 .3rem;
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .icon{
      fill: #fff;
    }
    .name{
      font-size: .4rem;
      color: #fff;
    }
  }
  .bgImg{
    width: 100%;
    height: 9rem;
    position: fixed;
    z-index: -1;
    filter: blur(25px);
  }
}
.musicIntroduction{
    width: 100%;
    height: 3rem;
    display: flex;
    padding: .2rem;
    justify-content: space-between;
    .pic{
      width: 40%;
      height: 100%;
      border-radius: .2rem;
    }
    .rightContent{
      flex: 1;
      margin-left: .2rem;
      .title{
        font-size: .3rem;
        font-weight: 600;
        text-align: left;
        color: #fff;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        
      }
      .describe{
        text-align: left;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
      .avatar{
        padding: .2rem 0;
        text-align: left;
        .creatorPic{
          width: .6rem;
          height: .6rem;
          border-radius: 50%;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
          font-size: .3rem;
          margin-left: .2rem;
        }
      }
      
    }
  }
  .musicFunc{
    margin-top: .2rem;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1rem;
    .funcItem{
      width: 25%;
      height: 100%;
      text-align: center;
      color: #fff;
    }
  }
</style>