<template>
  <div class="userDetail">
      <div>
        <div>
            <div class="userHead_img">
                <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
                <img src="@/assets/noface.jpg" alt="" v-else>
            </div>
        </div>
        <div class="user_edit">
            <div>
                <p>
                    <span>0</span>
                    <span>粉丝</span>
                </p>
                |
                <p>
                    <span>54</span>
                    <span>关注</span>
                </p>
                |
                <p>
                    <span>0</span>
                    <span>获赞</span>
                </p>
            </div>
            <div>
                <div @click="$router.push('/edit')">编辑资料</div>
            </div>
        </div>
      </div>
      <div>
            <div class="part2">
                <div class="base">
                    <span>小宝是在叫我嘛</span>
                    <span>LV4</span>
                    <span>大会员</span>
                </div>
                <div class="desc">
                    <span v-if="userInfo.user_desc">{{userInfo.user_desc}}</span>
                    <span v-else>这个人很神秘,什么都没有写</span>
                    <a href="">展开|收起</a>
                </div>
                <div class="tags">
                    <span>uuid:86932250</span>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['userInfo']

}
</script>

<style lang="less" scoped>
.userDetail{
    background: white;
    >div:nth-child(1){
        display:flex;
    }
    .userHead_img{
        // height: 60vw;
        img{
            border-radius: 50%;
            width: 25vw;
            height: 25vw;
            padding: 2vw 2vw;
        }
    }
    .user_edit{
        width: 100%;
        height: 90%;
        margin: 5% 3%;
        >div:nth-child(1){
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #999;
            p{
                font-size: 4vw;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: black;
            }
        }
        >div:nth-child(2){
             border:1px solid #fb7299 ;
             border-radius: 5px;
             background: #fff;
             margin: 1vw 1vw;
             padding: 1vw 0;
             display: flex;
             justify-content: center;
             div{
                color: #fb7299;
             }
         }
    }
}
.part2{
    padding: 3vw 3vw;
    .base{
        font-size: 4.5vw;
        // >span:nth-child(1){

        // }
        >span:nth-child(2){
            margin: 0 2vw;
            font-size: 1vw;
            color: white;
            background: #FFB37C;
            padding: 0 0.5vw;
        }
        >span:nth-child(3){
            padding: 0.5vw 4vw;
            font-size:3vw;
            background: #fb7299;
            color: white;
            border-radius: 3px;
        }
    }
    .desc{
        display: flex;
        justify-content: space-between;
        font-size: 3vw;
        margin-top: 2vw;
        >span{
            color: #aaa;
        }
        >a{
            color: #1389bf;
        }
    }
    .tags{
        >span{
            font-size: 2.5vw;
            color: #999;
            background: #ddd;
        }
    }
}
</style>