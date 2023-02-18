import { createStore } from 'vuex'
import {getSongLyric, phoneLogin} from '@/fetch/fetch.js'
export default createStore({
  state: {
    playlist: [{
      al: {
        id: 126631526,
        name: "若把你",
        pic: 109951165928680370,
        picUrl: "https://p2.music.126.net/PyTjq22uOegIOGxoJ_T_iQ==/109951165928680369.jpg",
        pic_str: "109951165928680369"
      },
      name: '若把你',
      id: 1840700016,
      ar: [{
        name: "留小雨"
      }]
    }],
    pause: true,//播放暂停
    index: 0,//默认下标为0
    detailShow: false, //歌曲详情页的显示
    lyricList:{}, //歌词
    currentTime: 0, //歌曲播放到的当前时间
    duration: 0, //歌曲总时长
    isLogin: false,// 登录判断
    isMusicBar: true,//显示底下的音乐bar
    token: '',
    user: {},//用户信息
  },
  mutations: {
    updatePause: function(state, value){
      state.pause = value
    },
    updatePlaylist: function(state, value){
      state.playlist = value
    },
    updatePlaylistPush: function(state, value){
      state.playlist.push(value)
    },
    updatePlaylistIndex: function(state, value){
      state.index = value
    },
    updateDetailShow: function(state){
      state.detailShow = !state.detailShow
    },
    updateLyric: function(state, value){
      state.lyricList = value
    },
    updateCurrentTime: function(state, value){
      state.currentTime = value
    },
    updateDuration: function(state, value){
      state.duration = value
    },
    updateIsLogin: function(state, value){
      state.isLogin = true
    },
    updateToken: function(state, value){
      state.token = value
      localStorage.setItem('token',state.token)
    },
    updateUser: function(state, value){
      state.user = value
    }
  },
  actions: {
    getLyric: async function(context, value){
      let res = await getSongLyric(value)
      console.log(res)
      context.commit('updateLyric', res.data.lrc)
    },
    getLogin: async function(context, value){
      let res = await phoneLogin(value)
      return res
    }
  },
  modules: {
  }
})
