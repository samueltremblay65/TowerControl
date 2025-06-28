const game_map = new Image();
game_map.src = "map.png";

const airplane = new Image();
airplane.src = "airplane.png";

let canvas = document.getElementById("canvas");
let game_container = document.getElementById("map_container");
let ctx = canvas.getContext("2d");

const FPS = 20;
const WORLD_MARGIN = 80;

const planes = [];
let plane_creation_time = 10000;

let mouse_position;
let selected = null; 

game_map.onload = function() {
    // Controls
    document.addEventListener("mousemove", event => {
        mouse_position = getMousePos(canvas, event);
    });

    document.addEventListener("click", event => {
        const pos = getMousePos(canvas, event);

        const mouse_point = new Point(pos.x, pos.y);

        planes.forEach(plane => {
            const PLANE_SELECT_MARGIN = 20;
            if(plane.location.distanceTo(mouse_point) < PLANE_SELECT_MARGIN) {
                if(selected == plane) selected = null;
                else selected = plane;
            }
        });
    })

    // GameLoop
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        planeMovement();

        planeSelectionOutline();

        if(mouse_position != null && selected != null) mouseTracker();
        
    }, 1000 / FPS);

    // Plane creation
    const planeCreation = setInterval(function() {
        const x = Math.round(Math.random() * (canvas.width - WORLD_MARGIN)) + WORLD_MARGIN / 2;
        const y = Math.round(Math.random() * (canvas.height - WORLD_MARGIN)) + WORLD_MARGIN / 2;
        const plane = new Plane(x, y);
        planes.push(plane);
    }, plane_creation_time);
}

function planeMovement() {
    planes.forEach(plane => {
        // Plane movement
        plane.location.x += Math.cos(plane.orientation) * plane.speed / FPS;
        plane.location.y += Math.sin(plane.orientation) * plane.speed / FPS;

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
    ctx.drawImage(game_map, 0, 0, 1500, 800, 0, 0, canvas.width, canvas.height);

}

// Draw plane
function draw_plane(plane) {
	ctx.save(); 
 
	ctx.translate(plane.location.x, plane.location.y);
 
	ctx.rotate(plane.orientation + Math.PI / 2);
 
	ctx.drawImage(airplane, 0, 0, 2000, 2000, -32, -32, 64, 64);

	ctx.restore();
}

function planeSelectionOutline() {
    if(selected == null) return;

    ctx.beginPath();
    ctx.arc(selected.location.x, selected.location.y, 36, 0, 2 * Math.PI);
    ctx.stroke();
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}