<!--评价-->
<template>
  <div class="compCon bg-ff">
  <div class="all medium">
    <div class="scorenavBox">
      <div class="fr">好评率 %</div>
      <ul class="scorenav">
        <li class="fontcolor">全部 </li>
        <li>好评 </li>
        <li>中评 </li>
        <li>差评 </li>
        <li class="fr">好评率 %</li>
      </ul>

      </div>
    <div class="allcomment">
      <div class="scoreList">
        <h6>
          <span class="fr commentGood">好评</span>
          <el-avatar :size="14" class="v-middle"></el-avatar>
          面子
          <span class="m-l text-gray">2020-05-14 17:54</span>
        </h6>
        <div class="scoreCon size12 wrapper-sm">
          评论内容评论内容评论内容评论内容评论内容评论内容
        </div>
      </div>


  
    </div>
  </div>
  <!--没有评价的情况-->
  <div class="noComment">

    <img src="@/assets/img/zanwu.png"/>
    <p class="m-t-md size14">
      没有相应的评价
    </p>
    <p class="m-t-xs size14">
      看看其他的~
    </p>
  </div>
  </div>
  <!--没有评价的情况-->
</template>

<script>
  export default {
    name: 'Comment',
    data: function () {
      return {
      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

<style lang="less">
  .el-tabs__header { padding: 0 20px;}
  .el-tabs__item { height: 50px; line-height: 50px; }
  .el-tabs__nav-wrap::after { display: none;}
  .compCon { padding: 45px;
    .scorenavBox { padding: 5px 20px; background: #f7f7f7; font-size: 14px;
      .scorenav {
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        li { padding: 0 10px; float: left;}
      }
    }
    .scoreList { padding: 20px 0; border-bottom: 1px solid #eee;
      h6 { font-weight: 300;}
      .commentGood{ width: 40px;  text-align: right;  background-repeat: no-repeat;  background-image: url("~@/assets/img/components/good.png"); background-size: contain;  color: #DD1A21;}
    }
  }
  .noComment { text-align: center; color: #999;
      img { margin-top: 30px;}
  }


</style>
