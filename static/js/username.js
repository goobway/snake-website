(function (window, document) {

    document.getElementById("submit_btn").addEventListener("click", () => {
        let username = document.getElementById("user_input").value
        window.location = "/play?user=" + username; 
    });

})(window, document);