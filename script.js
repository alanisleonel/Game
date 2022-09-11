//selecting the grid class
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockHeight = 20
const blockWidth = 100
const boardWidth  = 560
const boardHeight = 300
const ballDiameter = 20
let timerId
let xDirection = -4
let yDirection = 4
let score = 0

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        })
    })
}

//restart game
const restartButton = document.getElementById("restart")
restartButton.addEventListener("click", () => {
    window.location.reload(true) ;
})


//starting position of player
const playerStart = [230, 10]
let currentPosition = playerStart
//starting position of ball
const ballStart = [270, 35]
let ballCurrentPosition = ballStart

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

//move player with arrow keys
function movePlayer(e) {
    switch(e.key) {
        case 'ArrowLeft':
            //setting left boundary
            if (currentPosition[0] > 0){
            currentPosition[0] -= 10
            drawPlayer()
            }
            break;
        case 'ArrowRight':
            //setting right boundary
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] +=10
                drawPlayer()
            }
            break;
        case 'ArrowUp':
            //using ArrowUp to move player left
            if (currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawPlayer()
            }
            break;
        case 'ArrowDown':
            //using ArrowDown to move player right
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] +=10
                drawPlayer()
            }
            break;
    }
}
//when arrow keys are pressed, player moves 
document.addEventListener('keydown', movePlayer)

//draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}
//creating DESTROYER aka ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
//delay ball movement 5 seconds after page has loaded
setTimeout(() => {
    timerId = setInterval(moveBall, 20) 
}, 5000);

//check for collisions
function checkForCollisions() {
    //check for block collisions
    for (let i = 0; i< blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'YOU WON'
                clearInterval(timerId)
                document.removeEventListener('keydown', movePlayer)

            }
            }
    }
    //check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

    //check for player collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && 
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    // check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown',movePlayer)
    }
}

function changeDirection() {
    if (xDirection === 4 && yDirection === 4) {
        yDirection = -4
        return
    }
    if (xDirection === 4 && yDirection === -4) {
        xDirection = -4
        return
    }
    if (xDirection === -4 && yDirection === -4) {
        yDirection = 4
        return
    }
    if (xDirection === -4 && yDirection === 4) {
        xDirection = 4
        return
    }

}

