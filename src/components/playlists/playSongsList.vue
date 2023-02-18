<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部<span>(共{{songsList.length}}首)</span></span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{subscribedCount}})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item,index) in songsList" :key="index">
        <div class="itemLeft" @click="playMusic(index)">
          <span class="leftSpan">{{index+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="i in item.ar" :key="i.id">{{i.name}}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caidan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  setup(props){
    console.log(props)
  },
  props: ['songsList','subscribedCount'],
  methods: {
    playMusic: function(i){
      this.updatePlaylist(this.songsList)
      this.updatePlaylistIndex(i)
    },
    ...mapMutations(['updatePlaylist','updatePlaylistIndex'])
  }
}
</script>
<style lang="less" scoped>
.itemMusicList{
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .itemListTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft{
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        font-weight: 600;
      }
    }
    .listRight{
      height: 70%;
      padding: 0 .1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: red;
      border-radius: .4rem;
      color: #fff;
      font-size: .32rem;
      font-weight: 500;
    }
  }
  .item{
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft{
      width: 75%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan{
        width: 15%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .32rem;
        font-weight: 500;
      }
      div{
        text-align: left;
        p{
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span{
          font-size: .28rem;
        }
      }
    }
    .itemRight{
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .icon{
        margin: 0 .1rem;
      }
    }
  }
}
</style>