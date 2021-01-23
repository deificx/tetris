import Mousetrap from "mousetrap";

export default function bindKeys({ move, newGame, rotate }) {
  Mousetrap.bind("up", () => {
    rotate();
  });

  Mousetrap.bind("right", () => {
    move("RIGHT");
  });

  Mousetrap.bind("down", () => {
    move("DOWN");
  });

  Mousetrap.bind("left", () => {
    move("LEFT");
  });

  Mousetrap.bind("enter", () => {
    newGame();
  });

  Mousetrap.bind("space", () => {
    newGame();
  });
}
