// 交换表格一二列
function changeTd() {
    let ipts1 = regWrapper.querySelectorAll("input[type=checkbox]:checked");
    let ipts2 = proWrapper.querySelectorAll("input[type=checkbox]:checked");
    let tab = document.querySelector("#table");
    // 当地区选择了一个，商品选择了多个的时候，第一列第二列交换
    if (ipts1.length === 1 && ipts2.length !== 1) {
        for (let i = 0; i < tab.rows.length; i++) {
            let temp = tab.rows[i].cells[0].innerHTML;
            tab.rows[i].cells[0].innerHTML = tab.rows[i].cells[1].innerHTML;
            tab.rows[i].cells[1].innerHTML = temp;
        }
    }
}

// 合并单元格
function mergeCell(startrow,col) {
    let tab = document.querySelector("#table");
    for (let i = startrow; i < tab.rows.length - 1; i++) {
        // 如果第i行和第i+1行内容相同则隐藏第i+1行，同时第i行的rowSpan+1
        if (tab.rows[startrow].cells[col].innerHTML === tab.rows[i + 1].cells[col].innerHTML) {
            tab.rows[i + 1].cells[col].style.display = "none";
            tab.rows[startrow].cells[col].rowSpan += 1;
        }
        // 不相等的时候从第i+1行再次执行次函数
        else {
            mergeCell(i + 1, 0)
        }
    }
}