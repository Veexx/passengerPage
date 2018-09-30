<template>
  <div class="release_distance_page" style="left: 0px;">
      <div class="release_title">
          <span class="back_main" @click="closewindow"></span>
          <h4>发布顺风车</h4>
      </div>
      <div class="c_place"><!--起点-->
          <div class="origin" @click="setorigin">
              <p class="origin_place origin_clicked">{{originp}}</p><i class="origin_dot"></i>
          </div><!--终点-->
          <div class="finish" @click="setfinish">
              <p class="finish_place finish_place_btn">{{finishp}}</p><i class="finish_dot"></i>
          </div><!--时间-->
          <div class="c_times">
              <i class="time_clock"></i>
              <div class="form-item item-line">
                  <div class="pc-box">
                      <!-- <div id="picker5">出发时间</div> -->
                  <cube-button @click="showTimePicker">{{timeshow}}</cube-button>
                  </div>
              </div>
              <div class="change_nums">
                  <span class="turn_right"></span>
                  <span class="showverb">人</span>
                  <cube-select
                    v-model="value"
                    :title="title"
                    :options="options"
                    :auto-pop="autoPop"
                    :disabled="disabled"
                    @change="change" class="peSet">
                  </cube-select>
              </div>
          </div>
          <!-- <div class="write_price">
              <i class="write_price_dot"></i>
              <div class="price_box">
                  <span>价格(元/人)</span>
                  <input type="text" maxlength="18" placeholder="请输入" id="write_price">
              </div>
          </div> -->
          <!--发布顺风车留言-->
          <div class="remarks">
                <cube-textarea
                v-model="remarks"
                :placeholder="remarkPlaceholder"
                :maxlength="maxlength"
                ></cube-textarea>
              </div>
            </div>
            <div class="send_btn_c" id="release">
                <button type="button" class="mc-btn">确认发布</button>
            </div>
        <select-place v-if="placecon" @cancel="cancelplace" @sureStartplace="sureStartplace" @sureEndplace="sureEndplace" :setype="placeword"></select-place>
        </div>
