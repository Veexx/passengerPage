<template>
    <div class="carpool-content">
            <div class="amap-page-container">
                  <el-amap vid="amapDemo"  :center="center" :zoom="zoom" :events="events" ref="map">
                        <el-amap-marker v-for="(marker,index) in markers"   :position="marker.position"  :offset="offset"  :vid="index" :key="index" v-if="showline">
                          <img src="../../assets/public/map_control.png" class="startmarker" v-if="marker.type=='start'">
                          <img src="../../assets/public/endmarker.png" class="endmarker" v-else>
                        </el-amap-marker>
                  </el-amap>
                  <div class="center-dot">
                    <transition name="fade" mode="out-in">
                    <span v-if="mapstate" class="map_state_icon">我的位置</span>
                    </transition>
                    <img src="../../assets/public/map_control.png" alt="">
                  </div>
                  <div class="place-view-box">
                    <div class="palce_item classify">
                      <i class="more-calss"></i>
                      <div class="main-sence sence-active" @click="addMarker">城际快线</div> 
                    </div>
                    <div class="palce_item from-centent" @click="setorigin('from')">
                      <i class="from-dot"></i>
                      <p class="from-view">{{from}}</p>
                    </div>
                    <div class="palce_item to-centent" @click="setorigin('to')">
                      <i class="to-dot"></i>
                      <p class="to-view">{{to}}</p>
                    </div>
                  </div>
            </div>
            <select-place v-if="placecon" @cancel="cancelplace" :setype="placetype"></select-place>
    </div>
</template>
<script>

import Placeset from '@/components/public/Placeselect';
export default {
  data() {
    let self = this;
    return {
      placecon:false,
      mapstate:true,
      zoom:17,
      placetype:'',
      offset:[-11,-35],
      showline:true,
      mapobj:'',
      markers: [
        {
          position:[104.056303 ,30.537912],
          type:'start'
        }
      ],
      events: {
            
            init: (o) => {
             this.mapobj=this.$refs.map.$$getInstance();
        //   let mapzoom= this.$refs.map.$$getInstance().getZoom();
          //  console.log(this.$refs.map.$$getInstance());

            },
            'touchstart':()=>{
               self.mapstate=false;
            },
            'touchend': () => {
              self.mapstate=true;
           let mapzoom= this.$refs.map.$$getInstance().getZoom();
           let mapcenter= this.$refs.map.$$getInstance().getCenter();
           let centerlng=mapcenter.lng;
           let centerlat=mapcenter.lat;
           let centercode;
      //    调用高德组件
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              //根据坐标获取地址名称
              geocoder.getAddress([centerlng ,centerlat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    
                   centercode = result.regeocode.addressComponent.adcode;

                   let startplace=result.regeocode.pois[0].name;
                   console.log(result)
                  //  self.$store.commit('changefromlocation',[centerlng,centerlat]);
                   self.$store.commit('changefrom',startplace);
                   
                  }
                }
              }); 

       

            },
            'zoomchange': (o) => {
           //地图层级变化
           let mapzoom= this.$refs.map.$$getInstance().getZoom();
           //获取地图当前中心坐标
           let mapcenter=this.$refs.map.$$getInstance().getCenter();
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
              // this.markers[0].position=center;
               return center; 
               } ,
               endcenter(){
                 var endcenter = this.$store.state.tolocation;
                 
                 return endcenter;     
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
    endcenter: function (val) {
      // this.endcenter = val + ' ' + this.lastName
      console.log(val);
       let endmarker={'position':val,'type':'end'};
        if(this.markers.length==1){
          this.markers.push(endmarker);
        }else{
          this.markers.splice(1,1,endmarker);
        }
         this.mapobj.setFitView();
    }
  },
  mounted:function(){
    // this.events.click();
   

  },
    components: {
         'select-place': Placeset

  },
  methods:{
          cancelplace(){
                  this.placecon=false;
          },
          setorigin(type){
                this.placetype=type;
                this.placecon=true;
            },
          addMarker() {
          let marker = {
            position: [104.156303 ,30.537912]
          };
          this.markers.push(marker);
          this.mapobj.setFitView();
        },
  }
};
</script>
<style>
.carpool-content{
     width: 100%;
     /* height: 100%; */
     position: absolute;
     top: 1.4rem;
     left: 0;
     bottom: 0;
     flex-direction:column;
     display:flex;
}
.amap-page-container{
   width: 100%;
    height: 100%;
    position: relative;
    flex-direction:column;
    display:flex;

}
#amapDemo{
    width: 100%;
    position: relative;
    /* padding-bottom: 85px; */
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
}
.center-dot img{
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
.place-view-box{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    flex-direction:column;
    display:flex;
    box-shadow: 0 0 3px rgba(155, 155, 155, .9);
    background: #fff;
    z-index: 162;
  /* padding-bottom: 10px; */

}
.palce_item{
  height: 60px;
  line-height: 60px;
  padding-left: 35px;
}
.from-centent,.to-centent{
  padding-left: 60px;
  position: relative;
  font-size: 15px;
  color: #676767;

}
.from-dot,.to-dot{
 width: 8px;
 height: 8px;
 position: absolute;
 left: 35px;
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
}
.sence-active{
    color: #1C73E2;
    border-radius: 2em;
    border: 1px solid;
}
.startmarker,.endmarker{
  width: 24px;

}
</style>

