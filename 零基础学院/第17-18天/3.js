console.log("3的小游戏")
let arr=[];
for(let i=1; i<101; i++){
    if(i%3==0||i.toString().indexOf("3")==1){
        arr.push("PA")
    }else{
        arr.push(i)
    }
}
console.log(arr.join(", "))