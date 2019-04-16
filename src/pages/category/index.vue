<template>
  <div>
    <!-- 头部 -->
    <div class="mytop">
      <topheader></topheader>
    </div>
    <!-- 左侧 -->
    <div class="content">
      <div class="nav">
        <div
          class="nav-item"
          :class="{active:isselected==index}"
          @click="setData(index)"
          v-for="(item,index) in menulist"
          :key="index"
        >{{item.cat_name}}</div>
      </div>
      <div class="goods">
        <img src="https://img.alicdn.com/simba/img/TB1JAp1LCzqK1RjSZFHSuv3CpXa.jpg" class="topimg">
        <div class="list" v-for="(item,index) in rightlist" :key="index">
          <div class="title">
            <span class="one">/</span>{{item.cat_name}}
            <span class="one">/</span>
          </div>
          <div class="list-item">
            <a :href="'/pages/search/main?query='+it.cat_name" class="item" v-for="(it,itindex) in item.children" :key="itindex">
              <image :src="'https://itjustfun.cn/'+it.cat_icon" class="img" mode="aspectFill"></image>
              <span class="txt">{{it.cat_name}}</span>
            </a>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import topheader from "../../components/topheader";
// 引入请求的函数
import request from '../../utils/request.js'
export default {
  data() {
    return {
      menulist: [],
      isselected: 0,
      rightlist:[],
    };
  },
  methods:{
    setData(index){
      this.isselected=index;
      this.rightlist=this.menulist[index].children;

    },
  },
 async mounted() {
    // 请求分类数据
    let catres=await request("https://itjustfun.cn/api/public/v1/categories")
    this.menulist=catres.data.data;
    // 打开页面动态赋值
    this.rightlist=this.menulist[this.isselected].children;
  },
  components: {
    topheader
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
