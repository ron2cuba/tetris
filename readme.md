# Tetris

## Premiere étape
Préparation du canvas et log du javascript et écriture d'une boucle foreEach pour lire la matrice constructrice (inspiration: `Tilemap`).
```js
let canvas = document.getElementById('canvas');
let ctx = document.querySelector("#canvas").getContext('2d');
canvas.width = 240;
canvas.height = 400;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.scale(20, 20);


// matrice constructrice
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
## Keyhandler pour bouger la piece
ecouter des evenements du clavier sur des touches définies pour permettre la rotation des pieces.
Un `console.log` de l'evenemment pour avoir le `keycode` des touches utilsées.

```js
...
// astuce pour trouver les codes
document.addEventListener('keydown', (e)=>{
 console.log(e);
});
...
/**
 * keyHandling
 */
document.addEventListener('keydown', (e)=>{
 if( e.key == "ArrowLeft" ){
    console.log("left pressed");
 } else if(e.key == "ArrowRight"){
    console.log("right pressed");
 } else if(e.key == "ArrowDown"){
    console.log("down pressed");
 }
});
```
Maintenant que les touches sont déterminées, il faut se dire que les pieces auront une postion courante. Le mieux est de faire un objet `currentElement` qui aura une postition (qui sera amenée à évoluée par la suite) en x et en y  et un modèle pièce.
```js
...
let currentElement = {
    pos: {x:4, y:0},
    matrix: matrix,
}
```
Bien se rappeler que la position courante est fixée dans `drawMatrix`.
Donc quand on presse une touche associée à un eventListener, il faut incrémenter ou décrémenter cette valeur quand drawMatrix sera appelé.
```js
...

drawMatrix(currentElement.matrix, currentElement.pos);

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
    } else if(e.key == "ArrowDown"){
       currentElement.pos.y++;
    } else if(e.key == "Space"){
        console.log(" rotaion de la pièce");
    }
});

```
La fonction est prête mais rien ne se passe.

La cause :

le canvas doit être rafraichit pour que la position soit modifiée. L'API du canvas supporte cela avec le `requestAnimationFrame`. Si on imagine une fonction update qui se chargera d'appeler cette méthode du canvas cela donne :
```js
...
let currentElement = {
    pos: {x:4, y:0},
    matrix: matrix,
}

function update(){
    // cleaner le canvas pour l'effet de traine
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMatrix(currentElement.matrix, currentElement.pos);
    requestAnimationFrame(update);
}
...
// apelle de la fonction en fin de fichier
update();
```
## chute automatique

Chaque seconde la piece doit descendre sa position en y d'une ligne, il faut donc incrémenter de 1 pour chaque seconde écoulée:
```js
currentElement.pos.y++
```
- Première étape :

Récupérer dans un timer la seconde courant, puis remettre le timer à zéro une fois le temps écoulé.

Le temps courant est récupérable dans update, car la fonction est appellée de façon récursive avec requestAnimationFrame chaque milliseconde
```js
// time valeur par defaut à zéro comme aucun argment passé lors de l'appel
function update(time = 0){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMatrix(currentElement.matrix, currentElement.pos);
    console.log(Math.round(time / 1000));
    requestAnimationFrame(update);
}
```
