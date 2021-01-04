<template>
<div>
  <myhead></myhead>
    <div class="headCon">
      <div class="dse-info">
        <div class="fl dse-infotext">
          <a target="_blank">
            <el-image shape="square" :src='store.logo_image' class="dse-avatar m-r-md"></el-image>
          </a>
          <div class="designer-info">
            <h3>
              <a target="_blank">
                <span class="designer-name">{{store.shop_name}}</span>
              </a>
            </h3>
            <ul class="designer-text">
              <li>
                <span class="con-title">主营业务</span>{{store.shop_category}}
                <span class="con-title m-l-xxl">{{store.address}}</span>
              </li>
              <li>
                <span class="con-title">销售品牌</span>{{store.brand}}
                <span class="con-title m-l-xxl">开店时间</span>{{store.created_at}}
              </li>
              <li class="Introduction">
                <span class="con-title">店铺简介</span>{{store.brief}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


  <div class="wrap">

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
              <el-image :src="goo.goods_thumb" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})"></el-image>
              <div class="name size14 text-darkgray">
                 <p class="goods_name m-t-xs m-b-xs" @click="$router.push({path:'/shopdetails',query:{spuid:goo.spu_id,shopid:goo.shop_id}})">{{ goo.goods_name }}</p>
                 <span class="size12 text-mainColor">￥{{goo.low_price}}</span>
                 <span class="size12 text-gray fr">已售: {{goo.sales_actual}}件 </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="text-c m-t-xxl">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
      <div class="shoprRight">

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
          goods:[],
          store:[]
        }
      },
      components: {
        myhead,
        myfooter
      },
      mounted() {
        this.$ajax.get('shop/store/'+ this.$route.query.shop_id + '?no_cached=1').then((response) => { //店铺
          if (response.status >= 200 && response.status < 300) {
            this.store = response.data.data
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.get('shop/goods' + '?itemsPerLoad=10').then((response) => { //商品列表
          if (response.status >= 200 && response.status < 300) {
            this.goods = response.data.data
          } else {
            console.log(response.message);
          }
        });
      }
  }
</script>

<style lang="less">
  @bg-color: #bd2032;
  @mian-color: #c82126;

.headCon { position: relative; height: 400px; background: url("~@/assets/img/construction/banner.jpg") no-repeat;
  .dse-info { position: absolute; left: 50%; top:50px; margin-left: -375px; padding:25px; width: 700px;
    &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
    .dse-avatar { float:left; width:160px; height:160px; border-radius: 5px; border: 3px solid #fff;}
    .dse-infotext {
      .designer-info { float:left; width: 514px;; color: #fff; text-shadow:#999 1px 1px 1px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        h3 { margin: 0 0 20px 0;
          .designer-name { font-size: 24px; font-weight: 700;}
        }
        .designer-text {
          li { margin:3px 0; font-size:14px; line-height: 180%;
            .con-title { margin-right: 15px; opacity: 0.8;}
          }
          .Introduction {display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 6; overflow: hidden;}
        }
      }
    }
    .designer-price { margin:10px 0; text-align:center; font-size: 12px;
      .size24 { margin-right: 5px; font-weight:700; color:@mian-color;}
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

    }

</style>
