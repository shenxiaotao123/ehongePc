import Vue from 'vue'
import Router from 'vue-router'
import myhead from '@/components/myhead' //头部
import myfooter from '@/components/myfooter' //尾部
import videolist from '@/video/list' //百家讲坛
import play from '@/video/play' //视频播放页
import home from '@/main/home' //首页
import news from '@/news/index' //专栏首页
import columnDetails from '@/news/columnDetails' //专栏详情页
import textDetails from '@/news/textDetails' //专栏文章详情页
import downloadApp from '@/public/downloadApp' //弹出框APP引导
import user from '@/user/user' //用户中心
import pwd1 from '@/user/pwd1' //用户中心 - 修改密码
import userIndex from '@/user/userIndex' //用户中心首页
import shop from '@/shop/index' //建材城首页
import shopList from '@/shop/list' //建材城列表
import shopdetails from '@/shop/details' //建材城列表
import shopIndex from '@/shop/shopIndex' //店铺主页
import login from '@/login/login' //登录页
import reg from '@/login/reg' //注册页


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //首页
      name: 'home',
      component: home,
    },
    {
      path: '/myhead', //头部
      name: 'myhead',
      component: myhead
    },
    {
      path: '/myfooter', //尾部
      name: 'myfooter',
      component: myfooter
    },
	{
	  path: '/videolist', //百家讲坛
	  name: 'videolist',
	  component: videolist
	},
	{
	  path: '/play', //视频播放页
	  name: 'play',
	  component: play
	},
    {
      path: '/downloadApp', //弹出框APP引导
      name: 'downloadApp',
      component: downloadApp
    },
    {
      path: '/user', //用户中心
      name: 'user',
      component: user
    },
    {
      path: '/pwd1', //用户中心 -修改密码1
      name: 'pwd1',
      component: pwd1
    },
    {
      path: '/userIndex', //用户中心首页
      name: 'userIndex',
      component: userIndex
    },
	{
	  path: '/news', //专栏首页
	  name: 'news',
	  component: news
	},
	{
	  path: '/columnDetails', //专栏详情页
	  name: 'columnDetails',
	  component: columnDetails
	},
	{
	  path: '/textDetails', //专栏文章详情页
	  name: 'textDetails',
	  component: textDetails
	},
    {
      path: '/shop', //建材城首页
      name: 'shop',
      component: shop
    },
    {
      path: '/shopList', //建材城列表
      name: 'shopList',
      component: shopList
    },
    {
      path: '/shopdetails', //建材城详情页
      name: 'shopdetails',
      component: shopdetails
    },
    {
      path: '/login', //登录页
      name: 'login',
      component: login
    },
    {
      path: '/reg', //登录页
      name: 'reg',
      component: reg
    }

  ]
})