</template>
<script>
import Placeset from '@/components/public/Placeselect';
    export default{
        data(){
            return{
               placecon:false,
               originp:'从哪儿出发',
               finishp:'你要去哪儿',
               timeshow:'出发时间',
               originpo:'',
               finishpo:'',
               placeword:'',
               nowtime:'',
               bottomSheet: false,
               verb:1,
               remarks: '',
               remarkPlaceholder: '给司机留言（可不填）',
               maxlength: 100,
               options: [1, 2, 3, 4, 5, 6],
                value: 1,
                title: '选择乘坐人数',
                // placeholder: '请选择入职时间',
                autoPop: false,
                disabled: false

            }
        },
        mounted(){
         this.nowtime=new Date().valueOf() + 1 * 60 * 60 * 1000;
        },
        methods:{
             change(value, index, text) {
      console.log('change', value, index, text)
    },

            closewindow(){
                this.$router.back(-1);
            },
            setorigin(){
                this.placeword='您从哪儿出发'
                this.placecon=true;
            },
            setfinish(){
                this.placeword='您要去哪儿'
                this.placecon=true;
            },
            cancelplace(){
                this.placecon=false;
            },
            sureStartplace(name,location){
                this.originp=name;
                this.originpo=[location.lng,location.lat];
            },
            sureEndplace(name,location){
                this.finishp=name;
                this.finishpo=[location.lng,location.lat];
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
        },
        components:{
            'select-place':Placeset
        }

    }
</script>
<style>
.release_distance_page{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 101%;
    background: #fff;
    z-index: 4;
    transition: left 0.5s;
    -moz-transition: left 0.5s; /* Firefox 4 */
    -webkit-transition: left 0.5s; /* Safari 和 Chrome */
    -o-transition: left 0.5s; /* Opera */
}

.release_title {
    margin: 0 0 1em 0;
    -webkit-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    -moz-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    height: 4em;
    line-height: 4em;
    text-align: center;
    position: relative;
}
.release_title h4{
    color: #555;
    font-size: 14px;
    /* font-weight: 600; */
}
.back_main {
    width: 24px;
    height: 24px;
    background: url("../../assets/public/left.svg") no-repeat;
    background-size: cover;
    position: absolute;
    left: 0.5em;
    top: 1em;
}
i{
    font-style: normal;
}
.c_place {
    width: 95%;
    background-color: #fff;
    font-size: 1.4em;
    color: #777;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    -moz-box-shadow: 0 0 10px rgba(155, 155, 155, .8);
    box-shadow: 0 0 10px rgba(155, 155, 155, .8);
}
.c_place > div {
    padding-left: 3em;
    height: 3.5em;
    line-height: 3.5em;
    position: relative;
}
.origin_place {
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.origin_dot {
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #3BBBA3;
    position: absolute;
    left: 1.6em;
    top: 1.4em;
}
.finish_place {
    border-top: 1px solid #FDF9F9;
}
.finish_dot {
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #FC9153;
    position: absolute;
    left: 1.6em;
    top: 1.4em;
}
.c_times {
    display: flex;
}
.time_clock {
    background-image: url("../../assets/public/time.svg");
    width: 0.7em;
    height: 0.7em;
    display: inline-block;
    background-size: cover;
    position: absolute;
    left: 1.5em;
    top: 1.4em;
}
.form-item {
    display: inline-block;
    border-top: 1px solid #FDF9F9;
    border-bottom: 1px solid #FDF9F9;
}
.item-line {
    width: 45%;
}
.pc-box, .form_strat {
    width: 100%;
    height: 100%;
    line-height: 3em;
}
.form_strat1 {
    display: inline-block;
}
.change_nums {
    width: 50%;
    /* text-align: center; */
    border-top: 1px solid #FDF9F9;
    border-left: 1px solid #FDF9F9;
    border-bottom: 1px solid #FDF9F9;
    position: relative;
}
.write_price_dot {
    width: 12px;
    height: 12px;
    background: url("../../assets/public/price.svg") no-repeat;
    background-size: cover;
    position: absolute;
    left: 1.3em;
    top: 1.2em;
}
.turn_right{
    width: 16px;
    height: 16px;
    background: url("../../assets/public/turnright_.svg") no-repeat;
    background-size: cover;
    position: absolute;
    right: -.5em;
    top: 1.2em;
    z-index: 1;
}
.showverb{
    position: absolute;
    right: 1em;
    top: 0;
    z-index: 1;
}

#write_price {
    border: none;
    outline: 0;
    -webkit-appearance: none;
    font-size: 1.1em;
    text-align: right;
    background: transparent;
     width: 70%;
    height: 100%;
    color: #323233;
    display: inline-block;
}

.cycle_content{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
}
#release {
    width: 95%;
    margin: 1em auto;
}
.write_price{
    display: flex;
}
.price_box,.cycle{
    flex: 1;
}
.mc-btn {
    display: block;
    margin: 0;
    padding: 17px 16px;
    width: 100%;
    line-height: 16px;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 16px;
    color: #fff;
    background: #1C73E2;
    border: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
.c_place .remarks{
    padding-left: 0;    
    line-height: 2em;
    font-size: 1.1em  ;   
    /* border-top: 1px solid #efefef;     */
    height: inherit;
}
.weui_textarea {
    display: block;
    border: 0;
    resize: none;
    width: 100%;
    color: inherit;
    font-size: 1em;
    line-height: inherit;
    outline: 0;
}
.weui_textarea_counter {
    color: #b2b2b2;
    text-align: right;
}
.cube-btn{
        color: #777 !important;
        background: #fff !important;
        text-align: left !important;
        padding-left: 0 !important;
        font-size:.4rem ! important; 
}
.cube-btn::after{
    display: none !important;
}
.mu-list{
    text-align: center;
}
.mu-list>div{
    border-bottom: 1px solid #efefef;
}
.cube-textarea-wrapper{
    height: 100% ! important;
}
.mu-raised-button{
    width: 100%;
    height: 100%;
    box-shadow: none;
    color: #777;
    /* text-align: left; */
    /* border-bottom: 1px solid #fdf9f9; */
}
.peSet{
    text-align: right;
    height: 100%;
    line-height: 2.1 !important;
    color: #1C73E2 !important;

}
.peSet .cube-select-icon{
    display: none;
}
</style>

