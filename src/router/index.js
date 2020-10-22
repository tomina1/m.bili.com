import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepalive:true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('@/views/register.vue')
  },{
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/Login.vue'),
    // children:[{
    //   path: '/userInfo',
    //   name: 'userInfo',
    //   component: ()=> import('@/views/userInfo.vue'),
    // }]
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: ()=> import('@/views/userInfo.vue'),
    meta:{
      istoken:true
    }
  },{
    path: '/edit',
    name: 'edit',
    component: ()=> import('@/views/Edit.vue'),
    meta:{
      istoken:true
    }
  },{
    path: '/article/:id',
    name: 'article',
    component: ()=> import('@/views/Article.vue')
  },{
    path: '/editcategory',
    name: 'editcategory',
    component: ()=> import('@/views/Editcategory.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to)
  if (!localStorage.getItem('token') && !localStorage.getItem('id')&&to.meta.istoken==true) {
    router.push('/login')
  }
  next()
})

export default router
