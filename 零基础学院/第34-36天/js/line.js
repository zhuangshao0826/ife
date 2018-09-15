// function lineChart(data) {
//     var lineChart = document.getElementById("line-chart");
//     var chartWidth = lineChart.width,
//         chartHeight = lineChart.height,
//         chartPadding = 25,
//         axisWidth = chartWidth - chartPadding,
//         axisHeight = chartHeight - chartPadding * 1.5;
//     const dataRadius = 5;
//     const colors = ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"];
//     const dataDis =  48;
//     var maxNum = 0;
//     var newData = [];

//     // 找到数据中的最大值Max  并过滤出数据中的销量数据
//     for(let i = 0; i < data.length; i++) {
//         if(typeof data[0] != "number") {
//             let temp = Math.max(...data[i].sale);
//             if(temp > maxNum) {
//                 maxNum = temp;
//             }
//             newData.push(data[i].sale);  
//         }else {
//             maxNum = Math.max(...data);
//             newData.push(data[i]);
//         }
        
//     }
//     // console.log(maxNum);

//     // 比例折算
//     var rate = maxNum / (axisHeight - chartPadding);
//     var ctx = lineChart.getContext("2d");
//     ctx.clearRect(0,0,chartWidth,chartHeight);
//     // 横轴与纵轴
//     ctx.beginPath();
//     ctx.moveTo(chartPadding, 0);
//     ctx.lineTo(chartPadding, axisHeight);
//     ctx.lineTo(axisWidth, axisHeight);
//     ctx.lineWidth = "2";
//     ctx.strokeStyle = "#000";
//     // ctx.closePath();
//     ctx.stroke();

//     // 绘制折线图
//     for(let i = 0; i < newData.length; i++) {
//         for(let j = 0; j < newData[i].length; j++) {
//             let x1 = chartPadding + (j + 1) * dataRadius + (j + 1) * dataDis;
//             let y1 = axisHeight - newData[i][j] / rate;
//             let x2 = chartPadding + (j + 2) * dataRadius + (j + 2) * dataDis;
//             let y2 = axisHeight - newData[i][j + 1] / rate;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.strokeStyle = colors[i];
//             ctx.fillStyle = colors[i];
//             ctx.lineWidth = 2;
//             ctx.closePath();
//             ctx.stroke();]
//             ctx.beginPath();
//             ctx.arc(x1, y1, dataRadius, 0, Math.PI * 2, false);
//             ctx.closePath();
//             ctx.fill();
//         }
//     }     
// }

function drawLineGraph(data) {
    let lineChart=document.querySelector("#line-chart")
    lineChart.setAttribute("width",700)
    lineChart.setAttribute("height",400)
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    const lineAreaWidth=500;
    const lineAreaHeight=300;
    // 绘制区域的内边距
    const lineAreaPadding=20
    const axisHeight=lineAreaHeight-2*lineAreaPadding
    const axisWidth=lineAreaWidth-2*lineAreaPadding
    // 定义好每一个数据点的直径，颜色，线的颜色，宽度    
    const dataRadius=5;
    const colors=["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"]
    // 定义好没两个数据点之间的横向间隔距离
    const   dataDistance=40
    // 拿到折线图中的最大值Max
    let max=0;
    let newData=[]
    for(let i=0; i<data.length; i++){
        if(typeof data[0]==="number"){
            newData.push(data[i])
        }
        let temp=Math.max(...data[i].sale)
        if(temp>max){
            max=temp
        }
        newData.push(data[i].sale)
    }
    // console.log(newData)
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    let rate=(axisHeight-lineAreaPadding)/max
    // 绘制横轴及纵轴
    let ctx=lineChart.getContext("2d")
    // ctx.fillRect(0,0,lineAreaWidth,lineAreaHeight);
    ctx.lineWidth="2"
    ctx.strokeStyle="#000"
    // 横轴
    ctx.moveTo(lineAreaPadding,lineAreaPadding+lineAreaHeight)
    ctx.lineTo(lineAreaPadding+lineAreaWidth,lineAreaPadding+lineAreaHeight)
    ctx.stroke()
    // 纵轴
    ctx.moveTo(lineAreaPadding,lineAreaPadding)
    ctx.lineTo(lineAreaPadding,lineAreaPadding+lineAreaHeight)
    ctx.stroke()
    //     计算将要绘制数据点的坐标
    //     绘制数据点        
    //     if 不是第一个点 {
    //         绘制这个数据点和上一个数据点的连线
    //     }
    for(let i=0;i<newData.length; i++){
        for(let j=0;j<newData[i].length;j++){
            let x1=lineAreaPadding+(j+1)*dataDistance+(j+1)*dataRadius
            let x2=lineAreaPadding+(j+2)*dataDistance+(j+2)*dataRadius
            let y1=lineAreaPadding+axisHeight-newData[i][j]*rate
            let y2=lineAreaPadding+axisHeight-newData[i][j+1]*rate
            
                ctx.beginPath()
                ctx.moveTo(x1,y1)
                ctx.lineTo(x2,y2)
                ctx.closePath()
                ctx.strokeStyle=colors[i]
                ctx.lineWidth="2"
                ctx.stroke()
            
            ctx.beginPath()
            ctx.arc(x1,y1,dataRadius,0,2*Math.PI)
            ctx.closePath()
            ctx.fillStyle=colors[i]
            ctx.fill()
        }
    }
}

