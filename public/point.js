class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(point) {
        let distance = Math.sqrt(Math.abs(this.x - point.x) ** 2 + Math.abs(this.y - point.y) ** 2);
        return distance;
    }
}