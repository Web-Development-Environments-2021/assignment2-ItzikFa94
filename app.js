var context;
var shape = new Object();
var firstGhost = new Object();
var secondGhost = new Object();
var thirdGhost = new Object();
var fourthGhost = new Object();
var specialCandy_1 = new Object();
var specialCandy_2 = new Object();
var specialCandies = [specialCandy_1, specialCandy_2];
var verySpecialCandy = new Object();
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
let numGhosts = 4;
var ghostStartPositiong = [[1, 1], [20, 1], [20, 17], [1, 17]];
var ghostsSteps = [0, 0, 0, 0];
var lastPacman = "Right";
var specialPosition = new Object();
var lastSpecial = 1;
var specialAlive = true;
var specialCounter = 0;
var specialCounterRun = 0;
var specialDestination = [1, 6];
var verySpecialCandyFlag = false;
var verySpecialCandyCounter = 0;
let ballColor5 = "#b8e994";
let ballColor15 = "#079992";
let ballColor25 = "#b71540";
let left_key = 37;
let right_key = 39;
let up_key = 38;
let down_key = 40;
// var gameMusic;
// var ghosts = [firstGhost];
let timeLimit = 90;
let LIFE = 5;
const NUM_WALL = 207;
const WALL = 4;
const GHOST = 5;
const PACMAN = 2;
const SPECIAL_CHAR = 6;
const FOOD = 1;
const SPECIAL_FOOD = 7;
const VERY_SPECIAL_FOOD = 8;
const SPECIAL_CANDY = 9;
const VERY_SPECIAL_CANDY = 10;
const ROW = 22;
const COL = 19;
const audio = new Audio("assets/songs/cut_song.mov");
audio.loop = true;
var INTERVAL_SPECIAL = 500;
var side = "Right";
let numberBalls = 70;
let users = [{ username: 'k', password: 'k', firstname: 'Kyle', lastname: 'Kennedy', email: 'kk@gmail.com', birthdate: '30/06/1994' }];
let loggedInUser = users[0];

$(document).ready(function () {
	let canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
});
function ResetGhosts() {
	for (let i = 0; i < numGhosts; i++) {
		ghosts[i].i = ghostStartPositiong[i][0];
		ghosts[i].j = ghostStartPositiong[i][1];
	}
};

$(document).ready(function () {
	$.validator.addMethod("validPassword", function (value) {
		return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	}, 'Password must contain at least one character and one number');
	$.validator.addMethod("noNumbers", function (value) {
		return /^[a-zA-Z]+$/.test(value);
	});
	$('#registeration-form').validate({ // initialize the plugin
		rules: {
			registerFormUsername: {
				required: true,
			},
			registerFormPassword: {
				required: true,
				validPassword: true,
				minlength: 6,
			},
			registerFormConfirmPassword: {
				equalTo: "#registerFormPassword",
			},
			registerFormFirstname: {
				required: true,
				noNumbers: true,
			},
			registerFormLastname: {
				required: true,
				noNumbers: true,
			},
			registerFormEmail: {
				required: true,
				email: true,
			},
			registerFormBirthdate: {
				required: true,
			}
		},
		messages: {
			registerFormPassword: {
				minlength: "Password must be at least 6 characters long."
			},
			registerFormConfirmPassword: {
				equalTo: "Password and Confirm Password must match."
			},
			registerFormFirstname: {
				noNumbers: "Letters allowed only."
			},
			registerFormLastname: {
				noNumbers: "Letters allowed only."
			}
		}
	});
});

