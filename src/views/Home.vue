<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="'select'+index">
        <div @click="$router.push('/editcategory')">編輯</div>
        <van-list
          :immediate-check="false"
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="detailparent">
            <detail
              :detailItem="categoryitem"
              v-for="(categoryitem, categoryindex) in item.list"
              :key="'category'+categoryindex"
              class="detailItem"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/common/NavBar.vue";
import detail from "@/views/Detail.vue";
export default {
  components: {
    NavBar,
    detail
  },
  data() {
    return {
      category: [],
      active: 0
    };
  },
  activated() {
    let newCat = JSON.parse(localStorage.getItem("newCat"));
    this.changeCategory(newCat);
  },
  methods: {
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.request({
        url: "/category",
        method: "get"
      });
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.finished = false;
        item.loading = false;
        item.page = 0;
        item.pagesize = 10;
        return item;
      });
      this.category = category1;
      this.selectArticle();
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.request({
        url: "/detail/" + categoryitem._id,
        method: "get",
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      console.log(res.data);
      categoryitem.list.push(...res.data); //this.category(this.active).list=res.data
    },
    categoryItem() {
      const categoryitem = this.category[this.active]; //把数组里的对象定义为
      return categoryitem; //返回对象，所以才能操作
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      categoryitem.page += 1;
      this.selectArticle();
      setTimeout(() => {
        categoryitem.loading = false;
      }, 1500);
    }
  },
  watch: {
    active() {
      this.selectArticle();
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>
<style lang="less" scoped>
.home {
  background: white;
  .detailparent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: white;
    .detailItem {
      width: 45%;
      margin: 1vw 1vw;
    }
  }
}
</style>
