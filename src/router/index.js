import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: '人脸采集',
        component: () => import('@/views/index/index')
    },
    {
        path: '/form',
        name: '人脸采集',
        component: () => import('@/views/form/form')
    },
    {
        path: '/success',
        name: '采集成功',
        component: () => import('@/views/success/success')
    },
    {
        path: '/error',
        name: '采集失败',
        component: () => import('@/views/error/error')
    },

]

const router = new VueRouter({
    routes
})

export default router
