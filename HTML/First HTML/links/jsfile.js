function init() {
    var h1tags = document.getElementsByTagName("h1");

    //for the very firdt h1 tag
    h1tags[0].onclick = changeColor;
}

function changeColor() {
    this.innerHTML = "The Tale of the Three Brothers";
    var randomcolor = '#' + Math.floor(Math.random() * 16666215).toString(16);
    this.style.color = randomcolor;
}

onload = init;