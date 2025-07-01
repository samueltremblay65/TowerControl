class Plane {
    constructor(x, y, destination) {
        this.location = new Point(x, y);
        this.orientation = Math.random() * 2 * Math.PI;
        this.speed = 50;
        this.trail = [];
        this.path_state = 0;
        this.destination = destination;
    }
}