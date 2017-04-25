var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector(".message");
var h1 = document.querySelector("h1");
var buttonReset = document.querySelector(".reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init () {
	//mode buttons for event listeners
	setUpModeButtons();
	//squares listeners
	setUpSquares();
	reset();		
}

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			//use reset function for new generation
			reset();
		});
	};
}

function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		//set event listeners
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "CORRECT!";
				buttonReset.textContent = "Play Again?"
				changeSameColor(pickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	};	
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change previous text to empty
	messageDisplay.textContent = "";
	//change play again back to "new colors"
	buttonReset.textContent = "New Colors";
	//change color squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}


buttonReset.addEventListener("click", function() {
	reset();
});

function changeSameColor(color){
	//loop through squares
	for (var i = 0; i < squares.length; i++) {
		//change color to match given color
		squares[i].style.background = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a red from -255
	var r = Math.floor(Math.random() * 256);
	//pick a green from -255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from -255
	var b = Math.floor(Math.random() * 256);
	//"rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";

}
