//selecting the grid class
const grid = document.querySelector('.grid')
const blockHeight = 20
const blockWidth = 100

const playerStart = [230, 10]
let currentPosition = playerStart

//creating a block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}


const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

//adding blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
    }
}
addBlocks()

//creating player
const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
grid.appendChild(player)

//drawing player
function drawPlayer() {
    player.style.left = currentPosition[0] + 'px'
    player.style.bottom = currentPosition[1] + 'px'
}

//move player
function movePlayer(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
            drawPlayer()
            }
            break;
    }
}

document.addEventListener('keydown', movePlayer)