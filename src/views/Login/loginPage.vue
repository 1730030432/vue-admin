<template>
  <div id="login">
   <div class="loginn-wrapper">
      <ul class="menu-tab">
        <li v-for="item in meusTabs" :key="item.id" :class="{'current':item.current}" @click="toggleMeus(item)">{{ item.txt }}</li>
      </ul>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form" size="medium">
          <el-form-item prop="username" class="login-form-item">
            <label for="username">邮箱</label>
            <el-input type="email" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password" class="login-form-item">
            <label for="password">密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item  prop="checkPassword" class="login-form-item" v-show="model=='register'">
            <label for="checkPassword">确认密码</label>
            <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item  prop="code" class="login-form-item">
            <label for="code">验证码</label>
            <el-row :gutter="10" style="width:105%">
              <el-col :span="15"> 
                <el-input v-model.number="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="form-btn block">{{ subtxt }}</el-button>
          </el-form-item>
      </el-form>
   </div>
  </div>
</template>

<script>
import { strScript,emailRule,codeRule,passwordRule } from '@/utils/validate'
export default {
  name:'loginPage',
  data(){
    var validateCode = (rule, value, callback) => {
        if (value==='') {
          return callback(new Error('请输入验证码'));
        }else if(codeRule(value)){
          callback(new Error("验证码格式错误(6位数字)"))
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(emailRule(value)){
          callback(new Error("用户名格式错误"))
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        this.ruleForm.password = strScript(value)
        value = this.ruleForm.password 
        console.log(value)
        console.log(passwordRule(value),'55')
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(passwordRule(value)){
          callback(new Error("密码格式错误(6至20位密码字母加数字)"))
        }else {
          callback();
        }
      };
      var validateCheckpass = (rule, value, callback) => {
        this.ruleForm.checkPassword = strScript(value)
        value = this.ruleForm.checkPassword 
        if(this.model == 'login'){
          return callback() 
        }
        if(this.ruleForm.password === ''){
          callback(new Error("请先输入密码"))
        }else if(this.ruleForm.password !== value){
          callback(new Error("两次密码输入不一致"))
        }else {
          callback();
        }
      };
    return{
      meusTabs:[
        {txt:'登录',current:true,type:'login'},
        {txt:'注册',current:false,type:'register'}
      ],
      model:'register',
      subtxt:'登录',
      ruleForm: {
          username: '',
          password: '',
          checkPassword:'',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validateCheckpass, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    toggleMeus(item){
        this.meusTabs.forEach((item)=>{item.current=false})
        item.current = true
        this.model = item.type
        if(this.model=='register'){
          this.subtxt = '注册'
        }else{
          this.subtxt = '登录'
        }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
}
</script>

<style lang="scss">
#login {
  background: #344a5f;
  width: 100%;
  height: 100vh;
  margin-bottom: 3px;
}

.loginn-wrapper {
        width: 330px;
        margin: auto;
        padding-top: calc(100vh / 7);
}

.menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            color: white;
            font-size: 14px;
            border-radius: 2px;
            cursor: pointer;

            &.current {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      font-size: 14px;
      color: white;
    }
    .login-form-item {
      margin-bottom: 13px;
    }
    .block {
      display: block; 
      width: 100%;
    }
    .form-btn {
      margin-top: 20px;
      height: 45px;
    }
  }
</style>

