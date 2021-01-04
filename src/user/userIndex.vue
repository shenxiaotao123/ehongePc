<template>
<div>
  <myhead></myhead>
  <div class="breadcrumbwrap">
    <div class="wrap pos-rlt">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>账户中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="userTop">
    <div class="wrap">
       <div class="fl m-t-lg">
         <el-avatar :size="80" :src="userInfo.user_image" class="v-middle fl m-r-md"></el-avatar>
         <div class="fl m-t-sm">
           <strong><p class="size24 l-h-1-6x bbs_user_name">{{userInfo.user_name}}</p></strong>
           <p class="m-t-xs size14 text-gray pointer" @click="$router.push({path:'/user'})">基本信息设置<i class="el-icon-arrow-right"></i></p>
         </div>
       </div>
       <ul class="fl countFollow">
         <li>关注<strong class="m-l-sm">{{countFollow.count}}</strong></li>
         <li>收藏<strong class="m-l-sm">{{countCollect.count}}</strong></li>
       </ul>
    </div>
  </div>
  <div class="wrap userTab">
    <template>
      <el-tabs v-model="activeNameUser" @tab-click="handleClick">
        <el-tab-pane label="专栏" name="Column">
			<div class="wrapper-sm">
					<div v-for="colr in column">
						<div class="headline-news">
							<div class="newslistbox">
								<div class="fl"><img :src="colr.cover_pic" class="news-Pic" width="100%" alt=""></div>
								<div class="news-title">
									<h6 @click="$router.push({path:'/columnDetails',query:{id:colr.id}})" class="pointer">{{ colr.name }}</h6>
									<div @click="$router.push({path:'/columnDetails',query:{id:colr.id}})" class="text-gray size12 brief pointer">{{ colr.brief }}</div>
									<div class="news-count_infos_num">
										已更新 {{ colr.count_infos_num }} 期
										<div class="m-l-sm fr">
											<el-button @click="open" :id="colr.id">取消收藏 - 使用易空间APP</el-button>
										</div>
									</div>
								</div>
							</div>
							<div class="h-news-list">
								<div class="n-l-wrap" v-for="inf of colr.infos.slice(0,6)">
									<img :src="inf.cover_img" class="news-Pic" width="100%" alt="" @click="$router.push({path:'/textDetails',query:{id:inf.id,cid:inf.column_id}})">
									<div class="news-link" @click="$router.push({path:'/textDetails',query:{id:inf.id,cid:inf.column_id}})">
									  	<h6>{{ inf.title }}</h6>
									  	<p class="size12 text-gray news-brief">{{inf.brief}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
        </el-tab-pane>
        
        <el-tab-pane label="短视频" name="video">
			<div class="video-listcon">
				<el-row :gutter="30">
					<el-col :span="6" v-for="cvl of CVideo">
						<div class="video-box" @click="$router.push({path:'/play',query:{id:cvl.target_id}})">
							<img width="100%" height="280" :src="cvl.video.cover_img" alt="" />
							<div class="video-title">{{cvl.video.title}}</div>
						</div>
					</el-col>
				</el-row>
				<!--没有评价的情况-->
				<div class="noComment" id="noComment">
					<img src="@/assets/img/zanwu.png" />
					<p class="m-t-md size14">没有更多数据了！看看前面的吧</p>
				</div>
			</div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>

  <myfooter></myfooter>
</div>
</template>

<script>
  import myhead from '@/components/myhead'
  import myfooter from '@/components/myfooter'
  import downloadApp from '@/public/downloadApp' //弹出框APP引导
  export default {
      name: "list",
      data() {
        return {
          userInfo:[],
          activeName: 'commodity',
		  CVideo:[],
          goods:[],
          guide:[],
          demo:[],
          countFollow:[],
          countCollect:[],
		  column:[],
		  activeNameUser:'Column'
        }
      },
      components: {
        myhead,
        myfooter,
		downloadApp
      },
      mounted() {
        document.cookie
        var token = this.$cookies.get("token")
        this.tokenData = token
		
        var tokenData= {
          'user_token' : this.tokenData
        };
        var token = tokenData; // 这里才是你的表单数据
        this.$ajax.post('consumer/getUserInfos',tokenData).then((response) => { //用户个人信息
            this.userInfo = response.data.data
        });
		
		this.$ajax.get('info/column').then((response) => { //专栏列表
		    this.column = response.data.data.data
		});
		
		var Cvideo= { //请求参数
			params:{
			  'user_token' : this.tokenData,
			  'target_type' : 'video',
			 }
		};
		this.$ajax.get('consumer/collect',Cvideo).then((response) => { //用户收藏列表
		    this.CVideo = response.data.data.data//用户收藏列表-视频
		});


        this.$ajax.post('consumer/countFollow', tokenData).then((response) => { //关注数量统计
            this.countFollow = response.data.data
        });
        this.$ajax.post('consumer/countCollect', tokenData).then((response) => { //关注数量统计
            this.countCollect = response.data.data
        });

      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
		open() {
		  this.$alert(<downloadApp/>,{
		    dangerouslyUseHTMLString: true,
		      showConfirmButton:false,
		  });
		},
		// favorites(e){
		// 	var columnid = e.currentTarget.id //获取自身ID
		// 	console.log(columnid)
		// 	document.cookie
		// 	var token = this.$cookies.get("token")
		// 	this.tokenData = token
			
		// 	var tokenData= {
		// 	  //'user_token' : this.tokenData, 
		// 	  // 'target_type' : 'column_info',
		// 	  'target_id' : columnid,
		// 	};
		
		// 	var token = tokenData; // 这里才是你的表单数据

		// 	this.$ajax.delete('consumer/collect/',{params: "2"} ).then((response) => { //收藏专栏
		// 		this.collect = response.data.data
		// 		var clocode = response.data.code
		// 		var clomsg = response.data.msg
		// 		if(clocode==1){
		// 			//alert(clomsg)
		// 			this.$message({
		// 			    message: clomsg,
		// 			    type: 'warning'
		// 			});
		// 		}
		// 		if(clocode==0){
		// 			this.$message({
		// 			    message: '取消收藏成功！',
		// 			    type: 'success'
		// 			});
		// 		}
		// 	});
		// },
      }
  }
</script>

<style lang="less">
  .userTab {
	  .el-tabs__nav-wrap::after { background-color: #fff;}
  }
  .breadcrumbwrap { padding: 10px 0; line-height:24px; background:#333;
      .el-breadcrumb__item {
        span { color:#fff; font-size: 12px;}
        .el-breadcrumb__inner { color: #eee;}
      }
      .breadcrumbpic { position:absolute; bottom: -12px; right:0; width:342px; height:68px;}
    }
    .userTop { height: 140px; background: url("~@/assets/img/user/bg.jpg") repeat-x;
      .countFollow { margin: 55px 0 0 80px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        li { margin-right: 50px; float: left; font-size: 16px;}
      }
    }
    .userTab {
      .el-tabs__header { padding:0 30px; background-color: #fff;}
      .el-tabs__item { height: 60px; line-height: 60px; font-size: 16px;}
    }
    .userCon { padding: 30px; width: 1160px; background-color: #fff;
        .recommendList { margin: 0 10px 20px 10px; height: 300px;;
          .el-image { width: 100%; background-color: #f8f8f8;}
          img { height: 180px;}
        }
    }
    .noComment { padding-bottom: 20px; text-align: center; color: #999; display: none;
        img { margin-top: 30px;}
    }
    .newsBox { margin:0 0 20px 0; background: #fff; border-radius: 5px; overflow: hidden;
      &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
      .newsImg { float: left; width: 270px; height: 130px;}
      .newsCon { float: left; padding: 25px; width: 880px;
        h5 { margin-bottom: 10px; color: #333; font-size: 16px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
      }
    }
    .renderings-listcon {
      &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
       .case { margin:0 0 20px 0; background-color: #fff;
       .el-image__inner { width: 100%; height: 190px;}
        .caseInfo { padding:10px 15px 15px 15px;
          .title { display: inline-block; width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: sub;}
        }
       }
    }
	
.video-listcon {padding-top:20px;&:after {content:".";display:block;height:0;clear:both;visibility:hidden;}
	.video-box {position:relative;overflow:hidden;border-radius:5px;margin-bottom:20px;height:220px;cursor:pointer;
		&:hover img {opacity:0.9;}
		.video-title {position:absolute;left:0;bottom:0;padding:10px;width:257.5px;color:#fff;background:linear-gradient(transparent,#000000);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
	}
}
 //专栏
 .headline-news { margin-bottom: 20px; padding: 20px; background-color: #fff; border-radius: 5px; overflow:hidden;
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	.newslistbox {
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
		.news-Pic { float: left; width: 225px; height:180px; border-radius:3px;}
		.news-title { margin-left: 30px;  float: left; width:880px; color:#333;
			h6 { margin: 3px 0 10px 0; font-size:18px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
			.brief { height: 105px;}
		}
		.news-count_infos_num {
			&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
		}
	}
 }
 .h-news-list { margin-top: 20px; text-align: left;
 	 &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
 	 .n-l-wrap { margin-right: 30px; float: left; width: 140px; text-align: center;}
 		.news-Pic { width: 140px; height:120px; border-radius:2px;}
 		.news-link {
 			h6 { margin:5px 0 8px 0; color:#333; font-size: 14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; line-height: 1.3;}
 			.news-brief { overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
 		}
 	
 }
</style>
