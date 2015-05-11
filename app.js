// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready`
$(document).ready(function() {
  $squares = $('.square p'); 
  $squareBorders = $('.square');
  var turn = 'X';
  var playCount = 0;
  var xConsecWins = 0;
  var oConsecWins = 0;

  function Game() {
    //Create a new instance of player 1
    this.player1 = new Player('X')

    //Do the same for a player 2
    this.player2 =  new Player('O')
    
    //Create the board
    this.board = new Board();
  }

  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    if (turn === 'X' ) {
      $('#player_o').html('Player O ');
      $('#player_x').html('Player X &diams; ');
    }
    else {
      $('#player_o').html('Player O &diams; ');
      $('#player_x').html('Player X ');
    }

  };

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    $('.reset').on('click', function() {
    $squares.each(function() {
      $(this).html('');
      $(this).removeClass().addClass('blank');
    });
    $squareBorders.each(function() {
      $(this).removeClass().addClass('square');
    });
    // X always goes first
    turn = 'X';
    // set the turn indicator
    game.nextPlayer();
    // keep track of how many moves have been made
    // max 9 before a win or tie
    playCount = 0;
  })};

  // A starter Player constructor.
  function Player(team) {
    //Is the player X or O?
    this.team = team;
  };

  // A starter Board constructor.
  function Board() {
    //Tracks the cells of the board instance
    this.$cells = $('.square p');
    //Store any other properties that board may have below, such as a reset option
    $(this).$reset = $('.reset');
  };


  Board.prototype.$squaresClick = function(){
    $squares.each(function(index) {
    $(this).on('click', function() {
    if ($(this).html() === '' && turn !== 'game_over') {
        setSquare($(this));
        checkGameStatus();
      }
      else if (turn === 'game_over') {
        alert("The game is over!  Click 'reset' to play again.");
      }
      else {
        alert('That square has already been played!');
      }
    });
  });
  };


  // Start the game!
  var game = new Game();
  game.init();
  game.board.$squaresClick();
  


  function setSquare($square) {
    // square.innerHTML = turn;  // turn = X or O
    $square.html(turn);
    // square.setAttribute('class', turn);
    $square.removeClass().addClass(turn);
    turn === 'X' ? turn = 'O' : turn = 'X';
  }

  function checkGameStatus() {
    var winner;  // a string to indicate the winner and winning squares, e.g. 'X012'
    if (winner = getWinner())
      gameOver(winner);
    else if (++playCount === 9)
      gameOver('tie');
    // game still going, switch turn
    else game.nextPlayer();
  }

  

  function gameOver(winner) {
    if (winner === 'tie') {
      alert("Tie!");
    }
    else {
      highlightBorders(winner);
      // winner[0] is 'X' or 'O'
      alert(winner[0] + ' wins!');
      // check for consecutive wins
      checkConsecWins(winner[0]);
    }
    turn = 'game_over';
  }

  // if any player scores three wins in a row, display a message
  function checkConsecWins(winner) {
    if (winner === 'X') {
      oConsecWins = 0;
      if (++xConsecWins === 3)
        // playerX.innerHTML = 'Player X - <strong>HAT TRICK !!!</strong>';
        $('#player_x').html('Player X - <strong>HAT TRICK !!!</strong>');
    }
    else {
      xConsecWins = 0;
      if (++oConsecWins === 3);
        // playerO.innerHTML = 'Player O - <strong>HAT TRICK !!!</strong>';
        $('#player_o').html('Player O - <strong>HAT TRICK !!!</strong>');
    }
  }

  // getWinner will return a win in the form of a string denoting
  // the winning player and winning squares, e.g. 'X048'
  // if no win, return null
  function getWinner() {
    if (winnerIs('X')) {
      return 'X' + winnerIs('X');
    }
    else if (winnerIs('O')) {
      return 'O' + winnerIs('O');
    }
    else
      return null;
  }

  // If a winning combination of squares exists, return the win
  // in the form of a string denoting the winning squares, e.g. '048'
  function winnerIs(player) {
    return allThree(player, squareValue('0'), squareValue('1'), squareValue('2')) ||
           allThree(player, squareValue('3'), squareValue('4'), squareValue('5')) ||
           allThree(player, squareValue('6'), squareValue('7'), squareValue('8')) ||
           allThree(player, squareValue('0'), squareValue('3'), squareValue('6')) ||
           allThree(player, squareValue('1'), squareValue('4'), squareValue('7')) ||
           allThree(player, squareValue('2'), squareValue('5'), squareValue('8')) ||
           allThree(player, squareValue('0'), squareValue('4'), squareValue('8')) ||
           allThree(player, squareValue('2'), squareValue('4'), squareValue('6'));
  }

  // returns the combo of winning rows, e.g. '345'
  function allThree(player, squareOne, squareTwo, squareThree) {
    if ((squareOne[0] === player) && (squareTwo[0] === player) && (squareThree[0] === player))
      return squareOne[1] + squareTwo[1] + squareThree[1];
  }

  function squareValue(key) {
    switch(key) {
      case '0': return $squares.eq(0).html() + '0';
      case '1': return $squares.eq(1).html() + '1';
      case '2': return $squares.eq(2).html() + '2';
      case '3': return $squares.eq(3).html() + '3';
      case '4': return $squares.eq(4).html() + '4';
      case '5': return $squares.eq(5).html() + '5';
      case '6': return $squares.eq(6).html() + '6';
      case '7': return $squares.eq(7).html() + '7';
      case '8': return $squares.eq(8).html() + '8';
      default : console.log('Something went wrong');
    }
  }
  function highlightBorders(winningSquares) {
    $squareBorders.eq(parseInt(winningSquares[1])).removeClass().addClass('win');
    $squareBorders.eq(parseInt(winningSquares[2])).removeClass().addClass('win');
    $squareBorders.eq(parseInt(winningSquares[3])).removeClass().addClass('win');
  }

});
