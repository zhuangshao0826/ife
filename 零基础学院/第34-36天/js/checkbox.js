// 生成表单元素


let item1 = []
let item2 = []

// 获取以k为属性值的数组
function getItems(item, k) {
    for (let i = 0; i < sourceData.length; i++) {
        item.push(sourceData[i][k])
    }
    return Array.from(new Set(item))
}


item1 = getItems(item1, "region") //["东北","华北","华南"]
item2 = getItems(item2, "product")


//   id 全选框的id el item 创建的选项数据 el 创建的父元素
function creatCheckbox(item, el, id) {
    // 创建全选框
    let iptAll = document.createElement("input")
    let txt = document.createTextNode("全选")
    iptAll.setAttribute("type", "checkbox")
    iptAll.setAttribute("id", id)

    // 创建选项复选框
    for (let i = 0; i < item.length; i++) {
        let ipt = document.createElement("input")
        let TXT = document.createTextNode(item[i])
        ipt.setAttribute("type", "checkbox")
        ipt.value = item[i] //值的转换
        el.appendChild(ipt);
        el.appendChild(TXT);
    }

    //各个部分选中一个做开始的预览
    let reg=el.querySelectorAll("input")
    let prenum=Math.floor(Math.random()*3)
    reg[prenum].checked=true

    // 放入全选框
    el.appendChild(iptAll)
    el.appendChild(txt)
}


// 给全选框加上交互  
function choose(el, id) {
    el.addEventListener('click', (e) => {
        e = e || window.event
        let target = e.target || e.srcHTML,
            allIpt = $(id),
            ipts = el.querySelectorAll("input");
        if (target.id == id) {
            for (let i = 0; i < ipts.length; i++) {
                ipts[i].checked = true
            }
        } else {
            let checkArr = []
            for (let i = 0; i < ipts.length - 1; i++) {
                if (ipts[i].checked === true) {
                    checkArr.push(ipts[i])
                }
            }
            if (checkArr.length === 3) {
                allIpt.checked = true
            } else if (checkArr.length === 0) {
                // 如果点击后数组的长度为0，说明当前点击是最后一个，那么再将其checked设为true
                target.checked = true;
            } else {
                // 全选checked设为false
                allIpt.checked = false;
            }
        }
    },true)
}