<template>
    <div>
        <login-top middleTop="注册bilibili">
            <template #right>
                <div @click="$router.push('/login')">
                    登录
                </div>
            </template>
        </login-top>
        <login-text label="姓名"
        style="margin:2vh 0"
        placeholder="请输入姓名"
        rule="^.{6,16}$"
        @inputchange="content=>model.name=content"
        />
        <login-text label="账号"
        placeholder="请输入账号"
        rule="^.{6,16}$"
        @inputchange="content=>model.username=content"
        />
        <login-text label="密码"
        placeholder="请输入密码"
        type="password"
        rule="^.{6,16}$"
        @inputchange="content=>model.password=content"
        />
        <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
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
    props:[],
    data() {
        return {
            model:{
                name:'',
                username:'',
                password:'',
            }

        }
    },
    computed:{

    },
    methods: {
        async registerSubmit(){
            let rulg=/^.{6,16}$/
            if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
                //如果没有空  说明都校验成功了
                // console.log('ok')
               let res= await this.$http.post('/register',this.model)
               localStorage.setItem('id',res.data.id)
               localStorage.setItem('token',res.data.objtoken)
               this.$Toast.success('登录成功成功');
               console.log(1)
               setTimeout(() => {
                   this.$router.push('userinfo')
               }, 1000);
            }else{
                this.$Toast.fail('格式不正确,请重新输入');
            }
        }
    },
}
</script>
<style lang="less" scoped>

</style>