var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
const WALL = 4;
const PACMAN = 2;
const FOOD = 1;
var side = "Right";
let users = [{ username: 'k', password: 'k', firstname: 'Kyle', lastname: 'Kennedy', email: 'kk@gmail.com', birthdate: '30/06/1994' }];
let loggedInUser = undefined;
let goToReady = true;

$(document).ready(function () {
	let canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	Start();
});

$(document).ready(function () {
	$.validator.addMethod("validPassword", function (value) {
		return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
	}, 'Password must contain at least one character and one number');
	$.validator.addMethod("noNumbers", function (value) {
		return /^[a-zA-Z]+$/.test(value);
	});
	$('#registeration-form').validate({ // initialize the plugin
		rules: {
			username: {
				required: true,
			},
			password: {
				required: true,
				validPassword: true,
				minlength: 6,
			},
			confirmpassword: {
				equalTo: "#password",
			},
			firstname: {
				required: true,
				noNumbers: true,
			},
			lastname: {
				required: true,
				noNumbers: true,
			},
			email: {
				required: true,
				email: true,
			},
			birthdate: {
				required: true,
			}
		},
		messages: {
			password: {
				minlength: "Password must be at least 6 characters long."
			},
			confirmpassword: {
				equalTo: "Password and Confirm Password must match."
			},
			firstname: {
				noNumbers: "Letters allowed only."
			},
			lastname: {
				noNumbers: "Letters allowed only."
			}
		}
	});
})

$(document).ready(function () {
	$("#play-section").hide();
	$("#register-section").hide();
	$("#login-section").hide();
	if (loggedInUser !== undefined) {
		$("#welcome-section-notloggedin").hide();
		$("#nav-login-btn").hide();
		$("#nav-register-btn").hide();
	}
	else {
		$("#welcome-section-loggedin").hide();
		$("#nav-logout-btn").hide();
		$("#nav-play-btn").hide();
	}

	$("#nav-play-btn").click(function () {
		$("#play-section").show();
		$("#register-section").hide();
		$("#login-section").hide();
		$(".welcome-section").hide();
	});

	$("#nav-register-btn").click(function () {
		$("#register-section").show();
		$("#login-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
	});

	$("#nav-login-btn").click(function () {
		$("#login-section").show();
		$("#register-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
	});

	$("#welcome-login-btn").click(function () {
		$("#login-section").show();
		$("#register-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
	});

	$("#welcome-register-btn").click(function () {
		$("#register-section").show();
		$("#login-section").hide();
		$(".welcome-section").hide();
		$("#play-section").hide();
	});
	goToReady = false;
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
function Start() {
	// board = new Array();
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
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
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];


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
			// if (
			// (i == 0) || (i==9) || (j == 0) || (j == 9)
			// (i == 1 && j == 4) ||
			// (i == 1 && j == 5) ||
			// (i == 6 && j == 1) ||
			// (i == 6 && j == 2)
			// ) {
			// 	board[i][j] = WALL;
			// } else {
			if (board[i][j] == 4) { continue; }
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
	interval = setInterval(UpdatePosition, 10);
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
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board[i][j] == PACMAN) {
				context.beginPath();
				if (pacmanDir == "Right") {
					context.arc(center.x, center.y, 15, 1.85 * Math.PI, 0.15 * Math.PI, true);
				} else if (pacmanDir == "Left") {
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI, false); // half circle
				} else if (pacmanDir == "Up") {
					context.arc(center.x, center.y, 15, -0.3 * Math.PI, 1.3 * Math.PI, false); // half circle
				}

				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 10, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == FOOD) {
				context.beginPath();
				context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == WALL) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle = "grey"; //color
				context.fill();
			}
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
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			// side = "Down";

		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			side = "Left";
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			side = "Right";
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(side);
	}
}

function registerUser() {
	console.log(users.length);
	const username = document.getElementById('register-form-username').value;
	const password = document.getElementById('register-form-password').value;
	const confirmpassword = document.getElementById('register-form-confirmpassword').value;
	const firstname = document.getElementById('register-form-firstname').value;
	const lastname = document.getElementById('register-form-lastname').value;
	const email = document.getElementById('register-form-email').value;
	const birthdate = document.getElementById('register-form-birthdate').value;

	const resultValidation = validateNewUser(username, password, confirmpassword, firstname, lastname, email, birthdate);
	if (resultValidation !== 'VALID') {
		alert(resultValidation);
		return;
	}
	const newUser = { username: username, password: password, firstname: firstname, lastname: lastname, email: email, birthdate: birthdate };
	users.push(newUser);
	alert('Registration completed successfully, Please head to Login page');
}

function validateNewUser(username, password, confirmpassword, firstname, lastname, email, birthdate) {
	if (username.length === 0) {
		return "Must fill User Name field.";
	}
	const letterNumber = /^[0-9a-zA-Z]+$/;
	if (password.length < 6 || !(password.match(letterNumber))) {
		return "Password must be at least 6 characters long, containing at least one digit [0-9] and one letter [A-Z,a-z]."
	}
	if (password !== confirmpassword) {
		return "Password and Confirm Password fields must be identical.";
	}
	const hasnumber = /\d/;
	if (firstname.match(hasnumber)) {
		return "First Name must contain nothing but letters."
	}
	if (lastname.match(hasnumber)) {
		return "Last Name must contain nothing but letters."
	}
	const validMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!validMail.test(email.toLowerCase())) {
		return "Mail is not valid";
	}
	return "VALID";

}

function logIn() {
	const username = document.getElementById('login-form-username').value;
	const password = document.getElementById('login-form-password').value;
	for (let i = 0; i < users.length; i++) {
		if (users[i]['username'] === username) {
			if (users[i]['password'] === password) {
				loggedInUser = users[i];
				alert("Welcome " + loggedInUser['firstname'] + "!");
				$("#login-section").hide();
				$("#welcome-section-loggedin").show();
				$("#nav-login-btn").hide();
				$("#nav-register-btn").hide();
				$("#nav-logout-btn").show();
				$("#nav-play-btn").show();
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