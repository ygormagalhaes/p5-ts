class Tree {

    private readonly yDistance = 100;
    private readonly xDistance = 100;
    private pointMap: any[][] = [];

    @pushPop()
    draw(): void {
        fill(color(255, 0, 0));
        let line = 0;
        for (let yPoint = this.yDistance; yPoint < height; yPoint+=this.yDistance, line++) {

            this.pointMap[line] = [];
            for (let xPoint = this.xDistance; xPoint < width; xPoint+=this.xDistance) {
                this.pointMap[line].push({xPoint, yPoint});
                circle(xPoint, yPoint, 10);
            }

        }
        this.drawLines();
    }

    @pushPop()
    private drawLines(): void {
        stroke(color(0, 255, 0, 10));
        this.pointMap.forEach(outerLine => {
            outerLine.forEach(point => {
                this.pointMap.forEach(innerLine => innerLine.forEach(secondPoint => line(point.xPoint, point.yPoint, secondPoint.xPoint, secondPoint.yPoint)));
            });
        });
    }
}
