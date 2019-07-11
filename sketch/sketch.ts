/*
function setup() {
    createCanvas(windowWidth, windowHeight)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
*/

function setup() {
    createCanvas(1000, 1000);
    background(0);
    new Grid(10, 10).draw();
    new Tree().draw();
}

function draw() {
}