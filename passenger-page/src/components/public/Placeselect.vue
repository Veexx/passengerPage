<template>
  <div class="origin_select"><!--顶部-->
     <div class="suggest-header">
       <div class="city-wrapper">
           <span class="text">{{currentcity?currentcity:'请选择'}}</span><i class="pulldown"></i>
       </div>
       <div class="city-input-wrapper">
           <input type="text" placeholder="城市中文名" class="city-input weui_input" id="city_search"></div>
           <div class="address-wrapper">
               <span style="color: #efefef;vertical-align: middle;display: inline-block">|</span>
                  <input class="weui_input address-input" :placeholder="placeholder" ref="searchText" id="searchText" @keyup="keyUpSearch" />  
           </div>
           <div class="cancel-wrapper" @click="cancle">
               <span class="text border-left-1px">取消</span>
           </div>
       </div>
       <div class="split"></div>
       <!--已开通城市-->
       <div class="list-wrapper">
           <div><h1 class="list-title">当前城市：<i>无法定位,请选择</i></h1></div>
       <div>
           <h2 class="list-title_fn">已开通城市</h2>
       </div>
           <ul class="list_city_wrapper" id="list_city_wrapper"></ul>
       </div><!--搜索提示显示-->
        <div class="list-wrapper-write" id="searchResult">
            
            <div class="address_items" id="address_result" v-if="searchData.length > 0"> 
            <cube-scroll
                ref="scroll"
                :data="searchData"
                :options="options">
                <div class="address_item" v-for="(item,index) in searchData" :key="index" @click="sureaddress(item.name,item.location)"> 
                    <i class="address-dot"></i> 
                    <div class="title">{{ item.name }}</div>  
                    <div class="description">{{ item.pname }} {{ item.cityname }} {{ item.address }}</div>  
                </div> 

            </cube-scroll>
                 

            </div>
        </div>
<div id="temp" style="display:none"></div>
</div>
</template>
<script>
  export default {
      data(){
          return{
              options:{

              },
            searchData:'',
            currentcity:'',
            placeholder:'',
            placetype:this.setype
          }
      },
      props:['setype'],
      methods:{
          keyUpSearch () { 
              var _this = this ;
              var txt = this.$refs.searchText.value;
        
               AMap.service(["AMap.PlaceSearch"], function() { 
                   var placeSearch = new AMap.PlaceSearch({ 
                       //构造地点查询类 
                       pageSize: 10,
                        pageIndex: 1, 
                        city: "成都", 
                        //城市 
                        cityLimit: 'true',
                         panel: 'temp'       
          });
          //关键字查询
          placeSearch.search(txt, function(status, result) {
            if (status == 'complete' && result.info == 'OK') {
                _this.searchData = result.poiList.pois
                 if (txt==''){
                  _this.searchData=''
              }
            }
          })
        })
      },
      cancle(){
          this.$emit('cancel');
      },
      sureaddress(name,location) {
        if(this.setype=='from'){

        this.$store.commit('changefromlocation',[location.lng,location.lat]);
        this.$store.commit('changefrom',name);

        }else{

        this.$store.commit('changetolocation',[location.lng,location.lat]);
        this.$store.commit('changeto',name);

        }
         this.cancle(); 
        //   console.log(location);

      }
      },
      mounted: function(){

        //   this.GLOBAL.fromcity="重庆市"
        if (this.placetype=='from'){
            this.placeholder="您从哪儿出发"
        }else{
            this.placeholder="您要去哪儿"
        }
        
      },
  }
</script>
<style>
.address-dot{
    display: block;
    width: 2em;
    height: 1.5em;
    background: url("../../assets/public/addot.svg") no-repeat;
    background-size: cover;
    position: absolute;
    top: 1.6em;
    left: 1em;
}
.address_item{
    position: relative;
    padding: .7em 1em .5em 4em;
    border-bottom: 1px solid #efefef;
    line-height: 20px;
}
.title{
    font-size: 15px;
    color: #333;
}
.description{
    margin-top: 8px;
    font-size: 13px;
    color: #888;
}
.origin_select, .finish_select {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #f7f7f7;
    /* display: none; */
}
.suggest-header {
    position: relative;
    z-index: 10;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 50px;
    white-space: nowrap;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .12);
   -webkit-box-shadow:  0 2px 3px rgba(0, 0, 0, .12);
}
.city-wrapper {
    padding: 5px 15px 5px 0;
    position: relative;
}
.city-wrapper .text {
    line-height: 40px;
    padding-left: 15px;
    font-size: 15px;
    color: #666;
    display: inline-block;
}
.pulldown {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url("../../assets/public/down.svg");
    background-size: cover;
    position: absolute;
    top: 18px;
    right: -4px;
    transition: all .3s linear;
}
.city-input-wrapper {
    display: none;
    padding: 13px 13px 13px 10px;
    position: relative;
}
.weui_input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 100%;
    line-height: 2em;
}
.address-wrapper {
    padding: 5px 10px;
    -webkit-box-flex: 1;
    flex: 1;
    font-size: 15px;
}
.address-wrapper .address-input {
    vertical-align: middle;
    padding-left: 1em;
}
.cancel-wrapper {
    margin: 0;
    border: 0;
    font-weight: 400;
    vertical-align: baseline;
    padding: 13px 0;
}
.cancel-wrapper span {
    line-height: 18px;
    padding: 0 16px;
    font-size: 15px;
    color: #666;
    display: inline-block;
}
.split {
    position: relative;
    width: 100%;
    height: 10px;
    background: #f3f4f5;
}
.list-wrapper {
    width: 95%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    display: none;
}
.list-title {
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    font-size: 14px;
    color: #333;
    font-weight: 400;
    vertical-align: baseline;
}
.list-title_fn {
    padding: 16px 16px 10px;
    line-height: 1;
    font-size: 14px;
    color: #999;
    background: #f7f7f7;
    font-weight: 400;
}
.list_city_wrapper {
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    top: 90px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 5em;
}
.list_city_wrapper li {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f3f4f5;
}
.list-wrapper-write {
    width: 95%;
    margin:auto;
    position: absolute;
    top:60px;
    bottom: 10px;
    left: 0;
    right: 0;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    overflow: scroll;
}
.address_items{
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    left: 0;
}
</style>

