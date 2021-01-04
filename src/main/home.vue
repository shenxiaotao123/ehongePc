<template>
  <div>
	<div class="box-1">
		<myhead></myhead>
		<!--轮播图-->
		<div class="carousel wrap pos-rlt">
		  <template>
			<el-carousel :interval="5000" arrow="always" height="500px">
			  <el-carousel-item>
				<h3><el-image src="https://www.ehonge.com/Radmin/Uploads/20190610/5cfe20e2d2bda.png" @click="$router.push({path:tt.url})"></el-image></h3>
			  </el-carousel-item>
			</el-carousel>
		  </template>
		</div>
		<!--特色-->
		<div class="sloganCon">
		  <el-row>
			<el-col :span="6">
			  <div class="slogan-content icon-01">
				<h6>网罗天下匠心<span class="titleText">好物</span></h6>
				<p class="sloganText">百万匠人的原创作品</p>
			  </div>
			</el-col>
			<el-col :span="6">
			  <div class="slogan-content icon-02">
				<h6>寻找中意的<span class="titleText">匠人</span></h6>
				<p class="sloganText">全国优秀匠人云集</p>
			  </div>
			</el-col>
			<el-col :span="6">
			  <div class="slogan-content icon-03">
				<h6>与匠人在线交流<span class="titleText">沟通</span></h6>
				<p class="sloganText">每秒钟都有大师解答疑问</p>
			  </div>
			</el-col>
			<el-col :span="6">
			  <div class="slogan-content icon-04">
				<h6>在线资金<span class="titleText">托管</span></h6>
				<p class="sloganText">权威资金托管，满意后付款</p>
			  </div>
			</el-col>
		  </el-row>
		</div>
	</div>
    <!--匠心好物-->
    <div class="homeBox box-2">
      <div class="wrap">
        <h2 class="text-darkgray text-c">匠心好物</h2>
        <p class="vice text-lightgray text-c">总有一款撞入你心里</p>
        <div class="shopConBox m-t-lg">
        	<div class="shopConImg" :class="renderingsClassName(index)" v-for="(cat,index) of category.slice(0,6)">
				<div :class="imgClassName(index)">
					<div class="shopConText">
						<h3>{{cat.category_name}}</h3>
						<p>
							<span class="IngenuityName" v-for="cc of cat.children.slice(0,6)">{{cc.category_name}}  </span>
						</p>
					</div>
				</div>
			</div>
			<div class="shopConImg shopConImg-4 pointer" @click="open">
				<div class="imgname-4">
					<div class="shopConText">
						<h3>更多</h3>
						<p>
							<span class="IngenuityName">-匠心好物尽在易空间APP</span>
						</p>
					</div>
				</div>
			</div>
        </div>
      </div>
    </div>
	<!--百家讲坛-->
	<div class="homeBox raiders box-3">
	  <div class="wrap">
	    <h2 class="text-darkgray text-c">百家讲坛</h2>
	    <p class="vice text-lightgray text-c">走近匠人,走进艺术世界</p>
		<div class="video-listcon">
			<el-row :gutter="30">
				<el-col :span="6" v-for="vl of videoList">
					<div class="video-box" @click="$router.push({path:'/play',query:{id:vl.id}})">
						<img width="100%" height="280" :src="vl.video.cover_img" alt="" />
						<div class="video-title size12">{{vl.video.title}}</div>
					</div>
				</el-col>
			</el-row>
		</div>
	  </div>
	</div>
	<!--热门专栏-->
	<div class="homeBox raiders box-4">
	  <div class="wrap">
	    <h2 class="text-darkgray text-c">热门专栏</h2>
	    <p class="vice text-lightgray text-c">
			<span class="fr size12 text-gray">查看更多&gt;&gt;</span>
			走近匠人,走进艺术世界
		</p>
		<a href="#" class="headline-news" v-for="colr in columnRecommend.slice(0,1)">
		    <img :src="colr.cover_pic" class="news-Pic" width="100%" alt="" @click="$router.push({path:'/columnDetails',query:{id:colr.id}})">
		    <div class="news-title" @click="$router.push({path:'/columnDetails',query:{id:colr.id}})">{{ colr.name }}</div>
		</a>
		<ul class="h-news-list">
		    <li v-for="col in column.slice(0,5)">
				<img :src="col.cover_pic" class="news-Pic pointer" width="100%" alt="">
				<div class="news-link pointer" @click="$router.push({path:'/columnDetails',query:{id:col.id}})">
					<h6>{{ col.name }}</h6>
					<p class="size12 text-gray news-brief">{{col.brief}}</p>
				</div>
			</li>
		</ul>
	  </div>
	  <!--热门话题-->
	  <div class="hotTopic homeBox">
	  	<div class="wrap">
	  		<h2 class="text-darkgray text-c">#热门话题</h2>
	  		<el-row :gutter="30" class="m-t-xl">
	  		  <el-col :span="8" v-for="(has,index) in hashtag.slice(0,3)">
	  			  <div class="pos-rlt">
	  				  <div class="hotTopicImg" :class="hotTopicName(index)"></div>
	  				  <span class="hotTopicText pointer" @click="open">话题：{{has.name}}</span>
	  			  </div>
	  		  </el-col>
	  		</el-row>
	  	</div>
	  </div>
	</div>
	
	<!--抢领定制设计名额-->
    <div class="booking">
      <div class="content">
        <h4>下载APP,挑选心意的商品下单  </h4>
        <form class="banner-form">
          <button type="button" class="bg-miam br-mian" onclick="location.href='http://oos.ehonge.com/app/%E6%98%93%E7%A9%BA%E9%97%B4%E6%AD%A3%E5%BC%8F%E7%89%881_1_0.apk'"><i class="fa fa-android m-r-sm"></i>Android APP 下载</button>
		  <button type="button" class="bg-miam br-mian" onclick="location.href='https://apps.apple.com/cn/app/id1533917018'"><i class="fa fa-apple m-r-sm"></i>iphone APP 下载</button>
        </form>
      </div>
    </div>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import myhead from '@/components/myhead'
  import myfooter from '@/components/myfooter'
  import downloadApp from '@/public/downloadApp' //弹出框APP引导
