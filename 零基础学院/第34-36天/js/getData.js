// 获取用户所选择的数据
let data
function getData() {
    data=[]
    let ipts = document.querySelectorAll("input[type=checkbox]:checked");
    let arr=[]
    for(let i=0; i<ipts.length ; i++){
        if(!ipts[i].id){
            arr.push(ipts[i].value)
        }
    }

    // 与数据表匹配需要的数据 
    for (let key of sourceData) {
        // console.log(key)
        if(arr.indexOf(key.product)!==-1&&arr.indexOf(key.region)!==-1){
            data.push(key)
        }
    }
    return data
}