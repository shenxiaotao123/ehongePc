<template>
  <div class="myhead">
    <div class="top">
    		<div class="wrap">
    			<div class="fl topCode">
					
					<el-popover placement="bottom" width="150" trigger="hover">
						<div class="text-c">
							<img src="../assets/img/components/wx.jpg" style="width: 120px; height: 120px;"/>
							<p>微信扫一扫关注公众号</p>
						</div>
					    <el-button slot="reference"><i class="fa fa-qrcode m-r-xs"></i>易空间官方微信</el-button>
					</el-popover>
					<span class="spacer"></span>
					<el-popover placement="bottom" width="150" trigger="hover">
						<div class="text-c">
							<img src="../assets/img/components/app.jpg" style="width: 120px; height: 120px;"/>
							<p>扫一扫安装易空间APP</p>
						</div>
					    <el-button slot="reference"><i class="fa fa-qrcode m-r-xs"></i>易空间手机版</el-button>
					</el-popover>
    			</div>
    			<ul class="fr text-gray">
					<li class="pointer" id="loginIfon" @click="$router.push({path:'/userIndex'})">欢迎你，<span class="text-mainColor">{{userInfo.user_name}} </span><span class="m-l-sm text-gray">用户中心</span></li>
    				<li class="text-gray pointer" id="notlogin">
						<a @click="$router.push({path:'/login'})">登录</a>
    				</li>
    				<li class="text-gray pointer" id="notreg">
    					<a @click="$router.push({path:'/reg'})">注册</a>
    				</li>
    				<li class="spacer"></li>
    				<li class="tel"><i class="el-icon-phone m-r-xs"></i>400-622-1988</li>
					<li class="spacer"></li>
					<li class="pointer" @click="open">匠人中心</li>
    			</ul>
    		</div>
    	</div>
    <div class="wrap">
      <a href="/" class="logo"></a>
      <el-menu :default-active="$route.path" class="el-menu-demo font-bold" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/" @click="$router.push({path:'/'})">首页</el-menu-item>
        <el-menu-item index="/videolist" @click="$router.push({path:'/videolist'})">百家讲坛</el-menu-item>
        <el-menu-item index="/designerList" @click="$router.push({path:'/news'})">专栏</el-menu-item>
        <el-menu-item @click="settle">匠人入驻</el-menu-item> 
				<!-- <el-menu-item index="/shop" @click="$router.push({path:'/shop'})">匠人入驻</el-menu-item> -->    
      </el-menu>
    </div>
  </div>
</template>

<script>
  import comment from '@/public/Comment'
  import downloadApp from '@/public/downloadApp' //弹出框APP引导

    export default {
      name: "myhead",
      data() {
        return {
          activeIndex: '1',
          shows:1,
		  userInfo:[]
        };
      },
      components: {
        comment,
        downloadApp
      },
      created (){
        document.cookie
        var realname = this.$cookies.get("real_name")
        this.realnameData = realname
      },
      mounted() {
         document.cookie
         var realname = this.$cookies.get("ykj_name")
         var token = this.$cookies.get("token")
         var idObject = document.getElementById('notlogin'); //登录
         var idreg = document.getElementById('notreg'); //注册
         var loginIfon = document.getElementById('loginIfon'); //用户名、用户中心
         if(token == 'undefined'){
			console.log('未登录');
            loginIfon.parentNode.removeChild(loginIfon);
         }
         if(token != 'undefined'){
		   console.log('已登录t');
           idObject.parentNode.removeChild(idObject);
           idreg.parentNode.removeChild(idreg);
			  this.tokenData = token
			  var tokenData= {
				'user_token' : this.tokenData
			  };
			  this.$ajax.post('consumer/getUserInfos',tokenData).then((response) => { //用户个人信息
				  this.userInfo = response.data.data
			  });
         }
         // else {
         //   loginIfon.parentNode.removeChild(loginIfon);
         // }
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        open() {
          this.$alert(<downloadApp/>,{
            dangerouslyUseHTMLString: true,
              showConfirmButton:false,
          });
        },
		settle() {
		    this.$alert('<p>尊敬的匠人老师，如果您是手工艺匠人、非遗传承人、老字号、独立设计师、自主品牌等，我们诚意邀您的加入，与我们携手打造传统工艺平台。易空间针对以下大类目进行开放招商：瓷器，手工艺品，刀剑，绘画，雕刻，刺绣等。</p><p>合作热线：400-622-1988，欢迎垂询。</p>',  
			'匠人入驻', {
				    dangerouslyUseHTMLString: true
				});
		}
        // getItme1:function() {
        //   this.shows = 1;  // 把当前点击元素的index，赋值给activeClass
        // },
        //  getItme2:function() {
        //    this.shows = 2;  // 把当前点击元素的index，赋值给activeClass
        //  },
        // getItme3:function() {
        //   this.shows = 3;  // 把当前点击元素的index，赋值给activeClass
        // },
        // getItme4:function() {
        //   this.shows = 4;  // 把当前点击元素的index，赋值给activeClass
        // },
        // getItme5:function() {
        //   this.shows = 5;  // 把当前点击元素的index，赋值给activeClass
        // },
        // getItme6:function() {
        //   this.shows = 6;  // 把当前点击元素的index，赋值给activeClass
        // },
        // getItme7:function() {
        //   this.shows = 7;  // 把当前点击元素的index，赋值给activeClass
        // }
      }
    }
</script>

<style lang="less" scoped>
   @mian-color: #0c3052;

   .active { color:@mian-color !important; font-weight: 700;}
.myhead { height: 116px; background: #fff;
  .logo { margin-top: 17px; float: left; display: block; width: 127px; height: 47px; background: url("~@/assets/img/head/logo.png") no-repeat;}
  .el-menu.el-menu--horizontal { margin-top: 11px; float: right; border: 0;}
}
.top { height:34px; line-height:34px; background:#fdfdfd; font-size:12px; border-bottom: 1px solid #eee;
	.fl { color:#666;
		.spacer { display: inline-block; overflow: hidden; margin: 12px 15px 0 15px; width: 1px; height: 10px; background-color: #ccc;}
	}
	.topCode {
		.el-button { padding:0; border: 0; font-size: 12px;}
	}
	.fr {
		li { margin-left:15px; float:left;}
		li.spacer { overflow: hidden; margin: 12px 0 0 15px; width: 1px; height: 10px; background-color: #ccc;}
		li.tel { color: @mian-color; font-weight:700;}

	}
}
</style>
