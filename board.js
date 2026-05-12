export function createBoard(element, chess, orientation, onMove) {

  const board = Chessground(element, {

    orientation,

    movable: {
      free: false,

      color: orientation,

      showDests: true,

      events: {
        after: onMove
      }
    },

    highlight: {
      lastMove: true,
      check: true
    },

    animation: {
      enabled: true,
      duration: 250
    }
  });

  updateBoard(board, chess);

  return board;
}

export function updateBoard(board, chess) {

  board.set({
    fen: chess.fen()
  });
}
