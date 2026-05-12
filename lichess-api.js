export async function getPlayerMoves(player, variant, speed, moves) {

  const url = `/api/player-moves?player=${player}&variant=${variant}&speed=${speed}&play=${moves}`;

  const response = await fetch(url);

  return await response.json();
}
