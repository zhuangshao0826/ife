import {storage} from "./data.js"
import { drawBarGraph } from "./bar.js";
import {Line} from "./line.js"
import {sourceData} from "./data.js"
import {getData} from './getData.js'
import {insertTable} from "./table.js"
import {changeCell, mergeCell} from "./mergetable.js"


function edit() { 
    table.addEventListener('click',function(e){
        e=e||window.event
        let target=e.target||e.srcElement
        if(target.tagName==="I"){
            let td = target.parentNode
            let value=parseInt(td.textContent)
            let ipt = document.createElement("input")
            ipt.setAttribute("id",1);
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
                    let arr=Array.from(td.parentElement.children)
                    console.log(arr)
                    arr=arr.map((x)=>{
                        return x.innerText.replace(/✎/g,"")
                    })
                    for(let i=0; i<arr.length;i++){
                        if(arr[i].id){
                            arr[i]=val
                        }
                    }
                    console.log(arr)
                    let xdata={
                    product: "arr[0].innerText",
                    region: "arr[0].innerText",
                    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]}
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
                target.parentNode.innerHTML=value+`<i>✎</i>`
            }
            ipt.addEventListener("blur",cancel)
            btn1.addEventListener("mousedown",confirm)
            btn2.addEventListener("click",cancel)
            document.addEventListener('keydown', (e) => {
                        // Enter键
                        if (e.keyCode === 13) {
                            confirm()
                            // ESC按键
                        } else if (e.keyCode === 27) {
                            cancel()
                        }
                    })
    }})}

export {edit}