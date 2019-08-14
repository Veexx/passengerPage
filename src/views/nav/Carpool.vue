<template>
    <div class="carpool-content">
          <!-- 地图组件 -->
          <map-view></map-view>
          <!-- 起始点选择框 -->
          <div class="place-view-box" v-if="!showline">
              <!-- <div class="palce_item classify">
                <i class="more-calss"></i>
                <div class="main-sence sence-active">城际快线</div> 
                <div class="main-sence" @click="toLines('机场高铁')">机场高铁</div> 
                <div class="main-sence" @click="toLines('旅游专线')">旅游专线</div> 
              </div> -->
              <!-- <div class="tabClick">
                  <a href="/passenger_lines/callback/{$callback}"  class="allLines">
                      <img src="/Theme/images/passenger/allLines.png" alt="">
                      全部路线
                  </a>
              </div>  -->
              <nav class="left">
                <div  class="tab selected">在线约车</div>
                <div  class="tab">电话叫车</div>
              </nav>             
              <div class="palce_item from-centent" @click="setorigin('from')">
                <i class="from-dot"></i>
                <p class="from-view">{{from}}</p>
              </div>
              <div class="palce_item to-centent" @click="setorigin('to')">
                <i class="to-dot"></i>
                <p class="to-view">{{to}}</p>
              </div>
            </div>            
            <select-place v-if="placecon" @cancel="cancelplace" :setype="placetype"></select-place>
            <!-- 拼车确认 -->
            <section class="confirmCarpool" v-if="showline">
                <div class="confirmTitle">              
                  <div class="backBtn" @click="handlerefresh">
                      <img src="../../assets/public/left.svg" alt="">
                  </div>
                  <h5>确认预约</h5>
                </div>
                <div class="confirmContent">
                  <div class="item-check">                                      
                      <div class="change_nums">
                          <img class="number-dot" src="../../assets/public/passenger.svg" alt="">
                          <span class="showverb">人乘车</span>
                          <cube-select
                            v-model="value"
                            :title="title"
                            :options="options"
                            :auto-pop="autoPop"
                            :disabled="disabled"
                            @change="change" class="peSet">
                          </cube-select>
                      </div>

                      <div class="changeTime">
                        <img class="start-time-dot" src="../../assets/public/chart_time.svg" alt="">  
                        <cube-button @click="showTimePicker">{{lineObj.timeshow}}</cube-button>
                      </div>
                  </div>
                  <div class="item-person">                                      
                      <img src="../../assets/public/operson.svg" alt="">
                      <div @click="changePerson">{{lineObj.phone}}</div>
                  </div> 
                  <div class="poolremarks">
                    <cube-textarea
                    v-model="lineObj.remarks"
                    :placeholder="remarkPlaceholder"
                    :maxlength="maxlength"
                    @blur="this.fixedInput"
                    ></cube-textarea>
                  </div>  
                  <div class="moneyShow">
                    <img src="../../assets/public/price.svg" alt="">
                    <strong>14.50</strong>
                    <span>元</span>
                  </div> 
                  <cube-checkbox class="with-click" v-model="checked">
                    <p class="tc">
                      我已阅读并同意 <a href="javascript:;" @click.stop class="cma">《用车协议》</a>
                    </p>
                    
                  </cube-checkbox> 
                  <cube-button :primary="true" :disabled="!checked"  @click="handelOrder">立即预约</cube-button>               
                </div>
            </section>
    </div>
