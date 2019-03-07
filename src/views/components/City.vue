<template>
<div class="city-content">
    <cube-index-list
  :data="cityData"
  :title="title"
  @select="selectItem"
  @title-click="clickTitle"></cube-index-list>
</div>
</template>

<script>
const cityData = [
  {
    "name": "★ 热门城市",
    "items": [
      {
        "name": "眉山市",
        "value": 1
      },
      {
        "name": "乐山市",
        "value": 2
      }
    ]
  },
  {
    "name": "A",
    "items": [
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      {
        "name": "安徽",
        "value": 3
      },
      {
        "name": "安岳",
        "value": 4
      },
      
    ]
  }
]

export default {
  data() {
    return {
      title: '当前城市: 成都市',
      cityData: cityData
    }
  },
  methods: {
    selectItem(item) {
      console.log(item.name)
    },
    clickTitle(title) {
      console.log(title)
    }
  }
}
</script>
<style scoped>
.city-content{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 222;
}
</style>

