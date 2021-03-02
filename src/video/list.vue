<template>
	<div class="bg-f7">
		<myhead></myhead>
		<div class="banner">
			<div class="wrap pos-rlt">
				<div class="bannerTetx">百家讲坛</div>
			</div>
		</div>

		<div class="wrap pos-rlt">
			<div class="wrap video-list-nav">
				<el-tabs v-model="activeName_data" @tab-click="handleClick">
					<el-tab-pane :label="vClass.name" :name="vClass.id" v-for="vClass of videoClass">
					<!-- <el-tab-pane :label="vClass.name" :name="vClass.id" :id="vClass.id" v-for="vClass of videoClass"> -->
						<div class="video-listcon">
							<el-row :gutter="10">
								<el-col :span="4" v-for="vl of videoList">
									<div class="video-box" @click="$router.push({path:'/play',query:{id:vl.id}})">
										<img width="100%" height="280" :src="vl.video.cover_img" alt="" />
									</div>
									<div class="video-title">
										<div class="textbox">{{vl.video.title}}</div>
									</div>
								</el-col>
							</el-row>
							
							<div class="text-c m-t-xxl">
								<el-pagination background layout="total, prev, pager, next" :page-size="12" :pager-count="11" @current-change="handleCurrentChange" :total="videoListCount.count" :id="vClass.id"></el-pagination>
							</div>
							<!-- <div class="text-c m-t-xxl">
								<span class="size12 text-lightgray pointer m-l-sm m-r-sm">总共{{videoListCount.count}}条</span>
								<span class="size12 text-lightgray pointer m-l-sm m-r-sm font-bold" @click="prev()" id="prev"><i class="el-icon el-icon-arrow-left"></i>上一页</span>
								<span class="size12 text-lightgray pointer m-l-sm m-r-sm font-bold" @click="next()" id="next">下一页<i class="el-icon el-icon-arrow-right"></i></span>
							</div> -->

						</div>
					</el-tab-pane>
				</el-tabs>
				<!--没有数据的情况-->
				<div class="noComment" id="noComment">
					<img src="@/assets/img/zanwu.png" />
					<p class="m-t-md size14">没有更多数据了！看看其它的吧</p>
				</div>
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
		name: "list",
		data() {
			return {
				videoList: [],
				videoListCount: [],
				videoClass: [],
				// 每页显示数量
				// page: 0,
				activeName_data: 1,
				
			}
		},
		components: {
			myhead,
			myfooter,
			downloadApp
		},
		mounted() {
			this.$ajax.get('info/video', {
				params: {
					'itemsPerLoad': '12',
					'class_id': '1’',
				},
			}, ).then((response) => { //视频列表
				this.videoList = response.data.data.data
				this.videoListCount = response.data.data
				
				// console.log(videoList)
			});
			this.$ajax.get('info/class').then((response) => { //视频分类
				this.videoClass = response.data.data
				//var vClass = response.data.data
				// let city = vClass.map((item) =>{  //数组里单独取出ID数值
				// 　　return item.id
				// });
				//var hqsj = JSON.stringify(response.data.data) //转化成字符串

				// console.log("aa",city)
				// console.log("bb",vClass)
				//console.log("cc",hqsj)
			});
		},
		methods: {
			handleClick(tab, event) {
				var classid = event.target.getAttribute('id') //获取当前tab的id
				var reg = new RegExp("tab-");
				var szid = classid.replace(reg,"");//去除掉tab-获得纯数字的id
				this.$ajax.get('info/video', {
					params: {
						'itemsPerLoad': '12',
						'class_id': szid,
					},
				}, ).then((response) => { //视频列表
					this.videoList = response.data.data.data
					this.videoListCount = response.data.data
					if(this.videoListCount.count == 0) {
						document.getElementById("noComment").style.display = 'block';
					}
					else{
						var child = document.getElementById("noComment");
						child.style.display = 'none';
					}
				});
			},
			handleCurrentChange(val) {
			  // this.$options.methods.test2();
			  // console.log(qwe)
			  // console.log(`每页 ${val} 条`);
			 
			  var fyid = event.target; //获取当前点击对象
			  var par = fyid.parentNode.parentNode.id;  //获取当前点击对象爷爷的ID
			  var dqy = val; //获取当前页数
			  this.$ajax.get('info/video', {
			  	params: {
			  		'itemsPerLoad': '12',
					'lastIndex': '12' * dqy - '12',
					'class_id': par,
			  	},
			  }, ).then((response) => { //视频列表
			  	this.videoList = response.data.data.data
			  	this.videoListCount = response.data.data
			  });
			},
			open() {
				this.$alert( < downloadApp / > , {
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
				});
			},
			// next() {
			// 	var next = this.page++ + 10;
			// 	this.page = next
			// 	if (next >= 1) {
			// 		var child = document.getElementById("prev");
			// 		child.style.display = 'inline-block';
			// 	}
			// 	//this.pagenext = next
			// 	this.$ajax.get('info/video', {
			// 		params: {
			// 			lastIndex: next,
			// 			itemsPerLoad: 10
			// 		},
			// 	}, ).then((response) => { //设计师列表
			// 		this.videoList = response.data.data
			// 		if (response.data.data.count == 0) {
			// 			var child = document.getElementById("next");
			// 			child.style.display = 'none';
			// 			var child = document.getElementById("noComment");
			// 			child.style.display = 'block';
			// 			return
			// 		}

			// 	});
			// },
			// prev() {
			// 	//var next = this.page
			// 	var prev = this.page - 10;
			// 	this.page = prev
			// 	if (prev <= 0) {
			// 		var child = document.getElementById("prev");
			// 		child.style.display = 'none';
			// 	}
			// 	if (prev >= 1) {
			// 		var child = document.getElementById("prev");
			// 		child.style.display = 'inline-block';
			// 	}
			// 	this.$ajax.get('info/video', {
			// 		params: {
			// 			lastIndex: prev,
			// 			itemsPerLoad: 10
			// 		},
			// 	}, ).then((response) => { //设计师列表
			// 		this.videoList = response.data.data
			// 		if (response.data.data.count > 0) {
			// 			var child = document.getElementById("next");
			// 			child.style.display = 'inline-block';
			// 			var child = document.getElementById("noComment");
			// 			child.style.display = 'none';
			// 			return
			// 		}
			// 	});
			// },
		}
	}
