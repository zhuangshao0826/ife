/**
 * 
 * @param {*} node 绘制元素canvas节点
 */
function Line(node) {
    this.ctx = node.getContext('2d')
    this.width = node.width
    this.height = node.height
    this.offset = 25
    this.contentWidth = this.width - 2 * this.offset
    this.contentHeight = this.height - 2 * this.offset
    this.colors = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8', '#fc97af', '#f7f494', '#87f7cf', '#f7c5a0'],
        this.color = '#000',
        this.dataRadius = 4,
        this.dataDistance = this.contentWidth / 13
}

Line.prototype = {
    // 创建坐标轴
    creatAxis: function (max) {
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = this.color
        this.ctx.beginPath()
        this.ctx.moveTo(this.offset, this.offset)
        this.ctx.lineTo(this.offset, this.offset + this.contentHeight)
        this.ctx.stroke()
        this.ctx.moveTo(this.offset, this.offset + this.contentHeight)
        this.ctx.lineTo(this.offset + this.contentWidth, this.offset + this.contentHeight)
        this.ctx.stroke()

        // 给x y轴加上注释
        for (let i = 1; i <= 12; i++) {
            this.creatText(this.offset + this.dataDistance * i, this.contentHeight + this.offset, i + '月', 'center')
        }
        this.creatText(this.offset - 5, this.offset, max, 'end')
        this.creatText(this.offset, this.contentHeight + this.offset, 0, 'end')
    },

    // 获取最大值和销售值
    getNewdata: function (data) {
        let newdata = []
        let max = 0
        data.forEach(element => {
            let temp = Math.max(...element.sale)
            if (temp > max) {
                max = temp
            }
            newdata.push(element.sale)
        })
        return {
            newdata,
            max
        }
    },

    // 画折线数据
    creatPath: function (data) {
        let {
            newdata,
            max
        } = this.getNewdata(data)
        this.init()
        this.creatAxis(max)
        // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
        const rate = (this.contentHeight - this.offset) / max
        // 绘制折线
        for (let i = 0; i < newdata.length; i++) {
            for (let j = 0; j < newdata[i].length; j++) {
                let x1 = (j + 1) * this.dataDistance + this.offset
                let x2 = (j + 2) * this.dataDistance + this.offset
                let y1 = this.contentHeight - newdata[i][j] * rate + this.offset
                let y2 = this.contentHeight - newdata[i][j + 1] * rate + this.offset

                this.ctx.beginPath()
                this.ctx.moveTo(x1, y1)
                this.ctx.lineTo(x2, y2)
                this.ctx.closePath()
                this.ctx.strokeStyle = this.colors[i]
                this.ctx.lineWidth = '2'
                this.ctx.stroke()

                this.ctx.beginPath()
                this.ctx.arc(x1, y1, this.dataRadius, 0, 2 * Math.PI)
                this.ctx.closePath()
                this.ctx.fillStyle = this.colors[i]
                this.ctx.fill()
            }
        }
    },

    // 加文本注释数值
    creatText: function (x, y, text, position) {
        this.ctx.textAlign = position
        this.ctx.fillStyle = this.color
        this.ctx.fillText(text, x, y + 11)
    },

    // 清空
    init: function () {
        this.ctx.clearRect(0, 0, this.offset + this.contentWidth, this.offset + this.contentHeight)
    }
}

export { Line }
