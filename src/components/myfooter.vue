<template>
  <div class="m-t-xxl footer">
    <div class="wrap">
      <div class="link">
        友情链接：
        <a href="http://www.zjlhcz.com/" class="m-r" target="_blank">联合创展官网</a>
        <a href="https://www.rongzw.com/" class="m-r" target="_blank">荣装网</a>
      </div>
      <div class="foo-left">
        <div class="foo-tel">客服热线：400-622-1988</div>
        <div class="foo-address">总部地址：浙江省丽水市莲都区绿谷信息产业园MT新嬉里816室</div>
        <div class="foo-nav">
          <a href="#" target="_blank">了解我们</a>
          <a href="#" target="_blank">联系我们</a>
          <a href="#" target="_blank">加入我们</a>
          <a href="#" target="_blank">平台荣誉</a>
          <a href="#" target="_blank">新浪微博</a>
          <a href="#" target="_blank">投诉建议</a>
          <a href="#" target="_blank">招商入口</a>
        </div>
        <div class="copyright">
          <p>网站所有文字、图片、数据仅供参考，因不同客户的个性需求不同，所有内容以客户最终签订的合同为准</p>
          <p><a class="text-gray m-r-sm" href="https://beian.miit.gov.cn" target="_blank">浙ICP备14007572号-4</a><span class="m-r-sm">公安备案号33110202000576</span>  Copyright @2021 浙江联合创展科技股份有限公司 版权所有</p>
        </div>
      </div>
      <ul class="foo-right">
        <li><img src="@/assets/img/components/app.jpg" alt=""><p>易空间APP下载</p></li>
        <li><img src="@/assets/img/components/wx.jpg" alt=""> <p>易空间微信公众号</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myfooter"
    }
</script>

<style lang="less">
  .footer { padding-bottom: 50px; color: #454545;
    &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
    .link { height: 50px; line-height: 50px; font-size: 12px; border-bottom: 1px solid #eee;
      a { color: #454545; text-decoration: none;}
    }
    .foo-left { padding-top: 20px; float:left; color:#484848; font-size:12px;
      .foo-nav { line-height: 50px;
        a { margin-right:15px; color:#484848; line-height:1.8;}
      }
      .foo-tel,.foo-address { line-height:1.8;}
      .copyright { color: #999; line-height: 1.8;}
    }
    .foo-right { padding-top: 20px; float:right;
      li { margin-left:25px; float:left;
        img { width:104px; height:104px;}
        p { text-align:center; line-height:30px; color:#999; font-size:12px;}
      }
    }
  }
</style>
