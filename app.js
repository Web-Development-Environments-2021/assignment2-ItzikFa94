var context;
var shape = new Object();
var firstGhost = new Object();
var secondGhost = new Object();
var thirdGhost = new Object();
var fourthGhost = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var intervalGhost;
var intervalSpecial;
var flagGhosts = 0;
var ghosts = [firstGhost, secondGhost, thirdGhost, fourthGhost];
var ghostStartPositiong = [[1,1],[20,1],[20,17],[1,17]];
var ghostsSteps = [0,0,0,0];
var lastPacman = "Right";
var specialPosition = new Object();
var lastSpecial = 1;
var specialAlive = true;
var specialCounter = 0;
var specialCounterRun = 0;
var specialDestination = [1,6];
// var ghosts = [firstGhost];
const NUM_WALL = 207;
const WALL = 4;
const GHOST = 5;
const PACMAN = 2;
const SPECIAL_CHAR = 6;
const FOOD = 1;
const SPECIAL_FOOD = 7;
const VERY_SPECIAL_FOOD = 8;
const ROW = 22;
const COL = 19;
var INTERVAL_SPECIAL = 500;
var side = "Right";
const FoodNumber = 100;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});
function ResetGhosts(){ 
	for(let i = 0; i < ghosts.length; i++){
		ghosts[i].i = ghostStartPositiong[i][0];
		ghosts[i].j = ghostStartPositiong[i][1];
	}
}
function Start() {
	// board = new Array();
	board = [
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	[4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
	[4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4],
	[4, 4, 4, 0, 0, 4, 4, 4, 0, 0, 0, 4, 4, 4, 0, 0, 4, 4, 4],
	[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	[4, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 0, 0, 0, 4],
	[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
	[4, 4, 4, 0, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 0, 4, 4, 4],
	[4, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 4, 4],
	[4, 0, 0, 0, 0, 4, 0, 4, 4, 0, 4, 4, 0, 4, 0, 0, 0, 0, 4],
	[4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4],
	[4, 4, 4, 0, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 0, 4, 4, 4],
	[4, 4, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 4, 4],
	[4, 4, 4, 0, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 0, 4, 4, 4],
	[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	[4, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 4, 4],
	[4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
	[4, 4, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 0, 0, 4, 4],
	[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
	[4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4],
	[4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4],
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];
	// board[1][20] = 5;
	board[1][1] = 5;

	board[20][1] = 5;
	board[20][17] = 5;
	board[1][17] = 5;
	ResetGhosts();
	// ghosts[0].i = 1;
	// ghosts[0].j = 1;
	// ghosts[1].i = 20;
	// ghosts[1].j = 1;
	// ghosts[2].i = 20;
	// ghosts[2].j = 17;
	// ghosts[3].i = 1;
	// ghosts[3].j = 17;

	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 0;
	var special_food = 5;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < board.length; i++) {
		// board[i] = new Array();
		// put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] == WALL || board[i][j] == GHOST){

				continue;
			}
			var randomNum = Math.random();
			let rndNumber = getRandomArbitrary(1,4); 
			if (randomNum <= ( 1* food_remain) / cnt) {
				food_remain--;
				board[i][j] = FOOD;
			}
			 else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
				shape.i = i;
				shape.j = j;
				pacman_remain--;
				board[i][j] = PACMAN;
			}
			 else  {
				board[i][j] = -1;
			}
			cnt--;
			}
		}
	// }
	// Update Speical Characater starting position
	board[15][7] = SPECIAL_CHAR;
	specialPosition.i = 15;
	specialPosition.j = 7;


	// food_remain = foodNumber*0.6;

	// fill all the rest of the food
	updateFood(FoodNumber*0.6, FOOD);
	updateFood(FoodNumber*0.3,SPECIAL_FOOD);
	updateFood(FoodNumber*0.1,VERY_SPECIAL_FOOD);
	// while (food_remain > 0) {
	// 	var emptyCell = findRandomEmptyCell(board);
	// 	board[emptyCell[0]][emptyCell[1]] = 1;
	// 	food_remain--;
	// }

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	//intervalGhost = setInterval(UpdatePositionGhosts, 1000);
	//intervalSpecial = setInterval(updatePositionSpecial, 250);
}
function updateFood(foodRemaining, foodType){
	while (foodRemaining > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = foodType;
		foodRemaining--;
	}
}
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
  }
function findRandomEmptyCell(board) {
	// var i = Math.floor(Math.random() * board[0].length + 1);
	// var j = Math.floor(Math.random() * board.length + 1);
	var i = Math.floor(getRandomArbitrary(0, board[0].length+1));
	var j = Math.floor(getRandomArbitrary(0, board.length+2));
	while (board[i][j] != -1) {
		i =  Math.round(getRandomArbitrary(0, board[0].length+1));
		j = Math.round(getRandomArbitrary(0, board.length+1));

	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[87]) {
		return 1;
	}
	if (keysDown[83]) {
		return 2;
	}
	if (keysDown[65]) {
		return 3;
	}
	if (keysDown[68]) {
		return 4;
	}
}

function Draw(pacmanDir = "Right") {

	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	var eyes_x = 5;
	var eyes_y = 10;


	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board[i][j] == PACMAN) {
				context.beginPath();
				if(pacmanDir == "Right"){
					context.arc(center.x, center.y, 15, 1.85 * Math.PI, 0.15 * Math.PI, true);
				} else if (pacmanDir == "Left"){
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI, false); // half circle
				}else if(pacmanDir == "Up"){
					context.arc(center.x, center.y, 15, -0.3 * Math.PI, 1.3* Math.PI, false); // half circle
					eyes_x = 10;
					eyes_y = 0;
				}else if(pacmanDir == "Down"){
					context.arc(center.x, center.y, 15, -1.3 * Math.PI, 0.3* Math.PI, false); // half circle
					eyes_x = 10;
					eyes_y = 5;
				}

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + eyes_x, center.y - eyes_y, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == FOOD) {
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}else if (board[i][j] == SPECIAL_FOOD){
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "purple"; //color
				context.fill();
			}else if (board[i][j] == VERY_SPECIAL_FOOD){
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "green"; //color
				context.fill();
			} else if (board[i][j] == WALL) {
				context.beginPath();
				context.rect(center.x-15 , center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}else if(board[i][j] == GHOST) {
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			}else if(board[i][j] == SPECIAL_CHAR){
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();
			}
		}
	}
}

