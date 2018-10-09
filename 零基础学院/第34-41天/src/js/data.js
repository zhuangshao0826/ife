let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

/**
 * 返回处理后的sourcedata （localstorage中有的数据拿出并修改）
 * @param {*} sourceData  原始数据
 */
function initData(sourceData) {
    const localData = JSON.parse(localStorage.getItem("newdata"))
    if(localData){
        sourceData.forEach(element => {
            localData.forEach(ele => {
                if(element.region===ele.region && element.product===ele.product){
                    element.sale=ele.sale
                }
            })
        });
    }
    console.log(sourceData)
    return sourceData
}
/**
 * 存储数据在localstorage
 * @param {*} data  修改的数据｛productxxxx regionxxx salexxx｝ 
 */
function storage(data) {
    if(window.localStorage){
        // newdata 缓存是否存在
        if(localStorage.getItem("newdata")){
            // 读取缓存 转化为json格式
            let localData=JSON.parse(localStorage.getItem("newdata"))
            
            for(let i=0;i<localData.length;i++){
                if(localData[i].region==data.region && localData[i].product==data.product){
                    localData[i].sale=data.sale
                    let newLocalData=JSON.stringify(localData)
                    localStorage.setItem("newdata",newLocalData)
                    break
                }
            }
            localData.push(data)
            let addLocalData=JSON.stringify(localData)
            localStorage.setItem("newdata", addLocalData)
        }else{
            let addNewLocalData=JSON.stringify(data)
            localStorage.setItem("newdata", addNewLocalData)
        }
    }
}

export {sourceData,initData,storage} 