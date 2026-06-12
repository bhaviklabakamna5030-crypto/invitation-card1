/* ===== CUSTOMIZE THESE SETTINGS ===== */
var WEDDING_CONFIG = {
  date: '2026-06-29T09:00:00+05:30',
  whatsapp: '917623990791',
  videoPath: 'videos/couple-video.mp4'
};
/* ==================================== */

$(document).ready(function () {

  var weddingDate = new Date(WEDDING_CONFIG.date);
  var $video = $('#coupleVideo')[0];

  // Apply video path
  $('#coupleVideo source').attr('src', WEDDING_CONFIG.videoPath);
  $video.load();

  // Autoplay on page load (muted — required by browsers)
  function startVideo() {
    $video.muted = true;
    var playPromise = $video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // Autoplay blocked — show unmute button prominently
        $('#unmuteBtn').addClass('pulse');
      });
    }
  }

  startVideo();

  // Unmute / mute toggle
  $('#unmuteBtn').on('click', function () {
    $video.muted = !$video.muted;
    if (!$video.muted) {
      $video.play();
      $(this).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">' +
          '<path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>' +
        '</svg> Sound On'
      ).removeClass('pulse');
    } else {
      $(this).html(
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">' +
          '<path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>' +
        '</svg> Tap for Sound'
      );
    }
  });

  // Countdown
  function updateCountdown() {
    var now = new Date();
    var diff = weddingDate - now;

    if (diff <= 0) {
      $('#days, #hours, #minutes, #seconds').text('00');
      $('#countdownMessage').text('The big day is here! 🎉💍');
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    $('#days').text(pad(days));
    $('#hours').text(pad(hours));
    $('#minutes').text(pad(minutes));
    $('#seconds').text(pad(seconds));
    $('#countdownMessage').text('');
  }

  function pad(num) {
    return num < 10 ? '0' + num : String(num);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // RSVP WhatsApp
  var rsvpMsg = encodeURIComponent("Hello! I would like to RSVP for Bhavik & Mansi's wedding.");
  $('#rsvpBtn').attr('href', 'https://wa.me/' + WEDDING_CONFIG.whatsapp + '?text=' + rsvpMsg);

  // Scroll reveal animations
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    $('.reveal').each(function () {
      var el = this;
      revealObserver.observe(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        $(el).addClass('visible');
      }
    });
  } else {
    $('.reveal').addClass('visible');
  }

  // Flip animation on countdown seconds change
  var lastSeconds = $('#seconds').text();
  setInterval(function () {
    var current = $('#seconds').text();
    if (current !== lastSeconds) {
      $('#seconds').addClass('flip');
      setTimeout(function () { $('#seconds').removeClass('flip'); }, 400);
      lastSeconds = current;
    }
  }, 200);

});