function BFS(startVertex, endVertex){ 
	let visited = new Set();
	let closed_list = new Set();
	let distance = Array(ROW).fill().map(()=> Array(COL).fill(-1));
	let queue = [];
	queue.push(startVertex);
	visited.add(startVertex.toString());

	let dirRow = [-1,1,0,0];
	let	dirCol = [0,0,-1,1];

	while(queue.length >0){
		let currentVertex = queue.shift();
		let currentRow = currentVertex[0];
		let currentCol = currentVertex[1];
		for(let i=0; i<dirRow.length; i++){
			let newRow = currentRow + dirRow[i];
			let newCol = currentCol + dirCol[i];
			// if works somehow dont forget to add more stuff other than wall
			if(!visited.has([newRow,newCol].toString()) && newRow >= 0 && newCol >= 0 && newRow < ROW && newCol < COL && board[newRow][newCol] != 4  ){ 
				visited.add([newRow,newCol].toString());
				distance[newRow][newCol] = distance[currentRow][currentCol] + 1;
				queue.push([newRow,newCol]);
			}
		}
	}
	if(distance[endVertex[0]][endVertex[1]] === -1){
	console.log("Path does not exist");
	}
	else {
		let dis = distance[endVertex[0]][endVertex[1]];
		var nextVertex = [0,0];
		let currentRow = endVertex[0];
		let currentCol = endVertex[1];
		for(let i=0; i<dirRow.length; i++){
			let newRow = currentRow + dirRow[i];
			let newCol = currentCol + dirCol[i];
			if(distance[newRow][newCol] == dis-1 && board[newRow][newCol] != 4){
				nextVertex[0] = newRow;
				nextVertex[1] = newCol;
				break;
			}

		}
	}

	return nextVertex;
}
function UpdatePositionGhosts(){ 
	let flag = false;
	for(let k = 0; k<ghosts.length; k++){
		// console.log([ghosts[k].i,ghosts[k].j]);
		// BFS([ghosts[k].i,ghosts[k].j],[shape.i,shape.j]);

		var nextVertex = BFS([shape.i,shape.j],[ghosts[k].i,ghosts[k].j]);
		// console.log(nextVertex);
		board[ghosts[k].i][ghosts[k].j] = ghostsSteps[k];
		if(board[nextVertex[0]][nextVertex[1]] == SPECIAL_CHAR){
			ghostsSteps[k] = board[specialPosition.i,specialPosition.j]
		}else{
			ghostsSteps[k] = board[nextVertex[0]][nextVertex[1]];
		}
		
		if(board[nextVertex[0]][nextVertex[1]] == PACMAN){

			board[nextVertex[0]][nextVertex[1]] = 5;
			ghosts[k].i = nextVertex[0];
			ghosts[k].j = nextVertex[1];
			flag = true;
			break;
		}
		board[nextVertex[0]][nextVertex[1]] = 5;

		ghosts[k].i = nextVertex[0];
		ghosts[k].j = nextVertex[1];
	}
	if(flag == true){
		ResetGhostsPositions();
	}

}
function ResetGhostsPositions(){ 
	score = score - 10;
	for(let k = 0; k<ghosts.length; k++){
		board[ghosts[k].i][ghosts[k].j] = ghostsSteps[k];
	}
	ResetGhosts();
	for(let k = 0; k<ghosts.length; k++){
		ghostsSteps[k] = 0;
		board[ghosts[k].i][ghosts[k].j] = GHOST;
	}
}
function checkCell(i,j){
	return i > 0 && j >0 && i < ROW && i < COL && board[i][j] != WALL && board[i][j] != GHOST;
}
function updatePositionSpecial(){ 
// 	var specialCounter = 0;
// var specialDestination = [0,0];
	if(specialAlive == true){
		if (specialCounter == 5){
			let dirArr = [[1,1],[1,17], [20,1],[20,17]];
			specialDestination = dirArr[Math.round(getRandomArbitrary(0,3))];
			specialCounter = 0;
		}
		else{specialCounter++;}
		// console.log(specialDestination);
		// console.log([specialPosition.i,specialPosition.j]);
		let nextCell = BFS(specialDestination, [specialPosition.i,specialPosition.j])
		board[specialPosition.i][specialPosition.j] = lastSpecial;
		if (board[nextCell[0]][nextCell[1]] != GHOST){
			lastSpecial = board[nextCell[0]][nextCell[1]];
		}
		else{
			lastSpecial = findGhostLast(nextCell[0], nextCell[1]);
		}

		// lastSpecial = board[new_row][new_col];
		board[nextCell[0]][nextCell[1]] = SPECIAL_CHAR;
		// board[new_row][new_col] = SPECIAL_CHAR;
		specialPosition.i = nextCell[0];
		specialPosition.j = nextCell[1];
		// specialPosition.i = new_row;
		// specialPosition.j = new_col;
		//Draw(lastPacman);
	}
}
function findGhostLast(i,j){
	for(let k=0; k<ghosts.length; k++){
		if(ghosts[k].i == i && ghosts[k].j == j){
			return ghostsSteps[k];
		}
	}
}
function UpdatePosition() {


	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {

		if (shape.j > 0 && board[shape.i][shape.j-1] != 4) {
			shape.j--;
			side = "Up";
		}
		else if(board[shape.i][shape.j-1] != 4) {
			shape.j = board[0].length-1;
			// console.log(shape.j);
			side = "Up";
		}
	}
	if (x == 2) {

		// console.log(shape.j);
		if (shape.j < COL-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			side = "Down";
		}
		else if(board[shape.i][shape.j+1] != 4){
			shape.j = 0;
			side = "Down";
		}
	}
	if (x == 3) {

		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			side = "Left";
		}
		else if(shape.i == 0 && board[shape.i][shape.j] != 4){
			shape.i = board.length-1;
			side = "Left";
		}
	}
	if (x == 4) {

		if (shape.i < ROW-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			side = "Right";
		}
		else if(shape.i == ROW-1 && board[shape.i ][shape.j] != 4) {
			shape.i = 0;
			side = "Right";
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score += 10;
	}
	if (board[shape.i][shape.j] == SPECIAL_FOOD) {
		score += 15;
	}
	if(board[shape.i][shape.j] == VERY_SPECIAL_FOOD){
		score += 25;
	}
	if(specialCounterRun == 3){
		updatePositionSpecial();
		specialCounterRun = 0;
	}else{specialCounterRun++;}
	if (board[shape.i][shape.j] == GHOST){
		ResetGhostsPositions();
	}else{
		if (board[shape.i][shape.j] == SPECIAL_CHAR){
			console.log("dsa");
			specialAlive = false;
			score = score + 50;
		}
		board[shape.i][shape.j] = 2;
		if (flagGhosts == 0){
			UpdatePositionGhosts();
			// updatePositionSpecial();
			
			flagGhosts = 1;
		}else{flagGhosts = 0;}
	}
	console.log(board[shape.i][shape.j]);

	// calculateGhosts();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	}
	else {
		lastPacman = side;
		Draw(side);
	}
}
