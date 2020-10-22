<template>
   <div>
        <login-top middleTop="登录bilibili">
            <template #right>
                <div @click="$router.push('/register')">
                    注册
                </div>
            </template>
        </login-top>
        <login-text label="账号"
        placeholder="请输入账号"
        style="margin:4vw 0"
        rule="^.{6,16}$"
        @inputchange="content=>model.username=content"
        />
        <login-text label="密码"
        placeholder="请输入密码"
        type="password"
        rule="^.{6,16}$"
        @inputchange="content=>model.password=content"
        />
        <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>
        <!-- <div @click="$router.push('/userInfo')">
                    注册
                </div>
        <router-view></router-view> -->
    </div>
</template>

<script>
import loginTop from '@/components/common/Login'
import loginText from '@/components/common/LoginText'
import loginBtn from '@/components/common/LoginBtn'
export default {
        components:{
        loginTop,loginText,loginBtn
    },
    data() {
        return {
            model:{
                username:'',
                password:'',
            }

        }
    }, 
     methods: {
        async registerSubmit(){
            let rulg=/^.{6,16}$/
            if(rulg.test(this.username) && rulg.test(this.password)){
                //如果没有空  说明都校验成功了
                // console.log('ok')
                let res= await this.$http.request({
                    url:'/login',
                    method:'post',
                    data:this.model
                })
                console.log(res.data)
                this.$Toast.fail(res.data.msg);
                localStorage.setItem('id',res.data.id)
                localStorage.setItem('token',res.data.token)
                setTimeout(() => {
                    this.$router.push('/userInfo')
                }, 1000);
            //    this.$Toast.success('登录成功成功');
            }else{
                this.$Toast.fail('账号或密码错误');
            }
        }
    },
}
</script>

<style>

</style>