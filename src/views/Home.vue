<template>
  <div class="main-content">
      <head-view></head-view>
    <transition name="fade" mode="out-in">
        <keep-alive>
           <router-view :baseposition="baseposition" :baselocation="baselocation"></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
import Head from '@/views/components/head.vue'
 export default {
     data(){
         return{
           baseposition:{
               startplace:'您从哪儿出发',
               endplace:'您要去哪儿'
           }
         }
     },
     methods:{

     },
     components:{
         'head-view':Head

     },
     computed:{
        baselocation (){ 
              var baselocation = this.$store.state.fromlocation;
               return baselocation; 
        } 
     },
     created:function(){

     }
 }    
</script>
<style>

</style>


