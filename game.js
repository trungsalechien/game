// shim performance.now
performance.now = performance.webkitNow;

// get references to the canvas and its context
var canvas = document.getElementById('a');
var context = canvas.getContext('2d');

// define some game objects
var player = {
  x: 2,
  y: 3
};

// define a "controller" that keeps track of key states
var controller = {
  left: false,
  right: false,
  up: false,
  down: false
};

// map key codes to directions
var keyCodes = {
  65: 'left',
  68: 'right',
  87: 'up',
  83: 'down'
};

// update key states on key events
document.addEventListener('keydown', function (ev) {
  var key = ev.keyCode;
  if (keyCodes[key]) {
    controller[keyCodes[key]] = true;
  }
});
document.addEventListener('keyup', function (ev) {
  var key = ev.keyCode;
  if (keyCodes[key]) {
    controller[keyCodes[key]] = false;
  }
});

// make changes to the game objects
var calculate = function (dt) {
  if (controller.left) {
    player.x -= dt;
  }
  if (controller.right) {
    player.x += dt;
  }
  if (controller.up) {
    player.y -= dt;
  }
  if (controller.down) {
    player.y += dt;
  }
};

// render the game objects to the canvas
var render = function (dt) {

  // clear the canvas
  canvas.width = canvas.width;

  // draw the "player"
  context.fillRect(player.x, player.y, 50, 50);
};

// keep track of the time between renders
var lastRenderTime = performance.now();

var gameLoop = function () {
  var now = performance.now();
  var dt = now - lastRenderTime;

  calculate(dt);
  render(dt);

  lastRenderTime = now;
  setTimeout(gameLoop, 0);
};

// start the game!
gameLoop();
