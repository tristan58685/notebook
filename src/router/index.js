// 1.引入
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入组件
import MyHome from '../pages/MyHome.vue';
import MyNote from '../pages/MyNote.vue';
import MyMusic from '../pages/MyMusic.vue';
import MyTodolist from '../pages/MyTodolist.vue';
import MyCountDown from '../pages/MyCountDown.vue';
import MusicPlay from '../pages/MusicPlay.vue'

// 2.调用路由对象
Vue.use(VueRouter)
// 3.配置
export default new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/',
            component: MyHome,
            // redirect: '/MyHome',
        },
        {
            name: 'note',
            path: '/MyNote',
            component: MyNote
        },
        {
            name: 'music',
            path: '/MyMusic',
            component: MyMusic,
        },
        {
            name: 'todolist',
            path: '/MyTodolist',
            component: MyTodolist
        },
        {
            name: 'countdown',
            path: '/MyCountDown',
            component: MyCountDown
        },

        {
            name: 'MusicPlay',
            path: '/MusicPlay',
            component: MusicPlay
        },
    ]
})