</template>
<script>
import MapView from '@/views/components/Map'
import Placeset from '@/views/components/Placeselect';
export default {
  data() {
    let self = this;
    return {
      checked:true,
      placecon:false,
      mapstate:true,
      zoom:18,
      placetype:'',
      offset:[-11,-35],
      showline:false,
      mapobj:'',
      lineObj:{
         timeshow:'现在出发',
         phone:'代人叫车',
         remarks:''
      },
      options: [1, 2, 3, 4, 5, 6],
      value: 1,
      title: '选择乘坐人数',
      autoPop: false,
      disabled: false,
      remarkPlaceholder: '如有大件行李，有宠物，（可不填）',
      maxlength: 100,
      events: {
            
            init: (o) => {
             this.mapobj=this.$refs.map.$$getInstance();
            //  console.log(this.mapobj.getCenter());
              //调用高德组件
              // let centerlng=this.$store.state.fromlocation;
              let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              //根据坐标获取地址名称
              geocoder.getAddress([this.$store.state.fromlocation[0] ,this.$store.state.fromlocation[1]], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    
                  //  centercode = result.regeocode.addressComponent.adcode;

                   let startplace=result.regeocode.formattedAddress;
                  //  console.log(result)
                  //  self.$store.commit('changefromlocation',[centerlng,centerlat]);
                   self.$store.commit('changefrom',startplace);
                   
                  }
                }
              }); 
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

                   let startplace=result.regeocode.formattedAddress;
                  //  console.log(result)
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
    components: {
         'select-place': Placeset,
         'map-view':MapView

  },
  methods:{
    toLines(e){
      console.log(e);
       this.$router.push({path:'/lines',query:{name:e}})
    },
    handlerefresh(){
      //清除store终点位置信息
      this.$store.commit('changetolocation',[]);
      this.$store.commit('changeto','您要去哪儿');
      this.showline=false;
    },
    handelOrder(){
      const toast = this.$createToast({
        txt: 'Loading...',
        mask: true
      })
      toast.show();
    },
          cancelplace(){
                  this.placecon=false;
          },
          setorigin(type){
                this.placetype=type;
                this.placecon=true;
          },
          change(value, index, text) {
            console.log('change', value, index, text)
          },
          changePerson(){
            let that=this;
              this.dialog = this.$createDialog({
                type: 'prompt',
                title: '更换乘车人',
                prompt: {
                  type:'tel',
                  value: '',
                  placeholder: '请输入乘车人联系电话',
                  blur:alert('22222'),
                  focus:true
                },
                onConfirm: (e, promptValue) => {
                  that.lineObj.phone=promptValue;
                  // this.$createToast({
                  //   type: 'warn',
                  //   time: 1000,
                  //   txt: `Prompt value: ${promptValue || ''}`
                  // }).show()
                }
              }).show();
          },
          showTimePicker () {
                let vm=this;
                const timePicker = this.$createTimePicker({
                showNow: false,
                minuteStep: 15,
                delay: 15,
                day: {
                len: 7,
                filter: ['今天', '明天', '后天'],
                format: 'M月d日'
                },
                onSelect: (selectedTime, selectedText) => {
                    this.lineObj.timeshow=selectedText;
                // this.$createDialog({
                //     type: 'warn',
                //     title: `选中的时间戳是 ${selectedTime}`,
                //     content: `选中的内容是 ${selectedText}`,
                //     icon: 'cubeic-alert'
                // }).show()
                },
                onCancel: () => {
                this.$createToast({
                    type: 'correct',
                    txt: 'Picker canceled',
                    time: 1000
                }).show()
                }
            })
            //   console.log(vm.nowtime)
            timePicker.setTime(vm.nowtime)
            timePicker.show()
           }
  }
};
</script>
<style lang="less" scoped>
.carpool-content{
     width: 100%;
     position: absolute;
     top: 48px;
     left: 0;
     bottom: 0;
     flex-direction:column;
     display:flex;
     .confirmCarpool{
        width: 94%;
        background-color: #fff;
        font-size: 1.4em;
        color: #777;
        padding: 0 3%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        padding-bottom: 30px;
        margin: auto;
        box-shadow: 0 0 10px rgba(155, 155, 155, .4);
        .with-click{
          margin: 0 auto;
          text-align: center;
        }
        .moneyShow{
          text-align: center;
          img{
            width: 15px;
            height: 15px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -5px;
          }
          strong{
            font-size: 22px;
            color: #1C73E2;
            margin: 0 5px;
          }
          span{
            font-size: 14px;
            color: #666;
          }
        }
        .poolremarks{
          display: flex;
          align-items: center;
          padding:5px  20px;
          border-top: 1px solid #eee; 
          .cube-textarea-wrapper{
            width: 100%;
            min-height: 50px;
          }
        }
        
        .item-person{
          display: flex;
          align-items: center;
          padding:15px  20px;
          border-top: 1px solid #eee;
          img{
            width: 15px;
            height: 15px;
            min-width: 15px;
            display: block;
            margin-right: 20px;
          }
          div{
            font-size: 14px;
            flex: 1;
          }
        }
        .item-check{
          display: flex;
          align-items: center;
          .change_nums{
            border-right:1px solid #eee; 
          }
          .change_nums,.changeTime{
            flex: 1;
            position: relative;
            padding: 0 15px;
            .cube-select-text{
              margin-left: -15px;
            }
            .start-time-dot{
              width: 15px;
              height: 15px;
              position: absolute;
              left: 8px;
              top: 17px;
              display: block;
              z-index: 1; 
            }
            .number-dot{
              width: 15px;
              height: 15px;
              position: absolute;
              left: 20px;
              top: 17px;
              display: block;
              z-index: 1;
            }
            .showverb{
                position: absolute;
                right: 58px;
                top: 17px;
                z-index: 1;
            }
            .peSet{
                text-align: center;
                height: 100%;
                line-height: 2.1 !important;
                color: #777 !important;
                padding-right: 40px !important;
            }
            .cube-btn{
                    color: #1C73E2 !important;
                    background: #fff !important;
                    text-align: center !important;
                    padding-left: 0 !important;
                    font-size:.4rem ! important; 
            }
            .cube-btn::after{
                display: none !important;
            }
          }
        }
        .confirmTitle{
            background: #fff;
            // padding: 0 15px;
            height: 2.5em;
            border-bottom: 1px solid #eee;
            text-align: center;
            font-size: 1.4em;
            position: relative;
            line-height: 2.5em;
            h5{
                font-size: 14px;
                font-weight: bold;
            }
            .backBtn{
                width: 3.5em;
                height: 100%;
                text-align: left;
                display: flex;
                align-items: center;
                align-self: center;
                position: absolute;
                top: 0;
                left: 0; 
                img{
                    width: 20px;
                    height: 20px;
                    display: block;
                    vertical-align: middle;
                    margin: 0 auto;
                    margin-left: 10px;
                }
            }
        }
     }
    .place-view-box{
        width: 100%;
        flex-direction:column;
        display:flex;
        box-shadow: 0 0 3px rgba(155, 155, 155, .9);
        // background: #fff;
        z-index: 2;
        position: relative;
        nav{
            position: relative;
            z-index: 1;
            top: -40px;
            left: 0;
          .tab{
            position: relative;
            display: inline-block;
            padding:.8em 1.2em .8em 1.8em;
            color: inherit;
            text-decoration: none;
            margin: 0 -.3em;
            text-indent: .5em;
            font-size: 14px;
            color: #1A1A1A;
          } 
          .tab::before {
              content: ''; /* To generate the box */
              position: absolute;
              top: 0; 
              right: 0; 
              bottom: 0; 
              left: 0;
              z-index: -1;
              border-bottom: none;
              // border-radius: .5em .5em 0 0;
              background: #EAEAEA;
              box-shadow: 0 .15em white inset;
              transform: scale(1.2, 1.3) perspective(1.5em) rotateX(5deg);
              transform-origin: bottom left;
            }
          .selected{
              z-index: 2;
          }
          .selected::before {
              background-color: #fff;
              margin-bottom: -.08em;
            }
        }
        .palce_item{
            height: 60px;
            line-height: 60px;
            min-height: 60px;
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


