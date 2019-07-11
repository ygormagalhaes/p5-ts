class Grid {
    constructor(private xDistance: number, private yDistance: number) { }

    @pushPop()
    draw(): void {
        strokeWeight(1);
        stroke(color(0, 255, 0, 10));
        this.drawVerticalLines();
        this.drawHorizontalLines();
    }

    private drawVerticalLines() {
        for (let xPoint = this.xDistance; xPoint < width; xPoint += this.xDistance) {
            line(xPoint, 0, xPoint, height);
        }
    }

    private drawHorizontalLines() {
        for (let yPoint = this.yDistance; yPoint < height; yPoint += this.yDistance) {
            line(0, yPoint, width, yPoint);
        }
    }
}
