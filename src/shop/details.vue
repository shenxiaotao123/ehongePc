<template>
<div>
  <myhead></myhead>
  <div class="breadcrumbwrap">
    <div class="wrap pos-rlt">
      <div class="fr w">
        <el-input placeholder="输入关键字搜建材" class="rounded shop-search">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/shop' }">买材料</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/shopList' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{goodsD.goods_name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="wrap m-t-sm">
  		<div class="package-top">
  			<div class="package-imgBox fl m-r-md">
  				<el-image :src="goodsD.goods_thumb"></el-image>
          <div class="package-imgx">
            <div class="package-imgximg">
              <el-image v-for="thu of goodsD.infos.spu_thumb_json" :src="thu" :preview-src-list="thu"></el-image>
            </div>
          </div>
  			</div>
  			<div class="package-info fl">
  				<div class="package-info-title">
  					<h3>{{goodsD.goods_name}}</h3>
  				</div>
  				<div class="package-info-con">
  					  <div class="tab-content">
                <span class="fr text-darkgray size14">已售{{goodsD.sales_actual}}</span>
  							<span class="text-mainColor size24">￥{{goodsD.low_price}}</span>
  							<span class="text-l-t size14">￥{{goodsD.line_price}}</span>

                <el-tag type="danger" class="m-l-sm" v-for="tip of goodsD.infos.spu_tips">{{tip}}</el-tag>
  					  </div>
  				</div>
  				<div class="package-info-footer">
  					<p>优惠券：
  						<span class="package-info-footer-label" @click="open">APP查看优惠券</span>
              <span class="fr text-gray" @click="open">下载APP,优惠不错过<i class="el-icon-arrow-right"></i></span>
  					</p>
  					<p>
              发货：<span class="size12" @click="open"> 选择省市县    |     快递: 0:00  </span>
              <span class="fr text-gray" @click="open"><i class="el-icon-arrow-right"></i></span>
            </p>
  					<p @click="open">
              选择：<span class="size12" @click="open">规格数量</span>
              <span class="fr text-gray" @click="open">下载APP,查看更多规格  <i class="el-icon-arrow-right"></i></span>
            </p>
  				</div>
          <div class="m-t">
            <el-button type="danger" @click="open">下载APP购买</el-button>
          </div>
          <div class="m-t-xxl size12 text-gray">
            <span class="m-r-lg"><i class="el-icon-circle-check m-r-xs"></i>正品保障</span>
            <span class="m-r-lg"><i class="el-icon-circle-check m-r-xs"></i>正规厂家</span>
            <span class="m-r-lg"><i class="el-icon-circle-check m-r-xs"></i>先行赔付</span>
            <span class="m-r-lg"><i class="el-icon-circle-check m-r-xs"></i>假一赔十</span>
          </div>
  			</div>

  		</div>

        <div class="wrap m-t-sm">
          <div class="Drecommend">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="商品详情" name="first">
                    <div class="text-c" v-html="content"></div>
                  </el-tab-pane>
                  <el-tab-pane label="用户评价" name="second">配置管理</el-tab-pane>
                </el-tabs>
          </div>
          <div class="shopDrRight">
             <div class="storeInfo">
               <el-avatar :size="50" :src="storeShopid.logo_image	" class="v-middle fl m-r-sm"></el-avatar>
               <p class="size16 l-h-1x bbs_user_name m-t fl v-middle">{{storeShopid.shop_name}}</p>
             </div>
             <div class="size12 m-t">主营业务:{{storeShopid.shop_category}}</div>
             <ul class="size12 m-t m-b storeFraction">
              <li><span class="fr"> 5分  高  </span>商品描述</li>
              <li><span class="fr"> 5分  高  </span>卖家服务</li>
              <li><span class="fr"> 5分  高  </span>物流服务</li>
             </ul>
             <div class="text-c m-t-md">
                <el-button type="danger" @click="$router.push({path:'/shopIndex',query:{shop_id:storeShopid.shop_id}})">进店逛逛</el-button>
             </div>
          </div>
        </div>

  </div>
  <myfooter></myfooter>
</div>
</template>

<script>
  import myhead from '@/components/myhead'
  import myfooter from '@/components/myfooter'
  import comment from '@/public/Comment'
  import downloadApp from '@/public/downloadApp' //弹出框APP引导

  export default {
      name: "shopdetails",
      data() {
        return {
          activeName: 'first',
          goodsD:[],
          content:[],
          storeShopid:[]
        }
      },
      components: {
        myhead,
        myfooter,
        comment,
        downloadApp
      },
      mounted() {
        this.$ajax.get('shop/goods/'+ this.$route.query.spuid + '?no_cached=1').then((response) => { //建材城首页广告
          if (response.status >= 200 && response.status < 300) {
            this.goodsD = response.data.data
            this.content = response.data.data.infos.content
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/store/'+ this.$route.query.shopid + '?no_cached=1').then((response) => { //建材城首页广告
          if (response.status >= 200 && response.status < 300) {
            this.storeShopid = response.data.data
          } else {
            console.log(response.message);
          }
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
        }

      }
  }
</script>

<style lang="less">
  @bg-color: #bd2032;
  @mian-color: #c82126;

  .breadcrumbwrap { height: 40px; line-height:40px; background:#333;
    .el-breadcrumb { line-height: 40px;}
       h3 { float:left; width: 200px; height: 40px; line-height: 40px; font-size: 12px; text-align: center; color:#fff; background-color: @bg-color;}
      .el-breadcrumb__item {
        span { color:#fff; font-size: 12px;}
        .el-breadcrumb__inner { color: #eee;}
      }
      .breadcrumbpic { position:absolute; bottom: -12px; right:0; width:342px; height:68px;}
    }
    .shop-search {
      .el-input__inner {height: 30px; line-height: 30px; border-radius: 50px; border: 0;}
      }
    .categories { position: absolute; left: 50%; top: 0; margin-left: -600px; width: 200px; height: 400px; background: rgba(0,0,0,.7); z-index: 10;
      .categoriesList { padding:10px 20px;
        li { margin: 5px 0; line-height: 2; color:#fff; font-size: 12px;}
      }
    }
  .package-top { overflow:hidden\9; background:#fff;
  	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
  	.package-imgBox { padding: 20px 0 0 20px; width:461px; height:410px; background:#fff;
  		img { width:461px; height:300px;}
      .package-imgx { margin-top: 10px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        .package-imgximg {
          .el-image { margin-right: 10px; float: left; width: 80px; height: 80px;}
          img { width:80px; height:80px;}
        }
      }
  	}
  	.package-info { padding:20px 30px; width:639px; height:340px;
  		.package-info-title {
  			h3 { padding:5px 0 15px 0; font-size:18px; font-weight:bold;}
  			p { padding:5px 0 10px 0; line-height:160%; color:#999;}
  		}
  		.package-info-con { padding:5px 0 10px 0; color:#666; border-bottom:1px solid #eee;
  			p { padding:3px 0; font-size: 14px;}
  			.cOrange { color: #f36f20;}
  		}
  		.package-info-footer { padding-top:10px; font-size:12px;
  			p { padding:7px 0; color:#666;
  				.package-info-footer-label { padding:2px 10px; background:#f6e4e4; color:@mian-color; border-radius:15px;}
  			}
  		}
  	}
  }
  .Drecommend { float:left; padding: 20px 30px; width: 900px; background-color: #fff;
    .el-tabs__nav-wrap::after { height: 1px;}
    .el-tabs__item { height: 50px; line-height: 50px; font-size: 18px;}
  }
  .shopDrRight { padding: 20px; float:right; width: 180px; background-color: #fff;
    .storeInfo {
      &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
      .bbs_user_name { width: 115px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
    }
    .storeFraction {
      li { padding: 5px 0;}
    }
  }


</style>
