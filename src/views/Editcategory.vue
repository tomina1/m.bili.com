<template>
  <div class="editcategory">
    <nav-bar></nav-bar>
    <div class="content">
      <div class="now">
        <div class="title">
          <span />
          <div>現有栏目</div>
          <span />
        </div>
        <div>
          <div class="nowItem item" v-for="(item, index) in newCat" :key="index">
            <span @click="handleNewClick(index)">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="old">
        <div class="title">
          <span />
          <div>已刪除栏目</div>
          <span />
        </div>
        <div class="oldItem item" v-for="(item, index) in oldCat" :key="index">
          <span @click="handleOldClick(index)">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/common/NavBar.vue";
export default {
  components: {
    navBar
  },
  data() {
    return {
      newCat: [],
      oldCat: []
    };
  },
  props: [],
  methods: {
    async SelectCategory() {
      const { data } = await this.$http.request({
        url: "/category",
        method: "get",
        params: {}
      });
      this.newCat = data;
    },
    handleNewClick(index) {
      console.log(index);
      if(this.newCat.length<4){
          this.$Toast.fail('至少保留3個')
          return
      }
      this.oldCat.push(this.newCat[index]);
      this.newCat.splice(index, 1);
    },
    handleOldClick(index) {
      console.log(index);
      this.newCat.push(this.oldCat[index]);
      this.oldCat.splice(index, 1);
    }
  },
  watch: {
    newCat() {
      localStorage.setItem("newCat", JSON.stringify(this.newCat));
      localStorage.setItem("oldCat", JSON.stringify(this.oldCat));
    }
  },
  created() {
    if (localStorage.getItem("newCat") && localStorage.getItem("oldCat")) {
       this.newCat=JSON.parse(localStorage.getItem("newCat"));
        this.oldCat=JSON.parse(localStorage.getItem("oldCat"));
      return;
    }
    this.SelectCategory();
  }
};
</script>

<style lang="less" scoped>
.editcategory {
  background: white;
  height: 100vh;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    width: 100vw;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 6vw;
    > span {
      flex: 3;
      border-bottom: 2px dashed skyblue;
    }
    > div {
      color: skyblue;
      font-size: 4.5vw;
      font-weight: 600;
    }
  }
  .now {
    display: flex;
    flex-wrap: wrap;
    div:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
    }
    .nowItem {
      border: 1.5px solid skyblue;
    }
  }
  .old {
    display: flex;
    flex-wrap: wrap;
    .oldItem {
      border: 1.5px solid #ff9db5;
    }
    > .title > span {
      border-bottom: 2px dashed #ff9db5;
    }
    > .title > div {
      color: #ff9db5;
    }
  }
}
.item {
  margin: 3vw 2vw;
  box-sizing: border-box;
  height: 9vw;
  line-height: 9vw;
  width: 20vw;
  text-align: center;
  > span {
    width: 100%;
  }
}
</style>