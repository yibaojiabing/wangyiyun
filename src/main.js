import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css' //将iconfont的图标引入到项目中
import './assets/icon/iconfont'
import vantPlugins from './plugins/vantPlugins' //以插件的方式将vant库的组件引入，避免在这里一个个引入导致main.js显得太冗余杂乱
import { Popup } from 'vant';
import { Swipe, SwipeItem } from 'vant';

const app = createApp(App)

app.use(store).use(router).mount('#app')
app.use(Popup)
app.use(Swipe)
app.use(SwipeItem)
vantPlugins(app)