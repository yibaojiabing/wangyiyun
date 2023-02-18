<template>
  <router-view/>
  <play-song-bar v-show="$store.state.isMusicBar"></play-song-bar>
</template>
<script>
import playSongBar from '@/components/playlists/playSongBar.vue'
export default {
  components: {
    playSongBar,
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #111;
  padding: 0 0 1.4rem 0;//底下播放块
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
// 移动端隐藏滚动条
html,body{ width: 100%; height: 100%; overflow: scroll;}
html::-webkit-scrollbar, body::-webkit-scrollbar{width:0px;height:0px;}
</style>
