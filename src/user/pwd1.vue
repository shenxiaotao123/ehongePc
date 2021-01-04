<template>
<div>
  <myhead></myhead>
  <div class="breadcrumbwrap">
    <div class="wrap pos-rlt">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user' }">账户中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="userTop">
    <div class="wrap">
       <div class="fl m-t-lg">
         <el-avatar :size="80" :src="userInfo.user_image" class="v-middle fl m-r-md"></el-avatar>
         <div class="fl">
           <strong><p class="size24 l-h-1-6x bbs_user_name">{{userInfo.real_name}}</p></strong>
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
              <span slot="title" @click="$router.push({path:'/user'})">基本信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-lock"></i>
              <span slot="title">修改登陆密码</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-phone-outline"></i>
              <span slot="title">修改手机号</span>
            </el-menu-item>
          </el-menu>
        </el-col>
    </div>
    <div class="userRight">
       <el-steps :active="0" finish-status="success" simple style="margin-top: 20px;">
         <el-step title="第一步: 手机号验证"></el-step>
         <el-step title="第二步: 修改登录密码" ></el-step>
         <el-step title="完成" ></el-step>
       </el-steps>
       <div class="pdwWrap">
        <form @submit="onSubmit">
             <el-input v-model="sms.username" class="m-b-sm" type="tel" left-icon="phone-o" placeholder="手机号码" maxlength="11"></el-input>
             <div class="pos-rlt">
               <el-input v-model="sms.tel_code" class="m-b-sm" center clearable left-icon="qr" maxlength="6" type="text" placeholder="短信验证码"></el-input>
               <el-button type="text" class="Code" v-show="!sendCode">{{authTime}}秒</el-button>
               <el-button type="text" class="Code pointer" v-show="sendCode" @click="ObtainCode()">获取验证码</el-button>
             </div>

             <div class="m-t-md">
               <el-button type="danger" class="w-full" native-type="submit">下一步</el-button>
             </div>
        </form>
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
      name: "pwd1",
      data() {
        return {
          sms:{
            username:'',
            tel_code:'',
            type:'sms'
          },
           sendCode: true, // 控制发送验证码按钮显示
           authTime: 0, // 倒计时

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
        //短信.下一步
          onSubmit() {
                document.cookie
                var token = this.$cookies.get("token")
                this.tokenData = token
                var params= {
                  'username' : this.sms.username,
                  'tel_code' : this.sms.tel_code,
                  'user_token' : this.tokenData,
                  'type': 'sms'
                };
                var formData = params; // 这里才是你的表单数据
                this.$ajax.post('consumer/editPwdOne', formData).then((response) => {
                  // success callback
                  alert(response.data.msg)//接口返回信息

                }, (response) => {
                  // error callback
                  console.log(error);
                });
              },
          // 获取验证码
          ObtainCode () {
                this.sendCode = false  // 控制显示隐藏
                this.authTime = 60
                let timeInt = setInterval(() => {
                  this.authTime--
                  if (this.authTime <= 0) {
                    this.sendCode = true
                    window.clearInterval(timeInt)
                  }
                }, 1000)

                var Cparams= {
                  'phone' : this.sms.username,
                  'type' : 'oAuth',
                };
                var Captcha = Cparams; // 这里才是你的表单数据
                this.$ajax.post('consumer/getTelCode', Captcha).then((response) => {
                  // success callback
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
      .pdwWrap { margin: 50px auto; width: 300px;
        .Code { position: absolute !important; right: 25px; top:0;}
      }
    }
</style>
