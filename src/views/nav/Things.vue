<template>
    <div class="things-content">
        <div class="things_info">
            <div class="times">
                <cube-button @click="showTimePicker">{{timeshow}}</cube-button>
                <img class="form-dot" src="../../assets/public/chart_time.svg" alt=""/>
            </div>
            <!--代办事件-->
            <div class="things_type">
                <img class="form-dot" src="../../assets/public/type.png" alt=""/>
                <cube-button @click="showPickerStyle">选择代办类型</cube-button>
            </div>
            <!--代办须知-->
            <div class="things_type">
                <img class="form-dot" src="../../assets/public/explain.png" alt=""/>                
                <span>代办说明</span>
                <span class="things_explain" style="line-height: 1.5em;color: #FC9153;">{{thinsExplain}}</span>
            </div>
            <!--代办留言-->
            <div class="remarks">
                <cube-textarea
                v-model="remarks"
                :placeholder="remarkPlaceholder"
                :maxlength="maxlength"
                ></cube-textarea>
            </div>
        </div>
        <div class="thingsSure">
            <button type="button"  ><cube-loading v-if="canOrder" :size="14"></cube-loading> 确认代办 <i class="estimate_price fz14" >(预计金额<b>{{estimate}}</b>元)</i></button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            canOrder:false,
           thinsExplain:'',
           remarks: '',
           remarkPlaceholder: '备注信息（可不填）',
           maxlength: 100,
           timeshow:'代办时间',
           estimate:''
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
           },
            showPickerStyle() {
                this.$createActionSheet({
                    title: '代办业务',
                    pickerStyle: true,
                    data: [
                    {
                        content: '处理违章'
                    },
                    {
                        content: '代办保险'
                    },
                    {
                        content: '代开发票'
                    }
                    ],
                    onSelect: (item, index) => {
                    this.$createToast({
                        txt: `Clicked ${item.content}`,
                        type: 'correct',
                        time: 1000
                    }).show()
                    },
                    onCancel: () => {
                    this.$createToast({
                        txt: `Clicked canceled`,
                        type: 'warn',
                        time: 1000
                    }).show()
                    }
                }).show()
                }
    }
}
</script>
<style scoped>
.things-content{
    margin-top: 60px;
}
.things_info {
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
.things_info > div {
    display: flex;
    margin-left: 3em;
    line-height: 3em;
    position: relative;
    border-bottom: 1px solid #efefef;
}


.times .cube-btn,.things_type .cube-btn {
    color: #777 !important;
    background: #fff !important;
    text-align: left !important;
    padding-left: 0 !important;
    font-size: 14px ! important;
}
.thingsSure button{
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
.thingsSure button .cube-loading{
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

