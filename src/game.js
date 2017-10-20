import Renderer from "./Renderer";
import Board from "./Board";
import PieceBag from "./PieceBag";
import PieceController from "./PieceController";
import InputState from "./InputState";

import Jetrominos2 from "./Jetrominos2";

const inputState = new InputState();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const renderer = new Renderer(context, canvas.width, canvas.height);

const board = new Board();
const pieceBag = new PieceBag();
const pieceController = new PieceController();

const gameLoop = new Jetrominos2(inputState, renderer, board, pieceBag, pieceController);
gameLoop.start(window, 30);