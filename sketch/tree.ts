class Tree {
    private readonly yDistance = 100;
    private readonly xDistance = 100;
    private readonly pointRadius = 5;
    private pointMap: {xPoint: number, yPoint: number}[][] = [];

    draw(): void {
        this.createPointMap();
        this.drawLines();
        this.drawPoints();
    }

    private createPointMap() {
        let line = 0;
        for (let yPoint = this.yDistance; yPoint < height; yPoint += this.yDistance, line++) {
            this.pointMap[line] = [];
            for (let xPoint = this.xDistance; xPoint < width; xPoint += this.xDistance) {
                this.pointMap[line].push({
                    xPoint: line % 2 === 0 ? xPoint : xPoint - this.xDistance / 2,
                    yPoint
                });
            }
            if (line % 2 !== 0) {
                this.pointMap[line].push({xPoint: width - this.xDistance / 2, yPoint});
            }
        }
    }

    @pushPop()
    private drawLines(): void {
        stroke(color(0, 0, 255, 10));
        this.pointMap.forEach(outerLine => {
            outerLine.forEach(point => {
                this.pointMap.forEach(innerLine => innerLine.forEach(secondPoint => {
                    line(point.xPoint, point.yPoint, secondPoint.xPoint, secondPoint.yPoint);
                }));
            });
        });
    }

    @pushPop()
    private drawPoints() {
        fill(color(255, 0, 0));
        this.pointMap.forEach(line => line.forEach(point => circle(point.xPoint, point.yPoint, this.pointRadius)));
    }
}
