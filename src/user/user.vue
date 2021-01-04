<template>
<div>
  <myhead></myhead>
  <div class="breadcrumbwrap">
    <div class="wrap pos-rlt">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user' }">账户中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="userTop">
    <div class="wrap">
       <div class="fl m-t-lg">
         <el-avatar :size="80" :src="userInfo.user_image" class="v-middle fl m-r-md"></el-avatar>
         <div class="fl m-t-sm">
           <strong><p class="size24 l-h-1-6x bbs_user_name">{{userInfo.user_name}}</p></strong>
           <p class="m-t-xs size14 text-gray">基本信息设置</p>
         </div>
       </div>
       <ul class="fl countFollow">
         <li>关注<strong class="m-l-sm">{{countFollow.count}}</strong></li>
         <li>收藏<strong class="m-l-sm">{{countCollect.count}}</strong></li>
       </ul>
       <div class="fr m-t-xxl">
         <span class="size16 pointer" @click="$router.push({path:'/userIndex'})">返回个人主页<i class="el-icon-arrow-right"></i></span>
       </div>
    </div>
  </div>
  <div class="wrap m-t-sm">
    <div class="userLeft">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-lock" @click="open"></i>
              <span slot="title" @click="open">修改登陆密码</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-phone-outline" @click="open"></i>
              <span slot="title" @click="open">修改手机号</span>
            </el-menu-item>
          </el-menu>
        </el-col>
    </div>
    <div class="userRight">
      <form @submit="modifySubmit">
        <ul class="infoform">
          <li><span class="fr pointer" @click="open"><el-avatar :size="30" :src="userInfo.user_image" class="v-middle fl m-r-md"></el-avatar></span>头像</li>
          <li><span class="fr text-gray">{{userInfo.phone}}</span>手机号</li>
          <li><div class="fr text-gray"><el-input v-model="name.real_name" value="sss"></el-input></div>账户名</li>
          <li><span class="fr text-gray"></span>性别</li>
        </ul>

        <div class="m-t-md">
          <el-button type="danger" class="w-full" native-type="submit">保存</el-button>
        </div>
      </form>
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
      name: "list",
      data() {
        return {
          userInfo:[],
          name:{
            real_name:''
          },
          countFollow:[],
          countCollect:[]
        }
      },
      components: {
        myhead,
        myfooter,
        comment,
        downloadApp
      },
      mounted() {
        document.cookie
        var token = this.$cookies.get("token")
        this.tokenData = token
        var Cparams= {
          'user_token' : this.tokenData,
        };
        var Captcha = Cparams; // 这里才是你的表单数据
        this.$ajax.post('consumer/getUserInfos',Cparams).then((response) => { //用户个人信息
          if (response.status >= 200 && response.status < 300) {
            this.userInfo = response.data.data
          } else {
            console.log(response.message);
          }
        });
        this.$ajax.post('consumer/countFollow', Cparams).then((response) => { //关注数量统计
            this.countFollow = response.data.data
        });
        this.$ajax.post('consumer/countCollect', Cparams).then((response) => { //关注数量统计
            this.countCollect = response.data.data
        });

      },
      methods: {
        //保存
        modifySubmit() {
              document.cookie
              var token = this.$cookies.get("token")
              this.tokenData = token
              var name= {
                'real_name' : this.name.real_name,
                'user_token' : this.tokenData,
              };
              var name = name; // 这里才是你的表单数据
              this.$ajax.post('consumer/setUserInfos', name).then((response) => {
                // success callback
                alert(response.data.msg)//接口返回信息
                console.log(response);
              }, (response) => {
                // error callback
                console.log(error);
              });
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
  .breadcrumbwrap { padding: 10px 0; line-height:24px; background:#333;
      .el-breadcrumb__item {
        span { color:#fff; font-size: 12px;}
        .el-breadcrumb__inner { color: #eee;}
      }
      .breadcrumbpic { position:absolute; bottom: -12px; right:0; width:342px; height:68px;}
    }
    .userTop { height: 140px; background: url("~@/assets/img/user/bg.jpg") repeat-x;
      .countFollow { margin: 50px 0 0 50px;
        &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        li { margin-right: 50px; float: left; font-size: 16px;}
      }
    }
    .userLeft { margin-right: 20px; padding: 30px 0; float:left; width: 180px; background-color: #fff;
      .el-menu { border: 0;}
    }
    .userRight { padding: 30px; float: right; width: 940px; background-color: #fff;
      .infoform {
        li { padding: 15px 0; font-size: 14px; border-bottom: 1px solid #eee;
          &:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
        }
      }
    }
</style>
