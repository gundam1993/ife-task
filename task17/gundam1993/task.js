/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
 function addtitle(strip,nowGraTime,date,aqi) {
  if (nowGraTime === '天') {
    strip.title = date.substring(0,4) + '年'+ date.substring(5,7)+ '月' + date.substring(8,10) + "日 \n[AQI]: " + aqi;
  }else if (nowGraTime === '周') {
    var month = parseInt(date / 10),
    week = date - month * 10;
    strip.title = '2016年' + month + '月第' + week + "周\n[AQI]: " + aqi;
  }else if (nowGraTime === '月') {
    strip.title = date.substring(0,4) + '年'+ date.substring(5) + "月 \n[AQI]: " + aqi;
  }
 } 
function renderChart() {
  var area = document.getElementById('aqi-chart-wrap');
  var length = Object.keys(chartData).length;
  var width = area.offsetWidth / (length * 2 + 1);
  var color = '';
  var positionLeft = width;
  area.innerHTML = '';
  var areaTitle = document.createElement('p');
  var selector = document.getElementById('city-select');
  var nowGraTime = '';
  if (pageState.nowGraTime == 'day') {
    nowGraTime = '天';   
  }else if (pageState.nowGraTime == 'week') {
    nowGraTime = '周';
  }else if (pageState.nowGraTime == 'month') {
    nowGraTime = '月';
  };
  areaTitle.innerHTML = selector.value + '01-03月每' + nowGraTime +'空气质量指数';
  area.appendChild(areaTitle);
  for (var i = 0; i < length; i++) {
    var strip = document.createElement('div');
    var height = chartData[Object.keys(chartData)[i]];
    if (height < 50) {
      color = 'green';
    }else if (height < 100) {
      color =  'yellow';
    }else if (height < 150) {
      color = 'orange';
    }else if (height < 200) {
      color = 'red';
    }else if (height < 300) {
      color = 'purple';
    }else{
      color = 'black';
    }
    strip.style.backgroundColor = color;
    strip.style.width = width + 'px';
    strip.style.left = positionLeft + 'px';
    strip.style.height = height + 'px';
    positionLeft += (2 * width); 
    addtitle(strip,nowGraTime,Object.keys(chartData)[i],chartData[Object.keys(chartData)[i]]);
    area.appendChild(strip);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {//完成
  // 确定是否选项发生了变化 
  var graTime = document.getElementsByName('gra-time')
  for (var i = 0; i < graTime.length; i++) {
    if (graTime[i].checked) {
      var value = graTime[i].value;
      if (value !== pageState.nowGraTime) {
        initAqiChartData();
        renderChart();
      }
    }
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {//完成
  var selector = document.getElementById('city-select');
  // 确定是否选项发生了变化 
  if (this.value !== pageState.nowSelectCity) {
    initAqiChartData();
    renderChart();
    pageState.nowSelectCity = selector.value;
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {//完成
  var graTime = document.getElementsByName('gra-time');
  for (var i = 0; i < graTime.length; i++) {
    graTime[i].addEventListener('change',graTimeChange,false);
  }
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {//完成
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for (obj in aqiSourceData) {
    var selector = document.getElementById('city-select');
    var op = document.createElement('option');
    op.innerHTML = obj;
    selector.appendChild(op);
  };
  selector.addEventListener('change',citySelectChange,false);
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {//完成
  // 将原始的源数据处理成图表需要的数据格式
  var selector = document.getElementById('city-select');
  var graTime = document.getElementsByName('gra-time');
  var sourceData = aqiSourceData[selector.selectedOptions[0].innerHTML];
  if (graTime[0].checked) {//天
    chartData = sourceData;
    pageState.nowGraTime = 'day';
  }else if(graTime[1].checked) {//周
    chartData = {};
    var weekaqi = 0;
    var week = 11;
    for (var i = 0; i < Object.keys(sourceData).length; i++) {
      weekaqi += sourceData[Object.keys(sourceData)[i]];
      if ((i + 1) % 7 === 0 && i != 34 && i != 62) {
        chartData[week] = Math.ceil(weekaqi / 7);
        week += 1;
        weekaqi = 0;
      };
      switch(i) {
        case 30:
        chartData[week] = Math.ceil(weekaqi / 3);
        week = 21;
        weekaqi = 0;
        break;
        case 34:
        chartData[week] = Math.ceil(weekaqi / 4);
        week += 1;
        weekaqi = 0;
        break;
        case 59:
        chartData[week] = Math.ceil(weekaqi / 4);
        week = 31;
        weekaqi = 0;
        break;
        case 62:
        chartData[week] = Math.ceil(weekaqi / 4);
        week += 1;
        weekaqi = 0;
      }
    }
    pageState.nowGraTime = 'week';
  }else if(graTime[2].checked) {//月
    var jan = 0;
    var Feb = 0;
    var Mar = 0;
    for (var i = 0; i < Object.keys(sourceData).length; i++) {
      if (i < 31) {
        jan += sourceData[Object.keys(sourceData)[i]];
      }else if (i >= 31 && i < 60) {
        Feb += sourceData[Object.keys(sourceData)[i]];
      }else if (i >= 60 && i < 91) {
        Mar += sourceData[Object.keys(sourceData)[i]];
      };
    }
    chartData = {};
    chartData['2016-01'] = Math.ceil(jan / 31);
    chartData['2016-02'] = Math.ceil(Feb / 29);
    chartData['2016-03'] = Math.ceil(Mar / 31);
    pageState.nowGraTime = 'month';
  }
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload = function() {
  init();
  renderChart();
};