<template>
  <img :src="music.al.picUrl" class="bgimg" alt="">
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou" ></use>
      </svg>
      <div class="leftMarquee">
        <Vue3-marquee style="color: #fff">{{music.name}}</Vue3-marquee>
        <span v-for="(item,i) in music.ar" :key="i">{{item.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
    </div>
  </div>  
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_nee" :class="{img_nee_active:!pause}">
    <img src="@/assets/disc.png" alt="" class="img_dis">
    <img :src="music.al.picUrl" alt="" class="img_al" @click="isLyricShow=true" :class="{img_al_pause:pause, img_al_active:!pause}">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="item in lyric" :key=item :class="{active: (currentTime*1000>=item.time && currentTime*1000<item.pre)}">{{item.lrc}}</p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-aixin" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-xiazai" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-tuijian" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-xiaoxi" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-danlieliebiao" ></use>
      </svg>
    </div>
    <div class="footerMiddle">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footerBottom">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-24gl-repeat2" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-if="pause">
        <use xlink:href="#icon-bofang" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-danlieliebiao" ></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  data(){
    return {
      isLyricShow: false,
    }
  },
  computed: {
    ...mapState(['lyricList','currentTime','index','playlist','duration']),
    lyric: function(){
      console.log(this.lyricList)
      let arr
      if(this.lyricList.lyric){//判断有没有歌词
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {//将歌词字符串通过换行符分割成数组
          let min = item.slice(1,3)//分
          let sec = item.slice(4,6)//秒
          let mill = item.slice(7,10)//毫秒
          let lrc = item.slice(11,item.length)//歌词
          let time = parseInt(min)*60*1000 + parseInt(sec)*1000 +parseInt(mill)//将整首歌的时长转换为毫秒
          if(isNaN(Number(mill))){//毫秒有可能是两位数也有可能是三位数，前面截取是以三位数截取的，所以当毫秒是两位数时截取会出现]，]转换为数字类型时是NaN
            mill = item.slice(7,9)//如果毫秒是两位数时重新截取毫秒数
            lrc = item.slice(10,item.length)//重新截取歌词
            time = parseInt(min)*60*1000 + parseInt(sec)*1000 +parseInt(mill)
          }
          return {min,sec,mill,time,lrc}
        })
        arr.forEach((item,i) => {
          if(i === arr.length-1 || isNaN(arr[i+1].time)){
            item.pre = 10000
          }else{
            item.pre = arr[i+1].time
          }
        });
      }
      return arr
    }
  },
  props: ['music','play','pause','addDuration'],
  methods: {
    backHome(){
      this.updateDetailShow()
      this.isLyricShow = false
    },
    //上一首、下一首歌
    goPlay(num){
      let index = this.index + num
      if(index<0){
        index = this.playlist.length - 1
      }else if(index == this.playlist.length){
        index = 0
      }
      this.updatePlaylistIndex(index)
    },
    ...mapMutations(['updateDetailShow','updatePlaylistIndex'])
  },
  watch: {
    currentTime: function(newValue){//监听播放的时间，获取对应的歌词，当歌词的offsetTop超出300时，让滚动条自动向上滚动超出的距离，使得常亮歌词在中间显示
      let p = document.querySelector('p.active')
      if(p){
        if(p.offsetTop>300){
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
        }
      }
      if(newValue === this.duration){
        
        if(this.index === this.playlist.length-1){
          this.updatePlaylistIndex(0)
          this.play()
        }else{
          this.updatePlaylistIndex(this.index+1)
        }
      }
    }
  },
  components:{
      Vue3Marquee
  }
}
</script>
<style lang="less" scoped>
.bgimg{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop{
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft{
    display: flex;
    align-items: center;
    .leftMarquee{
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span{
        color: #999;
        vertical-align: middle;
      }
      .icon{
        vertical-align: middle;
        fill: #999;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}
.detailContent{
  height: 9rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_nee{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_nee_active{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_dis{
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_al{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_al 10s linear infinite;
  }
  .img_al_active{
    animation-play-state: running;
  }
  .img_al_pause{
    animation-play-state: paused;
  }
  @keyframes rotate_al {
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric{
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  overflow: scroll;
  p{
    color: #cecccc;
    margin-bottom: .3rem;
  }
  .active{
    color: #fff;
    font-size: .4rem;
  }
}
.detailFooter{
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon{
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon{
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .footerMiddle{
    .range{
      width: 100%;
      height: 0.06rem;
    }
  }
  .footerBottom{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon{
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon{
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>