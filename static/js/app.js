(function (window, document, drawModule, undefined) {

  var btn = document.getElementById('btn');
  btn.addEventListener("click", function () { drawModule.init(); });

  document.onkeydown = function (event) {

    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    var keyMaps = {
      37: 'left',
      65: 'left',
      39: 'right',
      68: 'right',
      38: 'up',
      87: 'up',
      40: 'right',
      83: 'right',      
    }

    if (keyMaps[keyCode] !== undefined) direction = keyMaps[keyCode]

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