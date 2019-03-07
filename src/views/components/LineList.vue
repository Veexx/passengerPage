<template>
        <cube-scroll
        ref="scroll"
        :data="listdata"
        :options="options"
        @pulling-down="onPullingDown"  @pulling-up="onPullingUp">

             <div class="itemLine" v-for='(item,index) in listdata' :key='index'>
                 <div class="site_info">
                     <h5 class="c4b">三圣乡-欢乐谷</h5>
                     <p class="describe c74 ">全程高速</p>
                     <p class="price cff fz16"><img class="lineMoney" src="../../assets/public/RMB.png" alt="">0.10<i class="fz12 c74">元/人</i></p>
                     <p class="company fz14 c4b"><img class="company_dot" src="../../assets/public/company_dot.png">成乐专线</p>  
                     <p class="c4b">营业时间：全天24小时</p>                  
                </div>

                <a class="phone-number" href="tel:18784440886">拨打电话</a>
                <cube-button :primary="true" class="doOrder"  @click="handelOrder">立即预约</cube-button>               
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
            noMore: '暂时没有更多路线了'
          }
        }
      }
    }
  },
  props:['listdata'],
  methods: {
      handelOrder(){

      },
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
.itemLine{
    background: #fff;
    display: flex;
    border-radius:5px;
    padding: 10px;
    margin: 10px;
    align-items: center;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    position: relative;
    .site_info{
        h5{
            font-size: 16px;
            color: #444;
            font-weight: 500;
            line-height: 25px;
        }
    }
    p{
        display: block;
        margin: 8px 0;
        .lineMoney{
            width: 12px;
            height: 12px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -3px;
            margin-right: 5px;
        }
        .company_dot{
            width: 12px;
            height: 12px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -3px;
            margin-right: 5px;   
        }
        // line-height: 15px;
    }
    a{
            text-align: center;
            line-height: 2.5em;
            position: absolute;
            right: 15px;
            bottom: 4.5em;
            width: 6em;
            height: 2.5em;
            font-size: 1.4em;
            background-color: #fff;
            color: #1C73E2;
            font-weight: 500;
            border-radius: .3em;
            border: 1px solid #1C73E2;
    }
    .doOrder{
            width: 6em;
            height: 2.5em;
            padding:0;
            position: absolute;
            right: 15px;
            bottom: 15px;
            font-size: 1.4em;


    }

}
</style>

