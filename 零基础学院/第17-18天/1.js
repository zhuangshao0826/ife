let num1=$("first-number");
let num2=$("second-number");
function Calculate(func) {
    return ()=>{
        let num = func(parseFloat(num1.value), parseFloat(num2.value));
        if(Number.isNaN(num)){
            console.error("error")
        }
        $("result").innerText=("运算结果: "+num)}
}
$("add-btn").addEventListener("click",Calculate((a,b)=>a+b))
$('minus-btn').addEventListener('click',Calculate((a,b) => a-b))
$('times-btn').addEventListener('click',Calculate((a,b) => a*b))
$('divide-btn').addEventListener('click',Calculate((a,b) => a/b))