/**
 * 绘制svg柱状表格
 * @param {data} 数据 
 */
function drawBarGraph(data) {
    let barGraph = $('bar-graph')

    // 定义绘制区域的高度和宽度
    const drawAreaWidth = 500
    const drawAreaHeight = 400
    const drawAreaPadding = 25
    barGraph.setAttribute('width', drawAreaWidth)
    barGraph.setAttribute('height', drawAreaHeight)

    // 定义轴的高度和宽度
    const axisHeight = drawAreaHeight - 2*drawAreaPadding
    const axisWidth = drawAreaWidth - 2*drawAreaPadding

    // 定义柱子的宽度,柱子间距
    const barGap = 10
    let barWidth = ((axisWidth - 13 * barGap) / data.length) / 12

    // 定义柱子的颜色
    const barColor = ['#27a1ea', '#9cdc82', '#ff9f69', '#d660a8', '#6370de', '#32d3eb', '#d4ec59', '#feb64d', '#b55cbd']
    // 定义好轴的颜色
    const axisColor = '#000'

    // 拿到柱状图中的最大值Max
    let max = 0
    let newdata = []
    for (let i = 0; i < data.length; i++) {
        let temp = Math.max(...(data[i].sale))
        if (temp > max) {
            max = temp
        }
        newdata.push(data[i].sale)
    }

    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    const rate = (axisHeight - drawAreaPadding) / max

    let barHtml = ``
    // 横轴
    barHtml += `<line x1="${drawAreaPadding}" y1="${drawAreaPadding+axisHeight}" x2="${drawAreaPadding+axisWidth}" y2="${drawAreaPadding+axisHeight}"  style="stroke:${axisColor};stroke-width:2"/>`
    // 纵轴
    barHtml += `<line x1="${drawAreaPadding}" y1="${drawAreaPadding}" x2="${drawAreaPadding}" y2="${drawAreaPadding+axisHeight}" style="stroke:${axisColor};stroke-width:2"/>`
    //给坐标轴加上注释
    // for(let i=1; i<=12; i++){
    //     barHtml += `<text x="${drawAreaPadding+barGap*i+barWidth*(i-1)+0.5*barWidth}" y="${drawAreaPadding*1.6+axisHeight}" fill="${axisColor}" style="text-anchor: middle;font-size:12px">${i}月</text>`
    // }


    //     遍历数据
    for (let i = 0; i < newdata.length; i++) {
        for (let j = 0; j < newdata[i].length; j++) {
            let k = newdata.length
            let barHeight = rate * parseInt(newdata[i][j])
            barHtml += `<rect x="${drawAreaPadding+barGap*(j+1)+barWidth*(j*k+i)}" y="${drawAreaPadding+axisHeight-barHeight}" width="${barWidth}" height="${barHeight}" style="fill:${barColor[i]};stroke-width:1"/>`
        }
    }
    // 绘制柱子 横轴 纵轴
    barGraph.innerHTML = barHtml
}


export { drawBarGraph}

