// 圆柱图表数据生成、

function drawBarGraph() {
    let data=getData()
    let barGraph=document.querySelector("#bar-graph")
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let areaWidth=800
    let areaHight=300
    // 定义x，y轴的长度，和内边距
    const areaPadding=30
    const axisWidth=areaWidth-areaPadding
    const axisHeight=areaHight-areaPadding
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    const barGap = 15
    const barWidth= ((axisWidth-barGap*13)/12)/data.length
    // 定义好柱子颜色，轴的颜色
    const barColor=["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"]
    const axisColor="#000"


    barGraph.setAttribute("width", areaWidth)
    barGraph.setAttribute("height", areaHight)

    // 拿到柱状图中的最大值Max
    let newdata=[]
    let datamax=0 
    for(let i=0; i<data.length; i++) {
        let temp=Math.max(...data[i].sale)
        if(temp>datamax){
            datamax=temp
        }
        newdata.push(data[i].sale)
    }
    console.log(newdata)
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    let rate=datamax/(axisHeight-areaPadding)
    // 绘制横轴及纵轴
    let barHtml = [];
	barHtml.push("<line x1=" + areaPadding + " y1=0 x2=" + areaPadding + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");
	barHtml.push("<line x1=" + areaPadding + " y1=" + axisHeight + " x2=" + axisWidth + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");
	
	// 绘制柱状图
	for(let i = 0; i < newdata.length; i++) {
		for(let j = 0; j < newdata[i].length; j++) {
			let num = parseInt(newdata[i][j]);
			let barBlock = data.length * areaPadding;
			let x = areaPadding + (j + 1) * barGap + i * areaPadding + j * barBlock;
			barHtml.push("<rect width=" + barWidth + " height=" + (num / rate) + " x=" + x + " y=" + (axisHeight - num / rate) + " fill=" + barColor[i] + " />");
		}		
	}
	barGraph.innerHTML = barHtml.join("");
}