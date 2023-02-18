<template>
  <div class="home">
    <top-nav></top-nav>
    <swipe></swipe>
    <iconList></iconList>
    <songList></songList>
  </div>
</template>

<script>
// @ is an alias to /src
import topNav from '@/components/home/topNav.vue'
import swipe from '@/components/home/swipe.vue'
import iconList from '@/components/home/iconList'
import songList from '@/components/home/songList'
export default {
  name: 'Home',
  components: {
    topNav,
    swipe,
    iconList,
    songList
  }
}
</script>
