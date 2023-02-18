// import service from '@/plugins/request'
// export const getBanner = (params) => service.get('/banner?type=2',params) //简写形式
// 详写形式
/*
export const getBanner = (params) => service({
    url: '',
    method: 'post',
    data: params          post请求一般用data属性传参
    params: params         get请求一般用params属性传参
})
*/

import service from '@/plugins/fetch'
function getData(url,method,params){
    return service({
        url: url,
        method: method,
        params: params
    })
}
const api = {
  //首页轮播图数据
  getIndexBanner: getData('banner?type=2','get',),
  //首页推荐好歌单
  getIndexRecommendSongList: getData('personalized?limit=10','get'),
}
export default api