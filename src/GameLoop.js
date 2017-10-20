class GameLoop {
  constructor(inputState, renderer) {
    this.inputState = inputState;
    this.renderer = renderer;
  }

  start(window, fps) {
    window.addEventListener("keyup", evt => this.inputState.keyUp(evt));
    window.addEventListener("keydown", evt => this.inputState.keyDown(evt));
    window.setInterval(() => {
      this.update();
      this.draw();
    }, 1000 / fps);
  }

  update() {
  }

  draw() {
  }
}

export default GameLoop;