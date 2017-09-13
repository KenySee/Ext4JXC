/**
 * 创建百度地图主方法 使用百度地图需要引入js，js链接为：http://api.map.baidu.com/api?v=1.2
 * 
 * @param {containerId:String,longitude:Number,latitude:Number,zoom:Number}
 *            mapMain 地图的主要信息:放入地图的容器ID、地图中心经度、地图中心纬度、地图清晰度(3-19默认14)
 * @param {longitude:Number,latitude:Number,remark:String,clickRemark:String}
 *            labels 地图上的标注信息，可为对象数组和单一对象:经度、纬度、备注、点击标注后的信息
 */
function showMap(mapMain, labels) {
	// checkMapMainValid(mapMain);
	mapMain.zoom = mapMain.zoom ? mapMain.zoom : 14;
	var map = createMap(mapMain);

	// 添加控件
	map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT})); // 比例尺寸控件
	map.addControl(new BMap.NavigationControl({offset: new BMap.Size(5, 50)})); // 平移缩放控件
	map.addControl(new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT})); // 切换地图类型控件

	if (labels instanceof Array) {
		for (var label in labels) {
			addLabel(map, label);
		}
	} else if (labels instanceof Object) {
		addLabel(map, labels);
	}

}

function createMap(mapMain) {
	var map = new BMap.Map(mapMain.containerId); // 百度地图类
	map.enableScrollWheelZoom(); // 启动鼠标滚轮操作
	
	var point = new BMap.Point(mapMain.longitude, mapMain.latitude); // 地图中心坐标，使用Point初始化地图
	map.centerAndZoom(point, mapMain.zoom);
	return map;
}

function addLabel(map, label) {
	var marker = new BMap.Marker(new BMap.Point(label.longitude, label.latitude));
	map.addOverlay(marker);

	if (label.remark) {
		marker.setLabel(new BMap.Label(label.remark,{offset:new BMap.Size(20,-10)}));
		//map.addOverlay(new LabelRemarkOverlay(map.getCenter(), "white", label.remark)); // 用以上方法简单，此废弃
	}

	if (label.clickRemark) {
		marker.addEventListener("click", function() {
					var opts = {
					// width : 100, // 信息窗口宽度
					// height : 50, // 信息窗口高度
					// title : "Hello" // 信息窗口标题
					}
					var infoWindow = new BMap.InfoWindow(label.clickRemark,
							opts); // 创建信息窗口对象
					map.openInfoWindow(infoWindow, new BMap.Point(label.longitude, label.latitude));
				});
	}
}

function checkMapMainValid(mapMain) {
	if (!mapMain.containerId) {

	}
}

// 标注备注的覆盖物
function LabelRemarkOverlay(center, color, text) {
	this._center = center;
	this._text = text;
	this._color = color;
}
// 继承API的BMap.Overlay
LabelRemarkOverlay.prototype = new BMap.Overlay();

// 实现初始化方法
LabelRemarkOverlay.prototype.initialize = function(map) {
	// 保存map对象实例
	this._map = map;
	// 创建div元素，作为自定义覆盖物的容器
	var div = document.createElement("div");
	div.style.position = "absolute";
	// 可以根据参数设置元素外观
	//div.style.width = this._length + "px";
	//div.style.height = this._length + "px";
	div.style.background = this._color;
	div.style.border = "1px solid red";
	div.innerHTML = this._text;
	// 将div添加到覆盖物容器中
	map.getPanes().markerPane.appendChild(div);
	// 保存div实例
	this._div = div;
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。
	return div;
}

// 实现绘制方法
LabelRemarkOverlay.prototype.draw = function() {
	// 根据地理坐标转换为像素坐标，并设置给容器
	var position = this._map.pointToOverlayPixel(this._center);
	this._div.style.left = position.x + 18 + "px";
	this._div.style.top = position.y - 30 + "px";
}
