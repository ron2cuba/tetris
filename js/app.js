let canvas = document.getElementById('canvas');
let ctx = document.querySelector("#canvas").getContext('2d');

canvas.width = 240;
canvas.height = 400;

ctx.scale(20, 20);

// matrice
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

// y => index => number of lines
function drawMatrix(matrix, offset){
    matrix.forEach((row, y)=>{

        row.forEach((value, x)=>{
            if (value !== 0){
                ctx.fillStyle = "red";
                ctx.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1,
                    1
                );
            }
        });
    
    });
}

let currentElement = {
    pos: {x:4, y:0},
    matrix: matrix,
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMatrix(currentElement.matrix, currentElement.pos);
    requestAnimationFrame(update);
}

/**
 * keyHandling
 */
 document.addEventListener('keydown', (e)=>{
    if( e.key == "ArrowLeft" ){
        console.log("before left pressed:", currentElement.pos.x);
       currentElement.pos.x--;
       console.log("left pressed", currentElement.pos.x);
    } else if(e.key == "ArrowRight"){
       currentElement.pos.x++
       console.log("right pressed", currentElement.pos.x);
    } else if(e.key == "ArrowDown"){
       currentElement.pos.y++;
    } else if(e.key == " "){
        console.log(" rotaion de la pièce");
    }
});

update();

