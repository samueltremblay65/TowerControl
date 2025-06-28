const game_map = new Image();
game_map.src = "Europe.png";

const airplane = new Image();
airplane.src = "airplane.png";

const france = new Image();
france.src = "icon_france.png";

const italy = new Image();
italy.src = "icon_italy.png";

const spain = new Image();
spain.src = "icon_spain.png";

const iceland = new Image();
iceland.src = "icon_iceland.png";

let canvas = document.getElementById("canvas");
let game_container = document.getElementById("map_container");
let ctx = canvas.getContext("2d");

const FPS = 20;
const WORLD_MARGIN = 80;

const PLANE_SIZE = 64;

const COLLISION_RADIUS = PLANE_SIZE / 2 - 4;

const planes = [];
let plane_creation_time = 1000;

let score = 0;

let mouse_position;
let selected = null; 

let game_over = false;

const ICELAND = {location: new Point(100, 180), flag: iceland};
const ITALY = {location: new Point(500, 985), flag: italy};
const FRANCE = {location: new Point(330, 784), flag: france};
const SPAIN = {location: new Point(152, 997), flag: spain};

const DESTINATIONS = [ICELAND, ITALY, FRANCE, SPAIN];

game_map.onload = function() {
    // Controls
    document.addEventListener("mousemove", event => {
        // Track position of mouse on canvas
        mouse_position = getMousePos(canvas, event);
    });

    document.addEventListener("click", event => {
        // Plane selection logic
        const pos = getMousePos(canvas, event);

        // console.log(pos);

        const mouse_point = new Point(pos.x, pos.y);

        let hasSelected = false;

        // If user clicks on plane, select that plane
        planes.forEach(plane => {
            const PLANE_SELECT_MARGIN = 20;

            if(plane.location.distanceTo(mouse_point) < PLANE_SELECT_MARGIN) {
                selected = plane;
                hasSelected = true;
            }
        });

        if(!hasSelected){
            selected = null;
        }
    });

    createPlane();

    // GameLoop
    const gameLoop = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        showLandingZones();
        planeMovement();
        planeSelectionOutline();

        if(mouse_position != null && selected != null) mouseTracker();

        if(checkPlaneCollisions()) {
            game_over = true;
            showGameOverDialog();
        }

        const landed = checkLandings();

        landed.forEach(plane => {
            score++;
            if(selected == plane) selected = null;
        });
        
    }, 1000 / FPS);

    // Plane creation
    const planeCreation = setInterval(function() {
        const chance = Math.min(0.5, Math.round((1 + score / 5))/10);

        if(Math.random() < chance) createPlane();
    }, plane_creation_time);
}

function createPlane() {
    let too_close;
    do {
        too_close = false;
        const x = Math.round(Math.random() * (canvas.width - WORLD_MARGIN)) + WORLD_MARGIN / 2;
        const y = Math.round(Math.random() * (canvas.height - WORLD_MARGIN)) + WORLD_MARGIN / 2;
        const plane = new Plane(x, y, DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)]);

        planes.forEach(other_plane => {
            if(plane.location.distanceTo(other_plane.location) < 100) too_close = true;
        });

        if(!too_close) planes.push(plane);
    } while(too_close);
}

// Physics
function checkPlaneCollisions() {
    for(var i = 0; i < planes.length; i++) {
        for(var j = i + 1; j < planes.length; j++){
            if(isCollision(planes[i].location, planes[j].location, COLLISION_RADIUS)){
                if(selected == planes[i] || selected == planes[j]) selected = null;
                planes.splice(j, 1);
                planes.splice(i, 1);
                
                return true;
            }
        }
    }
    return false;
}

function isCollision(location1, location2, radius) {
    return location1.distanceTo(location2) < radius;
}

function checkLandings() {
    const landed = [];
    planes.forEach(plane =>{
        if(isCollision(plane.location, plane.destination.location, COLLISION_RADIUS)) {
            landed.push(plane);
        }
    });

    for(let i = planes.length - 1; i >= 0; i--) {
        if(landed.includes(planes[i])) {
            planes.splice(i, 1);
        }
    }
    return landed;
}

function planeMovement() {
    planes.forEach(plane => {
        // Plane movement
        plane.location.x += Math.cos(plane.orientation) * plane.speed / FPS;
        plane.location.y += Math.sin(plane.orientation) * plane.speed / FPS;

        if(plane.location.x < 0 - WORLD_MARGIN / 2) plane.location.x = canvas.width + WORLD_MARGIN / 2;
        if(plane.location.y < 0 - WORLD_MARGIN / 2) plane.location.y = canvas.height + WORLD_MARGIN / 2;

        if(plane.location.x > canvas.width + WORLD_MARGIN / 2) plane.location.x = 0 - WORLD_MARGIN / 2;
        if(plane.location.y > canvas.height + WORLD_MARGIN / 2) plane.location.y = 0 - WORLD_MARGIN / 2;

        draw_plane(plane);
    });
}

function mouseTracker() {
    const plane = selected;

    const x = mouse_position.x - plane.location.x;
    const y = mouse_position.y - plane.location.y;

    let orientation = Math.atan(y/x);

    if(x < 0) orientation = orientation + Math.PI;

    const mouse_point = new Point(mouse_position.x, mouse_position.y);
    const distance = plane.location.distanceTo(mouse_point);
    if(!(distance < 30)) plane.orientation = orientation;
}

// Drawing functions
function drawBackground() {
    ctx.drawImage(game_map, 0, 0, game_map.width, game_map.height, 0, 0, canvas.width, canvas.height);

}

// Draw plane
function draw_plane(plane) {
	ctx.save(); 
 
	ctx.translate(plane.location.x, plane.location.y);
 
	ctx.rotate(plane.orientation + Math.PI / 2);
 
	ctx.drawImage(airplane, 0, 0, airplane.width, airplane.height, -32, -32, PLANE_SIZE, PLANE_SIZE);

	ctx.restore();
}

function planeSelectionOutline() {
    if(selected == null) return;

    ctx.beginPath();
    ctx.arc(selected.location.x, selected.location.y, 36, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    const flag = selected.destination.flag;

    ctx.drawImage(flag, 0, 0, flag.width, flag.height, selected.location.x - 32, selected.location.y - 108, 64, 64);
}

function showLandingZones() {
    DESTINATIONS.forEach(destination => {
        ctx.beginPath();
        ctx.arc(destination.location.x, destination.location.y, 32, 0, 2 * Math.PI);
        ctx.stroke();
     });

}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

function showGameOverDialog() {
    console.log("Game over. Final score is " + score);
}