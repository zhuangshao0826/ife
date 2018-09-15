4
// 生成行首栏

function createTable() {    
    table.innerHTML = "";
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
    // 生成数据表格
    for(let i=0; i<data.length; i++){
        let tr=document.createElement("tr")
        for(let key in data[i]){
            // console.log(key)
                if(Array.isArray(data[i][key])){
                    for(let j=0; j<data[i][key].length; j++){
                        let td=document.createElement("td")
                        let icon=document.createElement("img")
                        let iptconfirm=document.createElement("input")
                        let iptcancel=document.createElement("input")
                        let ipt=document.createElement("input")
                        let datatext=data[i][key][j]
                        let textcontent=document.createTextNode(datatext)
                        
                        icon.setAttribute('src','edit.png')
                        ipt.setAttribute('type','text')
                        ipt.setAttribute('value',data[i][key][j])
                        iptconfirm.setAttribute('type', 'button')
                        iptcancel.setAttribute('type', 'button')
                        iptconfirm.setAttribute('value', '确认')
                        iptcancel.setAttribute('value', '取消')
                        iptconfirm.setAttribute('class', 'confirm')
                        iptcancel.setAttribute('class', 'cancel')


                        td.appendChild(textcontent)
                        td.appendChild(ipt)
                        td.appendChild(icon)
                        td.appendChild(iptconfirm)
                        td.appendChild(iptcancel)
                        tr.appendChild(td)
                        

                        icon.onclick=function (e) {
                            e=e||window.event
                            let target=e.target||e.srcElement
                            target.parentNode.children[0].setAttribute('style','display:block')
                            // target.parentNode.children[0].focus()
                            target.parentNode.children[0].select();
                            target.parentNode.children[1].setAttribute('style','display:none')
                            target.parentNode.children[2].setAttribute("style", "display:block");
                            target.parentNode.children[3].setAttribute("style", "display:block");
                            target.parentNode.childNodes[0].nodeValue=""
                        }

                        iptconfirm.onclick=function (e) {
                            e=e||window.event
                            let target=e.target||e.srcElement
                            let val=target.parentNode.children[0].value
                            let temp=target.parentNode.textContent

                            if(isNaN(val)){
                                alert("请输入数字")
                                target.parentNode.children[0].value=temp
                            }
                            else if(val==temp){
                                alert("没有修改！")
                            }
                            else{
                                data[i][key][j]=val
                                storage(data)
                            }
                            createTable(data)
                            drawBarGraph(data)
                            drawLineGraph(data)
                        }

                        iptcancel.onclick=function (e) {
                            e=e||window.event
                            let target=e.target||srcElement
                            target.parentNode.children[0].setAttribute('style','display:none')
                            target.parentNode.children[1].setAttribute('style','display:blcok')
                            target.parentNode.children[2].setAttribute("style", "display:none");
                            target.parentNode.children[3].setAttribute("style", "display:none");
                            target.parentNode.childNodes[0].nodeValue=datatext
                        }

                        ipt.onkeyup=function(e){
                            e=e||window.event
                            let target=e.target||e.srcElement
                            // console.log(e.keyCode)
                            if(e.keyCode===13){
                                iptconfirm.onclick()
                            }
                            else if(e.keyCode===27){
                                iptcancel.onclick()
                            }
                        }
                        
                        // ipt.onblur=function (e) {
                        //     e=e||window.event
                        //     let target=e.target||e.srcElement
                        //     target.parentNode.children[0].setAttribute('style','display:none')
                        //     target.parentNode.children[1].setAttribute('style','display:hidden')
                        //     target.parentNode.children[2].setAttribute("style", "display:none");
                        //     target.parentNode.children[3].setAttribute("style", "display:none");
                        //     target.parentNode.childNodes[0].nodeValue=datatext
                        // }
                        
                    }}
                else {
                    let td=document.createElement("td")
                    td.innerHTML=data[i][key]
                    tr.appendChild(td)
                }}
                table.appendChild(tr)
            }
            tableWrapper.appendChild(table)
        }
        
