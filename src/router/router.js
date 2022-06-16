import Vue from 'vue'
import VueRouter from 'vue-router'

import D3Js from '@/view/D3Js'
import D3Vue from '@/view/D3Vue'
import VisJs from '@/view/VisJs'
import VueVis from "@/view/VueVis";


Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/D3Js',
            name: 'D3Js',
            component: D3Js
        },
        {
            path: '/D3Vue',
            name: 'D3Vue',
            component: D3Vue
        },
        {
            path: '/VisJs',
            name: 'VisJs',
            component: VisJs
        },
        {
            path: '/VueVis',
            name: 'VueVis',
            component: VueVis
        }

    ]



})