<template>
  <div>
      <myhead></myhead>
       <div class="login pos-rlt">
          <div class="loginForm">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="账号注册" name="second">
                  <form @submit="onSubmit">
                       <el-input v-model="sms.username" class="m-b-sm" type="tel" left-icon="phone-o" placeholder="手机号码" maxlength="11"></el-input>
                       <div class="pos-rlt">
                         <el-input v-model="sms.tel_code" class="m-b-sm" center clearable left-icon="qr" maxlength="6" type="text" placeholder="短信验证码"></el-input>
                         <el-button type="text" class="Code" v-show="!sendCode">{{authTime}}秒</el-button>
                         <el-button type="text" class="Code" v-show="sendCode" @click="ObtainCode()">获取验证码</el-button>
                       </div>
                       <el-input placeholder="请输入密码" class="m-b-sm" v-model="sms.password" show-password></el-input>
                       <el-input placeholder="请重复输入密码" class="m-b-sm" v-model="sms.repassword" show-password></el-input>

                       <div class="m-t-md">
                         <el-button type="danger" class="w-full" native-type="submit">注册</el-button>
                       </div>
                  </form>
                </el-tab-pane>

            </el-tabs>
            <div class="size12 m-t-md text-gray">
              <span class="fl pointer" @click="open">忘记登录密码？</span>
              <span class="fr pointer" @click="$router.push({path:'/login'})">已有账号？立即登录</span>
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
            password:'',
            repassword:''
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
      mounted() {

      },
      methods: {
        //短信登录
        onSubmit() {
              var params= {
                'username' : this.sms.username,
                'tel_code' : this.sms.tel_code,
                'password' : this.sms.password,
                'repassword' : this.sms.repassword
              };
              var formData = params; // 这里才是你的表单数据
              this.$ajax.post('consumer/reg/2', formData).then((response) => {
                // success callback
                var code = response.data.code
                if(code==0){ //注册成功
                  this.$message.error(response.data.msg)//接口返回信息
                  this.$router.push({path:'/login'})
                }
                else{
                  this.$message.error(response.data.msg)//接口返回信息
                }
                console.log(response);
              }, (response) => {
                // error callback
                console.log(error);
              });
            },
        // 获取验证码
        ObtainCode () {
              var Cparams= {
                'phone' : this.sms.username,
                'type' : 'oAuth',
              };
              var Captcha = Cparams; // 这里才是你的表单数据
              this.$ajax.post('consumer/getTelCode', Captcha).then((response) => {
                var codedata = response.data.code
                if(codedata == 0){
                	this.sendCode = false  // 控制显示隐藏
                	this.authTime = 60
                	let timeInt = setInterval(() => {
                	  this.authTime--
                	  if (this.authTime <= 0) {
                	    this.sendCode = true
                	    window.clearInterval(timeInt)
                	  }
                	}, 1000)
                }
                if(codedata == 1){
                	this.$message.error(response.data.msg);
                }
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
