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
}

var frontier = [];
var connections = [];
var cell = cellsX + 1;
// maze[cell].state = 2; 

// what do the states correspond to?
//

function draw() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (maze[cell].state == 1){
    maze[cell].state = 2;
    var x = Math.floor(cell%cellsX);
    var y = Math.floor(cell/cellsX);
    connections = [];
    if (x >= 2 && maze[cell - 2].state == 2){
      connections.push(maze[cell - 1]); 
    }
    if(x < cellsX - 2 && maze[cell + 2].state == 2){
      connections.push(maze[cell + 1]);
    }
    if(y >= 2 && maze[cell - 2*cellsX].state == 2){
      connections.push(maze[cell - 1*cellsX]);
    }
    if(y < cellsY - 2 && maze[cell + 2*cellsX].state == 2){
      connections.push(maze[cell + 1*cellsX ]);
    }

    console.log(connections.length)
    if (connections.length != 0){
      var index = Math.floor(Math.random()*connections.length); 
      var connect = connections.splice(index,1)[0];
      var r_x = connect.x;
      var r_y = connect.y;
      maze[r_x + r_y * cellsX].state = 2;
      maze[cell].state = 2;
    }

    if (x >= 2 && maze[cell - 2].state == 1){
      // maze[cell - 2].state = 3;
      frontier.push(maze[cell - 2]); 
    }
    if(x < cellsX - 2 && maze[cell + 2].state == 1){
      // maze[cell + 2].state = 3;
      frontier.push(maze[cell + 2]);
    }
    if(y >= 2 && maze[cell - 2*cellsX].state == 1){
      // maze[cell - 2*cellsX].state = 3;
      frontier.push(maze[cell - 2*cellsX]);
    }
    if(y < cellsY - 2 && maze[cell + 2*cellsX].state == 1){
      // maze[cell + 2*cellsX].state = 3;
      frontier.push(maze[cell + 2*cellsX ]);
      
    }

    frontier.splice(cell,1)

    if( frontier.size != 0 ){
      // take the frontier cell that we just removed and compute the frontier cells
      console.log("not empty");
      console.log(frontier.length);
      console.log("Random " + cell)
    }
    else
      console.log("empty")
  }
  else{
      while(maze[cell].state != 1){
        index = Math.floor(Math.random()*frontier.length); // this is wrong
        cell = frontier[index].x + frontier[index].y * cellsX;
        frontier.splice(cell,1)
      }
  }

  for(i = 0; i < maze.length; i++){
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
    // ctx.fillRect(startX+(i%sideWidth)*(width), startY + (Math.floor(i/sideWidth))*height,width+1,height+1);
  }
	window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
