<template>
<div>
    <header>
        <div class="portrait" @click="centerDialogVisible = true">
            <img src="../../assets/public/myset.svg" alt="">
        </div>
        <div class="nav-bar"> 
            <div class="nav-all">
                    <div class="tabbar" v-for="(item,index) in $router.options.routes[2].children" :key="index">
                        <router-link :to="item.path" >
                        <p>{{item.name}}</p>
                        </router-link>
                    </div>
            </div>    
        </div>
    </header>
    <transition name="slide-fade">
            <div class="left-fix-list"
            @click="backside"
            v-if="centerDialogVisible"
            width="50%"
            center>
            <div class="box-card" shadow="never" id="rightside"> 
                <div class="top-side">
                        <img src="../../assets/public/myset.svg" alt="">
                        <p class="user-name">不二先森</p>
                </div>
                <div class="systems">
                        <div  class="text item" ><img src="../../assets/public/trip.svg" alt=""> 行程</div>
                        <div  class="text item" ><img src="../../assets/public/severice.svg" alt=""> 客服</div>
                        <div  class="text item" ><img src="../../assets/public/mb.svg" alt=""> 优惠劵</div>
                        <div  class="text item" ><img src="../../assets/public/about.svg" alt=""> 关于</div> 
                </div>            
                <p class="product-word" style="">-由希格斯科技提供技术支持-</p>               
                </div>              
            </div>
    </transition>
</div>
</template>
<script>
export default {
    data(){
        return{
                centerDialogVisible: false,

        }
    },
    methods:{
         backside(){
            let vm=this;
            var e = e || window.event; //浏览器兼容性
                    var elem = e.target || e.srcElement;
                    while (elem) { //循环判断至跟节点，防止点击的是div子元素
                        if (elem.id && elem.id == 'rightside') {
                            return;
                        }
                        elem = elem.parentNode;
                    }
                vm.centerDialogVisible=false;
            },
    },
    mounted:function(){
        // console.log(this.$router.options.routes);
    }

}
</script>
<style>
 header{
    width: 100%;
    height: 1.4rem;
    font-size: 1.5em;
    text-align: center;
    line-height: 3em;
    background-color: #fff;
    color: #949494;
    font-family:PingFang-SC-Medium;
    box-shadow: 0 0 3px rgba(155, 155, 155, .9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 163;
    overflow: hidden;
 }
 .nav-bar{
    height: 1.6rem;
    margin: 0 auto;
    display: flex;
    position: relative;
    white-space: nowrap;
    overflow-x: scroll;
    flex: 1;
    -webkit-overflow-scrolling: touch;
 }
 .nav-bar::-webkit-scrollbar {
     display:none !important;
     }
 .tabbar{
     margin: 0 1em;
     display: inline-block;
 }
 .tabbar a{
     display: block;
     height: 100%;
     position: relative;
 }
 .tabbar .router-link-exact-active ::after{
    content: '';
    display: block;
    height: 2px;
    background-color: #1C73E2;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: .5em;
 }
 .tabbar p{
    color: #636363;
    text-align: center;
    line-height: 3.5em;
 }
 .bottom-active p{
     color: #1C73E2;
 }
 .tabbar .bottom-active .seleted-nav{
  display: block;
 }
 .tabbar .bottom-active .normal-nav{
  display: none;
 }
 .portrait{
     margin: .5em 0;
     padding: 0 1em;
     display: inline-block;
     text-align: center;
     line-height: 2.5em;
     border-right:1px solid #efefef; 
     
 }
 header{
     display: flex;

 }
 .portrait img{
     width: 1.6em;
     height: 1.6em;
     display: inline-block;
     margin-bottom: -0.4em;
 }
 .nav-all{
         display: table;
    table-layout: fixed;
    white-space: nowrap;
    width: auto;
    position: absolute;
    left: 0;
 }

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  transform: translateX(10px);
  opacity: 0;
}
 .left-fix-list{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.4);
    z-index: 165;
    font-size: 10px;
  }
  .box-card {
    width: 45%;
    border-radius: inherit;
    background-color: white;
    margin-top: 0;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: none;
    padding: 30px 20px;
  }
  .el-dialog{
    margin-top: 0 !important;
  }
  .dialog-title{
    display: block;
    margin: 0 auto;
    text-align: left;
    margin-left: 10px;
  }
  .dialog-title img{
    width: 30px;
    height: 30px;
  }
  .top-side img{
     width: 50px;
     height: 50px;
     border-radius:50%;
     display: block;
     margin: 0 auto;

  }
  .user-name{
    text-align: center;
    font-size: 14px;
    margin: 15px 0;
  }
  .box-card .text{
      font-size: 14px;
      color: #474747;
      margin: 10px 0;
      padding: 10px 0;
      text-align: left;
  }
  .systems{
      margin-top: 40px;
  }
  .systems .text img{
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin: 0 15px 0 0;
      margin-top: -4px;
  }
  .product-word{
        position:absolute;
        bottom:100px;
        left:0;
        text-align:center;
        width:100%;
        color:#666;
  }
</style>

