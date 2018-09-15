// // 圆柱图表数据生成、
// function drawBarGraph() {
//     let data=getData()
//     let barGraph=document.querySelector("#bar-graph")
//     // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
//     let areaWidth=800
//     let areaHight=300
//     // 定义x，y轴的长度，和内边距
//     const areaPadding=30
//     const axisWidth=areaWidth-areaPadding
//     const axisHeight=areaHight-areaPadding
//     // 定义好每一个柱子的宽度及柱子的间隔宽度
//     const barGap = 15
//     const barWidth= ((axisWidth-barGap*13)/12)/data.length
//     // 定义好柱子颜色，轴的颜色
//     const barColor=["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"]
//     const axisColor="#000"


//     barGraph.setAttribute("width", areaWidth)
//     barGraph.setAttribute("height", areaHight)

//     // 拿到柱状图中的最大值Max
//     let newdata=[]
//     let datamax=0 
//     for(let i=0; i<data.length; i++) {
//         let temp=Math.max(...data[i].sale)
//         if(temp>datamax){
//             datamax=temp
//         }
//         newdata.push(data[i].sale)
//     }
//     console.log(newdata)
//     // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
//     let rate=datamax/(axisHeight-areaPadding)
//     // 绘制横轴及纵轴
//     let barHtml = [];
// 	barHtml.push("<line x1=" + areaPadding + " y1=0 x2=" + areaPadding + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");
// 	barHtml.push("<line x1=" + areaPadding + " y1=" + axisHeight + " x2=" + axisWidth + " y2=" + axisHeight + " stroke=" + axisColor + " stroke-width='2'/>");
	
// 	// 绘制柱状图
// 	for(let i = 0; i < newdata.length; i++) {
// 		for(let j = 0; j < newdata[i].length; j++) {
// 			let num = parseInt(newdata[i][j]);
// 			let barBlock = data.length * areaPadding;
// 			let x = areaPadding + (j + 1) * barGap + i * areaPadding + j * barBlock;
// 			barHtml.push("<rect width=" + barWidth + " height=" + (num / rate) + " x=" + x + " y=" + (axisHeight - num / rate) + " fill=" + barColor[i] + " />");
// 		}		
// 	}
// 	barGraph.innerHTML = barHtml.join("");
// }

function drawBarGraph(data) {
    // data?=getData()
    // console.log(data)
    let barGraph=$("bar-graph")
    // 定义绘制区域的高度和宽度
    const drawAreaWidth=500;
    const drawAreaHeight=300;
    const drawAreaPadding=30;

    // 定义轴的高度和宽度
    const axisHeight=drawAreaHeight-drawAreaPadding;
    const axisWidth=drawAreaWidth-drawAreaPadding;

    // 定义柱子的宽度
    const barGap=20;
    let barWidth=((axisWidth-13*barGap)/data.length)/12;

    // 定义柱子的颜色
    const  barColor= ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"];
    // 定义好轴的颜色
    const axisColor="#000";

    barGraph.setAttribute("width",drawAreaWidth)
    barGraph.setAttribute("height",drawAreaHeight)

    // 拿到柱状图中的最大值Max
    let max=0;
    let newdata=[]
    for(let i=0; i<data.length; i++){
        if(typeof data[0]=="number"){
            newdata.push(data[i])
        }else{
            let temp=Math.max(...data[i].sale)
            if(temp>max){
                max=temp
            }
            newdata.push(data[i].sale)
        }
    }
    // console.log(newdata)

    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    const rate=(axisHeight-drawAreaPadding)/max

//     绘制横轴及纵轴
    let barHtml=[];
    // 横轴
    barHtml.push(`<line x1="${drawAreaPadding}" y1="${drawAreaPadding+axisHeight}" x2="${drawAreaPadding+axisWidth}" y2="${drawAreaPadding+axisHeight}"`+
    `style="stroke:`+`${axisColor}`+`;stroke-width:2"/>`)
    // 纵轴
    barHtml.push(`<line x1="${drawAreaPadding}" y1="${drawAreaPadding}" x2="${drawAreaPadding}" y2="${drawAreaPadding+axisHeight}"`+
    `style="stroke:`+`${axisColor}`+`;stroke-width:2"/>`)
    

//     遍历数据
    for(i=0; i<newdata.length; i++){
        for(let j = 0; j < newdata[i].length; j++) {
            let k=newdata.length
            let barHeight=rate*parseInt(newdata[i][j])
            barHtml.push(`<rect x="${drawAreaPadding+barGap*(j+1)+barWidth*(j*k+i)}" y="${drawAreaPadding+axisHeight-barHeight}" width="${barWidth}" height="${barHeight}"
            style="fill:${barColor[i]};stroke-width:1"/>`)
        }
    }
    // 绘制柱子
    barGraph.innerHTML=barHtml.join("")
}
