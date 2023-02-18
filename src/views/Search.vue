<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou" ></use>
    </svg>
    <input type="text" placeholder="周杰伦" v-model.trim="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{item}}
    </span>
    <svg class="icon" aria-hidden="true" @click="deleteHistory">
      <use xlink:href="#icon-shanchu" ></use>
    </svg>
  </div>
  <div>
    <div class="itemList">
      <div class="item" v-for="(item,i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftS">{{i+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="(item1,index) in item.ar" :key="index">{{item1.name}}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
            <use xlink:href="#icon-shipin" ></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true" >
            <use xlink:href="#icon-caidan" ></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {getSearch} from '@/fetch/fetch.js'
export default {
  data(){
    return{
      keyWordList: [],
      searchKey: '',
      searchList: []
    }
  },
  mounted(){
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWordList')) ? JSON.parse(localStorage.getItem('keyWordList')) : []
  },
  methods: {
    ...mapMutations(['updatePlaylistPush','updatePlaylistIndex']),
    enterKey: async function(){
      if(Boolean(this.searchKey)){
        this.keyWordList.unshift(this.searchKey)
        this.keyWordList = [...new Set(this.keyWordList)]//去重
        if(this.keyWordList.length>10){//搜索记录只能有10个，超过就删除之前的
          this.keyWordList.splice(this.keyWordList.length-1,1)
        }
        let res = await getSearch(this.searchKey)
        console.log(res)
        this.searchList = res.data.result.songs
        localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
        this.searchKey = ''
      }
    },
    deleteHistory: function(){
      localStorage.removeItem('keyWordList')
    },
    searchHistory: async function(item){
      let res = await getSearch(item)
      this.searchList = res.data.result.songs
    },
    updateIndex: function(item){
      this.updatePlaylistPush(item)
      this.updatePlaylistIndex(this.$store.state.playlist.length-1)
    }
  }
}
</script>
<style lang="less" scoped>
.searchTop{
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  align-items: center;
  input{
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: .1rem;
  }
}
.searchHistory{
  width: 100%;
  padding: .2rem;
  position: relative;
  .searchSpan{
    font-weight: 700;
  }
  .spanKey{
    padding: .1rem .2rem;
    background-color: #c6c3c3;
    border-radius: .4rem;
    margin: .1rem .15rem;
    display: inline-block;
  }
  .icon{
    width: .3rem;
    height: .3rem;
    position: absolute;
    right: .2rem;

  }
}
.itemList{
  width: 100%;
  padding: .2rem;
  .item{
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft{
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan{
        display: inline-block;
        width: .2rem;
        text-align: center;
      }
      div{
        margin-left: .3rem;
        p{
          width: 4.54rem;
          height: .4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span{
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }
      }
    }
    .itemRight{
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .icon{
        fill: #999;
      }
      .bofang{
        position: absolute;
        left: 0;
      }
      .liebiao{
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>