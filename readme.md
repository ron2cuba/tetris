# Tetris

## Premiere étape
Préparation du canvas et log du javascript et écriture d'une boucle foreEach pour lire notre matrice.
```js
let canvas = document.getElementById('canvas');
let ctx = document.querySelector("#canvas").getContext('2d');
canvas.width = 240;
canvas.height = 400;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.scale(20, 20);

// grille
const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];
// y => index => number of lines
function drawMatrix(matrix){
    matrix.forEach((row, y)=>{

        row.forEach((value, x)=>{
            if (value !== 0){
                ctx.fillStyle = "red";
                ctx.fillRect(x, y, 1, 1)
            }
        });
    
    });
}

drawMatrix(matrix);
```
Ajouter un `offset` a draw matrix pour permettre le décalage en x et y sur le canvas
:
```js
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

drawMatrix(matrix, {x:5,y:5});
```
