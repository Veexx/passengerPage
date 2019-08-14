<template>
    <div class="chart-content">
        <map-view></map-view>
        <div class="chart_info">
               <!-- <div class="chartInput" @click="setorigin('from')">
                      <img class="form-dot" src="../../assets/public/sendMan.svg" alt=""/>                      
                      <p class="fromView">{{from}}</p>
                </div>
                <div class="chartInput" @click="setorigin('to')">
                      <img class="form-dot" src="../../assets/public/getMan.svg" alt=""/>
                      <p class="toView">{{to}}</p>
                </div>
                <div class="flexcontent">
                     <div class="times">
                        <cube-button @click="showTimePicker">{{timeshow}}</cube-button>
                        <img class="form-dot" src="../../assets/public/chart_time.svg" alt=""/>
                    </div>
                    <div class="changePas">
                        <img class="form-dot changePassgerDot" src="../../assets/public/passenger.svg" alt="">
                        <p>{{changePassenger}}</p>
                    </div>
                </div> -->
            <!--车型-->         
            <!-- <div class="carType">
                <div class="item-cartype" @click="changeType(1)">                 
                    <img src="../../assets/public/ic_gongwu.png" alt="">
                    <p class="cartype_info" :class="{'carSelected':typeId==1}">舒适型(4座)</p>
                </div>
                <div class="item-cartype" @click="changeType(2)">                 
                    <img src="../../assets/public/ic_shangwu.png" alt="">
                    <p class="cartype_info" :class="{'carSelected':typeId==2}">商务型(6座)</p>
                </div>
            </div> -->
        </div>
        <!-- <div class="chartSure">
            <button type="button"  ><cube-loading v-if="canOrder" :size="14"></cube-loading> 确认包车</button>
        </div> -->
    </div>
</template>
<script>
import Map from '@/views/components/Map'
export default {
    data(){
        return{
             timeshow:'出发时间',
             changePassenger:'更换乘车人',
             canOrder:false,
             estimate:'',
             typeId:1
        }
    },
    computed:{
         from(){
            var fromplace=this.$store.state.placeset.startplace;
            return fromplace;
        },
        to(){
            var toplace=this.$store.state.placeset.endplace;
            return toplace;
        }
    },
    components:{
      'map-view':Map
    },
    methods:{   
        
        changeType(index){
            this.typeId=index;
        },
        setorigin(e){
            console.log(e);
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
                    this.timeshow=selectedText;
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
           },
    }
}
</script>
<style scoped>
.chart-content{
     width: 100%;
     position: absolute;
     top: 48px;
     left: 0;
     bottom: 0;
     flex-direction:column;
     display:flex;
}
.chart_info {
    width: 95%;
    background-color: #fff;
    font-size: 1.4em;
    color: #777;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    -moz-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    border-radius: 0.2em;
}
.chart_info > div {
    display: flex;
    margin-left: 3em;
    line-height: 3em;
    position: relative;
    border-bottom: 1px solid #efefef;
    
}
    
.chartInput{
   padding: 3px 0; 
}
.chart_info .form-dot{
   width: 12px;
    height: 12px;
    display: block;
    position: absolute;
    left: -20px;
    top:17px;
}

.times .cube-btn,.things_type .cube-btn {
    color: #777 !important;
    background: #fff !important;
    text-align: left !important;
    padding-left: 0 !important;
    font-size: 14px ! important;
}
.chartSure button{
    display: block;
    margin: 15px auto;
    padding: 17px 16px;
    width: 95%;
    line-height: 16px;
    border-radius: 0.2em;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 16px;
    color: #fff;
    background: rgb(28, 115, 226);
    border: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
.chartSure button .cube-loading{
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;

}
.flexcontent{
    display: flex;
    /* justify-content: space-between; */
}

.times{
    flex: 4;
}
.changePas{
    flex: 5;
    position: relative;

}
.chart_info .changePassgerDot{
    left: 20px;
}
.changePas p{
    margin: 3px 0;
    text-align: center;
    border-left:1px solid #efefef ;
    padding-left: 3em;
    
}
.carType{
    margin: 20px 30px !important;
    display: flex;
    justify-content: space-between;
}
.item-cartype img{
    width: 98px;
    height: 40px;
    display: block;
}
.item-cartype p{
    text-align: center;
}
.carSelected{
    color:#1C73E2;
}
</style>

