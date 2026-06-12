$(function () {

  var audio = document.getElementById('kankotriAudio');
  var $prompt = $('#audioPlayPrompt');
  var flowers = ['🌸', '🌺', '🏵️', '✿', '🌼', '💮'];
  var $shower = $('#flowerShower');

  // Falling flower animation
  function createFlower() {
    var $flower = $('<span class="falling-flower"></span>');
    var left = Math.random() * 100;
    var duration = 6 + Math.random() * 8;
    var delay = Math.random() * 2;
    var size = 14 + Math.random() * 18;
    var drift = -40 + Math.random() * 80;

    $flower.text(flowers[Math.floor(Math.random() * flowers.length)]);
    $flower.css({
      left: left + '%',
      fontSize: size + 'px',
      animationDuration: duration + 's',
      animationDelay: delay + 's',
      '--drift': drift + 'px'
    });

    $shower.append($flower);

    setTimeout(function () {
      $flower.remove();
    }, (duration + delay) * 1000 + 500);
  }

  function startFlowerShower() {
    for (var i = 0; i < 24; i++) {
      setTimeout(createFlower, i * 180);
    }
    setInterval(createFlower, 900);
  }

  startFlowerShower();
  $('.kankotri-card').addClass('show');

  function playAudio() {
    audio.volume = 1;
    var promise = audio.play();
    if (promise !== undefined) {
      promise.then(function () {
        $prompt.attr('hidden', true);
      }).catch(function () {
        $prompt.removeAttr('hidden');
      });
    }
  }

  // Try autoplay immediately when page opens
  playAudio();

  // Fallback: play on prompt click
  $prompt.on('click', function () {
    playAudio();
  });

  // Fallback: first tap anywhere on page starts audio
  $(document).one('click touchstart', function () {
    if (audio.paused) {
      playAudio();
    }
  });

});
