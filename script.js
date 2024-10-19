const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

// Winning combinations (row, column, and diagonal matches)
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game with click event listeners
function initGame() {
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
  updateStatusMessage();
}

// Handle cell click event
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusMessage.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (boardState.every(cell => cell)) {
    statusMessage.textContent = "It's a tie! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
  }
}

// Check for winning conditions
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

// Reset the game to start fresh
function resetGame() {
  currentPlayer = 'X';
  boardState.fill(null);
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ''));
  updateStatusMessage();
}

// Update the status message
function updateStatusMessage() {
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

// Start the game
initGame();

// Update player indicator in cell
function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin()) {
    statusMessage.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (boardState.every(cell => cell)) {
    statusMessage.textContent = "It's a tie! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage();
  }
}
