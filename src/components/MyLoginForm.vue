<template>
  <div class="my-login-form">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" class="captach-box">
        <el-input type="test" v-model="ruleForm.captcha" autocomplete="off">
          <el-button :disabled="captchaState.disabled" slot="append" @click="sendCaptcha">{{captchaState.title}}</el-button>
        </el-input>
          
      </el-form-item>
      <div style="clear:both"></div>
      <el-form-item class="submit-box">
        <el-button type="primary" class="sbt" @click="submitForm('ruleForm')">{{submitBtnTitle}}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "MyLoginForm",
  props: {
    // captchaCheck:{
    //   type:Boolean,
    //   default:true,
    // },
    captchaState:{
      type:Object,
      default:{}
    },
    submitBtnTitle:{
      type:String,
      default:'提交'
    },
    resetTrigger:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      // console.log(rule,value)
        let boo=false;
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if(this.ruleForm.phone !== '' && /^1[3-9]\d{9}$/.test(value)){
          // if (this.ruleForm.phone !== '') {
            // console.log(value, this.ruleForm.phone)
            console.log('手机验证通过')
            // this.$refs.ruleForm.validateField('phone');
          // }
        }else{
          callback(new Error('手机号格式有误'));
        }
          callback();
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.pass !== '' && /^[\w,.-@][\w,.-@]{5,15}$/.test(value)) {
            // this.$refs.ruleForm.validateField('pass');
            console.log('密码验证通过')
          }
          else{
          callback(new Error('请输入6-16位密码'));
          }
          callback();
        }
      };

      var validateCaptcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          if (this.ruleForm.captcha == '' || this.ruleForm.captcha.length!=4) {
            // this.$refs.ruleForm.validateField('pass');
          callback(new Error('请输入4位验证码'));
          }
          // else if(this.ruleForm.captcha !== '' && this.ruleForm.captcha.length==4 && this.captchaCheck){
          //   console.log(验证码验证通过);
          // }
          else if(this.captchaState.captchaRes){
            console.log('验证码验证通过');
          }else{
          callback(new Error('验证码错误'));
          }
          callback();
        }
      };
      
      // var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else if (value !== this.ruleForm.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };


    
    return {
      ruleForm: {
        phone: "",
        pass: "",
        captcha:""
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
    };
  },

  watch:{
    resetTrigger:function(newValue){
      if(!newValue){
        this.resetForm('ruleForm');
      }
    }
  },

  created() {},
  methods: {
    //   提交表单
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            console.log({phone:this.ruleForm.phone,pass:this.ruleForm.pass,captcha:this.ruleForm.captcha})
            this.$emit('submitLogin',{phone:this.ruleForm.phone,pass:this.ruleForm.pass,captcha:this.ruleForm.captcha});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      sendCaptcha(){
        this.$emit('sendCaptcha',this.ruleForm.phone);
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style lang="less" scoped>
.my-fl{
  float: left;
}
.my-fr{
  float: right;
}
.captcha-box{
  width: 400px;
}
.el-button{
  width: 128px;
  padding: 12px;
}
.sbt{
  // background-color: ;
  width: 50%;
  margin-left: 25%;
}
.submit-box{
  /deep/ .el-form-item__content{
    margin-left:0 !important;
  }
}
</style>