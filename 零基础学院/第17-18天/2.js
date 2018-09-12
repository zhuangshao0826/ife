function dec2bin(decNumber) {
    // 在这里实现你的转化方法，注意需要判断输入必须为一个非负整数
    let arr=[];
    while(decNumber>0) {
        arr.unshift(decNumber%2);
        decNumber=Math.floor(decNumber/2);
    }
    return arr.join("");
}

function format(str, n) {
    let length=str.length;
    if(length>n){
        console.error("error")
      }
    while(length<n){
        str="0"+str;
        length++;
    }
    return str
}

$("trans-btn").addEventListener("click", function(){
    $("result1").innerText="运算结果: "+format(dec2bin(parseInt(($("dec-number").value))), parseInt($("bin-bit").value))
})
// 实现党点击转化按钮时，将输入的十进制数字转化为二进制，并显示在result的p标签内
// Some coding