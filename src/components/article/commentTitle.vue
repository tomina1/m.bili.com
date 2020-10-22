<template>
  <div class="comment">
      <p class="comment-title">
          <span>评论</span>
          <span>({{dataLength}})</span>
      </p>
      <div class="commentMyinfo">
          <img :src="myuser.user_img" alt="" v-if="myuser.user_img">
          <img src="@/assets/noface.jpg" alt="" v-else>
          <input type="text" v-model="comcontent" placeholder="说点什么吧" ref="Postipt">
          <button @click="commentPublish">发表</button>
      </div>
  </div>
</template>

<script>
export default {
  props:['dataLength'],
    data() {
        return {
            myuser:()=>{},
            comcontent:''
        }
    },
    methods: {
        async myUserinfo(){
           const res=await this.$http.request({
                url:'/user/'+localStorage.getItem('id'),
                method:'get'
            })
            this.myuser=res.data[0]
        },
        commentPublish(){
          if(!this.myUserinfo && !localStorage.getItem('token') && !localStorage.getItem('id')){
            this.$Tosat.fail('请先登录!')
            return
          }
          this.$emit('Postcomment',this.comcontent)
          this.comcontent="";
        },
        focusInpt(){
          this.$refs.Postipt.focus()
        }
    },
    created() {
      if(localStorage.getItem('token')){
        this.myUserinfo()
      }
    },
}
</script>

<style lang="less" scoped>
.comment{
  padding: 3vw 1vw 0 1vw;
  .comment-title{
    span:nth-child(2){
      color: #aaa;
      margin-left: 1vw;
    }
  }
  .commentMyinfo{
    display: flex;
    align-items: center;
    background: white;
    img{
      height:10vw;
      width: 10vw;
    }
    input{
      outline: none;
      border: 0;
      background: #f4f4f4;
      border-radius: 1.5vw;
      font-size: 4vw;
      padding:2vw 2vw 0 1.5vw ;
      margin-left: 1vw;
    }
    button{
      color: white;
      border: none;
      background: #fb7299;
      border-radius: 4vw;
      padding:1vw 4vw ;
    }
  }
}

</style>