$(document).ready(function () {
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#preferences-section").hide();
	if (loggedInUser !== undefined) {
		$("#welcome-section-notloggedin").hide();
		$("#nav-login-btn").hide();
		$("#nav-register-btn").hide();
		$("#preferences-section").hide();
	}
	else {
		$("#welcome-section-loggedin").hide();
		$("#nav-logout-btn").hide();
		$("#nav-play-btn").hide();
		$("#preferences-section").hide();
	}

	$("#nav-play-btn").click(function () {
		window.clearInterval(interval);
		$("#preferences-section").show();
		$("#play-section").hide();
		$("#register-section").hide();
		$("#login-section").hide();
		$(".welcome-section").hide();
	});

	$("#nav-register-btn").click(function () {
		window.clearInterval(interval);
		$("#register-section").show();
		$("#login-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
		$("#preferences-section").hide();
	});

	$("#nav-login-btn").click(function () {
		window.clearInterval(interval);
		$("#login-section").show();
		$("#register-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
		$("#preferences-section").hide();
	});

	$("#welcome-login-btn").click(function () {
		window.clearInterval(interval);
		$("#login-section").show();
		$("#register-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
		$("#preferences-section").hide();
	});

	$("#welcome-register-btn").click(function () {
		window.clearInterval(interval);
		$("#register-section").show();
		$("#login-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
		$("#preferences-section").hide();
	});

	const
		rangeB = document.getElementById('rangeB'),
		rangeVB = document.getElementById('rangeVB'),
		setValueB = () => {
			const
				newValue = Number((rangeB.value - rangeB.min) * 100 / (rangeB.max - rangeB.min)),
				newPosition = 10 - (newValue * 0.2);
			rangeVB.innerHTML = `<span>${rangeB.value}</span>`;
			rangeVB.style.left = `calc(${newValue}% + (${newPosition}px))`;
		};
	document.addEventListener("DOMContentLoaded", setValueB);
	rangeB.addEventListener('input', setValueB);

	const
		rangeM = document.getElementById('rangeM'),
		rangeVM = document.getElementById('rangeVM'),
		setValueM = () => {
			const
				newValue = Number((rangeM.value - rangeM.min) * 100 / (rangeM.max - rangeM.min)),
				newPosition = 10 - (newValue * 0.2);
			rangeVM.innerHTML = `<span>${rangeM.value}</span>`;
			rangeVM.style.left = `calc(${newValue}% + (${newPosition}px))`;
		};
	document.addEventListener("DOMContentLoaded", setValueM);
	rangeM.addEventListener('input', setValueM);

	const
		rangeT = document.getElementById('rangeT'),
		rangeVT = document.getElementById('rangeVT'),
		setValueT = () => {
			const
				newValue = Number((rangeT.value - rangeT.min) * 100 / (rangeT.max - rangeT.min)),
				newPosition = 10 - (newValue * 0.2);
			rangeVT.innerHTML = `<span>${rangeT.value}</span>`;
			rangeVT.style.left = `calc(${newValue}% + (${newPosition}px))`;
		};
	document.addEventListener("DOMContentLoaded", setValueT);
	rangeT.addEventListener('input', setValueT);
	setValueM();
	setValueB();
	setValueT();
});

function welcomeClicked() {
	$("#welcome-section").show();
	$("#register-section").hide();
	$("#login-section").hide();
	$("#play-section").hide();
	if (loggedInUser !== undefined) {
		alert("loggedInUser is not null " + loggedInUser['username']);
		$("#welcome-section-loggedin").show();
		$("#welcome-section-notloggedin").hide();
	}
	else {
		$("#welcome-section-loggedin").hide();
		$("#welcome-section-notloggedin").show();
		alert("asdfa");
	}
}
function startGhosts() {
	for (let i = 0; i < numGhosts; i++) {
		board[ghostStartPositiong[i][0]][ghostStartPositiong[i][1]] = 5;
	}
}
function Start() {
	audio.play();
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
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
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];
	ResetGhosts();
	startGhosts();

	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 0;
	var special_food = 5;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < board.length; i++) {
		// put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] == WALL || board[i][j] == GHOST) {

				continue;
			}
			var randomNum = Math.random();
			let rndNumber = getRandomArbitrary(1, 4);
			if (randomNum <= (1 * food_remain) / cnt) {
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
				board[i][j] = -1;
			}
			cnt--;
		}
	}
	// Update Speical Characater starting position
	board[15][7] = SPECIAL_CHAR;
	specialPosition.i = 15;
	specialPosition.j = 7;

	updateFood(numberBalls * 0.6, FOOD);
	updateFood(numberBalls * 0.3, SPECIAL_FOOD);
	updateFood(numberBalls * 0.1, VERY_SPECIAL_FOOD);
	for (let i = 0; i < specialCandies.length; i++) {
		var emptyCell = findRandomEmptyCell(board);
		specialCandies[i].i = emptyCell[0];
		specialCandies[i].j = emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = SPECIAL_CANDY;
	}
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] =
		keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
	//intervalGhost = setInterval(UpdatePositionGhosts, 1000);
	//intervalSpecial = setInterval(updatePositionSpecial, 250);
}

