<template>
  <div style="width: 570px;  height: 350px;" class="clear">

    <div class="fl wrapper" style="margin-left: 220px; margin-top: 20px;">
      <p class="m-t size18 font-bold l-h-2x">
        为了您更好的浏览/支付/评论等体验，请下载 <span class="text-mainColor">易空间APP</span> 继续进行下一步操作哦！
      </p>

      <p class="gray size14" style=" margin-top: 30px;">
        易空间APP可以实时接受订单信息 功能更全，体验更佳！
      </p>

      <div class="fr text-c b-t-xxl">
        <p style="margin: 25px 0 5px 0;">
          扫描二维码下载
        </p>
        <img src="../assets/img/components/app.jpg" style="width: 120px; height: 120px;"/>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "downloadApp"
    }
</script>

<style scoped>
  .clear { background-image:url("../assets/img/components/app_down.png"); background-repeat: no-repeat; background-size: 200px 321px; background-position: left bottom};
</style>
