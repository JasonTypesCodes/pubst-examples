(function() {
  const greenButton = document.getElementById('pick-green');
  const noColor = document.querySelector('.no-color');
  const greenOn = document.querySelector('.green-on');
  const greenOff = document.querySelector('.green-off');

  const chosenColor = document.querySelector('.chosen-color');

  greenButton.onclick = function() {
    pubst.publish('COLOR', 'green');
  };

  pubst.subscribe('COLOR', function(color) {
    if (color === 'NONE') {
      noColor.style.display = 'block';
      greenOn.style.display = 'none';
      greenOff.style.display = 'none';
    } else if (color === 'green') {
      noColor.style.display = 'none';
      greenOn.style.display = 'block';
      greenOff.style.display = 'none';
    } else {
      noColor.style.display = 'none';
      greenOn.style.display = 'none';
      greenOff.style.display = 'block';

      chosenColor.innerHTML = '<span style="color: ' + color + '">' + color.toUpperCase() + '</span>';
    }
  }, 'NONE');
})();