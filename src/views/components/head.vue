<template>
<!-- <div> -->
    <header>
        <div class="portrait" @click="toMIne">
            <img src="../../assets/public/myset.svg" alt="">
        </div>
        <div class="nav-bar"> 
            <!-- <div class="nav-all"> -->
                    <!-- <div class="tabbar" v-for="(item,index) in $router.options.routes[2].children" :key="index">
                        <router-link :to="item.path" >
                        <p>{{item.name}}</p>
                        </router-link>
                    </div> -->
                    <cube-scroll-nav-bar :current="current"  :txts="txts"   :labels="labels" @change="changeHandler" />
            </div>    
        <!-- </div> -->
    </header>
</template>
<script>
export default {
    data(){
        return{
                centerDialogVisible: false,
                // current: '拼车',
                // txts:[]
        }
    },
    methods:{
      //切换路由
        changeHandler(cur) {
          this.$router.push(cur);

        },
        toMIne(){
          this.$router.push('/mine');
        }
    },
    computed:{
      labels(){  
        let labels=[];
        this.$router.options.routes[1].children.map((item,index)=>{
          labels.push(item.path)
        });
        return labels;
      },
      txts(){
        var txts=[];
         this.$router.options.routes[1].children.map((item,index)=>{
          txts.push(item.name);
        });
        return txts;
      },
      current(){
        return this.$route.path
      }

    },
    mounted:function(){
        // console.log(this.$router.options.routes[3].children);
    
    }

}
</script>
<style scoped lang="less">
 header{
    width: 100%;
    height: 3em;
    font-size: 1.6em;
    text-align: center;
    line-height: 3em;
    background-color: #fff;
    color: #949494;
    font-family:PingFang-SC-Medium;
    box-shadow: 0 0 3px rgba(155, 155, 155, .9);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
     .portrait{
        margin: .25em 0;
        padding: 0 1em;
        display: inline-block;
        text-align: center;
        line-height: 2.5em;
        border-right:1px solid #efefef; 
        position: absolute;
        left: 0;
        top:0; 
        img{
            width: 1.1em;
            height: 1.1em;
            display: inline-block;
            vertical-align: middle;
            margin-top: -0.2em; 
        }
     }
      .portrait::after{
          content: '';
          display: block;
          width: 1px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          background: #eee;
          z-index: 1;
        } 
    
    .nav-bar{
        padding-left: 3em;
    }
    .tabbar{
      margin: 0 1em;
      display: inline-block;
      a{
         display: block;
        height: 100%;
        position: relative; 
      }
      p{
        color: #636363;
        text-align: center;
        line-height: 3.5em;       
      }
      .bottom-active{
        p{
          color: #1C73E2;
        }
        .seleted-nav{
          display: block;
        }
       .normal-nav{
          display: none;
        } 
      }     
    }   
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

</style>

