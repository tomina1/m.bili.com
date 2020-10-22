<template>
  <div @click="push">
      <div class="detailItem">
          <div>
          <img :src="detailItem.img" alt="" style="width:100%">
            <span class="video">1233</span>
            <span class="comment">123</span>
          </div>
          </div>
          <p>{{detailItem.name}}</p>
      </div>
  <!-- </div> -->
</template>

<script>
export default {
    props:['detailItem'],
    methods: {
        push(){
            if(this.$route.path!='/article/'+this.detailItem.id+''){
                this.$router.push('/article/'+this.detailItem.id+'')
            }
        }
    },
}
</script>

<style lang="less" scoped>
.detailItem{
    font-size: 3.5vw;
    background: white;
    position: relative;
        .video{
            position: absolute;
            left:0;
            bottom: 0;
        }
        .comment{
            position: absolute;
            right:0;
            bottom: 0;
        }
}
</style>