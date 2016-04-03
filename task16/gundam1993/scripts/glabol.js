 /**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 	var aqiData = {},
      cityRE = /^[\u4e00-\u9fa5aa-zA-z]+$/i,
      aqiRE = /^[1-9]*$/i;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById('aqi-city-input');
  var aqiValue = document.getElementById('aqi-value-input');
  var cityError = document.getElementById('city-error');
  var valueError = document.getElementById('value-error');
  var cityName = city.value.trim();
  var aqi = aqiValue.value.trim();
  cityError.innerHTML = ''
  valueError.innerHTML = ''
  if (cityName == '' || !cityName.match(cityRE)) {
    cityError.innerHTML = '请输入正确的城市名称！';
  }
  if (aqi == '' || !aqi.match(aqiRE)) {
    valueError.innerHTML = '请输入正确的空气质量！';
  }

  if (cityName.match(cityRE) && aqi.match(aqiRE)) {
    if (aqiData[cityName]) {
      delete aqiData[cityName];
    }
    aqiData[cityName] = aqi;
  };
  return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table = document.getElementById('aqi-table');
  table.innerHTML = "";
  var aqikey = Object.keys(aqiData);
  var n = 1;
  if (table.childElementCount == 0) {
    table.insertRow(0);
    table.rows[0].insertCell(0);
    table.rows[0].cells[0].innerHTML = '城市';
    table.rows[0].insertCell(1);
    table.rows[0].cells[1].innerHTML = '空气质量';
    table.rows[0].insertCell(2);
    table.rows[0].cells[2].innerHTML = '操作';
  };
  for (attritube in aqiData) {
    table.insertRow(n);
    table.rows[n].insertCell(0);
    table.rows[n].cells[0].innerHTML = aqikey[n-1];
    table.rows[n].insertCell(1);
    table.rows[n].cells[1].innerHTML = aqiData[aqikey[n-1]];
    table.rows[n].insertCell(2);
    table.rows[n].cells[2].innerHTML = '<button>删除</button>'
    var delBtn = table.rows[n].cells[2].firstChild;
    delBtn.addEventListener('click',delBtnHandle,false);
    n += 1;
  };
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  if (window.event) {
    var delBtn = window.event.target;
  }else{
    var delBtn = window.srcElement.target;
  }
  var aqikey = delBtn.parentElement.parentElement.firstChild.innerHTML
  delete aqiData[aqikey];
  renderAqiList();
}

function init() {
  var addBtn = document.getElementById("add-btn");
  addBtn.addEventListener('click',addBtnHandle,false);
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

window.onload= function() {
  init();
}