<template>
  <div>
      <myhead></myhead>
       <div class="login pos-rlt">
          <div class="loginForm">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="短信验证码登录" name="second">
                  <form @submit="onSubmit">
                       <el-input v-model="sms.username" class="m-b-sm" type="tel" left-icon="phone-o" placeholder="手机号码" maxlength="11"></el-input>
                       <div class="pos-rlt">
                         <el-input v-model="sms.tel_code" class="m-b-sm" center clearable left-icon="qr" maxlength="6" type="text" placeholder="短信验证码"></el-input>
                         <el-button type="text" class="Code" v-show="!sendCode">{{authTime}}秒</el-button>
                         <el-button type="text" class="Code pointer" v-show="sendCode" @click="ObtainCode()">获取验证码</el-button>
                       </div>

                       <div class="m-t-md">
                         <el-button type="danger" class="w-full" native-type="submit">登录</el-button>
                       </div>
                  </form>
                </el-tab-pane>

            </el-tabs>
            <div class="size12 m-t-md text-gray">
              <span class="fl pointer" @click="open">忘记登录密码？</span>
              <span class="fr pointer" @click="$router.push({path:'/reg'})">还没有账号？立即注册</span>
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
      name: "login",
      data() {
        return {
          sms:{
            username:'',
            tel_code:'',
            type:'sms'
          },
           sendCode: true, // 控制发送验证码按钮显示
           authTime: 0, // 倒计时
           activeName: 'second', //Tab
        }
      },
      components: {
        myhead,
        myfooter,
        comment,
        downloadApp
      },
      created() {


            },
      mounted() {

      },
      methods: {
        //短信登录
        onSubmit() {
              var params= {
                'username' : this.sms.username,
                'tel_code' : this.sms.tel_code,
                'type': 'sms',
                'port': 'pc',
              };
              var formData = params; // 这里才是你的表单数据
              this.$ajax.post('consumer/login', formData).then((response) => {
                // success callback
                //alert(response.data.msg)//接口返回信息
                //console.log(response);
                //沒有token的情況
                  this.$cookies.isKey('token')
                  console.log('没有token')
                  this.$cookies.set('token', response.data.data.token,60*60*24*30)
                  this.$cookies.set('ykj_name', response.data.data.real_name,60*60*24*30)
                  this.$cookies.set('user_image', response.data.data.user_image,60*60*24*30)
                  console.log(response.data.data.token)
                  document.cookie
                  var realname = this.$cookies.get("real_name")
                  this.realnameData = realname
                  this.$router.push({path:'/userIndex'})
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
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //点击APP引导弹出框
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
  .login { height: 500px; background: url("~@/assets/img/login/bg.jpg") no-repeat center;
    .loginForm { position: absolute; left:50%; top: 50px; margin-left: 240px; padding: 20px 30px 30px 30px; width: 300px; background-color: #fff; border-radius:5px; box-shadow: #eee 10px 10px 0;
      .Code { position: absolute !important; right: 25px; top:0;}
      .el-tabs__item { height: 50px; line-height: 50px; font-size: 16px; font-weight: 700;}
      .el-tabs__nav-wrap::after { height: 0;}
    }
  }
</style>
