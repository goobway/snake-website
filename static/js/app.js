(function (window, document, drawModule, undefined) {

  var btn = document.getElementById('btn');
  btn.addEventListener("click", function () { drawModule.init(); });

  document.onkeydown = function (event) {

    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {

      case 37:
        if (direction != 'right') {
          direction = 'left';
        }
        console.log('left');
        break;
      case 65: //a
        if (direction != 'right') {
          direction = 'left';
        }
        console.log('left');
        break;

      case 39:
        if (direction != 'left') {
          direction = 'right';
          console.log('right');
        }
        break;
      case 68: //d
        if (direction != 'left') {
          direction = 'right';
          console.log('right');
        }
        break;

      case 38:
        if (direction != 'down') {
          direction = 'up';
          console.log('up');
        }
        break;
      case 87: //w
        if (direction != 'down') {
          direction = 'up';
          console.log('up');
        }
        break;

      case 40:
        if (direction != 'up') {
          direction = 'down';
          console.log('down');
        }
        break;
      case 83: //s
        if (direction != 'up') {
          direction = 'down';
          console.log('down');
        }
        break;
    }
  }

  // Request scores from server (server will get scores from mongodb)
  const Http = new XMLHttpRequest();
  const getUrl = window.location.origin + '/scores';
  Http.responseType = "json";
  Http.open('GET', getUrl, true);
  Http.send(null);

  console.log('GET ' + getUrl);

  Http.onload = (e) => {
    console.log(Http.response);

    let scores = Http.response;

      // Populate the html table
      let scoreTable = document.getElementById('scoreTable');

      for (let i = 0; i < scores.length; i++) {
        let row = scoreTable.insertRow(-1);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = scores[i]._id;
        row.insertCell(2).innerHTML = scores[i].value;
      }
  }

})(window, document, drawModule);