<template>
    <div class="checkList">
        <div class="dateList">
           <cube-scroll-nav-bar :current="current"  :txts="txts"   :labels="labels" @change="changeHandler" /> 
            <div class="dateBtn">
                  <div class="word item-buydate">
                        <p>全部</p>
                        <P>日历</P>                      
                  </div>
                  <img src="../../assets/public/xingzhuang.png" alt="" srcset="">
              </div>           
        </div>
        <div class="showPlace">
            <h5>成都-乐山</h5>
        </div>
        <div class="train-list">
            <cube-loading v-if="showloading" class="listloading"></cube-loading>
            <train-list  :listdata=listdata @refreshlist=refreshlist ></train-list>
        </div>
        <div class="backtrain" @click="backNav"><img src="../../assets/public/fanhui.png" alt="" srcset="">
              返回
         </div>
    </div>
</template>
<script>
import Tlist from '@/views/components/TrainList'
export default {
    data(){
        return{
            showloading:false,
            counter : 2, //默认已经显示出20条数据 count等于1是让从21条开始加载
            num : 20,  // 一次显示多少条
            pageStart : 0, // 开始页数
            pageEnd : 0, // 结束页数
            listdata: [], // 下拉更新数据存放数组
            downdata: [],  // 上拉更多的数据存放数组
            current: '快车',
            labels: [
                '快车', 
                '小巴',
                '专车',
                '顺风车',
                '代驾',
                '公交',
                '自驾租车',
                '豪华车',
                '二手车',
                '出租车'
            ],
            txts: [
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">今天</p><p>02.22</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">明天</p><p>02.23</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">后天</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周一</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周二</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周三</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周四</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周五</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周六</p><p>02.24</p></div>',
                 '<div class="item-date" style="height:50px;"><p style="padding:7px 0;">周日</p><p>02.24</p></div>',
            ]
        }
    },
    mounted:function(){
            this.getList();
    },
    methods:{
        backNav(){
            this.$router.back(-1);
        },
        changeHandler(){
            this.listdata='';
            this.getList();

        },
        getList(){
          let that = this;
          that.showloading=true;
          that.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
          that.showloading=false;

                   that.listdata = response.data.slice(0,8);
                  //  vm.open('top');
                //    console.log(that.listdata);
                 }, (response) => {
                    console.log('error');
                });
        },
        refreshlist(){
            this.getList();
        }
    },
    components:{
        'train-list':Tlist
    }
}
</script>
<style lang="less">
.checkList{
    background: #f5f5f5;
    .backtrain{
        width: 60px;
        height: 30px;
        background: rgba(28,115,226,.85);
        border-radius: 30px 0px 0px 30px;
        position: fixed;
        right: 0;
        bottom: 90px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        box-shadow: 0 0 10px rgba(155, 155, 155, .8);
        img{
            width: 16px;
            height: 12px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 3px;
            margin-top: -3px;
        }
    }
    .train-list{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        top: 9.5em;
        background: #f5f5f5;
    }
    .showPlace{
        padding: 20px 10px;
        h5{
            font-size: 16px;
            color: #2e2e2e;
            font-weight: bold;
        }
    }
    .dateList{
        position: relative;
        padding-right: 45px;
        .dateBtn{
            position: absolute;
            right: 0;
            top: 0;
            width: 45px;
            min-width: 45px;
            height: 100%;
            z-index: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background: #0062DF;
            box-shadow:-4px 0px 3px 0px rgba(0, 0, 0, 0.15);
            .word{
                padding-left: 5px;
                padding-right: 6px;
                color: #fff;
                font-size: 11px;
                line-height: 15px;
            }
            img{
                width: 5px;
                height: 9px;
                display: block;
            }
        }
        height: 50px;
        .cube-scroll-nav-bar {
            .cube-scroll-list-wrapper{
                background: #1C73E2;
            }
            .cube-scroll-nav-bar-item{
              color: #fff;
              border-right:1px solid #eee; 
            }
            .cube-scroll-nav-bar-item_active{
                background: #fff;
                color: #1C73E2;

            }      
        .item-date{
            height: 50px;
            p{
                line-height: 16px;

            }
        }
        }
    }
}
</style>


