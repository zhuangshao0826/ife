creatCheckbox(item1,regWrapper, "regionAll")
creatCheckbox(item2,proWrapper, "productAll")
choose(regWrapper, "regionAll")
choose(proWrapper,"productAll")

regWrapper.addEventListener("click", getData, false);
regWrapper.addEventListener("click", createTable, false);
regWrapper.addEventListener("click", changeTd, false);
regWrapper.addEventListener("click", function () {
    mergeCell(1, 0);
}, false);
proWrapper.addEventListener("click", getData, false);
proWrapper.addEventListener("click", createTable, false);
proWrapper.addEventListener("click", changeTd, false);
proWrapper.addEventListener("click", function () {
    mergeCell(1, 0)
}, false);
