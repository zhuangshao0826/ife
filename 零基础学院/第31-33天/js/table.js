// 结合数据生成表格

let tableWrapper=document.getElementById("table-wrapper")
let table=document.createElement("table")
table.setAttribute("id", "table")

// 生成行首栏
let tr=document.createElement("tr")
tr.innerHTML=  `<th>商品</th>
                <th>地区</th>
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
                <th>12月</th>
                <th>12月</th>`
table.appendChild(tr)
tableWrapper.appendChild(table)

function createTable() {
    table.innerHTML = "";
    // 生成数据表格
    console.log(userData)
    for(let i=0; i<userData.length; i++){
        let tr=document.createElement("tr")
        for(let key in userData[i]){
            // console.log(key)
                if(Array.isArray(userData[i][key])){
                    for(let j=0; j<userData[i][key].length; j++){
                        let td=document.createElement("td")
                        td.innerHTML=userData[i][key][j]
                        tr.appendChild(td)
                    }}
                else {
                    let td=document.createElement("td")
                    td.innerHTML=userData[i][key]
                    tr.appendChild(td)
                }}1
                table.appendChild(tr)
            }
            tableWrapper.appendChild(table)
        }
        
