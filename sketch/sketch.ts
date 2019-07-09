let morph: Morph;
function setup() {
    createCanvas(windowWidth, windowHeight)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    new Grid(20, 20).draw();
    new Tree().draw();
}