
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawCircle(x, y, size) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

let x = 50;
let y = 50;
const size = 30;

drawCircle(x, y, size);

document.addEventListener('keydown', event => {
    let distanceToMove = 10;
    let pressedKey = event.key.toLowerCase();
    switch (pressedKey) {
        case 'w':
            y -= distanceToMove;
            break;
        case 's':
            y += distanceToMove;
            break;
        case 'a':
            x -= distanceToMove;
            break;
        case 'd':
            x += distanceToMove;
            break;
    }
    drawCircle(x, y, size);
});