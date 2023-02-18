<template>
  <div class="playSongBar">
    <div class="footerLeft" @click="updateDetailShow"> 
      <img :src="playlist[index].al.picUrl" alt="">
      <div>
        <p>{{playlist[index].name}}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="pause">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting" ></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div> 
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[index].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <music-detail :music='playlist[index]' :play="play" :pause='pause' :addDuration='addDuration'></music-detail>
    </van-popup>
  </div>
</template>
<script>
import {mapState, mapMutations } from 'vuex'
import {onMounted } from 'vue'
import musicDetail from '@/components/playlists/musicDetail.vue'
export default {
  data(){
    return {
      interVal: 0,
    }
  },
  computed: {
    ...mapState(['playlist', 'index', 'pause', 'detailShow'])
  },
  mounted(){
    this.$store.dispatch('getLyric', this.playlist[this.index].id)
    this.updateTime()
  },
  updated(){
    this.$store.dispatch('getLyric', this.playlist[this.index].id)
    this.addDuration()
  },
  methods: {
    play: function(){
      if(this.$refs.audio.paused){
        this.$refs.audio.play()
        this.updatePause(false)
        this.updateTime()//播放就调用函数进行传值
      }else{
        this.$refs.audio.pause()
        this.updatePause(true)
        clearInterval(this.interVal)//暂停清除定时器
      }
      
    },
    addDuration: function(){
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime: function(){
      this.interVal = setInterval(()=>{
        this.updateCurrentTime(this.$refs.audio.currentTime)
      },1000)
    },
    ...mapMutations(['updatePause', 'updateDetailShow','updateCurrentTime','updateDuration'])
  },
  watch: {
    index:function(){//监听播放器的index，改变就播放新音乐并更换icon
      this.$refs.audio.autoplay = true
      if(this.$refs.audio.paused){
        this.updatePause(false)
      }
    },
    playlist: function(){
      if(this.$refs.audio.paused){
        this.$refs.audio.autoplay = true
        this.updatePause(false)
      }
    }
  },
  components: {
    musicDetail
  }
}
</script>
<style lang="less" scoped>
.playSongBar{
  width: 100%;
  height: 1.4rem;
  border-top: 1px solid #999;
  position: fixed;
  background: #fff;
  bottom: 0;
  display: flex;
  padding: .2rem;
  justify-content: space-between;
  .footerLeft{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p{
      text-align: left;
    }
  }
  .footerRight{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon{
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>