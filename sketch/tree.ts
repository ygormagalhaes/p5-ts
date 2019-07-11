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
                this.pointMap[line].push(this.deviatePoint({ xPoint, yPoint }));
            }
        }
    }

    private deviatePoint(point: {xPoint: number, yPoint: number}) {
        return { xPoint: point.xPoint + (random(-20, 20)), yPoint: point.yPoint + (random(-20, 20)) };
    }

    @pushPop()
    private drawLines(): void {
        stroke(color(255, 100, 100, 10));
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
