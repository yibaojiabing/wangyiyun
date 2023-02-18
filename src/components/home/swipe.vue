<template>
    <div id="vant">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import axios from 'axios'
import api from '@/fetch/api'
import {reactive, onMounted} from 'vue'
export default {
  setup() {
    const state = reactive({
      images: []
    });
    onMounted(async ()=> {
      await api.getIndexBanner.then(res => {
        // console.log(res)
        state.images = res.data.banners
      })
    })
    return { state };
  },
};
</script>
<style lang="less" >
#vant{
  .van-swipe{
    width: 100%;
    height: 3rem;
    .van-swipe-item{
      padding: 0 0.2rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
  }
  .van-swipe__indicator--active{
    background-color: #f40;
  }
}

</style>