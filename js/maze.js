//Randomised prim's algorithm for maze generation. 
//using javascript canvas 
//
//IDEAS : 
// 
//
//Algorithm
// https://stackoverflow.com/questions/29739751/implementing-a-randomly-generated-maze-using-prims-algorithm
//
//

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cellsX = 101;
var cellsY = 51;

var dx = canvas.width/cellsX;
var dy = dx = Math.min(dx,canvas.height/cellsY);

var maze = [];

var startX = (canvas.width-cellsX*dx)/2;
var startY = (canvas.height-cellsY*dy)/2;

for(i = 0; i < (cellsX * cellsY); i++){
  var tile = {
    state: 1
  };
  var x = Math.floor(i%cellsX);
  var y = Math.floor(i/cellsY);
  if((x == 0) || (y == 0) || (x == cellsX-1) || (y == cellsY - 1)){
    tile.state = 1;
  }
  maze.push(tile);
}


maze[0].state = 2;


function draw() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for(i = 0; i < maze.length; i++){
    if(maze[i].state == 1){
      ctx.fillStyle = "rgb(50,50,50)";
    }
    else if(maze[i].state == 2){
      ctx.fillStyle = "rgb(200,0,0)";
    }
    else{
      ctx.fillStyle = "rgb(255,255,255)";
    }
    ctx.fillRect(startX + (i%cellsX)*dx, startY + (Math.floor(i/cellsX))*dx, dx+1, dy+1);
    // ctx.fillRect(startX+(i%sideWidth)*(width), startY + (Math.floor(i/sideWidth))*height,width+1,height+1);
  }

  maze[Math.floor(Math.random()*(maze.length))].state = 2;

  window.requestAnimationFrame(draw);

}
window.requestAnimationFrame(draw);
