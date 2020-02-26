var deck = new Deck();


var gameSpace = document.querySelector('.game-space');
var mainPage = document.querySelector('.game');
var lockCards = false;
var startTime;
var endTime;
var totalTime;
var totalSeconds;
var totalMiliseconds;
var fastestTimes = [];
// var flipVerticalFwd = document.querySelector('.flip-vertical-fwd');
gameSpace.addEventListener('click', cardFlip);



function cardFlip(event) {
  var selectedCard = event.target;

  if (deck.selectedCards.length < 2 && selectedCard.matches('.cards') && !lockCards) {
    selectedCard.classList.toggle(`bey${selectedCard.dataset.id}`)

    var selectedCardId = parseInt(selectedCard.dataset.index);
    var selectedCardInstance = deck.cards.find(function(card) {
      return card.cardId === selectedCardId
    })



    deck.pushSelectedCards(selectedCardInstance);
  }

  if (deck.selectedCards.length === 2) {
    lockCards = true;
    checkSelectedCards();
  }
}



function checkSelectedCards() {
  var objectId = null;
  var cardOne = deck.selectedCards[0]
  var cardTwo = deck.selectedCards[1]
  if (cardOne.matchInfo === cardTwo.matchInfo && cardOne.cardId != cardTwo.cardId) {
    objectId = cardOne.matchInfo;
    var matchedCardsInstance = [cardOne, cardTwo]
    var cardsToHide = document.querySelectorAll(`.cards[data-id="${objectId}"]`);
    for(var i = 0; i < cardsToHide.length; i++) {
      cardsToHide[i].classList.add('hidden');
      deck.moveToMatched(matchedCardsInstance);
    }
  lockCards = false;
  updateMatchCount();
  fillLeftBoxes(objectId);
  } else {
    noMatch();
  }
}

function updateMatchCount() {
  var matchCount = getMatchCount();
  var matchCounter = document.querySelector('.match-counter');
   matchCounter.innerText = matchCount;
}

function getMatchCount() {
  return deck.matchedCards.length / 2;
}


function noMatch() {
  var firstCard = deck.selectedCards[0].cardId;
  var secondCard = deck.selectedCards[1].cardId;
  var firstIndex = deck.selectedCards[0].matchInfo;
  var secondIndex = deck.selectedCards[1].matchInfo;
  if (deck.selectedCards[0].matchInfo != deck.selectedCards[1].matchInfo) {
    var firstSelectedCard = document.querySelector(`.cards[data-index="${firstCard}"]`);//1-10
    var secondSelectedCard = document.querySelector(`.cards[data-index="${secondCard}"]`);//1-10
    setTimeout(function() {
    firstSelectedCard.classList.toggle(`bey${firstIndex}`);//1-5
    secondSelectedCard.classList.toggle(`bey${secondIndex}`);//1
    lockCards = false;
  }, 2000);

    }

    deck.selectedCards = [];


}




function fillLeftBoxes(objectId) {
  var boxNum = getMatchCount();
  var selectedBox = document.querySelector(`.box-${boxNum}`)
      selectedBox.classList.add(`bey${objectId}`)
  if (boxNum === 5) {
        endTime = new Date();
        getTime();
        showWinPage();


      }
  }

  function getTime() {
     totalMiliseconds = (endTime - startTime);
     totalSeconds = (totalMiliseconds / 1000);
     // pushTime();
     return Number(totalSeconds);

  }

  function showWinPage() {
    mainPage.innerHTML = "";
    mainPage.insertAdjacentHTML('afterbegin',
    `
    <main class="win-page">
          <div class="inside-background">
            <h1 class="congrats-heading">Congratulations!</h1>
          <div class="win-info">
            <p class="total-matches">All 5 matches were found in</p>
            <p class="final-win-time">${totalSeconds} Seconds!</p>
          </div>
          <div class="play-new-btns">
            <button class="win-page-btn">Play Again</button>
            <button class="win-page-btn">New Game</button>
            </div>
          </div>
    </main>`);

    saveTime();
  }

  function saveTime() {
    //grab current time
    //save time to storage
  }

  function getTimes () {
    //pull all saved times
    // return a new array of times
  }

  function displayTimes() {
    //sort TIMES
    //display top three
  }

  function topTimes() {
    //sort through array for best time
    //return array of sortedTimes

  }
  //if deck.selectedCards < 2
    //pushSelectedCards

    //else checkSelectedCards;
    //if match invoke updateMatchCount
    //push selectedCards to matchedCards if they match


    // deck.pushSelectedCards();

  //   if(deck.selectedCards.length == 2) {
  //     deck.checkSelectedCards(event)
  // }
// function getTime() {
//   totalTime = (endTime - startTime);
//   totalSeconds = (totalTime / 1000);
//   return(totalSeconds);
//   }

  // // Do things here
  // var finish = new Date();
  // var difference = new Date();
  // difference.setTime(finish.getTime() - start.getTime());
  // alert( difference.getMilliseconds() );




window.onload = createDeck();


function createDeck() {
  startTime = new Date();
  deck.fillDeck();
  showCards();
  //display cards

}

function showCards (event) {
  var cardsArray = deck.cards;
  for(var i = 0; i < cardsArray.length; i++) {
  gameSpace.innerHTML+= `<div class="cards card-${cardsArray[i].cardId}" data-id="${cardsArray[i].matchInfo}" data-index="${cardsArray[i].cardId}">
    <p>${i + 1}</p>
  </div>`
  }
}


// pushTime() {
//   var currentTime = getTime();
//   fastestTimes.push(currentTime);
//   sortTimes();
// }

  //toggle
