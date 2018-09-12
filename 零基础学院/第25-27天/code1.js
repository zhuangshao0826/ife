(function () {
    function getDate() {
        const today = new Date()
        const year = today.getFullYear();
        const month = checkTime(today.getMonth() + 1)
        const date = today.getDate();
        const day = conver(today.getDay());
        const h = checkTime(today.getHours())
        const m = checkTime(today.getMinutes())
        const s = checkTime(today.getSeconds())
        return `${year}年${month}月${date}日 ${day} ${h}:${m}:${s} `
    }
    function getDateEng() {
        const today = new Date()
        const year = today.getFullYear();
        const month = checkTime(today.getMonth() + 1)
        const date = today.getDate();
        const day = converEng(today.getDay());
        const h = checkTime(today.getHours())
        const m = checkTime(today.getMinutes())
        const s = checkTime(today.getSeconds())
        const apMeridiem=(h>12)?"PM":"AM"
        return `${year}年${month}月${date}日 ${day} ${h}:${m}:${s} ${apMeridiem}`
    }
    function converEng(day) {
        switch (day) {
            case 0:
                return "Sunday";
                break;
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
            case 6:
                return "Saturday";
                break;
            default:
                break
        }
    }
    
    
    function upDate() {
        // $("time").innerText = year + "年" + month + "月" + date + "日"  + day + h + ":" + m + ":" + s;
        // setInterval('today()',1000)
        $("time1").innerText=getDate()
        $("time2").innerText=getDateEng()
    }
    setInterval(upDate,1000)
}())

