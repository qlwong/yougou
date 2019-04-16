<template>
  <div>
    <!-- 搜索 -->
    
      <topheader></topheader>
    
    <!-- 轮播图 -->
    <div>
      <swiper indicator-dots autoplay circular class="loop">
         <block v-for="(item,index) in imgurl" :key="index">
           <swiper-item>
              <image :src="item.image_src"></image>
           </swiper-item>
         </block>
     </swiper>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <div class="one" v-for="(item,index) in cateData" :key="index">
        <image :src="item.image_src"></image>
      </div>
      
    </div>
    <!-- 楼层 -->
    <div class="floor" v-for="(item,index) in floorData" :key="index">
      <div class="title">
        <image :src="item.floor_title.image_src" mode="aspectFit"></image>
      </div>
      <div class="content">
        <div class="left" >
          <image :src="item.product_list[0].image_src" mode="aspectFit"></image>
        </div>
        <div class="right" >
          <image v-if="itindex !=0" :src="it.image_src" v-for="(it,itindex) in item.product_list" :key="itindex"></image>
          <!-- <image :src="item.product_list[1].image_src" mode="aspectFit"></image>
          <image :src="item.product_list[2].image_src" mode="aspectFit"></image>
          <image :src="item.product_list[3].image_src" mode="aspectFit"></image>
          <image :src="item.product_list[4].image_src" mode="aspectFit"></image> -->
        </div>
      </div>

    </div>
    
    <!-- <div></div> -->
    <!-- 底线 -->
    <div class="txt">
      <span> 我是有底线的</span>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import topheader from '../../components/topheader'
// 导入请求
import request from '../../utils/request.js'
export default {
 data(){
   return {
     imgurl:[],
     floorData:[],
     cateData:[],
   }
 },
 async mounted() {
  //  发请求获取轮播图数据
   let res= await request("https://itjustfun.cn/api/public/v1/home/swiperdata");
 
  this.imgurl=res.data.data;
  
  // 获取楼层数据
  let resfloor=await request("https://itjustfun.cn/api/public/v1/home/floordata");
  this.floorData=resfloor.data.data;
 
  // 获取分类数据
  let rescate=await request("https://itjustfun.cn/api/public/v1/home/catitems");
  this.cateData=rescate.data.data;

},
components:{
  topheader
}
}
</script>

<style>
@import './index.css';
</style>
