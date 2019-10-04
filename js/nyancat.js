let posX = 100,
  posY = 100,
  px = 0,
  py = 0,
  an = false;
let nyan = $('.nyan');
let height = +$('body').height();
let width = +$('body').width();
let rainbowArray = []; // actual array
let rainbow; // jQuery array (dunno why there are two)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < Math.floor(width / 9); i++) {
  let rainbowElement = $('<div class="rainbow"></div>').css('left', i * 9 + 'px');
  rainbowArray.push(rainbowElement);
  $('#nyan-trail').append(rainbowElement);
}

rainbow = $('.rainbow');

function createStar() {
  let rand = getRandomInt(3, 14);
  let starSpeed = getRandomInt(5, 10);

  let star = $('<div class="star"></div>').css({
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
  let nParts = Math.floor(nyan.position().left / 9 + 2.8); // 2.8 is a totally arbitrary number

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
    for (let i = Math.floor(width / 9); i < Math.floor(newWidth / 9); i++) {
      let rainbowElement = $('<div class="rainbow"></div>').css('left', i * 9 + 'px');
      rainbowArray.push(rainbowElement);
      $('#nyan-trail').append(rainbowElement);
    }
  } else if (newWidth < width) {
    for (let i = Math.floor(newWidth / 9) + 1; i < Math.floor(width / 9); i++) {
      let rainbowElement = rainbow.eq(i);
      rainbowElement.remove(); // goodbye :(
      rainbowArray.pop();
    }
  }

  height = +$('body').height();
  width = newWidth;

  rainbow = $('.rainbow');
});
