<template>
<div>
  <myhead></myhead>
  <div class="shoPbreadcrumbwrap">
    <div class="wrap pos-rlt">
      <h3>全部商品分类</h3>

      <div class="fr w">
        <el-input placeholder="输入关键字搜建材" class="rounded shop-search">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </div>
  <!--轮播图-->
  <div class="carousel pos-rlt">
    <template>
      <el-carousel :interval="5000" arrow="always" height="400px">
        <el-carousel-item v-for="ad of ads">
          <h3><el-image :src="ad.pic_url" @click="$router.push({path:tt.url})"></el-image></h3>
        </el-carousel-item>
      </el-carousel>
    </template>
    <div class="categories">

      <ul class="categoriesList">
        <li v-for="cat of category" class="pointer" @click="$router.push({path:'/shopList',query:{category_id:cat.id}})">{{cat.category_name}}</li>
      </ul>
    </div>
  </div>

  <div class="wrap m-t-sm">
    <!--广告-->
    <el-row class="ad">
      <el-col :span="6" v-for="adb of adsbanner.slice(0,4)">
        <a :href="adb.url" target="_blank"><el-image class="pointer" :src="adb.pic_url"></el-image></a>
      </el-col>
    </el-row>

    <div class="wrap">
      <!--为您推荐-->
      <div class="recommend">
        <h3>为您推荐</h3>
        <el-row>
          <el-col :span="8">
            <div class="ranking">
              <h4>销量排行榜</h4>
               <div class="rankingList" v-for="goo of goods.slice(0,6)">
                 <el-image class="pointer" :src="goo.goods_thumb" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})"></el-image>
                 <div class="rankingInfo">
                   <div class="name size14 text-darkgray">
                      <p class="goods_name pointer" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})">{{ goo.goods_name }}</p>
                      <span class="size12 text-mainColor">￥{{goo.low_price}}</span><br />
                      <span class="size12 text-gray">已售: {{goo.sales_actual}}件 </span>
                   </div>
                 </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-for="goo of goods2">
            <div class="recommendList">
              <el-image class="pointer" :src="goo.goods_thumb" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})"></el-image>
              <div class="name size14 text-darkgray">
                 <p class="goods_name m-t-xs m-b-xs pointer" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})">{{ goo.goods_name }}</p>
                 <span class="size12 text-mainColor">￥{{goo.low_price}}</span>
                 <span class="size12 text-gray fr">已售: {{goo.sales_actual}}件 </span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="shoprRight">
        <div class="Propaganda">
          <h4>合作伙伴</h4>
            <div class="Partner" v-for="sto of store.slice(0,6)">
              <el-image class="pointer" :src="sto.logo_image" @click="$router.push({path:'/shopIndex',query:{shop_id:sto.shop_id}})"></el-image>
              <div class="PartnerInfo">
                <div class="name size14 text-darkgray pointer" @click="$router.push({path:'/shopIndex',query:{shop_id:sto.shop_id}})">{{ sto.shop_name }}<br /><span class="size12 text-gray">好评率</span></div>
              </div>
            </div>
        </div>
        <div class="Propaganda m-t-md">
          <h4>要装修 上荣装网</h4>
          <div class="pg-subtitle">
            万家劳务公司为您打造最佳定制<br />在线担保交易  保障您的资金安全
          </div>
          <div class="propaganda-con">
            <i class="icon-pr01"></i>
            <dl>
              <dt>不懂装修？</dt>
              <dd>
                一对一客服服务，全程<br/>
                跟进解决装修疑惑
              </dd>
            </dl>
          </div>
          <div class="propaganda-con">
            <i class="icon-pr02"></i>
            <dl>
              <dt>担心设计不满意？</dt>
              <dd>
                分阶段确认设计，每个<br/>
                阶段修改至您满意为止
              </dd>
            </dl>
          </div>
          <div class="propaganda-con">
            <i class="icon-pr03"></i>
            <dl>
              <dt>不放心在线交易？</dt>
              <dd>
                荣装网免费帮您保障资金<br/>
                安全，满意了才付设计费
              </dd>
            </dl>
          </div>
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

  export default {
      name: "list",
      data() {
        return {
          ads:[],
          adsbanner:[],
          category:[],
          store:[],
          goods:[],
          goods2:[]
        }
      },
      components: {
        myhead,
        myfooter
      },
      mounted() {
        this.$ajax.get('shop/ads').then((response) => { //建材城首页广告
          if (response.status >= 200 && response.status < 300) {
            this.ads = response.data.data.app_shop_navi
            this.adsbanner = response.data.data.app_shop_banner
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/category').then((response) => { //商品分类列表
          if (response.status >= 200 && response.status < 300) {
            this.category = response.data.data
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/store').then((response) => { //店铺，合作伙伴
          if (response.status >= 200 && response.status < 300) {
            this.store = response.data.data
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/goods' + '?itemsPerLoad=6',
        {
          params: {
            'des_status' : '1'
        },
        },).then((response) => { //商品列表
          if (response.status >= 200 && response.status < 300) {
            this.goods = response.data.data
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/goods' + '?itemsPerLoad=10',
                      {
                        params: {
                          'lastIndex' : '7'
                        },
                      },).then((response) => { //商品列表
          if (response.status >= 200 && response.status < 300) {
            this.goods2 = response.data.data
          } else {
            console.log(response.message);
          }
        });
      }
  }
</script>

<style lang="less">
  @bg-color: #bd2032;
  .shoPbreadcrumbwrap { height: 40px; line-height:40px; background:#333;
    .el-breadcrumb { margin-left: 20px; line-height: 40px;}
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
    //广告
    .ad { margin-bottom: 10px;
      .el-col-6:last-of-type {
           .el-image {margin: 0;}
        }
      .el-image { margin-right: 20px;
        img { height: 150px;}
      }
    }
    //为您推荐
    .recommend { float:left; padding: 20px; width: 920px; background-color: #fff;
      h3 { margin-bottom: 10px; font-size: 18px;}
      .ranking { margin-right: 15px; background-color: #f7f7f7;
        h4 { height: 40px; line-height: 40px; font-size: 14px; text-align: center; color:#fff; background-color: @bg-color;}
        .rankingList { padding: 10px 20px;
          &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
          img { margin-top: 5px; width: 100px; height: 50px;}
          .el-image { float: left;}
          .rankingInfo { float: left; padding-left: 10px; width: 130px;
            .goods_name { width: 130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
          }
        }
      }
      .recommendList { margin: 0 10px 20px 10px; height: 232px;;
        .el-image { width: 100%; background-color: #f8f8f8;}
        img { height: 180px;}

      }
    }
    .shoprRight { float:right; width: 220px;;
      .Propaganda { padding-bottom:20px; background:#fff;
        h4 { padding:25px 0 15px 0; font-size:16px; color:#000; font-weight:700; text-align:center;}
        .pg-subtitle { padding-bottom:15px; font-size:12px; color:#666; text-align:center; border-bottom:1px dashed #eee;}
        .propaganda-con { padding:20px 10px; border-bottom:1px dashed #eee;
          &:last-child { border: 0;}
          dl { display:inline-block; font-size:12px; vertical-align:middle;}
          i { margin:0 8px; display:inline-block; width:22px; height:22px;}
          .icon-pr01 { background:url("~@/assets/img/construction/propaganda.png") no-repeat;}
          .icon-pr02 { background:url("~@/assets/img/construction/propaganda.png") no-repeat -22px 0;}
          .icon-pr03 { background:url("~@/assets/img/construction/propaganda.png") no-repeat -45px 0;}
        }
      }
      .Partner { padding: 10px 20px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        img { width: 40px;}
        .el-image { float: left;}
        .PartnerInfo { float: left; padding-left: 10px; width: 130px;}
      }

    }

</style>
