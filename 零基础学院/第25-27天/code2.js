(function () {
    let year=$("year-select")
    let month=$("month-select")
    let date=$("date-select")
    let hour=$("hour-select")
    let minute=$("minute-select")
    let second=$("second-select")
    
    insertOptions(year, 2000, 2032)
    insertOptions(month, 1, 12)
    insertOptions(date, 1, setDateNum(year.value,month.value))
    insertOptions(hour, 0, 23)
    insertOptions(minute, 0, 59)
    insertOptions(second, 0, 59)

    function upDateHTML() {
        let result=$("result-wrapper")
        let selectTime=new Date(year.value,month.value-1,date.value,hour.value,minute.value,second.value)
        let timeDiff=delta(selectTime)[0]
        let order=delta(selectTime)[1]
        let strHTML="现在的距离"+year.value+"年"+month.value+"月"+date.value+"日"+conver(selectTime.getDay())+""+checkTime(hour.value)+":"+checkTime(minute.value)+":"+checkTime(second.value)+" "+(order?"已过去":"还有")+timeDiff[0]+"天"+timeDiff[1]+"小时"+timeDiff[2]+"分"+timeDiff[3]+"秒"
        result.innerHTML=strHTML
    }
    upDateHTML()
    setInterval(upDateHTML,1000)

    // 创建年,月，日，时间的选项
    function insertOptions(parent, startnum, endnum) {
        for(let i=startnum; i<=endnum; i++){
            let newNode = document.createElement('option')
            newNode.setAttribute('value', i)
            newNode.innerHTML = i
            parent.appendChild(newNode)
        }
    }
    // 时间差
    function delta(time) {
        let now=new Date()
        let d
        let status
        if(now>time){
            d=now-time
            order=true
        }
        else{
            d=time-now
            order=false
        }
        return [formateTime(d),order]
    }
    // 把时间拆分成时分秒
    function formateTime(time) {
        let forDay=Math.floor(time/(24*3600*1000))

        let residue1=time%(24*3600*1000)
        let forHour=Math.floor(residue1/(3600*1000))

        let residue2=residue1%(3600*1000)
        let forMinute=Math.floor(residue2/(60*1000))

        let residue3=residue2%(60*1000)
        let forSecond=Math.floor(residue3/1000)
        return [forDay, forHour, forMinute, forSecond]
    }
    // 选择年月选项是判断重置日期
    function resetDate() {
        date.innerHTML=""
        insertOptionNode(date,1,setDateNum(year.value, month.value))
    }
    // 判断月份选择天数
    function setDateNum(y,m) {
        let year=parseInt(y)
        let month=parseInt(m)
        let date
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                date = 31
                break
            case 2:
                if(isLeapYear(year)){
                    date=29
                }
                else{
                    date=28
                }
                break
            default:
                date=30
                break
        }
        return date
    }
    // 判断闰年
    function isLeapYear(year) {
        return year%4===0&&year%100!==0||year%400===0
    }
    
    let selectArr=[year,month,date,hour,minute,second]
    for(let i=0; i<selectArr.length; i++){
        selectArr[i].addEventListener('change', ()=>{
            if(i==0||i==1){
                setDateNum()
            }
            upDateHTML()
        })
    }
}())
