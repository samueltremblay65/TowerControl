class Plane {
    constructor(x, y) {
        this.location = new Point(x, y);
        this.orientation = -Math.PI/2;
        this.speed = 50;
        this.path = [];
        this.path_state = 0;
    }



    distanceTo(point) {
        let distance = Math.sqrt(Math.abs(this.x - point.x) ** 2 + Math.abs(this.y - point.y) ** 2);
        return distance;
    }
}