<template>
  <div class="commentparent">
    <div v-for="(item, index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img :src="item.userinfo.user_img" alt v-if="item.userinfo && item.userinfo.user_img" />
          <img src="@/assets/noface.jpg" alt v-else />
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class="publish" @click="publish(item.comment_id)">回復</span>
          </div>
        </div>
      </div>
      <div style="padding-left:8vw;">
        <comment-item @PostPublish="publish" :commentChild="item.child"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem";
export default {
  components: {
    commentItem
  },
  props: [],
  data() {
    return {
      commentList: null
    };
  },
  methods: {
    async commentData() {
      const { data } = await this.$http.request({
        url: "/comment/" + this.$route.params.id,
        method: "get"
      });
      if (data) {
        this.$emit("lengthselect", data.length);
      }
      this.commentList = this.changeCommentData(data);
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    publish(id){
      this.$emit('publishClick',id)
    }
  },
  created() {
    this.commentData();
  }
};
</script>

<style lang="less" scoped>
.commentparent {
  padding: 4vw 2vw;
  > div {
    border-bottom: 1px solid #e7e7e7;
  }
  .commentItem {
    display: flex;
    padding: 3vw 0;
    .userImg {
      margin-right: 3vw;
      img {
        height: 10vw;
        width: 10vw;
      }
    }
    .commentContent {
      flex: 1;
      p {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2vw;
      }
      div {
        font-size: 3.5vw;
        position: relative;
        .publish {
          position: absolute;
          color: red;
          right: 4vw;
        }
      }
    }
  }
}
</style>