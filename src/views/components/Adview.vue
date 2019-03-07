<template>
  <div class="adView">
      <cube-slide :auto-play="true" :data="items"/>
  </div>
    
</template>
<script>
export default {
    data(){
        return{
 items: [
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        }
      ]
        }
    }
}
</script>
<style lang="less" scoped>
.adView{
    width: 100%;
    height: 100px;
    margin: .5em auto;
}
</style>


