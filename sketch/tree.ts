class Tree {

    private readonly yDistance = 200;
    private readonly xDistance = 200;

    draw(): void {
        push();
        fill(color(255, 0, 0));
        for (let yPoint = this.yDistance; yPoint < height; yPoint+=this.yDistance) {

            for (let xPoint = this.xDistance; xPoint < width; xPoint+=this.xDistance) {
                circle(xPoint, yPoint, 5);
            }

        }
        pop();
    }
}