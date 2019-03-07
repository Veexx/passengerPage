<template>
    <div class="LinePage">
        <div class="line-top">
            <div class="backBtn" @click="backRoute">
                <img src="../assets/public/left.svg" alt="">
            </div>
            <h5>{{showTitle}}</h5>
            <div class="sreenBtn" :class="screenstatus?'hasscreen':''">
                筛选                         
                <img v-if="screenstatus" src="../assets/public/screen.svg" alt=""> 
                <img v-else src="../assets/public/normal-screen.svg" alt="">                 
            </div>
        </div>
        <section class="scroll-view-content">
             <cube-loading v-if="showloading" class="listloading"></cube-loading>
            <lines  :listdata=listdata @refreshlist=refreshlist ></lines>             
        </section>
    </div>
</template>
<script>
import Linelist from '@/views/components/LineList'
export default  {
    data(){
        return{
           showTitle:'全部拼车路线',
            showloading:false,
            counter : 2, //默认已经显示出20条数据 count等于1是让从21条开始加载
            num : 20,  // 一次显示多少条
            pageStart : 0, // 开始页数
            pageEnd : 0, // 结束页数
            listdata: [], // 下拉更新数据存放数组
            downdata: [],  // 上拉更多的数据存放数组 
            screenstatus:false  

        }
    },
    components:{
        'lines':Linelist
    },
    mounted(){
             console.log(this.$route.query);
             this.showTitle=this.$route.query.name;
            this.getList();
    },
    methods:{
        backRoute(){
            this.$router.back(-1);
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
    }
}
</script>
<style lang="less" scoped>
.LinePage{
    display: block;
    position: relative;
    background: #f5f5f5;
    height: 100vh;
    .line-top{
        background: #fff;
        padding: 0 15px;
        height: 3.5em;
        text-align: center;
        font-size: 1.4em;
        position: relative;
        line-height: 3.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 3px rgba(0,0,0,.22);
        h5{
            font-weight: 500;
            color: #333;
        }
        .backBtn{
            width: 3.5em;
            height: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            align-self: center;
            img{
                width: 20px;
                height: 20px;
                display: block;
                vertical-align: middle;
                // margin: 0 auto;
            }
        }
        .sreenBtn{
             width: 3.5em;
            height: 100%;
            text-align: right;
            display: flex;
            align-items: center;
            align-self: center;
            color: #4B4B4B;
            font-size: 14px;
            img{
                width: 15px;
                height: 15px;
                display: block;
                vertical-align: middle;
                margin: 0 auto;
            }
        }
        .hasscreen{
            color: #1C73E2;
        }
    }

    .scroll-view-content{
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        top: 4.5em;
        background: #f5f5f5;
    }

}
</style>

