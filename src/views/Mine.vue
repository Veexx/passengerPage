<template>
    <div class="minePage">
        <div class="mine-top">
            <div class="backBtn" @click="backRoute">
                <img src="../assets/public/left.svg" alt="">
            </div>
            <h5>个人中心</h5>
        </div>
        <div class="userInfo">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550752613282&di=4818315f4c76fe42618a2a3b6005950d&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201508%2F05%2F20150805161627_Be2KV.thumb.700_0.jpeg" alt="">
            <div class="info-right">
                <p class="user-nikeName">Vee</p>
                <p class="bindBtn">立即绑定手机号</p>
            </div>
        </div>
        <ad-view></ad-view>
        <section class="systems">
               <div class="item-systems">
                    <p class="distance">
                        <img class="fence-dot" src="../assets/public/trip.svg" alt="">
                        <span>我的行程</span>
                    </p>         
                    <img class="clid-dot" src="../assets/public/click-right.svg" alt="">
                </div>  
               <div class="item-systems">
                    <p class="distance">
                        <img class="fence-dot" src="../assets/public/about.svg" alt="">
                        <span>当前版本</span>
                    </p>         
                    <!-- <img class="clid-dot" src="../assets/public/click-right.svg" alt=""> -->
                    <span>v1.1.3</span>
                </div>  
                <div class="item-systems" style="border-bottom:none;">
                    <p class="distance">
                        <img class="fence-dot" src="../assets/public/severice.svg" alt="">
                        <span>联系客服</span>
                    </p>         
                    <p>
                       <span class="c66">15528330925</span>
                       <img class="clid-dot" src="../assets/public/click-right.svg" alt=""> 
                    </p>
                    
                </div>                 
        </section>
        <p class="logo_view">由 <a style="color:#1C73E2;" href="https://www.cczhaoche.com">CC招车系统</a> 提供技术支持</p>
    </div>
</template>
<script>
import Adview from './components/Adview.vue'
export default  {
    data(){
        return{

        }
    },
    components:{
        'ad-view':Adview
    },
    methods:{
        backRoute(){
            this.$router.back(-1);
        }
    }
}
</script>
<style lang="less" scoped>
.minePage{
    display: block;
    position: relative;
    background: #f5f5f5;
    height: 100vh;
    .logo_view{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 2em;
        width: 100%;
        display: block;
        text-align: center;
        color: #999;
    }
    .mine-top{
        background: #fff;
        padding: 0 15px;
        height: 3.5em;
        box-shadow: 0 2px 3px rgba(0,0,0,.12);
        text-align: center;
        font-size: 1.4em;
        position: relative;
        line-height: 3.5em;
        h5{
            font-family: 'PingFang-SC-Bold';
            color: #333;
        }
        .backBtn{
            width: 3.5em;
            height: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            align-self: center;
            position: absolute;
            top: 0;
            left: 0; 
            img{
                width: 20px;
                height: 20px;
                display: block;
                vertical-align: middle;
                margin: 0 auto;
            }
        }
    }
    .userInfo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px;
        background: #fff;
        img{
            width: 65px;
            min-width: 65px;
            height: 65px;
            border-radius: 50%;
            margin-right: 13px;
        }
        .user-nikeName{
            font-size: 15px;
            color: #2E2E2E;
            margin-bottom: .8em;
        }
        .bindBtn{
            width:7.33em;
            height:1.9em;
            background:rgba(255,255,255,1);
            border:1px solid rgba(29,115,226,1);
            border-radius:3px;
            line-height: 1.9em;
            text-align: center;
            color: #1D73E2;
            font-size: 1.4em;
        }
    }
    .systems{
        display: block;
        margin-top: 10px;
        padding: 0 15px;
        background: #fff;
        .item-systems{
            height: 55px;
            line-height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #333;
            .fence-dot{
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: middle;
                margin-top: -3px;
            }
            .clid-dot{
                width:12px;
                height: 12px;
            }
        }
    }

}
</style>

