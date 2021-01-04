<!--评价-->
<template>
  <div class="compCon bg-ff">
    <div class="allcomment">
      <div class="scoreList" v-for="rep of reply.slice(0,8)">
        <h6>
          <span class="m-l text-gray fr size12">{{rep.created_at}}</span>
          <el-avatar :size="14" :src="rep.comment_user_image" class="v-middle"></el-avatar>
          {{rep.comment_user_name}}
        </h6>
        <div class="scoreCon size12 wrapper-sm">
          <span class="text-gray m-r-xs">回复<span class="text-mainColor">{{rep.to_user_name}}</span>：</span>{{rep.com_content}}
        </div>
      </div>
    </div>

  <!--没有评价的情况-->
  <div class="noComment" id="noComment">
    <img src="@/assets/img/zanwu.png"/>
    <p class="m-t-md size14">
      没有相应的回答
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
    data() {
     return {
       reply:[]
     }
   },
    methods: {

    },
    mounted () {
      this.$ajax.get('bbs/comment?bbs_id=' + this.$route.query.id + '?no_cached=1').then((response) => { //攻略详情页
        if (response.status >= 200 && response.status < 300) {
          this.reply = response.data.data
        } else {
          console.log(response.message);
        }
      });
    }
  }
</script>

<style lang="less">
  .el-tabs__header { padding: 0 20px;}
  .el-tabs__item { height: 50px; line-height: 50px; }
  .el-tabs__nav-wrap::after { display: none;}
  .compCon {
    .scoreList { padding: 15px 0 10px 0; border-bottom: 1px solid #eee;
      h6 { font-weight: 300;}
    }
  }
  .noComment { padding-bottom: 20px; text-align: center; color: #999; display: none;
      img { margin-top: 30px;}
  }
  .commentMedium{
    width: 12.5vw;
    text-align: right;
    background-repeat: no-repeat;
    background-image: url("~@/assets/img/components/medium.png");
    background-size: 34%;
    color: #FF7E00;
  }
  .comment{
    clear: both;
    border-bottom: 1px solid #eee;
    padding: 5vw 0;
  }

</style>
