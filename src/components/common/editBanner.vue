<template>
  <div @click="bannerClick">
      <div class="editbanner">
          <span>{{left}}</span>
          <span>
              <slot name="right">
                {{right}}
              </slot>
            </span>
      </div>
  </div>
</template>

<script>
export default {
    props:['left','right'],
    methods: {
        bannerClick(){
            this.$emit('bannerClick')
        }
    },
}
</script>

<style lang="less" scoped>
.editbanner{
    color: #888;
    font-size:3.5vw;
    background: white;
    padding: 4vw 3vw;
    border-bottom: 1px solid #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
    .headerImg{
        border-radius: 50%;
        width: 15vw;
        height: 15vw;
    }
</style>