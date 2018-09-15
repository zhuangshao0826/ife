let proWrapper = $("product-wrapper")
let regWrapper = $("region-wrapper")
let img=$("pencil")
// td.addEventListener('mouseover', ()=>{
//     console.log(img)
// },false)
// let inputs=document.querySelectorAll("input[type=text]")
// console.log(inputs)
// 创建表单 加上全选逻辑
creatCheckbox(item1,regWrapper, "regionAll")
creatCheckbox(item2,proWrapper, "productAll")
choose(regWrapper, "regionAll")
choose(proWrapper,"productAll")


// 结合数据生成表格
let tableWrapper=document.getElementById("table-wrapper")
let table=document.createElement("table")
table.setAttribute("id", "table")
// 给地区复选框加上事件获取数据生成表格，图表
regWrapper.addEventListener("click",(e)=>{
    readData()
},false)
regWrapper.addEventListener("click", createTable, false);
regWrapper.addEventListener("click", changeTd, false);
regWrapper.addEventListener("click", function () {
    mergeCell(1, 0);
}, false);
regWrapper.addEventListener('click',()=>{
    drawBarGraph(getData())
},false)
regWrapper.addEventListener('click',()=>{
    drawLineGraph(getData())
},false)
// 给产品复选框加上事件获取数据生成表格，图表
proWrapper.addEventListener("click",(e)=>{
    readData()
},false)
proWrapper.addEventListener("click", createTable, false);
proWrapper.addEventListener("click", changeTd, false);
proWrapper.addEventListener("click", function () {
    mergeCell(1, 0)
}, false);
proWrapper.addEventListener('click',()=>{
    drawBarGraph(getData())
},false)
proWrapper.addEventListener('click',()=>{
    drawLineGraph(getData())
},false)


table.addEventListener('mouseover',(e)=>{
    e=e||e.window
    let target=e.target||e.srcElement 
    if(target.tagName.toLowerCase()==="td"){
        let parentNode=target.parentNode
        // let data=Array.from(parentNode.children).map(x=>parseInt(x.innerText)).slice(-12)
        let newdata=[]
        newdata[0]=data[parentNode.rowIndex-1]
        drawBarGraph(newdata)
        drawLineGraph(newdata)
    }
},false)
table.addEventListener('mouseleave', (e)=>{
    drawBarGraph(data)
    drawLineGraph(data)
},false)
// inputs.addEventListener("blur", (e)=>{
//     e=e||e.window
//     let target=e.target||e.srcElement
//     if(isNaN(target.value)){
//         alert(xxx)
//     }
// },false)
