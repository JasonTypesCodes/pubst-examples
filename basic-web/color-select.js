(function() {
  const colorSelect = document.getElementById('color-select');

  function publishColor() {
    pubst.publish('COLOR', colorSelect.value);
  }

  if (colorSelect.value !== '') {
    publishColor(colorSelect.value);
  }

  colorSelect.onchange = publishColor;

  function colorReceived(newColor) {
    if (newColor !== colorSelect.value) {
      colorSelect.value = newColor;
    }
  }

  pubst.subscribe('COLOR', colorReceived);
})();