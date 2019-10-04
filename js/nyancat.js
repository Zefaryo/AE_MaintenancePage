let posX = 100,
  posY = 100,
  px = 0,
  py = 0,
  an = false;
let nyan = $('.nyan');
let nyanScale = 2;
let height = +$('body').height();
let width = +$('body').width();
let rainbowArray = []; // actual array
let rainbow; // jQuery array (dunno why there are two)

const rainbowWidth = 9 * nyanScale;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < Math.floor(width / rainbowWidth); i++) {
  let rainbowElement = $('<div class="rainbow"></div>').css('left', i * rainbowWidth + 'px');
  rainbowArray.push(rainbowElement);
  $('#nyan-trail').append(rainbowElement);
}

rainbow = $('.rainbow');

function createStar() {
  let rand = getRandomInt(3, 14);
  let starSpeed = getRandomInt(5, 10);

  let star = $('<div class="star"></div>').css({
    width: rand * nyanScale + 'px',
    height: rand * nyanScale + 'px',
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
  let tamX = nyan.width() / 2,
    tamY = nyan.height() / 2;
  px += (posX - px - tamX) / 50;
  py += (posY - py - tamY) / 50;

  nyan.css({
    left: px + 'px',
    top: py + 'px'
  });
}

function updateRainbow() {
  let nParts = Math.floor(nyan.position().left / rainbowWidth) + 2;

  if (rainbowArray.length >= nParts) rainbowArray.pop();

  rainbowArray.unshift(py);
  rainbow.hide();

  for (let i = 0; i < nParts; i++) {
    let am = (i % 2);
    if (an) am = (i % 2) ? 0 : 1;

    rainbow.eq(nParts - i - 1).css({
      top: rainbowArray[i] + am
    }).show();
  }
}

function update() {
  moveNyan();
  updateRainbow();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

window.setInterval(function() {
  createStar();
}, 300);

window.setInterval(function() {
  an = !an;
}, 500);

document.addEventListener('mousemove', function(event) {
  posX = event.pageX;
  posY = event.pageY;
});

window.addEventListener('resize', (event) => {
  let newWidth = +$('body').width();

  if (newWidth > width) {
    for (let i = Math.floor(width / rainbowWidth); i < Math.floor(newWidth / rainbowWidth); i++) {
      let rainbowElement = $('<div class="rainbow"></div>').css('left', i * rainbowWidth + 'px');
      rainbowArray.push(rainbowElement);
      $('#nyan-trail').append(rainbowElement);
    }
  } else if (newWidth < width) {
    for (let i = Math.floor(newWidth / rainbowWidth) + 1; i < Math.floor(width / rainbowWidth); i++) {
      let rainbowElement = rainbow.eq(i);
      rainbowElement.remove(); // goodbye :(
      rainbowArray.pop();
    }
  }

  height = +$('body').height();
  width = newWidth;

  rainbow = $('.rainbow');
});
