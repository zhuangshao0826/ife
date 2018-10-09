import {initData} from "./data.js"
/**
 * 返回用户checkbox所选择选项的数据
 * @param {*} sourceData 与数据对比来筛选需要的数据 
 */
function getData(sourceData) {
    sourceData=initData(sourceData)
    let data=[]
    let ipts = document.querySelectorAll("input[type=checkbox]:checked");
    let arr=[]
    for(let i=0; i<ipts.length; i++){
        if(ipts[i].value){
            arr.push(ipts[i].value)
        }
    }

    for (let key of sourceData) {
        if(arr.indexOf(key.product)!==-1&&arr.indexOf(key.region)!==-1){
            data.push(key)
        }
    }
    return data
}


export {getData}