<template>
  <div >
      <div class="top" v-if="model">
        <nav-bar :imgUrl="model.user_img?model.user_img:''"></nav-bar>
      </div>
      <div class="uploadfile">
        <van-uploader :after-read="afterRead" preview-size="100vw" class="uploadImg" />
        <edit-banner left="头像" right="" >
            <template #right>
                <img :src="model.user_img" alt="" v-if="model.user_img" class="headerImg">
                <img src="@/assets/noface.jpg" alt="" v-else class="headerImg">
            </template>
        </edit-banner>
      </div>
     <edit-banner left="昵称" right="" @bannerClick="show=true">
         <template #right>
             <a href="#">{{model.name}}</a>
         </template>
     </edit-banner>
     <edit-banner left="账号" right="1">
        <template #right>
             <a href="">{{model.username}}</a>
        </template>
     </edit-banner>
     <edit-banner left="性别" :right="model.gender=='1'?'男':'女'" @bannerClick="gendershow=true"></edit-banner>
     <edit-banner left="个性签名" right="1" @bannerClick="gxshow=true"></edit-banner>
     
     <div class="back" @click="$router.back()">返回个人中心</div>

     <van-dialog v-model="show" title="昵称" show-cancel-button 
        @confirm="confirmClick" @cancel="content=''">
         <van-field v-model="content"  placeholder="请输入昵称" autofocus/>
    </van-dialog>

     <van-dialog v-model="gxshow" title="个性签名" show-cancel-button 
        @confirm="confirmGXClick" @cancel="gxcontent=''">
         <van-field v-model="gxcontent" type="textarea" placeholder="请输入个性签名" autofocus/>
    </van-dialog>



    <van-action-sheet v-model="gendershow" :actions="actions" cancel-text="取消"
    close-on-click-action @select="onSelect" />
  </div>
</template>

<script>
import navBar from '@/components/common/NavBar.vue'
import editBanner from '@/components/common/editBanner.vue'
export default {
    components:{
        navBar,editBanner
    },data() {
        return {
            model:{},
            show:false,
            gxshow:false,
            gendershow:false,
            gxcontent:'',
            content:'',
            actions:[{name:'男',val:1},{name:'女',val:0}]
        }
    },
    methods: {
        async selectUser(){
            const {data}=await this.$http.request({
                url:'/user/'+localStorage.getItem('id'),
                method:'get'
            })
            this.model=data[0]
        },
        async afterRead(file){
            const fromdata=new FormData()
            fromdata.append('file',file.file)
            const {data}=await this.$http.request({
                url:'/upload',
                method:'post',
                data:fromdata
            })
            this.model.user_img=data.url
            this.UserUpdate()
        },
        async UserUpdate(){
            const {data}=await this.$http.request({
                url:'/update/'+localStorage.getItem('id'),
                method:'post',
                data:this.model
            }) 
            if(data.code==200){
                this.$Toast.success("修改成功!")
            }
        },
        confirmClick(){
            this.model.name=this.content;
            this.UserUpdate();
            this.content="";
        },
        confirmGXClick(){
            this.model.user_desc=this.gxcontent;
            this.UserUpdate();
            this.gxcontent="";
        },
        onSelect(data){
            this.model.gender=data.val;
            this.UserUpdate();
            this.gendershow=false
        }
    },
    created() {
        this.selectUser()
    },
}
</script>

<style lang="less" scoped>
.top{
    margin-bottom: 3vw;
}
.uploadfile{
    position: relative;
    overflow: hidden;
    .uploadImg{
        position: absolute;
        opacity: 0;
    }
}
.back{
    margin-top: 3vw;
    padding: 4vw 0;
    text-align: center;
    width: 100vw;
    background: white;
}
</style>