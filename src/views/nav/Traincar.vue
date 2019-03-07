<template>
    <div class="train-content">
         <div class="screen-content">
                    <div class="search_line">
                        <div class="o_search" @click="showcity=true">
                            <p class="o_title">{{fromCity}}</p>
                        </div>
                        <img class="exchange-dot" src="../../assets/public/exchange.svg" alt="">
                        <div class="f_search" @click="showcity=true">
                            <p class="f_title">{{toCity}}</p>
                        </div>
                    </div>
                <div class="date_select">
                    <span class="now_selectDate">
                        <cube-button @click="showDatePicker">
                            <img class="calendar-dot" src="../../assets/public/rili.png" alt=""> {{trainDate}}
                        </cube-button>
                    </span>
                    <img class="clickDot" src="../../assets/public/click-right.svg" alt="">
                </div>
                <div class="screen-condition">
                    <cube-checkbox style="padding-left:0;" v-model="checked1">
                    旅游专线
                    </cube-checkbox>
                    <cube-checkbox  style="padding-left:0;" v-model="checked2">
                    城际快车
                    </cube-checkbox>
                </div>
                <div class="useBtn">
                <cube-button  class="reSet" :light="true" @click="clearAll">重置</cube-button>
                <cube-button :primary="true" @click="toSearchlines">查询</cube-button>                    
                </div>

            </div>

            <city-list v-if="showcity"></city-list>

    </div>
            
</template>
<script>
import CityList from '@/views/components/City'

export default {
    data(){
        return{
            fromCity:'出发城市',
            toCity:'到达城市',
            checked1:false,
            checked2:false,
            trainDate:'2月22日',
            showcity:false
        }
    },
    components:{
         'city-list':CityList
    },
    methods:{
        clearAll(){

        },
        toSearchlines(){
          this.$router.push('/trainCheck')
        },
        showDatePicker() {
                if (!this.datePicker) {
                    this.datePicker = this.$createDatePicker({
                    title: '出行日期',
                    min: new Date(),
                    max: new Date(2020, 9, 20),
                    value: new Date(),
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                    })
                }

                this.datePicker.show()
                },
                selectHandle(date, selectedVal, selectedText) {

                this.trainDate=selectedText[1]+'月'+selectedText[2]+'日';
                // this.$createDialog({
                //     type: 'warn',
                //     content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
                //     icon: 'cubeic-alert'
                // }).show()
                },
                // cancelHandle() {
                // this.$createToast({
                //     type: 'correct',
                //     txt: 'Picker canceled',
                //     time: 1000
                // }).show()
                // },
    },
    mounted:function(){
         
    }
}
</script>
<style scoped lang="less">

 .screen-content{
    background-color: #fff;
    font-size: 1.4em;
    color: #2e2e2e;
    margin:0 5px;
    box-shadow: 0 0 10px rgba(155, 155, 155, .4);
    border-radius: 0.2em;
    position: relative;
    margin-top:60px;
    padding: 0 15px 20px 15px;
    .useBtn{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .reSet{
            width: 50%;
            margin-right: 20px;
        }
        .cube-btn{
            padding: 0.35rem;
        }
    }
    .search_line{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
         .exchange-dot{
            width: 30px;
            height: 30px;
        }
         .o_title,.f_title{
            font-size: 14px;
            line-height: 35px;
        }
    }
    .date_select{
        display: flex;
        align-items: center;
        padding: 5px 0;
        // margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        .now_selectDate{
            flex: 1;
        }
        .clickDot{
            width: 20px;
            height: 20px;
        }
        .calendar-dot{
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -3px;
        }
    }
    .screen-condition{
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

 }

.now_selectDate .cube-btn{
    color: #777 !important;
    background: #fff !important;
    text-align: left !important;
    padding-left: 0 !important;
    font-size: 15px ! important;
    display: inline-block;
}
</style>


