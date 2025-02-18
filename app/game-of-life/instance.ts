import GameLogic from "@/game-of-life/logic.ts";

const game = new GameLogic();

export default function getInstance() {
  // for now there's just one instance created on server boot and stored in memory,
  // but we could imagine having multiple games persisted somehow
  return game;
}
