<template>
  <div>
    <div class="mytop">
      <!-- 头部搜索 -->
      <div class="search">
        <div class="inp">
          <input type="text" v-model="query">
          <div class="word">
            <icon type="search" size="20"></icon>
          </div>
        </div>
      </div>
      <!-- 顶部 -->
      <div class="tab">
        <div class="item" @click="isselected=index" :class="{active:isselected==index}">综合</div>
        <div class="item">销量</div>
        <div class="item">价格</div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goodslist">
      <div class="item" v-for="(item,index) in datalist" :key="index">
        <div class="box">
          <div class="left">
            <img
              class="img"
              :src="item.goods_small_logo"
            >
          </div>
          <div class="right">
            <div class="mess">
              <div class="word">{{item.goods_name}}</div>
              <div class="price">
                <span>￥</span>
                <span>{{item.goods_price}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部提示 -->
    <div class="tip" v-if="isEnd==true">
      ----我是有底线的----
    </div>
  </div>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 10,
      datalist:[],
      isEnd:false,
    };
  },
  methods: {
    async getDatalist() {
      wx.showLoading({
         title: '加载中',
      })
      if(this.isEnd===true){
        return;
      }
      let res = await request.get(
        "https://itjustfun.cn/api/public/v1/goods/search",
        {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        }
      );
      // // 判断上拉是否还有数据
      if(res.data.data.goods.length==0){
        this.isEnd=true;
        return 
      }
      // 判断页面是否有数据
      if(this.datalist.length==0){
        this.datalist=res.data.data.goods;
      }else{
        this.datalist=this.datalist.concat(res.data.data.goods)
      }
      // 关闭加载框
       wx.hideLoading();
      //  关闭下拉框
      wx.stopPullDownRefresh();
      console.log(this.datalist);

    }
  },
  mounted() {
    this.query = this.$root.$mp.query.query;
    this.getDatalist();
  },
  onReachBottom(){
    this.pagenum=this.pagenum+1;
    this.getDatalist();
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.pagenum=1;
    this.datalist=[];
    this.isEnd=false;
    this.getDatalist();
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
