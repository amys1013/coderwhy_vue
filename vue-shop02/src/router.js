import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/index/Index.vue'
import Login from './views/login/Login.vue'
import Home from './views/login/Home.vue'
import Users from './views/users/index.vue'
import Roles from './views/roles/index.vue'



Vue.use(VueRouter)

const routes = [
  // login默认为项目的初试页
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
    ]
  }


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
