var inputElement = document.getElementById('user_input');
var theirInput = '';
    inputElement.addEventListener('change', function(e) {
        theirInput = e.target.value;
    });