function updateFood(foodRemaining, foodType) {
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
	var i = Math.floor(getRandomArbitrary(0, board[0].length + 1));
	var j = Math.floor(getRandomArbitrary(0, board.length + 2));
	while (board[i][j] != -1) {
		i = Math.round(getRandomArbitrary(0, board[0].length + 1));
		j = Math.round(getRandomArbitrary(0, board.length + 1));

	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_key]) {
		return 1; //UP
	}
	if (keysDown[down_key]) {
		return 2; //DOWN
	}
	if (keysDown[left_key]) {
		return 3; //LEFT
	}
	if (keysDown[right_key]) {
		return 4; //RIGHT
	}
}

function Draw(pacmanDir = "Right") {

	canvas.width = canvas.width; //clean board
	lblScore.innerHTML = "Score: " + score;
	lblTime.innerHTML = "Time Left: " + (timeLimit - parseInt(time_elapsed));
	$("#lives").html('<p id="lblLives">Lives left:</p>');
	for (let i = 0; i < LIFE; i++) {
		$("#lives").append('<img src="assets/images/heart.svg" width="30px" height="30px">');
	}
	var eyes_x = 5;
	var eyes_y = 10;

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board[i][j] == PACMAN) {
				context.beginPath();
				if (pacmanDir == "Right") {
					context.arc(center.x, center.y + 5, 13, 1.85 * Math.PI, 0.15 * Math.PI, true);
				} else if (pacmanDir == "Left") {
					context.arc(center.x, center.y + 5, 13, 1.15 * Math.PI, 0.85 * Math.PI, false); // half circle
				} else if (pacmanDir == "Up") {
					context.arc(center.x, center.y + 5, 13, -0.3 * Math.PI, 1.3 * Math.PI, false); // half circle
					eyes_x = 10;
					eyes_y = 0;
				} else if (pacmanDir == "Down") {
					context.arc(center.x, center.y + 5, 13, -1.3 * Math.PI, 0.3 * Math.PI, false); // half circle
					eyes_x = 10;
					eyes_y = 5;
				}

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + eyes_x, center.y - eyes_y + 7, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == FOOD) {
				context.beginPath();
				context.arc(center.x, center.y + 5, 7, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor5; //color
				context.fill();
			} else if (board[i][j] == SPECIAL_FOOD) {
				context.beginPath();
				context.arc(center.x, center.y + 3, 9, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor15; //color
				context.fill();
			} else if (board[i][j] == VERY_SPECIAL_FOOD) {
				context.beginPath();
				context.arc(center.x, center.y + 5, 11, 0, 2 * Math.PI); // circle
				context.fillStyle = ballColor25; //color
				context.fill();
			} else if (board[i][j] == WALL) {
				// context.beginPath();
				// context.rect(center.x-15 , center.y - 15, 30, 30);
				// context.fillStyle = "grey"; //color
				// context.fill();
				let img = new Image();
				img.src = "assets/images/brick-wall.svg";
				context.drawImage(img, center.x - 15, center.y - 15, 32, 40);
			} else if (board[i][j] == GHOST) {
				// context.beginPath();
				// context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				// context.fillStyle = "red"; //color
				// context.fill();
				// var img = document.getElementById("ghost");
				let img = new Image();
				img.src = "assets/images/temp.png";
				context.drawImage(img, center.x - 18, center.y - 15, 35, 35);
				// context.drawImage(temp.png)
				// var img = new Image();
				// img.src = "assets/images/temp.png";
				// img.onload = function (e){
				// 	context.drawImage(img, center.x,center.y, 15,15);
				// }

			} else if (board[i][j] == SPECIAL_CHAR) {
				// context.beginPath();
				// context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				// context.fillStyle = "blue"; //color
				// context.fill();
				let img = new Image();
				img.src = "assets/images/lollipop.png";
				context.drawImage(img, center.x - 15, center.y - 7, 23, 23);

			} else if (board[i][j] == SPECIAL_CANDY) {
				// context.beginPath();
				// context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				// context.fillStyle = "pink"; //color
				// context.fill();
				let img = new Image();
				img.src = "assets/images/pill.png";
				context.drawImage(img, center.x - 10, center.y - 5, 22, 22);
			} else if (board[i][j] == VERY_SPECIAL_CANDY) {
				// context.beginPath();
				// context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				// context.fillStyle = "yellow"; //color
				// context.fill();
				let img = new Image();
				img.src = "assets/images/candy.svg";
				context.drawImage(img, center.x - 10, center.y - 12, 25, 25);

			}
		}
	}
}

