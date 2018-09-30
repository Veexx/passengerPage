<template>
<div class="free-box">
    <cube-loading v-if="showloading" class="listloading"></cube-loading>
    <free-list  :listdata=listdata @refreshlist=refreshlist ></free-list>
    <div class="fabu">
      <button class="screen_free" >筛选</button>
      <button type="button" class="release_free create_free" @click="createjourney">发布人找车</button>
    </div>
   <!-- <create-journey v-if="showcbox" @closejourney="closejourney"></create-journey> -->
</div>
</template>

<script>
 import Search from '../public/Search';
 import Dlist from '@/components/public/Dlist'
 import Create from '../public/Create';
export default {
  data () {
    return {
      showloading:false,
      counter : 2, //默认已经显示出20条数据 count等于1是让从21条开始加载
      num : 20,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: [],  // 上拉更多的数据存放数组
    }
  },
  methods: {
     getList(){
          let that = this;
          that.showloading=true;
          that.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
          that.showloading=false;

                   that.listdata = response.data.slice(0,5);
                  //  vm.open('top');
                   console.log(that.listdata);
                 }, (response) => {
                    console.log('error');
                });
    },
    refreshlist(){
      this.getList();
    },
    createjourney(){
      // this.showcbox=true;
      this.$router.push('/create');
    },
    closejourney(){
      // alert(1);
      this.showcbox=false;
    }
  },
  components:{
    'search-view':Search,
    'free-list':Dlist,
    'create-journey':Create
  },
  mounted:function(){
    this.getList();
  }
}
</script>

<style scoped>
.free-box{
  display: block;
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 100%;
  bottom: 5.5em;
}
.main-box::after{
  display: block;
  clear: both;
  content: '';
}
.cube-textarea-wrapper{
  position: fixed;
  bottom: 0;
  z-index: 1111;
  width: 100%;
}

</style>
