var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
    //    console.log(JSON.parse(xhttp.responseText)["val1"]);
    }
};
xhttp.open("GET", "/api", true);
xhttp.send();

alert()