function BFS(startVertex, endVertex) {
	var nextVertex = null;
	let visited = new Set();
	let closed_list = new Set();
	let distance = Array(ROW).fill().map(() => Array(COL).fill(-1));
	let queue = [];
	queue.push(startVertex);
	visited.add(startVertex.toString());

	let dirRow = [-1, 1, 0, 0];
	let dirCol = [0, 0, -1, 1];

	while (queue.length > 0) {
		let currentVertex = queue.shift();
		let currentRow = currentVertex[0];
		let currentCol = currentVertex[1];
		for (let i = 0; i < dirRow.length; i++) {
			let newRow = currentRow + dirRow[i];
			let newCol = currentCol + dirCol[i];
			// if works somehow dont forget to add more stuff other than wall
			if (!visited.has([newRow, newCol].toString()) && newRow > 0 && newCol > 0 && newRow < ROW && newCol < COL && board[newRow][newCol] != WALL) {
				visited.add([newRow, newCol].toString());
				distance[newRow][newCol] = distance[currentRow][currentCol] + 1;
				queue.push([newRow, newCol]);
			}
		}
	}
	if (distance[endVertex[0]][endVertex[1]] === -1) {
		console.log("Path does not exist");
	}
	else {
		let dis = distance[endVertex[0]][endVertex[1]];
		nextVertex = [0, 0];
		let currentRow = endVertex[0];
		let currentCol = endVertex[1];
		for (let i = 0; i < dirRow.length; i++) {
			let newRow = currentRow + dirRow[i];
			let newCol = currentCol + dirCol[i];
			if (distance[newRow][newCol] == dis - 1 && board[newRow][newCol] != 4) {
				nextVertex[0] = newRow;
				nextVertex[1] = newCol;
				break;
			}

		}
	}

	return nextVertex;
}
function UpdatePositionGhosts() {
	let flag = false;
	for (let k = 0; k < numGhosts; k++) {
		// console.log([ghosts[k].i,ghosts[k].j]);
		// BFS([ghosts[k].i,ghosts[k].j],[shape.i,shape.j]);

		var nextVertex = BFS([shape.i, shape.j], [ghosts[k].i, ghosts[k].j]);
		// console.log(nextVertex);
		board[ghosts[k].i][ghosts[k].j] = ghostsSteps[k];
		if (board[nextVertex[0]][nextVertex[1]] == SPECIAL_CHAR) {
			ghostsSteps[k] = board[specialPosition.i, specialPosition.j]
		} else {
			if (board[nextVertex[0]][nextVertex[1]] == GHOST) {
				let tempCell = findGhostLast(nextVertex[0], nextVertex[1]);
				ghostsSteps[k] = tempCell;
			}
			else { ghostsSteps[k] = board[nextVertex[0]][nextVertex[1]]; }
		}

		if (board[nextVertex[0]][nextVertex[1]] == PACMAN) {

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
	if (flag == true) {
		console.log("dsa");
		ResetGhostsPositions();
	}

}
function ResetGhostsPositions() {
	LIFE--;
	let rndCell = findRandomEmptyCell(board);
	console.log(shape.i, shape.j);

	shape.i = rndCell[0];
	shape.j = rndCell[1];
	console.log(shape.i, shape.j);
	board[shape.i][shape.j] = 2;
	score = score - 10;
	for (let k = 0; k < numGhosts; k++) {
		if (ghostsSteps[k] != PACMAN) {
			board[ghosts[k].i][ghosts[k].j] = ghostsSteps[k];
		}
		else {
			board[ghosts[k].i][ghosts[k].j] = 0;
		}
	}
	ResetGhosts();
	for (let k = 0; k < numGhosts; k++) {
		ghostsSteps[k] = 0;
		board[ghosts[k].i][ghosts[k].j] = GHOST;
	}
}
function checkCell(i, j) {
	return i > 0 && j > 0 && i < ROW && i < COL && board[i][j] != WALL && board[i][j] != GHOST;
}
function updatePositionSpecial() {
	// 	var specialCounter = 0;
	// var specialDestination = [0,0];
	let dirArr = [[1, 1], [1, 17], [20, 1], [20, 17]];
	let nextCell = null;
	if (specialAlive == true) {
		if (specialCounter == 5) {

			specialDestination = dirArr[Math.round(getRandomArbitrary(0, 3))];
			specialCounter = 0;
		}
		else { specialCounter++; }
		// console.log(specialDestination);
		// console.log([specialPosition.i,specialPosition.j]);
		nextCell = BFS(specialDestination, [specialPosition.i, specialPosition.j])
		while (nextCell == null) {
			specialDestination = dirArr[Math.round(getRandomArbitrary(0, 3))]
			nextCell = BFS(specialDestination, [specialPosition.i, specialPosition.j])
		}

		board[specialPosition.i][specialPosition.j] = lastSpecial;
		if (board[nextCell[0]][nextCell[1]] != GHOST) {
			lastSpecial = board[nextCell[0]][nextCell[1]];
		}
		else {
			lastSpecial = findGhostLast(nextCell[0], nextCell[1]);
		}

		board[nextCell[0]][nextCell[1]] = SPECIAL_CHAR;
		specialPosition.i = nextCell[0];
		specialPosition.j = nextCell[1];
	}
}
function findGhostLast(i, j) {
	for (let k = 0; k < numGhosts; k++) {
		if (ghosts[k].i == i && ghosts[k].j == j) {
			return ghostsSteps[k];
		}
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
		else if (board[shape.i][shape.j - 1] != 4) {
			shape.j = board[0].length - 1;
			side = "Up";
		}
	}
	if (x == 2) {
		if (shape.j < COL - 1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			side = "Down";
		}
		else if (board[shape.i][shape.j + 1] != 4) {
			shape.j = 0;
			side = "Down";
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			side = "Left";
		}
		else if (shape.i == 0 && board[shape.i][shape.j] != 4) {
			shape.i = board.length - 1;
			side = "Left";
		}
	}
	if (x == 4) {

		if (shape.i < ROW - 1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			side = "Right";
		}
		else if (shape.i == ROW - 1 && board[shape.i][shape.j] != 4) {
			shape.i = 0;
			side = "Right";
		}
	}
	if (board[shape.i][shape.j] == 1) { score += 5; }
	if (board[shape.i][shape.j] == SPECIAL_FOOD) { score += 15; }
	if (board[shape.i][shape.j] == VERY_SPECIAL_FOOD) { score += 25; }
	if (board[shape.i][shape.j] == SPECIAL_CANDY) { LIFE++; }
	if (board[shape.i][shape.j] == VERY_SPECIAL_CANDY) { score += 50; }
	if (verySpecialCandyCounter == 15) {
		verySpecialCandyFlag = true;
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = VERY_SPECIAL_CANDY;
		verySpecialCandy.i = emptyCell[0];
		verySpecialCandy.j = emptyCell[1];
		verySpecialCandyCounter--;
	} else if (verySpecialCandyFlag == true && verySpecialCandyCounter > 0) {
		verySpecialCandyCounter--;
	} else if (verySpecialCandyFlag == false) {
		verySpecialCandyCounter++;
	} else {
		board[verySpecialCandy.i][verySpecialCandy.j] = 0;
		verySpecialCandyFlag = false;
	}

	if (specialCounterRun == 2) {
		updatePositionSpecial();
		specialCounterRun = 0;
	} else { specialCounterRun++; }
	if (board[shape.i][shape.j] == GHOST) {

		ResetGhostsPositions();
	} else {
		if (board[shape.i][shape.j] == SPECIAL_CHAR) {

			specialAlive = false;
			score = score + 50;
		}
		board[shape.i][shape.j] = 2;
		if (flagGhosts == 0) {
			UpdatePositionGhosts();
			flagGhosts = 1;
		} else { flagGhosts = 0; }
	}

	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (time_elapsed > timeLimit) {
		audio.pause();
		audio.currentTime = 0;
		window.clearInterval(interval);
		if (score < 100) {
			window.alert("You are better than " + score + " Points!");

		} else { window.alert("Winner!!!"); }
		Draw();
	}

	if (LIFE == 0) {
		audio.pause();
		audio.currentTime = 0;
		window.clearInterval(interval);
		window.alert("Loser!");
		Draw();
	}
	else {
		lastPacman = side;
		Draw(side);
	}
}

function registerUser() {
	const username = $("#registerFormUsername").val();
	const password = $("#registerFormPassword").val();
	const firstname = $("#registerFormFirstname").val();
	const lastname = $("#registerFormLastname").val();
	const email = $("#registerFormEmail").val();
	const birthdate = $("#registerFormBirthdate").val();

	const newUser = { username: username, password: password, firstname: firstname, lastname: lastname, email: email, birthdate: birthdate };
	users.push(newUser);
	alert('Registration completed successfully, Heading to login page');
	$("#register-section").hide();
	$("#login-section").show();
	return false;
}


function logIn() {
	const username = $("#login-form-username").val();
	const password = $("#login-form-password").val();
	for (let i = 0; i < users.length; i++) {
		if (users[i]['username'] === username) {
			if (users[i]['password'] === password) {
				loggedInUser = users[i];
				alert("Welcome " + loggedInUser['firstname'] + "!");
				setLoggedIn();
				return false;
			}
			else {
				alert("Password is incorrect");
				return false;
			}
		}
	}
	alert(username + " is not a registered User, please head to Registration page.");
	return false;
}

function setLoggedIn() {
	$("#login-section").hide();
	$("#welcome-section-loggedin").show();
	$("#nav-login-btn").hide();
	$("#nav-register-btn").hide();
	$("#nav-logout-btn").show();
	$("#nav-play-btn").show();
}

function logout() {
	loggedInUser = undefined;
	setLoggedOut();
}

function setLoggedOut() {
	$("#welcome-section-notloggedin").show();
	$("#welcome-section-loggedin").hide();
	$("#nav-login-btn").show();
	$("#nav-register-btn").show();
	$("#nav-logout-btn").hide();
	$("#nav-play-btn").hide();
}

function randomPreferences() {
	$("#preferences-5-pts").val(randomColor());
	$("#preferences-15-pts").val(randomColor());
	$("#preferences-25-pts").val(randomColor());
	const rndBalls = Math.floor(Math.random() * 41) + 50;
	const
		rangeB = document.getElementById('rangeB'),
		rangeVB = document.getElementById('rangeVB'),
		newValue = Number((rndBalls - rangeB.min) * 100 / (rangeB.max - rangeB.min)),
		newPosition = 10 - (newValue * 0.2);
	rangeVB.innerHTML = `<span>${rndBalls}</span>`;
	rangeVB.style.left = `calc(${newValue}% + (${newPosition}px))`;
	$("#rangeB").val(rndBalls);

	const rndMonsters = Math.floor(Math.random() * 4) + 1;
	const
		rangeM = document.getElementById('rangeM'),
		rangeVM = document.getElementById('rangeVM'),
		newValueM = Number((rndMonsters - rangeM.min) * 100 / (rangeM.max - rangeM.min)),
		newPositionM = 10 - (newValueM * 0.2);
	rangeVM.innerHTML = `<span>${rndMonsters}</span>`;
	rangeVM.style.left = `calc(${newValueM}% + (${newPositionM}px))`;
	$("#rangeM").val(rndMonsters);


	const rndTime = Math.floor(Math.random() * 241) + 60;
	const
		rangeT = document.getElementById('rangeT'),
		rangeVT = document.getElementById('rangeVT'),
		newValueT = Number((rndTime - rangeT.min) * 100 / (rangeT.max - rangeT.min)),
		newPositionT = 10 - (newValueT * 0.2);
	rangeVT.innerHTML = `<span>${rndTime}</span>`;
	rangeVT.style.left = `calc(${newValueT}% + (${newPositionT}px))`;
	$("#rangeT").val(rndTime);

	return false;
}

function randomColor() {
	let rr = Math.floor(Math.random() * 256).toString(16);
	if (rr.length == 1) {
		rr = "0" + rr;
	}
	let gg = Math.floor(Math.random() * 256).toString(16);
	if (gg.length == 1) {
		gg = "0" + gg;
	}
	let bb = Math.floor(Math.random() * 256).toString(16);
	if (bb.length == 1) {
		bb = "0" + bb;
	}
	return "#" + rr + gg + bb;
}

function setPreferences() {
	numberBalls = parseInt($("#rangeB").val(), 10);
	numGhosts = parseInt($("#rangeM").val(), 10);
	timeLimit = parseInt($("#rangeT").val(), 10);
	ballColor5 = $("#preferences-5-pts").val();
	ballColor15 = $("#preferences-15-pts").val();
	ballColor25 = $("#preferences-25-pts").val();
	LIFE = 5;
	$("#preferences-selected-balls").html("Number of balls: " + numberBalls);
	$("#preferences-selected-monsters").html("Number of monsters: " + numGhosts);
	$("#preferences-selected-time").html("Time Limit: " + timeLimit);
	$("#preferences-selected-username").html("User: " + loggedInUser["username"]);
	Start();
	$("#play-section").show();
	$("#preferences-section").hide();
	return false;
}

function showPreferences() {
	window.clearInterval(interval);
	$("#preferences-section").show();
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	$(".welcome-section").hide();
}

async function setUserKey(keyToSet) {
	return new Promise((resolve) => {
		document.addEventListener("keydown", onKeyHandler);
		function onKeyHandler(e) {
			document.removeEventListener("keydown", onKeyHandler);
			resolve();
			switch (keyToSet) {
				case 'U':
					up_key = e.which;
					$("#preferences-up").text(e.key);
					break;
				case 'R':
					right_key = e.which;
					$("#preferences-right").text(e.key);
					break;
				case 'D':
					down_key = e.which;
					$("#preferences-down").text(e.key);
					break;
				case 'L':
					left_key = e.which;
					$("#preferences-left").text(e.key);
					break;
			}
		}
	});
}