//selecting the grid class
const grid = document.querySelector('.grid')
//creating a block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
//creating blocks
const block = document.createElement('div')
block.classList.add('block')
block.style.left = '100px'
block.style.bottom = '50px'
grid.appendChild(block)
