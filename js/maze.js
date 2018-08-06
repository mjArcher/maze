//Randomised prim's algorithm for maze generation. 
//using javascript canvas 
//IDEAS : 
//

//Algorithm
// https://stackoverflow.com/questions/29739751/implementing-a-randomly-generated-maze-using-prims-algorithm

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

var its = 10000;

for(i = 0; i < (cellsX * cellsY); i++){
  var tile = {
    state: 1, // initalise all to state blocked 
		x: Math.floor(i%cellsX),
		y: Math.floor(i/cellsX)
  };
  // if((x == 0) || (y == 0) || (x == cellsX - 1) || (y == cellsY - 1)){
  //   tile.state = 1; // the walls (blocked)
  // }
  maze.push(tile);
  drawCell(i);
}

var frontier = [];
var connections = [];
var start = cellsX + 1;

// the starting cell
maze[start].state = 2;
getFrontier(maze[start]);
drawCell(start)
// maze[cell].state = 2; 

// what do the states correspond to?
//
// state 3 = frontier
// state 2 = open 0
// state 1 = wall 1
//
function drawCell(i){
    if(maze[i].state == 1){
      ctx.fillStyle = "rgb(50,50,50)"; // grey : blocked
    }
    else if(maze[i].state == 2){
      ctx.fillStyle = "rgb(200,0,0)"; // red : open
    }
    else{
      ctx.fillStyle = "rgb(255,255,255)"; // white: the frontier
    }
    ctx.fillRect(startX + (i%cellsX)*dx, startY + (Math.floor(i/cellsX))*dx, dx+1, dy+1);
}

function progressMaze(){
  console.log("frontier length" + frontier.length)
  for(var i = 0; i < its; i++){
    if(frontier.length > 0){
      var cell = Math.floor(Math.random()*frontier.length); 
      console.log("cell" + cell)
      var node = frontier.splice(cell, 1)[0];
      getNeighbours(node);
      // window.requestAnimationFrame(draw);
    }
    else{
      console.log("Frontier is zero")
      break;
    }
  }
}

function getFrontier(node){

  console.log("get frontier")
  var i = node.x + node.y * cellsX;
  var x = node.x;
  var y = node.y;
  console.log(x + " " + y);
 
  if (x >= 2 && maze[i-2].state == 1){
    maze[i-2].state = 3;
    frontier.push(maze[i-2]); 
  }
  if(x < cellsX - 2 && maze[i+2].state == 1){
    maze[i+2].state = 3;
    frontier.push(maze[i+2]);
  }
  if(y >= 2 && maze[i-2*cellsX].state == 1){
    maze[i-2*cellsX].state = 3;
    frontier.push(maze[i-2*cellsX]);
  }
  if(y < cellsY-2 && maze[i+2*cellsX].state == 1){
    maze[i+2*cellsX].state = 3;
    frontier.push(maze[i+2*cellsX]);
  }

  // visualise the frontier
  for(var i = 0; i < frontier.length; i++){
    drawCell(frontier[i].x + frontier[i].y * cellsX);
  }
}
// originally I was drawing the whole array every timestep (this obviously is costly)

function getNeighbours(node){

  var i = node.x + node.y * cellsX;
  var x = node.x;
  var y = node.y;

  console.log(i);
  connections = [];

  if (x >= 2 && maze[i-2].state == 2){
    connections.push(maze[i-1]); 
  }
  if(x < cellsX - 2 && maze[i+2].state == 2){
    connections.push(maze[i+1]);
  }
  if(y >= 2 && maze[i-2*cellsX].state == 2){
    connections.push(maze[i-cellsX]);
  }
  if(y < cellsY - 2 && maze[i+2*cellsX].state == 2){
    connections.push(maze[i+cellsX]);
  }

  console.log(connections.length)
  if (connections.length != 0){
    var index = Math.floor(Math.random()*connections.length); 
    var join = connections.splice(index,1)[0];
    var j = join.x + join.y * cellsX;
    maze[j].state = 2;
    maze[i].state = 2;
    drawCell(j);
    drawCell(i);
    console.log(join)
    getFrontier(node);
  }

}

function draw() {

  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  progressMaze();

  // for(i = 0; i < maze.length; i++){
    // ctx.fillRect(startX+(i%sideWidth)*(width), startY + (Math.floor(i/sideWidth))*height,width+1,height+1);
  // }
	// window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
