let engine = null;

export function initializeEngine() {

  engine = new Worker("engines/stockfish.js");

  engine.postMessage("uci");

  return engine;
}

export function getEngineMove(fen, strength = 4) {

  return new Promise(resolve => {

    const depthMap = {
      1: 2,
      2: 3,
      3: 4,
      4: 6,
      5: 8,
      6: 10,
      7: 14,
      8: 18
    };

    const depth = depthMap[strength] || 8;

    engine.postMessage(`position fen ${fen}`);
    engine.postMessage(`go depth ${depth}`);

    engine.onmessage = function(event) {

      const line = event.data;

      if (line.startsWith("bestmove")) {

        const move = line.split(" ")[1];

        resolve(move);
      }
    };
  });
}
