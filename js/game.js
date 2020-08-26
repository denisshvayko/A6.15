const numDivs = 36;
const maxHits = 10;

let hits = 0;
let bedHits = -1;
let firstHitTime = 0;
let missedCell = null;
function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый (сделал)

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером (сделал)
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime (сделал)
  if (hits === 1){
    firstHitTime = getTimestamp();
  }else if(hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала (сделал)
  $(".grid-wrapper").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-score").text(maxHits+bedHits+1);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? (сделал)
  if (missedCell) {
    missedCell.removeClass('miss');
    missedCell.text('');
    missedCell = null;
  }
  
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");
    $(event.target).text("");
    hits = hits + 1;
    round();
  }
  else if($(event.target).hasClass("grid-item")){
      missedCell = $(event.target);
      missedCell.addClass("miss");
      missedCell.text(bedHits);
      bedHits = bedHits - 1;
  }
  // hits = hits + 1;
  // round();
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss (сделал)
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    $(".cont1").removeClass("d-none");
    $(".cont2").addClass("d-none");
  });

  round();
  $(".grid-item").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
