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
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>


  <div class="wrap">
    <div class="filter">
        <div class="fi-wrap">
          <div class="fi-key">建材分类：</div>
          <div class="fi-value">
            <ul class="fi_valueList">
               <li :class="activeClass == index ? 'active':''" v-for="(type,index) of category" @click="router(type.id),getItme(index)">{{type.category_name}}</li>
            </ul>
          </div>
        </div>


      </div>

    <div class="wrap m-t-sm">
      <div class="sort">
          <a href="#" class="active">
           综合排序<i class="el-icon-caret-bottom"></i>
          </a>
          <a href="#">
           销量<i class="el-icon-caret-bottom"></i>
          </a>
          <a href="#">
           评分<i class="el-icon-caret-bottom"></i>
          </a>
          <a href="#">
           价格<i class="el-icon-caret-bottom"></i>
          </a>
      </div>
      <div class="recommend">
        <el-row>
          <el-col :span="8" v-for="goo of goods">
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
        <div class="text-c m-t-xxl">
          <span class="size12 text-lightgray pointer m-l-sm m-r-sm font-bold" @click="prev()" id="prev"><i class="el-icon el-icon-arrow-left"></i>上一页</span>
          <span class="size12 text-lightgray pointer m-l-sm m-r-sm font-bold" @click="next()" id="next">下一页<i class="el-icon el-icon-arrow-right"></i></span>
        </div>
      </div>
      <div class="shoprRight">
        <el-image class="pointer" :src="rightSrc"></el-image>
        <div class="Propaganda m-t-sm">
          <h4>买建材 上荣装网</h4>
          <div class="pg-subtitle">
            千万实体店为您打造最佳定制<br />在线担保交易  保障您的资金安全
          </div>
          <div class="propaganda-con">
            <i class="icon-pr01"></i>
            <dl>
              <dt>不懂家居建材？</dt>
              <dd>
                千万店铺在线比对<br/>
                跟进解决家居装修疑惑
              </dd>
            </dl>
          </div>
          <div class="propaganda-con">
            <i class="icon-pr02"></i>
            <dl>
              <dt>担心线上选不满意？？</dt>
              <dd>
                实体店进店体验<br/>
                线上的价格，线下的体验服务
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
  import shopAd from '@/assets/img/shop/ad.jpg'
  export default {
      name: "list",
      data() {
        return {
          rightSrc: shopAd,
          ads:[],
          adsbanner:[],
          category:[],
          brand:[],
          goods:[],
          // 每页显示数量
          page: 0,
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
        this.$ajax.get('shop/brand').then((response) => { //品牌分类
          if (response.status >= 200 && response.status < 300) {
            this.brand = response.data.data
          } else {
            console.log(response.message);
          }
        });
        var category_id = this.$route.query.category_id
        this.$ajax.get('shop/goods' + '?category_id=' + category_id ).then((response) => { //商品列表
            this.goods = response.data.data
        });
      },
      methods: {
          router(category_id){ //获取建材分类的ID
            //console.log(category_id);
            this.$ajax.get('shop/goods' + '?category_id=' + category_id ).then((response) => { //商品列表
                this.goods = response.data.data
            });
          },
          getItme(index) {
            this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
          },
          
          next(){
            var category_id = this.$route.query.category_id
            var next = this.page++ + 10;
            this.page = next
            if(next >= 1) {
              var child = document.getElementById("prev");
              child.style.display = 'inline-block';
            }
            this.$ajax.get('shop/goods' + '?category_id=' + category_id, {
              params: {
                lastIndex:next,
                itemsPerLoad : 10
              },
            },).then((response) => { 
                this.goods = response.data.data
                if(response.data.data.length==0){
                  var child = document.getElementById("next");
                  child.style.display = 'none';
                  var child = document.getElementById("noComment");
                  child.style.display = 'block';
                  return
                }

            });
          },
          prev(){
            var category_id = this.$route.query.category_id
            var prev = this.page - 10;
            this.page = prev
            if(prev <= 0) {
              var child = document.getElementById("prev");
              child.style.display = 'none';
            }
             if(prev >= 1) {
              var child = document.getElementById("prev");
              child.style.display = 'inline-block';
            }
            this.$ajax.get('shop/goods' + '?category_id=' + category_id, {
              params: {
                lastIndex:prev,
                itemsPerLoad : 10
              },
            },).then((response) => { //设计师列表
                this.goods = response.data.data
                if(response.data.data.length>0){
                  var child = document.getElementById("next");
                  child.style.display = 'inline-block';
                  var child = document.getElementById("noComment");
                  child.style.display = 'none';
                  return
                }
            });
          },
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
  .filter { padding:35px 35px 25px 35px; background:#fff; font-size:12px;
      .fi-wrap { margin-bottom:10px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        .fi-key { float: left;  padding: 3px 10px; color: #000; font-weight:700;}
        .fi-value { padding-right: 30px; padding-left: 10px; overflow: hidden; zoom: 1;
          .fi_valueList {
            &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
            li { float:left; margin:0 20px 0 0; padding:3px 10px; cursor: pointer;
              a { display:block;}
              .active { background:@mian-color; color:#fff; border-radius:3px; }
            }
          }
        }
      }
    }
    .sort { margin: 10px 0; height:38px; line-height:38px; background: #fff; border:1px solid #eee;
      a { display: inline-block; padding:0 20px; color:#888; font-size:12px; border-right: 1px solid #eee;
      }
      .active { color:@mian-color;}
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
.noComment { text-align: center; color: #999; display: none;
      img { margin-top: 30px;}
  }
</style>
