function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "sadem" && password === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Username or Password!");
    }

}