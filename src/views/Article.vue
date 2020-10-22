<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <div class="detailinfoText">
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>146.4万次观看</span>
          <span>5281弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{activeColor:collectionActive}">
            <span>1</span>
            <span>收藏</span>
          </p>
          <p @click="subscriptClick" :class="{activeColor:subscriitionActive}">
            <span>2</span>
            <span>缓存</span>
          </p>
          <p>
            <span>3</span>
            <span>分享</span>
          </p>
        </div>
      </div>
      <div>
        <span>{{model.date}}</span>
      </div>
    </div>
    <div class="detailparent">
      <detail
        class="detailItem"
        v-for="(item, index) in commendList"
        :key="index"
        :detailItem="item"
      />
    </div>
    <comment-title :dataLength="lens" @Postcomment="PostSuccess" ref="commentIpt"></comment-title>
    <comment @lengthselect="len=>lens=len" ref="commentPublish" @publishClick="PostChildClick" />
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import commentTitle from "@/components/article/commentTitle.vue";
import comment from "@/components/article/comment.vue";
import detail from "@/views/Detail.vue";
export default {
  data() {
    return {
      model: null,
      commendList: null,
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      collectionActive: false,
      subscriitionActive: null
    };
  },
  components: {
    NavBar,
    detail,
    commentTitle,
    comment
  },
  methods: {
    async articleitemData() {
      const { data } = await this.$http.request({
        url: "/article/" + this.$route.params.id,
        method: "get"
      });
      this.model = data[0];
      if (this.model) {
        this.subscriptInit();
      }
    },
    async commonData() {
      const { data } = await this.$http.request({
        url: "/commend",
        method: "get"
      });
      this.commendList = data;
    },
    async PostSuccess(comcontent) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let day = date.getDate();
      m < 10 ? (m = "0" + m) : m;
      day < 10 ? (day = "0" + day) : day;
      this.Postcom.comment_content = comcontent;
      this.Postcom.comment_date = m + "-" + day;
      this.Postcom.parent_id = this.$route.params.id;
      let result = await this.$http.request({
        url: "/comment_post/" + localStorage.getItem("id"),
        method: "post",
        data: this.Postcom
      });
      console.log(result);
      this.$refs.commentPublish.commentData();
      this.Postcom.parent_id = null;
    },
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusInpt();
    },
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const { data } = await this.$http.request({
          url: "/collection/" + localStorage.getItem("id"),
          method: "post",
          data: {
            article_id: this.$route.params.id
          }
        });
        console.log(data);
        data.msg == "收藏成功"
          ? (this.collectionActive = true)
          : (this.collectionActive = false);
          this.$Toast.success(data.msg)
      }
    },
    //收藏初始化
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const { data } = await this.$http.request({
          url: "/collection/" + localStorage.getItem("id"),
          method: "get",
          params: {
            article_id: this.$route.params.id
          }
        });
        this.collectionActive = data.success;
      }
    },
    //點擊關注
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const { data } = await this.$http.request({
          url: "/sub_scription/" + localStorage.getItem("id"),
          method: "post",
          data: {
            sub_id: this.model.userid
          }
        });
        console.log(data);
        data.msg == "关注成功"
          ? (this.subscriitionActive = true)
          : (this.subscriitionActive = false);
          this.$Toast.success(data.msg)
      }
    },
    //關注初始化
    async subscriptInit() {
      if (localStorage.getItem("token")) {
        const { data } = await this.$http.request({
          url: "/sub_scription/" + localStorage.getItem("id"),
          method: "get",
          params: {
            sub_id: this.model.userid
          }
        });
        this.subscriitionActive = data.success;
      }
    }
  },
  mounted() {
    this.articleitemData();
    this.commonData();
    this.collectionInit();
  },
  watch: {
    $route() {
      this.articleitemData();
      this.commonData();
      this.collectionInit();
      this.subscriptInit();
    }
  }
};
</script>

<style lang="less" scoped>
.detailinfo {
  background: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfoText {
  padding: 4vw;
  div:nth-child(1) {
    span:nth-child(1) {
      padding: 0 2vw;
      color: #fb7299;
      background: #f4f4f4;
      border-radius: 2vw;
    }
  }
  div:nth-child(2) {
    padding: 2vw 1vw;
    span {
      color: #aaa;
      font-size: 2.5vw;
    }
    span:nth-child(1) {
      color: black;
      font-size: 3.5vw;
    }
  }
  div:nth-child(3) {
    display: flex;
    .activeColor {
      color: red;
    }
    p {
      padding-right: 4vw;
      display: flex;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        font-size: 4vw;
      }
      span:nth-child(2) {
        font-size: 3vw;
      }
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .detailItem {
    width: 45%;
    margin: 1vw 1vw;
  }
}
</style>