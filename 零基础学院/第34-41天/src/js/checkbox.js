// 生成表单
import { sourceData } from './data.js'
import { getData } from './getData.js'
import { insertTable } from './table.js'
import { changeCell, mergeCell } from './mergetable.js'
import { drawBarGraph } from './bar.js'
import { Line } from './line.js'


/** 
 * @param {*} data 数据
 * 返回所需要的地区选项数据数组 
 */
function getRegion(data) {
    return [...new Set(data.map(x => x.region))]
}

/** 
 * @param {*} data 数据
 * 返回所需要的商品选项数据数组 
 */
function getProduct(data) {
    return [...new Set(data.map(x => x.product))]
}

let regionList = getRegion(sourceData)
let productList = getProduct(sourceData)

/**
 * 生成表单
 * @param {*} Node 生成表单的父元素
 * @param {*} checkboxList 生成表单复选框的数据数组
 */
function creatCheckbox(Node, checkboxList) {
    // 全选框创建
    let listHtml = `<label for="${Node.id}"><input id="${Node.id}" type="checkbox" >全选</label>`
    // 遍历数据创建复选框
    checkboxList.forEach((element, index) => {
        listHtml += `<label for="${element}"><input id="${element}" type="checkbox" value="${element}" ${index === 0 ? 'checked' : ""}>${element}</label>`
    })

    Node.innerHTML += listHtml

    // 给复选框和全选加上逻辑判断 
    Node.addEventListener('change', (e) => {
        e = e || e.window
        let target = e.target || e.srcElement
        if (target.tagName === 'INPUT') {
            let ipts = Node.querySelectorAll("input[type='checkbox']")
            let iptschecked = Node.querySelectorAll("input[type='checkbox']:checked")
            // 如果点击是全选框 
            if (target.id === Node.id) {
                if (!target.checked) {
                    target.checked = true
                } else {
                    ipts.forEach(x => {
                        x.checked = true
                    })
                }
            } else {
                if (iptschecked.length == ipts.length - 1 && !ipts[0].checked) {
                    ipts[0].checked = true
                } else if(iptschecked.length===0){
                    target.checked =true
                }else {
                    ipts[0].checked = null
                }
            }
            // 加入表格 
            let data=getData(sourceData)
            insertTable(data)
            //合并处理表格
            changeCell()
            mergeCell(1, 0)
            //图表
            drawBarGraph(data)
            let line = new Line($('line-chart'))
            line.creatPath(data)
        }
    })
}

export { creatCheckbox, regionList, productList}

