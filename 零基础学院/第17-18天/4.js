let arr1=[];
let table=""
for(let i=1; i<10; i++) {
    ans=``
    for(let j=1; j<i+1; j++){
        arr1.push(`${i} * ${j} = ${i*j} `)
        ans+=`<td>${i} * ${j} = ${i*j} </td>`
    }
    arr1.push("\n")
    table+=`<tr>${ans}</tr>`
}
console.log(arr1.join(''))
$("tabuada").innerHTML= table;