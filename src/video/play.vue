<template>
 <div class="bg-f7">
   <myhead></myhead>
  
   <div class="banner">
	   <div class="wrap pos-rlt">
		   <div class="padder-v">
		   <el-breadcrumb separator="/" class="m-b-sm text-gray">
				<span class="fl">当前位置：</span>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item><a @click="$router.push({path:'/videolist'})">百家讲坛</a></el-breadcrumb-item>
				<el-breadcrumb-item>视频</el-breadcrumb-item>
		   </el-breadcrumb>
		   </div>
		   <div class="bannerTetx">
				{{videoDetail.title}}
				<div class="m-t-xs size14 text-darkgray fr font-thin">
					<img width="30" height="30" :src="videoUser.user_image" class="v-middle rounded" />
					<span class="m-l-xs v-middle">{{videoUser.user_name}}</span>
					<span class="m-l-sm v-middle text-mainColor" @click="favorites">+收藏此视频</span>
				</div>
		   </div>	    
	   </div>
		 
   </div>

   <div class="wrap m-t">
		<div class="play-left">
			<template>
				<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
			</template>
		
			<div class="comment bg-ff wrapper-md m-t-sm">
				<h3>评论 ( {{videoComment.count}} )</h3>
					
				<div id="noComment">这里还没有人评论</div>
				<div class="commentList" v-for="videoCom of videoComment.data">
					<div class="commentAvatar">
						<img width="18" height="18" :src="videoCom.comment_user_image" class="v-middle rounded" />
						<span class="m-l-xs v-middle size12 text-gray">{{videoCom.comment_user_name}}</span>
					</div>
					<p class="commentCon">{{videoCom.com_content}}</p>
					<p class="size12 text-gray">发表于 {{videoCom.created_at}}</p>
				</div>
			</div>	
		</div>
		<div class="play-right">
			<div class="videoData">
				<dl>
					<dt>{{videoCon.view_num}}</dt>
					<dd>浏览</dd>
				</dl>
				<dl>
					<dt>{{videoCon.like_num}}</dt>
					<dd>点赞</dd>
				</dl>
				<dl>
					<dt>{{videoCon.collect_num}}</dt>
					<dd>收藏</dd>
				</dl>
			</div>
	
			<p class="text-c"><el-button type="danger" round  @click="open">发布短视频</el-button></p>
			<p class="size12 text-gray m-t"><i class="fa fa-exclamation-circle m-r-xs"></i>严禁上传违规违法/色情色诱/低俗/广告等视频内容，违者下架视频并封号处理</p>
		</div>
   </div>
   <myfooter></myfooter>
 </div>
</template>

<script>
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
import Vue from 'vue';

  import myhead from '@/components/myhead'
  import myfooter from '@/components/myfooter'
  import downloadApp from '@/public/downloadApp' //弹出框APP引导
  
    export default {
        name: "play",
        data() {
          return {
            videoDetail:[],
			videoListCount:[],
			videoClass:[],
			videoComment:[],
			videoUser:[],
			collect:[],
			videoCon:[],
			playerOptions : {
			        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
			        autoplay: false, //如果true,浏览器准备好时开始回放。
			        muted: false, // 默认情况下将会消除任何音频。
			        loop: false, // 导致视频一结束就重新开始。
			        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
			        language: 'zh-CN',
			        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
			        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
			        sources: [{
			          type: "",
			          src: ''//url地址          
			        }],
			        poster: "", //你的封面地址
			        // width: document.documentElement.clientWidth,
			        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
			        controlBar: {
			          timeDivider: true,
			          durationDisplay: true,
			          remainingTimeDisplay: false,
			          fullscreenToggle: true  //全屏按钮
					}
			}
          }
        },
        components: {
          myhead,
          myfooter,
		  downloadApp
        },
      mounted() {
        this.$ajax.get('info/video/' + this.$route.query.id).then((response) => { //视频列表
            this.videoCon = response.data.data
        	this.videoDetail = response.data.data.video
        	this.videoUser = response.data.data.user			
        	var viurl = this.videoDetail.video_url				
        	this.playerOptions['sources'][0]['src'] = viurl;			
        });	
		this.$ajax.get('info/comment' + '?info_id=' + this.$route.query.id + '&info_type=1').then((response) => { //视频评论
		    this.videoComment = response.data.data
			var noComment = response.data.data.count
			if(noComment == 0){
				var noc = document.getElementById("noComment");
				noc.style.display = 'block';
			}
		});	
      },
      methods: {
        open() {
          this.$alert(<downloadApp/>,{
            dangerouslyUseHTMLString: true,
            showConfirmButton:false,
          });
        },
        favorites(){
			document.cookie
			var videoid = this.$route.query.id
			var token = this.$cookies.get("token")
			this.tokenData = token
			var tokenData= {
			  'user_token': this.tokenData,
			  'target_type': 'video',
			  'target_id': videoid,
			};
			var token = tokenData; // 这里才是你的表单数据
			this.$ajax.post('consumer/collect',token).then((response) => { //视频列表
				this.collect = response.data.data
				var clocode = response.data.code
				var clomsg = response.data.msg
				if(clocode==1){
					this.$message({
					    message: clomsg,
					    type: 'warning'
					});
				}
				if(clocode==99){
					this.$message({
					    message: '您还未登录，请先登录再收藏',
					    type: 'warning'
					});
				}
				if(clocode==0){
					this.$message({
					    message: '收藏成功！',
					    type: 'success'
					});
				}
			});
        },

		
	  }
    }
</script>

<style lang="less" scoped>
  @mian-color: #0c3052;
  .banner {  
	// background:url("~@/assets/img/video/banner.jpg") no-repeat center top;
	.bannerTetx { color:#333; font-size: 28px; font-weight: 700;}
	
  }

.comment {
	h3 { margin-bottom: 10px; font-size: 14px; font-weight: 300;}
	.commentList { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;
		&:last-of-type { margin-bottom: 0; padding-bottom: 0; border: 0;}
		.commentCon { padding: 5px 0; line-height: 1.4; font-size: 12px;}
	}
}
#noComment { padding: 30px 0; display: none; color:#999; text-align: center;}
 .play-left { float: left; width: 910px;
	
 }
 .play-right { padding: 20px; float: right; width: 240px; background-color: #fff;
	h3 { font-size: 14px;}
	.videoData { padding: 10px 0 30px 0;
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
		dl { float: left; width: 33.33%; text-align: center;
			dd { font-size: 12px;}
		}
	}
 }
</style>
