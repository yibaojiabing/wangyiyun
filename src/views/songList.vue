<template>
  <div>
    <play-lists-top :playlist="state.playlist"></play-lists-top>
    <play-songs-list :songsList="state.songsList" :subscribedCount="state.playlist.subscribedCount"></play-songs-list>
  </div>
</template>
<script>
import {onMounted, reactive} from 'vue'
import {useRoute} from 'vue-router'
import {getSongListItem, getSongsList} from '@/fetch/fetch'
import playListsTop from '@/components/playlists/playListsTop.vue'
import playSongsList from '@/components/playlists/playSongsList.vue'
export default {
  setup(){
    const state = reactive({
      playlist: {},
      songsList: []
    })
    onMounted(async() => { 
      let id = useRoute().query.id
      // 获取歌单信息
      let data = await getSongListItem(id)
      // 获取歌单歌曲信息
      let res = await getSongsList(id)
      state.playlist = data.data.playlist
      state.songsList = res.data.songs
      // 防止页面刷新时数据丢失，将数据保存到sessionStorage里
      sessionStorage.setItem('songListDetails',JSON.stringify(state))
    })
    return { state}
  },
  components: {
    playListsTop,
    playSongsList,
  }
}
</script>