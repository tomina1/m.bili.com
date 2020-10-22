<template>
<div class="btnparent" @click="registerClick">
  <div>
      <div class="loginbtn">{{btntext}}</div>
  </div>
</div>
</template>

<script>
export default {
    props:['btntext'],
    methods: {
        registerClick(){
            this.$emit('registerSubmit')
        }
    },
}
</script>

<style lang="less">
.loginbtn{
    height: 12vw;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.5vw;
    border-radius: 6.25vw;
}
</style>
