/*data selection attribute used to select in JS, from the information used in HTML*/
/* I used const because it seemed the easiest */
const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const SELECTIONS /* global variable that won't change */ = [
  {
      /* selections used to play explained or defined*/
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => /* e is for event used when an event listener is added, button being clicked */ {
    const selectionName = selectionButton.dataset.selection
    /* selection name is equal to */
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

/* using functions for selections */ 
function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  /* shows selection first by putting computer selection first */
  addSelectionResult(computerSelection, computerWinner)
  addSelectionResult(selection, yourWinner)

  /* when someone scores the point increases for that player*/
  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)
}

/* a function to increase score */
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
/*ParseInt taking the current text converting to integer and adding one each time someone wins*/
}

/* a function for results in columns */
function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  /* adds result */
  div.classList.add('result-selection')
  /* if shows me the winner */
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
  /* Inserts result in column  */
}

/* function to determine the winner */
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length) 
  /*math. floor gives number between 0, 1, 2. Math random selects number between 0 & 2*/
  return SELECTIONS[randomIndex] 
  /* computer selection will be random */
}