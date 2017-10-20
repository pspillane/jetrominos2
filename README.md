# jetrominos2

This is a clone of the tetromino-based falling block puzzle game that everyone knows.

## Building

jetrominos2 is built using Babel, Webpack, and ESLint.

```
$ npm install
$ npm run build
```

This builds all *.js files in src/ and outputs to dist/script.js.

## Running

Open dist/index.html in a modern-ish web browser to play jetrominos2.

### Controls
- **Left:** Shift left
- **Right:** Shift right
- **Down:** Soft drop
- **Up:** Hard drop
- **X:** Rotate clockwise
- **Z:** Rotate counter-clockwise

## Unit testing

To run all unit tests...

```
$ npm run test
```

## Known issues

- No defined game over state; incoming pieces overlap each other when the board is topped out
- Very primitive piece preview that uses letters instead of preview images
- No scoring or levels