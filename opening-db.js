import { getPlayerMoves } from "./lichess-api.js";

export async function getDatabaseMove(settings, moveHistory) {

  const moveString = moveHistory.join(",");

  const data = await getPlayerMoves(
    settings.player,
    settings.variant,
    settings.timeControl,
    moveString
  );

  if (!data.moves || data.moves.length === 0) {
    return null;
  }

  let weightedMoves = [];

  data.moves.forEach(move => {

    const total = move.white + move.black + move.draws;

    for (let i = 0; i < total; i++) {
      weightedMoves.push(move.uci);
    }
  });

  const randomMove = weightedMoves[
    Math.floor(Math.random() * weightedMoves.length)
  ];

  return randomMove;
}
