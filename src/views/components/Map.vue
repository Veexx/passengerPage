<template>
            <div class="amap-page-container">
                  <el-amap vid="amapDemo" :dragEnable="!showline" :zoomEnable="!showline" :center="center" :zoom="zoom" :events="events" ref="map">
                        <!-- <el-amap-marker v-for="(marker,index) in markers"   :position="marker.position"  :offset="offset"  :vid="index" :key="index" v-if="showline">
                          <img src="../../assets/public/map_control.png" class="startmarker"  setAnimation="AMAP_ANIMATION_BOUNCE" v-if="marker.type=='start'">
                          <img src="../../assets/public/endmarker.png" class="endmarker" v-else>
                        </el-amap-marker> -->
                  </el-amap>
                  <div class="center-dot">
                    <transition name="fade" mode="out-in">
                       <span v-if="mapstate&&!showline" class="map_state_icon">我的位置</span>
                    </transition>
                    <img v-if="!mapstate" src="../../assets/public/map-point.png" alt="">
                  </div>
            </div> 
</template>
<script>

import Placeset from '@/views/components/Placeselect';
export default {
  data() {
    let that = this;
    return {
      mapstate:true,
      zoom:18,
      offset:[-11,-35],
      showline:false,
      mapobj:'',
      startMarker:'',
      events: {
            init: (o) => {
            that.mapobj=that.$refs.map.$$getInstance();
            let  startIcon = new AMap.Icon({
                  // 图标尺寸
                  size: new AMap.Size(24, 35),
                  // 图标的取图地址
                  image: require('../../assets/public/map-point.png'),
                  // 图标所用图片大小
                  imageSize: new AMap.Size(24, 35),
                  // 图标取图偏移量
                  imageOffset: new AMap.Pixel(0, 0)
              });
            let  startMarker = new AMap.Marker({
                    position: that.mapobj.getCenter(),
                    icon:startIcon,
                    offset: new AMap.Pixel(-11, -33),
                    // 设置是否可拖拽
                    draggable: false,
                    cursor: 'move',
                });
                that.startMarker=startMarker;
                startMarker.setMap(that.mapobj);
                startMarker.setAnimation('AMAP_ANIMATION_DROP');
                //调用高德组件
                let geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });        
                //根据坐标获取地址名称
                geocoder.getAddress([that.$store.state.fromlocation[0] ,that.$store.state.fromlocation[1]], function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            //  centercode = result.regeocode.addressComponent.adcode;
                            let startplace=result.regeocode.formattedAddress;
                            that.$store.commit('changefrom',startplace);
                        }
                    }
                }); 
            },
            'movestart':()=>{
               that.mapstate=false;
               that.startMarker.hide();

            },
            'moveend': () => {
                that.mapstate=true;
                let mapzoom= that.$refs.map.$$getInstance().getZoom();
                let mapcenter= that.$refs.map.$$getInstance().getCenter();
                let lnglat = new AMap.LngLat(mapcenter.lng, mapcenter.lat);
                that.startMarker.setPosition(lnglat);
                that.startMarker.show();
                let centercode;
                //调用高德组件
                let geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });        
                //根据坐标获取地址名称
                geocoder.getAddress([mapcenter.lng ,mapcenter.lat], function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            centercode = result.regeocode.addressComponent.adcode;
                            let startplace=result.regeocode.formattedAddress;
                             console.log(startplace)
                            that.$store.commit('changefrom',startplace);
                        }
                    }
                }); 
            },
            'zoomchange': (o) => {
                //地图层级变化
                let mapzoom= that.$refs.map.$$getInstance().getZoom();
                //获取地图当前中心坐标
                let mapcenter=that.$refs.map.$$getInstance().getCenter();
                let centerlng=mapcenter.lng;
                let centerlat=mapcenter.lat;
                let centercode;
                //    调用高德组件
                let geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });        
                //根据坐标获取code编码
                geocoder.getAddress([centerlng ,centerlat], function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                    centercode = result.regeocode.addressComponent.adcode;
                    }
                    }
                }); 
            },
             'click': (e) => {
                //  self.show=false;
            },
          },
      // plugin: [{
      //     position:'RB',
      //     direction:false,
      //     ruler:false,
      //     locate:false,
      //     autoPosition:false,
      //     pName: 'ToolBar',
      //     events: {
      //         init(instance) {
      //             console.log(instance);
      //           let o=instance.geolocation;
      //             o.getCurrentPosition((status, result) => {
      //                 console.log(result);
      //             if (result && result.position) {
      //               self.lng = result.position.lng;
      //               self.lat = result.position.lat;
      //               self.center = [self.lng, self.lat];
      //               self.$nextTick();
      //             }
      //           });
      //         }
      //       }
      //     }
      //     ]
    };
  },
  computed:{
             center (){ 
              var center = this.$store.state.fromlocation;
               return center; 
               } ,
               endcenter(){
                 var endcenter = this.$store.state.tolocation;
                 return endcenter;     
               },
               markers(){
                 let that=this;
                 var markers=[];
                 var spoint={'type':'start',position:that.center}
                 var epoint={'type':'end',position:that.endcenter}                 
                 markers.push(spoint);
                 if(that.endcenter!=''){
                   if(markers.length==1){
                     markers.push(epoint);
                   }else{
                     markers.splice(1,1,epoint);
                   }  
                   that.mapstate=false;
                   that.showline=true;
                   that.mapobj.setFitView();
                 }
                //  markers=[spoint,epoint];
                 return markers;

               },
               from(){
                 var fromplace=this.$store.state.placeset.startplace;
                 return fromplace;
               },
               to(){
                 var toplace=this.$store.state.placeset.endplace;
                 return toplace;
               }

               
  },
  watch: {

  },
  mounted:function(){

  },
  methods:{
    

    handlerefresh(){
      //清除store终点位置信息
      this.$store.commit('changetolocation',[]);
      this.$store.commit('changeto','您要去哪儿');
      this.showline=false;
    },
  }
};
</script>
<style lang="less" scoped>
      .amap-page-container{
        flex: 1;
          width: 100%;
          // height: 100%;
          // position: absolute;
          // top: 50px;
          // left: 0;
          flex-direction:column;
          display:flex;
          #amapDemo{
              width: 100%;
              position: relative;
              .startmarker,.endmarker{
                width: 24px;
              }
          }
          .center-dot{
              position: absolute;
              margin: auto;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              display: block;
              width: 24px;
              height: 24px;
              img{
                width: 100%;
                margin-top: -24px;
              }
              .map_state_icon{
                  position:absolute;
                  text-align:center;
                  line-height:2.5em;
                  left:50%;
                  top:50%;
                  transform:translate(-50%,-50%);
                  margin-top:-4.5em;
                  width:6em;
                  height:2.5em;
                  background:#7e7e7e;
                  border-radius:15px;
                  color:#fff;
                  font-size:1.3em;
              }
          }
          .place-view-box{
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              flex-direction:column;
              display:flex;
              box-shadow: 0 0 3px rgba(155, 155, 155, .9);
              background: #fff;
              z-index: 2;

             
              .palce_item{
                  height: 60px;
                  line-height: 60px;
                  padding-left: 25px;
              }
              .from-centent,.to-centent{
                padding-left: 40px;
                position: relative;
                font-size: 15px;
                color: #676767;
                .from-dot,.to-dot{
                  width: 8px;
                  height: 8px;
                  position: absolute;
                  left: 20px;
                  top:25px;
                  display: block;
                  border-radius:50%; 
                }
                .from-dot{
                    background-color: #1C73E2;
                }
                .to-dot{
                    background: #FC9153;
                }
                .from-view,.to-view{
                    height: 100%;
                    max-width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .from-view{
                  border-bottom: 1px solid #efefef;
                }
                .to-view{
                  color: #999;
                   border-bottom: 1px solid #eee;
                }
              }
              .classify{
                .more-calss{
                    display: block;
                    width: 35px;
                    height: 35px;
                    background: url(../../assets/public/class_dot.png) no-repeat;
                    background-size: cover;
                    position: absolute;
                    right: 2em;
                    top: 1em;
                }
                .main-sence{
                      width: 5.5em;
                      display: inline-block;
                      height: 34px;
                      line-height: 2.5em;
                      text-align: center;
                      font-size: 15px;
                      color: #676767;
                  }
                  .sence-active{
                      color: #1C73E2;
                      border-radius: 2em;
                      border: 1px solid;
                  }
              }
          }

      }
</style>


