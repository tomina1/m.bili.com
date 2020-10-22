<template>
    <div class="userInfo">
        <nav-bar :imgUrl="model.user_img?model.user_img:''"></nav-bar>
        <img src="@/assets/bannerTop_new.png" class="backImg"/>
        <div class="">
            <user-detail :userInfo="model"></user-detail>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import userDetail from '@/components/userComponents/userDetail.vue'
export default {
    //主要是处理业务，而不是css
    components:{
        NavBar,userDetail
    },data() {
        return {
            model:{}
        }
    },
    methods: {
        async userinfoData(){
            //const res=await this.$http.get('/user/'+localStorage.getItem('id'))
            const res=await this.$http.request({
                url:'/user/'+localStorage.getItem('id'),
                method:'get'
            })
            //console.log(res)
            this.model=res.data[0];
            //console.log(this.model)
        }
    },
    created() {
        this.userinfoData()
    },
}
</script>

<style lang="less">
.userInfo{
    .backImg{
        height: 40vw;
        width: 100vw;
    }
}
</style>