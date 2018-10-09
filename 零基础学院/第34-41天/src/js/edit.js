import {storage} from "./data.js"
import { drawBarGraph } from "./bar.js";
import {Line} from "./line.js"
import {sourceData} from "./data.js"
import {getData} from './getData.js'

function edit() { 
    table.addEventListener('click',function(e){
        e=e||window.event
        let target=e.target||e.srcElement
        if(target.tagName==="I"){
            let td = target.parentElement
            let value=parseInt(td.textContent)
            let ipt = document.createElement("input")
            ipt.value=value
            let btn1 = document.createElement("button")
            let btn2 = document.createElement("button")
            btn1.textContent = "确定";
            btn1.setAttribute("id", "confirm");
            btn2.textContent = "取消";
            btn2.setAttribute("id", "cancel");
            td.innerHTML=""
            td.appendChild(ipt)
            td.appendChild(btn1)
            td.appendChild(btn2)
            ipt.select()

            function confirm(){
                let val=ipt.value
                if(isNaN(parseInt(val))){
                    ipt.focus()
                    alert("请输入数字！")
                }else if(val===value){
                    ipt.focus()
                    alert("没有修改数字！")
                }else{
                    storage(xdata)
                    let data=getData(sourceData)
                insertTable(data)
                //合并处理表格
                changeCell()
                mergeCell(1, 0)
                //图表
                drawBarGraph(data)
                let line = new Line($('line-chart'))
                line.creatPath(data)
            }}
            function cancel(e){
                e=e||window.event
                let target=e.target||e.srcElement
                getData(sourceData)
                target.parentNode.innerHTML=item+`<i>✎</i>`
            }
            btn1.addEventListener("click",confirm,false)
            btn2.addEventListener("click",cancel,false)
        }}}

export {edit}