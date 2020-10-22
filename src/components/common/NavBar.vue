<template>
  <div class="navBar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/logo.gif" alt=""/>
    </div>
    <div>
      <p>
        <van-icon name="search" />
        请输入内容
      </p>
    </div>
    <div>
      <!-- <img :src="@/assets/logo.gif" alt=""/> -->
      <div>
        <img :src="imgUrl" alt="" v-if="imgUrl" @click="toUserInfo">
        <img src="@/assets/noface.jpg" alt="" v-else @click="$router.push('/login')">
      </div>
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['imgUrl'],
  methods: {
    toUserInfo(){
      if(!(this.$route.fullPath=="/userInfo")){
        this.$router.push({path:'/userInfo'})
      }
    }
  },

}
</script>

<style lang="less" scoped>
.navBar{
  padding: 1.5vw 0;
  height: 10vw;
  background: white;
  display: flex;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12vw;
    img{
      width: 80%;
      height: 80%;
    }
  }
    div:nth-child(2){
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      p{font-size: 3vw;
        background: #f4f4f4;
        padding: 1vw 0;
        width: 90%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding-left: 5%;
        opacity: 0.7;
        .van-icon{
          font-size: 5vw;
        }
      }
  }
  div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 7vw;
      width: 7vw;
    }
    p{
      font-size: 3vw;
      padding: 0 10px;
      background: #fb7299;
      color: white;
      border-radius: 3px;
      margin: 0 1vw;
    }
  }
}

</style>