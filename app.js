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
var ghosts = [firstGhost, secondGhost, thirdGhost, fourthGhost];
const WALL = 4;
const GHOST = 5;
const PACMAN = 2;
const FOOD = 1;
const ROW = 22;
const COL = 19;
var side = "Right";


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	// board = new Array();
	board = [
	[4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4],
	[4, 5, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 4],
	[4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
	[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
	[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	[4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
	[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
	[4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
	[4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4],
	[0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0],
	[4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
	[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
	[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
	[4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4],
	[4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 4],
	[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
	[4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4],
	[4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4],
	[4, 4, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 4, 4]
	];
	ghosts[0].i = 1;
	ghosts[0].j = 1;
	ghosts[1].i = 18;
	ghosts[1].j = 1;
	ghosts[2].i = 1;
	ghosts[2].j = 20;
	ghosts[3].i = 18;
	ghosts[3].j = 20;

	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
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
			if (randomNum <= (1.0 * food_remain) / cnt) {
				food_remain--;
				board[i][j] = FOOD;
			}
			 else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
				shape.i = i;
				shape.j = j;
				pacman_remain--;
				board[i][j] = PACMAN;
			}
			 else {
				board[i][j] = FOOD;
			}
			cnt--;
			}
		}
	// }
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
	interval = setInterval(UpdatePosition, 500);
}


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
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
	// console.log(board.length);
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
				}else{
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
			}
		}
	}
}
function ecluidean_distance(x_1, x_2, y_1, y_2){
	return Math.sqrt(Math.pow(x_1-x_2, 2) + Math.pow(y_1-y_2, 2));
}
function calculateGhosts(){

	var pac_i = shape.i;
	var pac_j = shape.j;


	var minDisInt;
	// console.log(ghosts);
	for(var i=0; i<ghosts.length; i++){
		var minDis = "None";
		var arr = [ghosts[i].i,ghosts[i].j];
		var posDict = new Map();
		posDict.set("None", arr);
		if (ghosts[i].i > 0 && board[ghosts[i].i-1][ghosts[i].j] != WALL){
			var disLeft = ecluidean_distance(ghosts[i].i-1, pac_i, ghosts[i].j, pac_j);
			minDisInt = disLeft;
			var arr1 = [ghosts[i].i-1,ghosts[i].j];
			posDict.set("Left", arr1);
			minDis = "Left";
		}
		if( ghosts[i].i < ROW-1 && board[ghosts[i].i+1][ghosts[i].j] != WALL) {
			var disRight = ecluidean_distance(ghosts[i].i+1, pac_i, ghosts[i].j, pac_j);
			var arr2 = [ghosts[i].i+1,ghosts[i].j];
			posDict.set("Right", arr2);
			if (disRight < minDisInt){
				minDisInt = disRight;
				minDis = "Right";
			}
		}
		if(ghosts[i].j >0 && board[ghosts[i].i][ghosts[i].j-1] != WALL){
			var disUp = ecluidean_distance(ghosts[i].i, pac_i, ghosts[i].j-1, pac_j);
			var arr3 = [ghosts[i].i, ghosts[i].j-1]
			posDict.set("Up", arr3);
			if (disUp < minDisInt){
				minDisInt = disUp;
				minDis = "Up";
			}
		}
		if(ghosts[i].j < COL-1 && board[ghosts[i].i][ghosts[i].j+1] != WALL){
			var disDown = ecluidean_distance(ghosts[i].i, pac_i, ghosts[i].j+1, pac_j);
			var arr4 = [ghosts[i].i,ghosts[i].j+1];
			posDict.set("Down", arr4);
			if (disDown < minDisInt){
				minDis = "Down";
			}
		}
		board[ghosts[i].i][ghosts[i].j] = 0;
		console.log("GHOST NUMBER", i);
		console.log(minDis);
		console.log(posDict.get(minDis)[0], posDict.get(minDis)[1]);
		board[posDict.get(minDis)[0]][posDict.get(minDis)[1]] = 5;
		}
	
}
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {

		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			side = "Up";
		}
		else if(board[shape.i][shape.j - 1] != 4) {
			shape.j = board[0].length-1;
			console.log(shape.j);
			side = "Up";
		}
	}
	if (x == 2) {

		console.log(shape.j);
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
		score++;
	}
	board[shape.i][shape.j] = 2;
	calculateGhosts();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		// console.log(x);
		// console.log(side);
		// console.log(board.length, board[0].length)
		Draw(side);
	}
}
