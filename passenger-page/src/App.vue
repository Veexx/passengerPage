<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
   <!-- <app-foot></app-foot> -->
  </div>
</template>

<script>
// import Foot from '@/components/public/Foot'

export default {
  data(){
    return{

    }
  },  
  name: 'App',
  components:{
    //   'app-foot':Foot
  } ,
  mounted:function(){
       
  }
}
</script>

<style>
</style>