export default {
  name: 'home',
  data () {
    return {    
      activeName: 'first',
      category: [],
	  videoList:[],
	  columnRecommend:[],
	  column:[],
	  hashtag:[],
    }
  },
  components: {
    myhead,
    myfooter,
    downloadApp
  },
  mounted() {
   this.$ajax.get('shop/category').then((response) => { //商品分类列表
       this.category = response.data.data
		// console.log(response.data.data);
   });
   this.$ajax.get('info/video' + '?itemsPerLoad=4').then((response) => { //视频列表-百家讲坛
       this.videoList = response.data.data.data
   });
   this.$ajax.get('info/column' + '?is_rec=1').then((response) => { //专栏列表
       this.columnRecommend = response.data.data.data
   });
   this.$ajax.get('info/column').then((response) => { //专栏列表
       this.column = response.data.data.data
   });
   this.$ajax.get('info/hashtag' + '?order=1').then((response) => { //话题列表
       this.hashtag = response.data.data.data
   });		

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    renderingsClassName (index) {
      // 调用方法，动态生成index
      return `shopConImg-${index}`
    },
	imgClassName(index) {
      // 调用方法，动态生成index
      return `imgname-${index}`
    },
	hotTopicName(index) {
	  // 调用方法，动态生成index
	  return `hotTopicName-${index}`
	},
    open() {
      this.$alert(<downloadApp/>,{
        dangerouslyUseHTMLString: true,
          showConfirmButton:false,
      });
    },
  }
}
</script>
<style>
	.myhead,.el-menu,.el-menu-item:hover { background-color: transparent !important;}
	.el-image__inner { height: 500px;}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @miam-color: #0c3052;
  @secondary-color: #67161f;
  @border-radius-5: 5px;
  @bg-color: #bd2032;
  .box-1 { background: url("~@/assets/img/home/bg_1.jpg") no-repeat center top;
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  }
  .box-2 { background: url("~@/assets/img/home/bg_2.jpg") no-repeat center top;
  	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  }
  .box-3 { background: url("~@/assets/img/home/bg_3.jpg") no-repeat center top;
  	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  }
  .box-4 { padding: 70px 0 !important; background: url("~@/assets/img/home/bg_4.jpg") no-repeat center top;
  	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  }
  .bg-miam { background: @secondary-color;}
  .br-mian { border-color: @bg-color;}
  //轮播图
  .carousel { height: 500px; border-radius:10px; overflow:hidden;
    .el-image {
      img { cursor: pointer;}
    }
  }

  .homeBox { padding: 90px 0;
    h2 { margin-bottom: 20px; font-size: 36px; font-weight: 300;}
    .vice { margin-bottom: 45px; font-size: 16px;}
  }
  .sloganCon { margin: 0 auto; width: 1200px; padding: 80px 0;
	  &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
      .slogan-content {  margin: 0 auto; color: #878c9a; text-align: center; width: 200px; height: 200px; background: url("~@/assets/img/home/sloganIcon.png") no-repeat;
        h6 { padding-top: 80px; font-size: 18px; font-weight: 700; color:#333;
			.titleText { color:@miam-color;}
		}
        .icon-02 { background-position: -200px 0;}
        .icon-03 { background-position: -400px 0;}
        .icon-04 { background-position: -600px 0;}
        .sloganText { margin-top: 10px; font-size: 13px; color:#878c9a; font-weight: 300;}
      }
  }
  //匠人好物
  .shopConBox { margin-bottom: 100px;
	  &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  }
  .shopConImg { position:relative; float:left; box-sizing:border-box;
  	img { width:100%; height:210px;
  		&:hover { opacity:1;}
  	}
  	.shopConText { position:absolute; font-size: 14px; text-align:left; color:#333;
  		h3 { line-height:60px; font-size:30px; font-weight: 300;}
		
  	}
  }
  .imgname-0 { height: 430px; background: url("~@/assets/img/home/Ingenuity_1.jpg") no-repeat;}
  .imgname-1 { height: 210px; background: url("~@/assets/img/home/Ingenuity_2.jpg") no-repeat;}
  .imgname-2 { height: 210px; background: url("~@/assets/img/home/Ingenuity_3.jpg") no-repeat;}
  .imgname-3 { height: 210px; background: url("~@/assets/img/home/Ingenuity_4.jpg") no-repeat;}
  .imgname-4 { height: 210px; background: url("~@/assets/img/home/Ingenuity_5.jpg") no-repeat;}
  .shopConImg-0 { width: 25%; padding-right:10px; 
	.shopConText { text-align:center; top:20%; left:50%; margin-left: -100px; width:200px;}
  }
  .shopConImg-1 { width: 37%; padding:0 10px 10px 0; 
	.shopConText { top:25%; left:8%;}
  }
  .shopConImg-2 { width: 38%; padding-bottom:10px;
	.shopConText { text-align:center; top:10%; left:50%; margin-left: -100px; width:200px;}
  }
  .shopConImg-3 { width: 30%; padding:0 10px 10px 0;
	.shopConText { text-align:center; top:25%; left:50%; margin-left: -100px; width:200px;}
  }
  .shopConImg-4 { width: 45%;
	.shopConText { top:25%; left:8%;}
  }
  .IngenuityName {
	  &:after { content:"|";  margin: 0 5px 0 2px;}
	  &:last-of-type {
	  	&:after { content:""; }
	  }
  }
  //百家讲坛
 .video-listcon { padding-top: 20px;
      &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  	  .video-box { position: relative; overflow: hidden; border-radius: 5px; margin-bottom: 20px; height: 280px; cursor: pointer;
  		  &:hover img { opacity:0.9;}
  		  .video-title { position:absolute; left: 0; bottom: 0; padding: 10px; width: 257.5px; color:#fff; background: linear-gradient(transparent,#000000); overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
  	  }
  }
  //热门专栏
 .headline-news { float:left; display:block; width:580px; background-color: #fff; border-radius: 5px; overflow:hidden;
  		.news-Pic { height:280px;}
  		.news-title { margin: 0 auto; width:500px; color:#333; height:50px; line-height:50px; font-size:18px; text-align:center; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
  			&:hover { color:@miam-color;}
  		}
  	}
  	.h-news-list { margin-left: 30px; float:right; width:570px;
  		li { margin-bottom:30px; width:600px; 
			&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
			.news-Pic { float: left; width: 60px; height:40px; border-radius:2px;}
  			.news-link { margin-left: 15px; float: left; width: 520px;
				h6 { margin-bottom: 8px; color:#333; font-size: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; text-overflow: ellipsis; overflow: hidden; line-height: 1;}
				.news-brief { overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
  			}
  		}
  	}
  //热门话题
 .hotTopic { padding: 70px 0 !important;
	 .hotTopicText { position: absolute; left: 50%; top: 0; margin-left: -150px; font-size: 24px; width:300px; height: 180px; text-align: center; line-height: 180px; color:#fff;}
	 .hotTopicName-0 { height: 180px; background: url("~@/assets/img/home/hotTopic_1.png") no-repeat;}
	 .hotTopicName-1 { height: 180px; background: url("~@/assets/img/home/hotTopic_2.png") no-repeat;}
	 .hotTopicName-2 { height: 180px; background: url("~@/assets/img/home/hotTopic_3.png") no-repeat;}
 }
  //抢领定制设计名额
  .booking { padding:55px 0; text-align:center; color:#333; background-color:#cbcbcb;
    h4 { margin-bottom:25px; font-size:24px; font-weight: 500;}
    .banner-form {
      button[type=button] { padding:11px 50px; font-size:14px; color: #fff; border:0; border-radius: @border-radius-5; vertical-align:top;}
    }
  }
</style>
