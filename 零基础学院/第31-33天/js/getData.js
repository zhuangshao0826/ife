// 获取用户所选择的数据
let userData=[]

function getData() {
    userData=[]
    let ipts = document.querySelectorAll("input[type=checkbox]:checked");
    let arr=[]
    // console.log(ipts)
    for(let i=0; i<ipts.length ; i++){
        if(!ipts[i].id){
            arr.push(ipts[i].value)
        }
    }
    // console.log(arr) ["华东", "华北", "华南", "手机", "笔记本", "智能音箱"]

    // 与数据表匹配需要的数据
    for (let key of sourceData) {
        // console.log(key)
        if(arr.indexOf(key.product)!==-1&&arr.indexOf(key.region)!==-1){
            userData.push(key)
        }
    }
    console.log(userData)
    return userData
}