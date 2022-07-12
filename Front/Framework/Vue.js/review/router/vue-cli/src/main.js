import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // index.js は省略してもOK

// createApp でVueインスタンスを作成し
// use メソッドでimportした router を指定後に
// mount メソッドで id が app を持つ div 要素にマウント
createApp(App).use(router).mount('#app')
