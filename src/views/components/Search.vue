<template>
      <div class="control_box" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
      <div class="search_line">
        <div class="o_search free_city">
          <p class="o_title">
            <span class="o_title_dot"></span>出发地</p>
        </div>
        <div><i class="search_dot"></i></div>
        <div class="f_search free_city">
          <p class="f_title">
            <span class="f_title_dot"></span>目的地
          </p><!--<p class="f_city">请选择到达城市</p>-->
        </div>
      </div>
      <div class="choose_date">
        <i class="date_view"></i>
          <div class="date_show" id="selectDate10">
            <div class="pc-box" style="line-height: 3em;">
              <span id="a_time"></span>
              <span data-year="2018" data-month="2" data-date="24" id="showDate10" class="form_strat1">02月24日(今天)</span>
            </div>
          </div>
        <i class="click_free_right"></i>
      </div>
              <div class="search_free_btn">
                <button type="button" class="reset_free">重置</button>
                <button type="button" class="search_free">搜索</button>
              </div>
                </div>
</template>
<script>
    
</script>

<style>
.control_box {
    margin: 6em .5em 1em .5em;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    background: #fff;
    border-radius: 5px;
}
.search_line {
    background: #fff;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    padding: 0.5em 3em 1em 1em;
    border-radius: 5px;
    border-top: none;
}
/*隐藏滚动条*/
::-webkit-scrollbar {
    display: none;;
}
.search_line .free_city {
    flex: 2;
}
.search_line > div {
    flex: 1;
    -webkit-flex: 1;
    text-align: center;
    padding-top: 0.5em;
}
.o_title, .f_title {
    color: #333;
    position: relative;
    font-size: 1em;
    line-height: 2em;
}
.o_title_dot {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #1C73E2;
      margin-right: 3em;
          margin-bottom: 0.1em;
}
.search_dot {
    width: 24px;
    height: 24px;
    background: url("../../assets/public/jiaohuan.png") no-repeat;
    background-size: cover;
    display: block;
        margin-left: 2em;   
}
.f_title_dot {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: #FC9153;
    margin-right: 3em;
           margin-bottom: 0.1em;
}
.f_title{
    color:#FC9153 ;
}
.choose_date {
    padding-left: 2em;
    position: relative;
    margin: 0 1em;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
}
.date_view {
    display: inline-block;
    margin-top: 0.8em;
    position: absolute;
}
.date_view embed {
    vertical-align: middle;
}
.date_show {
    font-weight: bold;
    color: #666;
    margin:0 0 0 2em;
}
.pc-box, .form_strat {
    width: 100%;
    height: 100%;
    line-height: 3em;
}
.form_strat1 {
    display: inline-block;
}
.click_free_right {
    position: absolute;
    right: 1em;
    top: 0.8em;
}
.click_right embed {
    vertical-align: middle;
}
.search_free_btn {
    padding: 1.5em;
    display: flex;
}

.search_free, .reset_free {
    margin: 0 1em;
    flex: 1;
    padding: 16px 16px;
    width: 100%;
    line-height: 8px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    background-image: none;
    white-space: nowrap;
    outline: none;
    font-size: 16px;
    color: #fff;
    background: #4A4C5B;
    border: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
.reset_free {
    background: #1C73E2;
    border: 1px solid #efefef;
}
.date_view{
    width:18px;
    height: 18px;
    background: url('../../assets/public/date.svg') no-repeat;
    display: inline-block;
    vertical-align: middle;
    background-size:cover; 
}
</style>
