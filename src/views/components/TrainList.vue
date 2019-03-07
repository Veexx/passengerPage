<template>
        <cube-scroll
        ref="scroll"
        :data="listdata"
        :options="options"
        @pulling-down="onPullingDown"  @pulling-up="onPullingUp">
            <div class="item-trainticket" v-for='(item,index) in listdata' :key='index'>
                <div class="left flexcon tl" style="flex:1;">
                    <p class="fz14 c2e">20:00</p>
                    <p class="fz13 c74">暂无介绍</p>
                    <p class="fz13 cma">含返程</p>
                </div>
                <div class="middle flexcon tl" style="flex:3;max-width:160px;min-width:160px;">
                    <div class="lineCanct">
                        <div class="dot1"></div>
                        <div class="dot2"></div>
                        <div class="dot3"></div>
                    </div>
                    <p class="fz14 fw c2e">欧尚华阳</p>
                    <p class="fz14 fw c2e">绵阳中学</p> 
                </div>
                <div class="right flexcon tr" style="flex:1;">
                    <p class="cff fz16 fw"><span class="fz14">￥</span>0.20</p>
                    <p class="fz13 c74">剩余102张</p> 
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
<style scoped lang="less">
.item-trainticket{
    background: #fff;
    display: flex;
    border-radius:5px;
    padding: 15px 0;
    margin: 10px;
    align-items: center;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    p{
        display: block;
    }
    .middle{
        position: relative;
        .lineCanct{
            width: 8px;
            height: 50px;
            display: block;
            position: absolute;
            left: -10px;
            top: 0;
            .dot1{
                width: 8px;
                height: 8px;
                display: block;
                border-radius: 50%;
                background: #18C97B;
            }
            .dot2{
                width: 2.5px;
                height: 35px;
                background:linear-gradient(180deg,rgba(24,201,123,1),rgba(255,128,51,1));;
                display: block;
                margin: 0 auto;
                opacity:0.4;
            }
            .dot3{
                width: 8px;
                height: 8px;
                display: block;
                border-radius: 50%;
                background:#FF8033;
            }
        }
        p{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;  
        }
        
    }
    .flexcon{
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-self: auto;
        min-height: 55px;
    }
}
</style>

