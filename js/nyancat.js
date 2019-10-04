var posX = 100, posY = 100, px = 0, py = 0, an = false;
var nyan = $('.nyan');
var rainbow = null;
var height = 800;
var width = parseInt($('body').width());
var ScreenSize = parseInt(width/9);
var pilha = [];

function getRandomInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

$(document).on('mousemove', function( event ) {
  posX = event.pageX;
  posY = event.pageY;
})

for(var i = 0; i < ScreenSize; i++)
{
  var rainbow_wave = $('<div class="rainbow"/>').css('left', i*9+'px');
  $('#nyan-trail').append(rainbow_wave);
}
rainbow = $('.rainbow');

function criarEstrela()
{
    var rand = getRandomInt(3, 14);
  var tempoDeVida = getRandomInt(5,10);
    var star = $('<div class="star"/>').css({
      width:rand+'px',
      height:rand+'px',
      left: width-10+'px',
      top: Math.floor((Math.random()*height)+1),
      'transition': 'all '+tempoDeVida+'s linear',
      'transform': 'translate(0px, 0px)'
    });
    $('body').append(star);

    window.setTimeout(function(){
      star.css({
        'transform': 'translate(-'+width+'px, 0px)'
      });
    }, getRandomInt(5,10)*10);

  window.setTimeout(function(){star.remove();}, tempoDeVida*1000);
}

function moveNyan()
{
    var tamX = nyan.width()/2,
      tamY = nyan.height()/2;
    px += (posX - px - tamX) / 50;
    py += (posY - py - tamY) / 50;

    nyan.css({
      left: px + 'px',
      top: py + 'px'
    });
}
function peidaArcoIris()
{
  var qnt = Math.floor(nyan.position().left/9)+1;

  if(pilha.length >= qnt) pilha.pop();

  pilha.unshift(py);

  rainbow.hide();
  for(var i = 0; i < qnt; i++)
  {
    var am = (i%2);
    if(an) am = (i%2) ? 0 : 1 ;

    rainbow.eq(qnt - i - 1).css({top: pilha[i]+am}).show();
  }
}

window.setInterval(function(){
  moveNyan();
  peidaArcoIris();
}, 10);

window.setInterval(function(){ criarEstrela(); }, 300);

window.setInterval(function(){ an = !an; }, 500);
