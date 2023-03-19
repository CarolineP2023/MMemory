
const gameContainer = document.getElementById("game");
const startButton = document.querySelector("#start");
const timer = document.getElementById("timer");

let time;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let gameStarted = false;

let seconds = 0,
  minutes = 0;
//Initial moves and win count
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timer.innerHTML = `<span> Time: </span> ${minutesValue}:${secondsValue}`;
};
//start off by hiding the board
if(gameStarted === false){
gameContainer.classList.add("hide");
};

//add a click event to the start game button to display board
startButton.addEventListener("click",started);
function started(){
    gameStarted = true;
    gameContainer.classList.remove("hide");
    startButton.innerText = "Restart";
    interval = setInterval(timeGenerator, 1000);
    startButton.classList.add("restart");


const restart = document.querySelector(".restart");
restart.addEventListener ("click", reload);
function reload (){
  location.reload()
};
   
};


    

   

const COLORS = [

  "pink",
  "skyblue",
  "turquoise",
  "silver",
  "mediumpurple",
  "pink",
  "skyblue",
  "turquoise",
  "silver",
  "mediumpurple"
];

function shuffle(array) {
    // counter is all of the elements in the array combined
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // the index is the random number created
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
    //return function if the card is clicked/flipped
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;


  //the current card is the flipped card;
  let currentCard = e.target;
  //change the background color to the color in the color array
  currentCard.style.backgroundColor = currentCard.classList[0];

//logic for choosing the card

  //if card 1 or card 2 is clicked then the class flipped is added
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    // card 1 becomes card 1 or the current card
    card1 = card1 || currentCard;
    //card 2 becomes the current card; if it is card 1 then nothing else it becomes the current card
    card2 = currentCard === card1 ? null : currentCard;
  }

  //logic for finding a match
  //if we choose two cards then noClicking turns true; this stops us from clicking more than two cards at once
  if (card1 && card2) {
    noClicking = true;
   
    let color1 = card1.className;
    let color2 = card2.className;
//if the first color is the same as the second color
    if (color1 === color2) {
        //then the number of cards flipped changes to 2
      cardsFlipped += 2;
      //we can remove our even listeners to both cards so they stay faced up
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      //reset both cards
      card1 = null;
      card2 = null;
      //reset our no clicking back to inital setting
      noClicking = false;
      // if its not a match after 1 second cards will turn over
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
// once all of the cards are flipped then the game is over
  if (cardsFlipped === COLORS.length){
    alert("game over!")
    clearInterval(interval);
} ;
}


createDivsForColors(shuffledColors);

//start game button


