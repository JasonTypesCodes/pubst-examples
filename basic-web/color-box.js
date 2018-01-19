(function() {
  const colorBox = document.getElementById('color-box');

  pubst.subscribe('COLOR', function(color) {
    colorBox.style.backgroundColor = color;
  }, 'white');
})();