</script>
<style>
	.el-tabs__item {
		font-size: 18px !important;
		font-weight: 700;
	}

	.is-active {
		color: #67161f !important;
	}

	.el-tabs__active-bar {
		background-color: #67161f;
	}


	.el-tabs__nav-wrap::after {
		background-color: transparent ;
	}
</style>
<style lang="less" scoped>
	@mian-color: #0c3052;
	@secondary-color: #67161f;

	.banner {
		height: 100px;
		// background: url("~@/assets/img/video/banner.jpg") no-repeat center top;

		.bannerTetx {
			line-height: 120px;
			text-align: left;
			color: @mian-color;
			font-size: 32px;
			font-weight: 700;
		}

	}

	.video-list-nav {
		&:after {
			content: ".";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}
	}

	.video-listcon {

		&:after {
			content: ".";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}

		.video-box {
			position: relative;
			overflow: hidden;
			border-radius: 2px;
			
			height: 220px;
			cursor: pointer;

			&:hover img {
				opacity: 0.9;
			}

			
		}
		.video-title {
			margin-bottom: 15px;
			width: 100%;
			color: #333;
			background-color: #fff;
			// background: linear-gradient(transparent, #000000);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.textbox { padding: 10px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;}
		}
	}

	.noComment {
		text-align: center;
		color: #999;
		display: none;

		img {
			margin-top: 30px;
		}
	}
</style>
