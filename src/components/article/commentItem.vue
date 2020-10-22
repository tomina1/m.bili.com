<template>
  <div class="commentitems">
    <div class="commentItem" v-for="(item, index) in commentChild" :key="index">
      <div class="userImg">
        <img :src="item.userinfo.user_img" alt v-if="item.userinfo && item.userinfo.user_img" />
        <img src="@/assets/noface.jpg" alt v-else />
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>此用户无名</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>
      <div class="commentContent">
        <div v-if="!temp">{{item.comment_content}}
          <span class="publish" @click="PostItemcomment(item.comment_id)">回復</span></div>
        <div v-else>
          回複
          <span style="color:#478ef0">{{item.parent_user_info.name}}</span>
          :{{item.comment_content}} <span class="publish" 
          @click="PostItemcomment(item.comment_id)">回復</span>
        </div>
      </div>
      <commentchild-item :commentChild="item.child" temp="true" @postChild="postChild"></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentchildItem",
  props: ["commentChild", "temp"],
  methods: {
    PostItemcomment(id){
      this.$emit('postChild',id)
    },
    postChild(id){
      this.PostItemcomment(id)
      this.$emit('PostPublish',id)
    }
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  display: flex;
  padding: 3vw 0;
  flex-direction: column;
  .top {
    display: flex;
  }
  .userImg {
    margin-right: 3vw;
    display: flex;
    img {
      height: 10vw;
      width: 10vw;
    }
    p{
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
  }
  .commentContent {
    flex: 1;
    position: relative;
    p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2vw;
    }
    div {
      font-size: 3.5vw;
    }
    .publish{
      position: absolute;
      color: red;
      right: 4vw;
    }
  }
}
</style>