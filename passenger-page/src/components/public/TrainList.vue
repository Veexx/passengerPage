<template>
        <cube-scroll
        ref="scroll"
        :data="listdata"
        :options="options"
        @pulling-down="onPullingDown"  @pulling-up="onPullingUp">
            <div v-for='(item,index) in listdata' class="free_distance" :class="{leftside:(index+1)%4}" :key='index'>
                <div class="freeline_title">
                    <h4>成都市 <i class="label_title_dot"></i> 乐山市 
                    <!-- <span class="free_driver_dot">司机</span>  -->
                    <!-- <span style="font-size: 0.8em;color: #999">22秒前发布</span> -->
                    </h4>
                    <span class="more_info_free" check_id="NO2600670172">详情 <i class="more_info_free_dot"></i></span>
                    </div>
                    <div class="distance_top">
                        <p><i class="free_time"></i>22:30出发<span class="c74">(大约需要3小时)</span></p>
                        <!-- <p><i class="startfree_dot"></i>四川省成都市双流区城南坡安置小区Ⅲ期</p>
                        <p><i class="endfree_dot"></i>乐山联运汽车站</p> -->
                    </div>
                    <div class="distance_middle">
                        <p> <i class="free_seat"></i>余票 <span class="free_seating">2</span> 张</p>
                        <p class="free_price"><i class="freeprice_dot"></i><i class="freeprice_view">2.20</i>元/票</p>
                        <p></p>
                    </div>
                    <div class="distance_end" >
                        <button type="button" class="sure_together">购票</button>
                    </div>
            </div>
        </cube-scroll>
</template>
<script>
    export default {
data() {
    return {
      // items: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15],
       itemIndex: 5,
       options: {
       pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '更新成功'
        },
        listype:'tab1',
         pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '暂时没有更多班次了'
          }
        }
      }
    }
  },
  props:['listdata'],
  methods: {
    //下拉刷新
    onPullingDown() {
      let vm=this;
      // 模拟更新数据
      setTimeout(() => {
        // if (Math.random() > 0.5) {
        //   // 如果有新数据
        //   this.items.unshift('I am new data: ' + +new Date())
        // } else {
        //   // 如果没有新数据
        //   this.$refs.scroll.forceUpdate()
        // }
       this.$emit('refreshlist');
      }, 3000)
    },
     onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = [
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex
          ]
          this.listdata = this.listdata.concat(newPage)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000)
    }
  }
}
</script>
<style scoped>
.free_distance{
        margin: 0.5em;
    position: relative;
    padding: .5em 1.5em 1em 3em;
    /* border-bottom: 1px solid #efefef; */
    border-radius: 5px;
     -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    font-size: 1.2em;
}

.freeline_title {
    margin-left: -1.5em;
    position: relative;
}
.freeline_title h4 {
    font-size: 1.2em;
    color: #000;
    padding: 0.5em 0;
}
.label_title_dot {
    width: 16px;
    height: 16px;
    background: url("../../assets/public/jiaohuanyou.png") no-repeat;
    background-size: cover;
    vertical-align: middle;
    display: inline-block;
}
.free_driver_dot {
    background-color: #1C73E2;
    font-size: 12px;
    color: #fff;
    vertical-align: middle;
    border-radius: .5em;
    padding: 0.1em 0.2em;
}
.more_info_free {
    position: absolute;
    right: -1em;
    top: 0.7em;
    display: block;
    color: #8a8a8a;
    font-size: 1em;
    cursor: pointer;
}
.more_info_free_dot {
    width: 16px;
    height: 16px;
    background: url("../../assets/public/turnright_.svg") no-repeat;
    background-size: cover;
    vertical-align: middle;
    display: inline-block;
    margin-bottom: .3em;
}
.free_distance p {
    line-height: 1.8em;
    position: relative;
    font-size: 1.2em;
}
.free_time {
    width: 12px;
    height: 12px;
    background: url("../../assets/public/chufashijian.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: -1.6em;
    top: 0.5em;
}
.startfree_dot {
    display: block;
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background-color: #1C73E2;
    position: absolute;
    top: 0.6em;
    left: -1.5em;
}
.endfree_dot {
    display: block;
    width: 0.6em;
    height: 0.6em;
    border-radius: 50%;
    background-color: #FC9153;
    position: absolute;
    top: 0.6em;
    left: -1.5em;
}
.free_seat {
    width: 12px;
    height: 12px;
    background: url("../../assets/public/zuowei.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: -1.6em;
    top: 0.5em;
}
.free_seating {
    color: #1C73E2;
    font-size: 1.2em;
}

.freeprice_dot {
    width: 12px;
    height: 12px;
    background: url("../../assets/public/RMB.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: -1.6em;
    top: 0.5em;
}
.freeprice_view {
    font-size: 1.2em;
    color: #FC9153;
    font-style: normal;
}
.distance_end {
    position: absolute;
    text-align: center;
    right: 0;
    bottom: 1em;
}
.sure_together {
    flex: 1;
    padding: 10px 12px;
    line-height: 10px;
    border-radius: 2px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 12px;
    color: #fff;
    background: #1C73E2;
    border: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    margin: 0.5em 1em;
}
.fabu {
    width: 100%;
    padding: 1em 0;
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    -webkit-box-shadow: 0 0 5px rgba(155, 155, 155, .9);
    -moz-box-shadow: 0 0 5px rgba(155, 155, 155, .9);
    box-shadow: 0 0 5px rgba(155, 155, 155, .9);
    background: #fff;
    text-align: center;
    z-index: 1;
}
.release_free {
    margin: 0 10px;
    flex: 2;
    padding: 16px 30px;
    line-height: 8px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 15px;
    color: #fff;
    background: #1C73E2;
    border: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
.screen_free{
    margin: 0 10px;
    flex: 1;
    padding: 16px 10px;
    line-height: 8px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 15px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    color: #1C73E2;
    border: 1px solid #1C73E2;
    background: #fff;
    /* box-shadow: 0 1px 1px rgba(0,0,0,.1); */
}
.check_trip {
    flex: 1;
    padding: 0.8em 1.5em;
    line-height: 10px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 13px;
    color: #fff;
    border: 1px solid #efefef;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    display: block;
    position: absolute;
    right: 1em;
    top: 10em;
    background: #1C73E2;
}
.call_driver {
        flex: 1;
    line-height: 10px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 13px;
    background: #fff;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    padding: 0.8em 1.5em;
    right: 1em;
    position: absolute;
    bottom: 1em;
    display: block;
    border: 1px solid #E6666A;
    color: #E6666A;
    border-radius: 5px;
}
</style>

