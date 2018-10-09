import { drawBarGraph } from "./bar.js";
import {Line} from "./line.js"
import {edit} from "./edit.js"

/**
 * 根据表单数据生成表格
 * @param {*} data 表单数据
 */
function insertTable(data) {
    // 创建表头 
    table.innerHTML = ""
    let tr = document.createElement('tr')
    tr.innerHTML =`<th id="header">商品</th>
                    <th id="sub-header">地区</th>
                    <th>1月</th>
                    <th>2月</th>
                    <th>3月</th>
                    <th>4月</th>
                    <th>5月</th>
                    <th>6月</th>
                    <th>7月</th>
                    <th>8月</th>
                    <th>9月</th>
                    <th>10月</th>
                    <th>11月</th>
                    <th>12月</th>`
    table.appendChild(tr)
    tableWrapper.appendChild(table)

    // 生成数据表格
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr')
        for (let key in data[i]) {
            if (data[i].hasOwnProperty(key)) {
                if (!Array.isArray(data[i][key])) {
                    let td = document.createElement('td')
                    td.innerHTML = data[i][key]
                    tr.appendChild(td)
                } else {
                    data[i][key].forEach((item) => {
                        let td = document.createElement('td')
                        td.innerHTML = item+`<i>✎</i>`
                        tr.appendChild(td)
                    })
                }
            }
        }
        table.appendChild(tr)
    }

    // 增加鼠标滑动事件
    $("table").addEventListener("mouseover", (e)=>{
        e=e||e.window
        let target=e.target || e.srcElement
        if(target.tagName === "TD"){
            let newdata=[]
            newdata[0]=data[target.parentNode.rowIndex-1]
            drawBarGraph(newdata)
            let line = new Line($("line-chart"))
            line.creatPath(newdata)
        }
    },false)

    $("table").addEventListener("mouseout", (e)=>{
        e=e||e.window
        let target=e.target || e.srcElement
        drawBarGraph(data)
        let line = new Line($("line-chart"))
        line.creatPath(data)
    },false)
    
    //绑定修改数值功能
    edit()
    tableWrapper.appendChild(table)
}

export { insertTable}
