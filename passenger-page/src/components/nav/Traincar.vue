<template>
    <div class="train-content">
         <div class="screen-content">
                    <div class="search_line">
                        <span>城市：</span>
                        <div class="o_search">
                            <p class="o_title">
                                <img class="city-dot" src="../../assets/public/sendMan.svg" alt="">
                                {{fromCity}}
                            </p>
                        </div>
                        <img class="exchange-dot" src="../../assets/public/exchange.svg" alt="">
                        <div class="f_search">
                            <p class="f_title">
                                <img class="city-dot" src="../../assets/public/to.svg" alt="">
                                {{toCity}}
                            </p>
                        </div>
                    </div>
                <div class="date_select">
                    <span class="last_date">
                        <img class="click-dot" width="20" height="20" src="../../assets/public/dateleft.svg" />
                        前一天
                    </span>
                    <span class="now_selectDate"><cube-button @click="showDatePicker"><img class="calendar-dot" src="../../assets/public/rili.png" alt=""> 9月30日</cube-button></span>
                    <span class="next_date" >
                        后一天
                        <img class="click-dot" width="18" height="18" src="../../assets/public/dateright.svg" />
                    </span>
                </div>
            </div>
            <div class="train-list">
                <cube-loading v-if="showloading" class="listloading"></cube-loading>
                <train-list  :listdata=listdata @refreshlist=refreshlist ></train-list>
            </div>
    </div>
            
</template>
<script>
 import Tlist from '@/components/public/TrainList'
export default {
    data(){
        return{
            showloading:false,
            fromCity:'出发城市',
            toCity:'到达城市',
            counter : 2, //默认已经显示出20条数据 count等于1是让从21条开始加载
            num : 20,  // 一次显示多少条
            pageStart : 0, // 开始页数
            pageEnd : 0, // 结束页数
            listdata: [], // 下拉更新数据存放数组
            downdata: [],  // 上拉更多的数据存放数组

        }
    },
    components:{
         'train-list':Tlist,
    },
    methods:{
        getList(){
          let that = this;
          that.showloading=true;
          that.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
          that.showloading=false;

                   that.listdata = response.data.slice(0,5);
                  //  vm.open('top');
                //    console.log(that.listdata);
                 }, (response) => {
                    console.log('error');
                });
        },
        showDatePicker() {
                if (!this.datePicker) {
                    this.datePicker = this.$createDatePicker({
                    title: 'Date Picker',
                    min: new Date(2008, 7, 8),
                    max: new Date(2020, 9, 20),
                    value: new Date(),
                    onSelect: this.selectHandle,
                    onCancel: this.cancelHandle
                    })
                }

                this.datePicker.show()
                },
                selectHandle(date, selectedVal, selectedText) {
                this.$createDialog({
                    type: 'warn',
                    content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
                    icon: 'cubeic-alert'
                }).show()
                },
                cancelHandle() {
                this.$createToast({
                    type: 'correct',
                    txt: 'Picker canceled',
                    time: 1000
                }).show()
                },
        refreshlist(){
            this.getList();
        }
    },
    mounted:function(){
            this.getList();
    }
}
</script>
<style scoped>
 /* .train-content{
      margin-top: 60px;
 } */
 .screen-content{
     width: 95%;
    background-color: #fff;
    font-size: 1.4em;
    color: #777;
    margin:auto;
    -webkit-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    -moz-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    border-radius: 0.2em;
    position: fixed;
    top:60px;
    left: 0;
    right: 0;
 }
 .search_line,.date_select{
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 15px 15px 10px 15px;
     
 }
 .o_title,.f_title{
     font-size: 14px;
     line-height: 35px;
 }
 .exchange-dot{
     width: 30px;
     height: 30px;

 }
 .city-dot{
     width: 12px;
     height: 12px;
     vertical-align: middle;
     margin-top: -4px;
 }
.click-dot{
    margin-top: -3px;
    vertical-align: middle;
    display: inline-block;
}
.last_date,.next_date{
    color: #1C73E2;
    /* border-radius:5px; 
   border: 1px solid #1C73E2;
   padding: 5px 10px; */
}
.calendar-dot{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
}
.train-list{
  display: block;
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
  bottom: 1em;
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


