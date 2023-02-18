import service from '@/plugins/fetch'
//获取歌的信息
export function getSongListItem(id){
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}
//获取歌单歌曲
export function getSongsList(id){
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${id}&limit=20`
  })
}
//获取歌词
export function getSongLyric(id){
  return service({
    method: 'GET',
    url: `/lyric?id=${id}`
  })
}
//搜索功能
export function getSearch(value){
  return service({
    method: 'GET',
    url: `/search?keywords=${value}`
  })
}
//电话号码登录
export function phoneLogin(data){
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}
//获取用户详情
export function getLoginUser(data){
  return service({
    method: 'GET',
    url: `user/detail?uid=${data}`
  })
}