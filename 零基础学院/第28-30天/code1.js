let emailInput = $("email-input")
let SugWrapper = $("email-sug-wrapper")

// document.addEventListener('keydown',(e)=>{console.log(e.keyCode)})

document.addEventListener('keydown', (e) => {
    let child = SugWrapper.childNodes
    let index = 0
    // 下
    
    if (e.keyCode === 40) {
        if (index >= 0) {
            child[index].classList.remove("select")
            index++
        } 
        if(index===child.length){
            index=0            
        }
        child[index].classList.add("select")
        // ContentAddWrapper()
        // 上
    } else if(e.keyCode===38) {
        child[index].classList.remove("select")
        index--
        if(index<0){
            index=child.length-1            
        }
        child[index].classList.add("select")
        // ContentAddWrapper()
        // enter
    } else if(e.keyCode===13){
        emailInput.value=child[index].innerText
        hideWrapper()
    } else if(e.keyCode===27){
        emailInput.setSelectionRange(0,-1)
        hideWrapper()
    }
})

emailInput.addEventListener('input', (e) => {
    toggleWrapperDisaplay()
})

SugWrapper.addEventListener('mousedown', (e) => {
    let target = e.target
    if (target.tagName.toLowerCase() === "li") {
        emailInput.value = htmlDecode(target.innerHTML)
        hideWrapper()
        // emailInput.focus()
    }
})

function toggleWrapperDisaplay() {
    if (getEmailInput()) {
        showWrapper()
        ContentAddWrapper()
    } else {
        hideWrapper()
    }
}

function getEmailInput() {
    return emailInput.value.trim()
}

function creatWrapperContent() {
    let INPUT = String(htmlEncode(getEmailInput()))
    let arr = []
    let arrMat = []
    if (INPUT.indexOf("@") > -1) {
        const [before, after] = INPUT.split("@")
        for (let ListItem of postfixList) {
            if (ListItem.startsWith(after)) {
                arrMat.push(before + "@" + ListItem)
            } else {
                arr.push(before + "@" + ListItem)
            }
        }
        return arrMat.length ? arrMat : arr
    } else {

        for (let ListItem of postfixList) {
            arr.push(INPUT + "@" + ListItem)
        }
        return arr
    }
}

function ContentAddWrapper() {
    let CONTENT = creatWrapperContent()
    let strHTML = ``
    for (let conItem of CONTENT) {
        strHTML += `<li>${conItem}</li>`
    }
    SugWrapper.innerHTML = strHTML
}

emailInput.addEventListener('blur', (e) => {
    hideWrapper()
})

function showWrapper() {
    SugWrapper.style.display = ""
}

function hideWrapper() {
    SugWrapper.style.display = "none"
}

function htmlEncode(html) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}

function htmlDecode(text) {
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}