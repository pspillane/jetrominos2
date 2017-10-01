class Renderer {
  constructor(context, width, height) {
    this._context = context;
    this._width = width;
    this._height = height;
  }

  clearScreen() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  drawRectangle(color, x, y, width, height) {
    this._context.fillStyle = color;
    this._context.fillRect(x, y, width, height);
  }

  drawText(str, x, y) {
    this._context.fillStyle = "black";
    this._context.font = "12px sans";
    this._context.fillText(str, x, y);
  }
}

export default Renderer;
