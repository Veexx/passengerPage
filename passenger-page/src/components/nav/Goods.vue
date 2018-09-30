<template>
    <div class="goods-content">
        <div class="goods_info">
            <!--时间-->
            <div class="times">
                <cube-button @click="showTimePicker">{{timeshow}}</cube-button>
                <img class="form-dot" src="../../assets/public/chart_time.png" alt=""/>
            </div>
            <!--发货-->
            <div class="origin_po">
              {{sendFrom}}
                 <img class="form-dot" src="../../assets/public/send.svg" alt="" />   
            </div>
            <div class="person_po">
                <span class="personName">
                    <cube-input v-model="sendName" placeholder="发货人姓名" ></cube-input>
                    <img class="form-dot" src="../../assets/public/sendMan.svg" alt="">
                </span>
                <!--发货联系人-->
                <span class="personPhone">
                    <cube-input v-model="sendPhone" placeholder="发货人电话" ></cube-input>
                    <img class="form-dot" src="../../assets/public/sendPhone.png" alt="">
                </span>
            </div>
            <!--收货-->
            <div class="finish_po">
                {{sendTo}}
                <img class="form-dot" src="../../assets/public/get.svg" alt="" />
            </div>

            <div class="person_po">
                <span class="personName">
                        <cube-input v-model="getName" placeholder="收货人姓名"  ></cube-input>
                        <img class="form-dot" src="../../assets/public/getMan.svg" alt="">
                </span>
                <!--收货联系人-->
                <span class="personPhone">
                    <cube-input v-model="getPhone" placeholder="收货人电话" ></cube-input>
                    <img class="form-dot" src="../../assets/public/getPhone.png" alt="">
                </span>
            </div>
            <div class="weight_po">
                     <img class="form-dot" src="../../assets/public/weight.svg" alt="">
                    <cube-input v-model="weight" placeholder="请输入重量(kg)"></cube-input>
            </div>
            <div class="remarks">
                <cube-textarea
                v-model="remarks"
                :placeholder="remarkPlaceholder"
                :maxlength="maxlength"
                ></cube-textarea>
            </div>
        </div>
        <div class="goodsSure">
            <button type="button"  ><cube-loading v-if="canorder" :size="14"></cube-loading> 确认带货 <i class="estimate_price fz14" >(预计金额<b>{{estimate}}</b>元)</i></button>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            canorder:false,
            timeshow:'出发时间',
            estimate:'',
            sendFrom:'发货地址',
            sendPhone:'',
            sendName:'',
            sendTo:'收货地址',
            getPhone:'',
            getName:'',
            weight:'',
            remarks: '',
            remarkPlaceholder: '给司机留言（可不填）',
            maxlength: 100,
        }
    },
    methods:{
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
                this.$createDialog({
                    type: 'warn',
                    title: `选中的时间戳是 ${selectedTime}`,
                    content: `选中的内容是 ${selectedText}`,
                    icon: 'cubeic-alert'
                }).show()
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
}
</script>
<style scoped>
.goods-content{
    margin-top: 60px;
}
.goods_info {
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
.goods_info > div {
    display: flex;
    margin-left: 3em;
    line-height: 3em;
    position: relative;
    border-bottom: 1px solid #efefef;
}

.goods_info .origin_po,.goods_info .finish_po,.goods_info .weight_po{
    padding-top: 3px;
    padding-bottom: 3px;
}
.goods_info > div span{
    position: relative;
    padding: 3px 0;
}
.goods_info > div .personPhone{
    margin-left:30px ;
}
.personName{
    flex: 1;
    border-right:1px solid #efefef; 
}
.personPhone{
   flex: 2;
}
.times .cube-btn {
    color: #777 !important;
    background: #fff !important;
    text-align: left !important;
    padding-left: 0 !important;
    font-size: 14px ! important;
}
.goodsSure button{
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
.goodsSure button .cube-loading{
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;

}
.form-dot{
    width: 12px;
    height: 12px;
    display: block;
    position: absolute;
    left: -20px;
    top:17px;
}
.remarks .cube-textarea-wrapper{
   width: 100%;
   min-height: 50px;
}
</style>

