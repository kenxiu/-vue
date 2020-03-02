<template>
  <div class="login-form">
    <div class="g-form">
      <form>
        <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
            <input autocomplete=’tel’ type="text" style="display" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <!-- 验证 -->
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
            <input autocomplete=’tel’ type="password" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <!-- 验证 -->
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a href="" class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{ errorText }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText:''
    }
  },
  // 计算属性关联v-model和error
  computed: {
    userErrors () {
      let errorText,status
      // userErrors根据usernameModel返回对应的值
      // 使用正则验证用户输入的值是否包含@
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@'
      }
      else {
        status = true
        errorText = ''
      }
      // 通过userFlag判断是否是第一次进入userErrors计算里面
      // 第一次进入，userFlag没有的时候，errorText为空
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let errorText,status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    onLogin () {
      // console.log(this.usernameModel,this.passwordModel)
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
        console.log('未通过')
      } else {
        this.errorText= ''
        //这需要将用户名和密码传入给接口，但是以下json数据，以后如果有接口就可以这么做
      // let value={
      //   username:this.usernameModel,
      //   password:this.passwordModel
      // }
   
        // this.$emit('haveLog',value)
        this.$http.get('http://localhost:8080/static/db.json')
        .then((res) => {
          // console.log('kkkkk',res)
          // this.$emit发送一个has-log事件
          // this.$emit('has-log',this.userErrors,this.passwordErrors)
          this.$emit('has-log',res.data)
        },(error) => {
          console.log(error)
        })
        // console.log('通过')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.button {
  display: inline-block;
  background: #4fc08d;
  color: #fff;
  text-decoration: none;
  width: 94px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
