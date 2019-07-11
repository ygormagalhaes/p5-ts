var Grid = (function () {
    function Grid(xDistance, yDistance) {
        this.xDistance = xDistance;
        this.yDistance = yDistance;
    }
    Grid.prototype.draw = function () {
        push();
        strokeWeight(1);
        stroke(color(0, 255, 0, 10));
        this.drawVerticalLines();
        this.drawHorizontalLines();
        pop();
    };
    Grid.prototype.drawVerticalLines = function () {
        for (var xPoint = this.xDistance; xPoint < width; xPoint += this.xDistance) {
            line(xPoint, 0, xPoint, height);
        }
    };
    Grid.prototype.drawHorizontalLines = function () {
        for (var yPoint = this.yDistance; yPoint < height; yPoint += this.yDistance) {
            line(0, yPoint, width, yPoint);
        }
    };
    return Grid;
}());
var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function () {
        this.shapes = [];
        this.currentShape = 0;
        this.shapes.push({ points: Shapes.circle(100), color: color('#009CDF') });
        this.shapes.push({ points: Shapes.circle(150), color: color(255, 204, 0) });
        this.shapes.push({ points: Shapes.square(50), color: color(175, 100, 220) });
        this.morph = new Array();
        var highestCount = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            highestCount = Math.max(highestCount, this.shapes[i].points.length);
        }
        for (var i = 0; i < highestCount; i++) {
            this.morph.push(new p5.Vector());
        }
    };
    Morph.prototype.recalc = function () {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function () {
        this.recalc();
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        translate(width / 2, height / 2);
        strokeWeight(4);
        beginShape();
        noFill();
        stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(createVector(-size, y));
        }
        return points;
    };
    Shapes.star = function (x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            points.push(createVector(sx, sy));
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            points.push(createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
function setup() {
    createCanvas(1000, 1000);
    background(0);
    new Grid(10, 10).draw();
    new Tree().draw();
}
function draw() {
}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Tree = (function () {
    function Tree() {
        this.yDistance = 100;
        this.xDistance = 100;
        this.pointRadius = 5;
        this.pointMap = [];
    }
    Tree.prototype.draw = function () {
        this.createPointMap();
        this.drawLines();
        this.drawPoints();
    };
    Tree.prototype.createPointMap = function () {
        var line = 0;
        for (var yPoint = this.yDistance; yPoint < height; yPoint += this.yDistance, line++) {
            this.pointMap[line] = [];
            for (var xPoint = this.xDistance; xPoint < width; xPoint += this.xDistance) {
                this.pointMap[line].push(this.deviatePoint({ xPoint: xPoint, yPoint: yPoint }));
            }
        }
    };
    Tree.prototype.deviatePoint = function (point) {
        return { xPoint: point.xPoint + (random(-20, 20)), yPoint: point.yPoint + (random(-20, 20)) };
    };
    Tree.prototype.drawLines = function () {
        var _this = this;
        stroke(color(255, 100, 100, 10));
        this.pointMap.forEach(function (outerLine) {
            outerLine.forEach(function (point) {
                _this.pointMap.forEach(function (innerLine) { return innerLine.forEach(function (secondPoint) {
                    line(point.xPoint, point.yPoint, secondPoint.xPoint, secondPoint.yPoint);
                }); });
            });
        });
    };
    Tree.prototype.drawPoints = function () {
        var _this = this;
        fill(color(255, 0, 0));
        this.pointMap.forEach(function (line) { return line.forEach(function (point) { return circle(point.xPoint, point.yPoint, _this.pointRadius); }); });
    };
    __decorate([
        pushPop()
    ], Tree.prototype, "drawLines", null);
    __decorate([
        pushPop()
    ], Tree.prototype, "drawPoints", null);
    return Tree;
}());
function pushPop() {
    return function (target, key, propertyDescriptor) {
        var originalMethod = propertyDescriptor.value;
        propertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            push();
            var result = originalMethod.apply(this, args);
            pop();
            return result;
        };
        return propertyDescriptor;
    };
}
function randomColor(alpha) {
    return color(random(0, 255), random(0, 255), random(0, 255), alpha);
}
//# sourceMappingURL=build.js.map