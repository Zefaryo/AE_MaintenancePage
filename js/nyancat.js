var posX = 100,
  posY = 100,
  px = 0,
  py = 0,
  an = false;
var nyan = $('.nyan');
var height = 800;
var width = parseInt($('body').width());
let rainbowArray = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).on('mousemove', function(event) {
  posX = event.pageX;
  posY = event.pageY;
});

for (var i = 0; i < parseInt(width / 9); i++) {
  var rainbowElement = $('<div class="rainbow"></div>').css('left', i * 9 + 'px');
  rainbowArray.push(rainbowElement);
  $('#nyan-trail').append(rainbowElement);
}

const rainbow = $('.rainbow');

function createStar() {
  var rand = getRandomInt(3, 14);
  var starSpeed = getRandomInt(5, 10);

  var star = $('<div class="star"></div>').css({
    width: rand + 'px',
    height: rand + 'px',
    left: width - 10 + 'px',
    top: getRandomInt(1, height),
    transition: `all ${starSpeed}s linear`,
    transform: 'translate(0px, 0px)'
  });

  $('#stars').append(star);

  window.setTimeout(function() {
    star.css({
      transform: `translate(${-width}px, 0px)`
    });
  }, getRandomInt(5, 10) * 10);

  window.setTimeout(function() {
    star.remove();
  }, starSpeed * 1000);
}

function moveNyan() {
  var tamX = nyan.width() / 2,
    tamY = nyan.height() / 2;
  px += (posX - px - tamX) / 50;
  py += (posY - py - tamY) / 50;

  nyan.css({
    left: px + 'px',
    top: py + 'px'
  });
}

function updateRainbow() {
  var nParts = Math.floor(nyan.position().left / 9 + 1.8); // 1.8 is a totally arbitrary number

  if (rainbowArray.length >= nParts) rainbowArray.pop();

  rainbowArray.unshift(py);
  rainbow.hide();

  for (var i = 0; i < nParts; i++) {
    var am = (i % 2);
    if (an) am = (i % 2) ? 0 : 1;

    rainbow.eq(nParts - i - 1).css({
      top: rainbowArray[i] + am
    }).show();
  }
}

window.setInterval(function() {
  moveNyan();
  updateRainbow();
}, 10);

window.setInterval(function() {
  createStar();
}, 300);

window.setInterval(function() {
  an = !an;
}, 500);
