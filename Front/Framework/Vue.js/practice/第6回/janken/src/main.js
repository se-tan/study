import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Game from './components/Game.vue'
import Score from ' ./components/Score.vue'

createApp(App).use(router).mount('#app')

const vue_router = new router({
    routes: [
        {
            path: '/game',
            component: Game,
        },
        {
            path: '/score',
            component: Score,
        },
    ]
});

new Vue({
    el: '#app',
    vue_router,
    render: h => h(App)
});