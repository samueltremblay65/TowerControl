const game_map = new Image();
game_map.src = "Europe.png";

const airplane = new Image();
airplane.src = "airplane.png";

const icon_france = new Image();
icon_france.src = "icons/france.png";

const icon_italy = new Image();
icon_italy.src = "icons/italy.png";

const icon_spain = new Image();
icon_spain.src = "icons/spain.png";

const icon_iceland = new Image();
icon_iceland.src = "icons/iceland.png";

const icon_belgium = new Image();
icon_belgium.src = "icons/belgium.png";

const icon_czech = new Image();
icon_czech.src = "icons/czech_republic.png";

const icon_denmark = new Image();
icon_denmark.src = "icons/denmark.png";

const icon_portugal = new Image();
icon_portugal.src = "icons/portugal.png";

const icon_germany = new Image();
icon_germany.src= "icons/germany.png";

const icon_uk = new Image();
icon_uk.src = "icons/uk.png";

const icon_netherlands = new Image();
icon_netherlands.src = "icons/netherlands.png";

const icon_norway = new Image();
icon_norway.src = "icons/norway.png";

const icon_romania = new Image();
icon_romania.src = "icons/romania.png";

const icon_sweden = new Image();
icon_sweden.src = "icons/sweden.png";

const icon_switzerland = new Image();
icon_switzerland.src = "icons/switzerland.png";

const icon_ukraine = new Image();
icon_ukraine.src = "icons/ukraine.png";

const icon_greece = new Image();
icon_greece.src = "icons/greece.png";

const icon_poland = new Image();
icon_poland.src = "icons/poland.png";

const icon_russia = new Image();
icon_russia.src = "icons/russia.png";

const icon_turkey = new Image();
icon_turkey.src = "icons/turkey.png";

const icon_albania = new Image();
icon_albania.src = "icons/albania.png";
const albania = {location: new Point(642, 992), flag: icon_albania};

const icon_serbia = new Image();
icon_serbia.src = "icons/serbia.png";
const serbia = {location: new Point(652, 897), flag: icon_serbia};

const icon_slovakia = new Image();
icon_slovakia.src = "icons/slovakia.png";
const slovakia = {location: new Point(606, 751), flag: icon_slovakia};

const icon_slovenia = new Image();
icon_slovenia.src = "icons/slovenia.png";
const slovenia = {location: new Point(526, 849), flag: icon_slovenia};

const icon_andorra = new Image();
icon_andorra.src = "icons/andorra.png";
const andorra = {location: new Point(264, 948), flag: icon_andorra};

const icon_bulgaria = new Image();
icon_bulgaria.src = "icons/bulgaria.png";
const bulgaria = {location: new Point(721, 939), flag: icon_bulgaria};

const icon_austria = new Image();
icon_austria.src = "icons/austria.png";
const austria = {location: new Point(526, 799), flag: icon_austria};

const icon_croatia = new Image();
icon_croatia.src = "icons/croatia.png";
const croatia = {location: new Point(548, 874), flag: icon_croatia};

const icon_estonia = new Image();
icon_estonia.src = "icons/estonia.png";
const estonia = {location: new Point(657, 415), flag: icon_estonia};

const icon_finland = new Image();
icon_finland.src = "icons/finland.png";
const finland = {location: new Point(638, 327), flag: icon_finland};

const icon_georgia = new Image();
icon_georgia.src = "icons/georgia.png";
const georgia = {location: new Point(1091, 803), flag: icon_georgia};

const icon_hungary = new Image();
icon_hungary.src = "icons/hungary.png";
const hungary = {location: new Point(613, 808), flag: icon_hungary};

const icon_ireland = new Image();
icon_ireland.src = "icons/ireland.png";
const ireland = {location: new Point(144, 589), flag: icon_ireland};

const icon_kosovo = new Image();
icon_kosovo.src = "icons/kosovo.png";
const kosovo = {location: new Point(656, 948), flag: icon_kosovo};

const icon_latvia = new Image();
icon_latvia.src = "icons/latvia.png";
const latvia = {location: new Point(650, 476), flag: icon_latvia};

const icon_lithuania = new Image();
icon_lithuania.src = "icons/lithuania.png";
const lithuania = {location: new Point(657, 532), flag: icon_lithuania};

const icon_luxembourg = new Image();
icon_luxembourg.src = "icons/luxembourg.png";
const luxembourg = {location: new Point(368, 734), flag: icon_luxembourg};

const icon_macedonia = new Image();
icon_macedonia.src = "icons/macedonia.png";
const macedonia = {location: new Point(679, 975), flag: icon_macedonia};

const icon_moldova = new Image();
icon_moldova.src = "icons/moldova.png";
const moldova = {location: new Point(782, 765), flag: icon_moldova};

const icon_bosnia = new Image();
icon_bosnia.src = "icons/bosnia.png";
const bosnia = {location: new Point(597, 907), flag: icon_bosnia};

const icon_montenegro = new Image();
icon_montenegro.src = "icons/montenegro.png";
const montenegro = {location: new Point(623, 941), flag: icon_montenegro};

let canvas = document.getElementById("canvas");
let game_container = document.getElementById("map_container");
let ctx = canvas.getContext("2d");

let modal_shown = false;

const FPS = 20;
const WORLD_MARGIN = 100;

const PLANE_SIZE = 64;

const COLLISION_RADIUS = PLANE_SIZE / 2 - 4;

const TRAIL_GRANULARITY = 50;

const planes = [];

let plane_creation_time = 1000;

let score = 0;
let plane_interval = 10;
let interval_counter = 0;

let mouse_position;

let controls_state = "none";
let mouse_down = false;

let trail = [];

let selected = null; 

let game_over = false;

const iceland = {location: new Point(100, 180), flag: icon_iceland};
const italy = {location: new Point(500, 985), flag: icon_italy};
const france = {location: new Point(330, 784), flag: icon_france};
const spain = {location: new Point(152, 997), flag: icon_spain};
const denmark = {location: new Point(430, 600), flag: icon_denmark};
const belgium = {location: new Point(346, 700), flag: icon_belgium};
const czech = {location: new Point(552, 731), flag: icon_czech};
const portugal = {location: new Point(49, 1008), flag: icon_portugal};
const uk = {location: new Point(242, 574), flag: icon_uk};
const germany = {location: new Point(430, 674), flag: icon_germany};
const switzerland = {location: new Point(397, 821), flag: icon_switzerland};
const netherlands = {location: new Point(355, 657), flag: icon_netherlands};
const greece = {location: new Point(709, 1061), flag: icon_greece};
const poland = {location: new Point(600, 635), flag: icon_poland};
const romania = {location: new Point(746, 847), flag: icon_romania};
const norway = {location: new Point(437, 380), flag: icon_norway};
const russia = {location: new Point(902, 437), flag: icon_russia};
const turkey = {location: new Point(868, 950), flag: icon_turkey};
const sweden = {location: new Point(524, 421), flag: icon_sweden};
const ukraine = {location: new Point(818, 645), flag: icon_ukraine};

const DESTINATIONS = [iceland, italy, france, spain, denmark, belgium, czech, uk, portugal, germany, switzerland,
    netherlands, poland, romania, norway, russia, turkey, greece, sweden, ukraine, albania, andorra, austria, bulgaria,
    croatia, estonia, finland, georgia, hungary, ireland, kosovo, latvia, lithuania, luxembourg, macedonia, moldova,
    slovenia, slovakia, serbia, bosnia, montenegro
];

game_map.onload = function() {
    // Controls
    document.addEventListener("mousemove", event => {
        // Track position of mouse on canvas
        mouse_position = getMousePos(canvas, event);

        if(controls_state == "trail" && mouse_down) {
            const mouse_point = new Point(mouse_position.x, mouse_position.y);
            if(trail.length == 0) trail.push(mouse_point);

            if(mouse_point.distanceTo(trail[trail.length-1]) > TRAIL_GRANULARITY) {
                trail.push(mouse_point);
                selected.trail = trail;
            }
        }
    });

    document.getElementById("play_again").addEventListener("click", function() {
        score = 0;
        planes.splice(0, planes.length);
        hideGameOverDialog();
        game_over = false;
    });

    document.getElementById("btn_pause").addEventListener("click", function() {
        if(modal_shown) return;
        game_over = !game_over;
        if(game_over) document.getElementById("btn_pause").innerHTML = "▷";
        else document.getElementById("btn_pause").innerHTML = "⏸︎";

    });

    document.addEventListener("mousedown", event => {
        mouse_down = true;
        if(controls_state == "trail_ready") {
            controls_state = "trail";
            console.log("Trailing");
        }
    });

    document.addEventListener("mouseup", event => {
        if(controls_state == "trail") {
            // Give trail to selected plane
            console.log("Trail finished");
            controls_state = "none";
            trail = [];
        }

        // Plane selection logic
        const pos = getMousePos(canvas, event);
        console.log(`new Point(${pos.x}, ${pos.y})`);

        const mouse_point = new Point(pos.x, pos.y);

        selected = null;

        // If user clicks on plane, select that plane
        planes.forEach(plane => {
            const PLANE_SELECT_MARGIN = 20;

            if(plane.location.distanceTo(mouse_point) < PLANE_SELECT_MARGIN) {
                selected = plane;
                controls_state = "trail_ready";
                plane.trail = [];
            }
        });

        mouse_down = false;
    });

    createPlane();

    // GameLoop
    const gameLoop = setInterval(function() {
        if(game_over) return;
        
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
        if(game_over) return;

        if(interval_counter++ == plane_interval) {
            createPlane();
            interval_counter = 0;
        }


        if(score % 5 == 0 && plane_interval > 3 ) plane_interval--;

        if(planes.length == 0) createPlane();
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

        // If plane has trail
        if(plane.trail.length != 0) {
            const aim = plane.trail[0];

            const x = aim.x - plane.location.x;
            const y = aim.y - plane.location.y;

            let orientation = Math.atan(y/x);

            if(x < 0) orientation = orientation + Math.PI;

            plane.orientation = orientation;

            if(plane.location.distanceTo(aim) < 20) plane.trail.shift();
        }
        
        // Autopilot
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
    if(controls_state == "trail") {
        return;
    }
    
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

    plane.trail.forEach(point => {
        ctx.beginPath();
        const radius = 5;
        const startAngle = 0;
        const endAngle = 2 * Math.PI;
        ctx.fillStyle = "white";

        ctx.arc(point.x, point.y, radius, startAngle, endAngle);
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = "black";
    });
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
    document.getElementById("game_over_modal").style.visibility = "visible";
    document.getElementById("score").innerHTML = score;
    modal_shown = true;
}

function hideGameOverDialog() {
    document.getElementById("game_over_modal").style.visibility = "hidden";
    document.getElementById("score").innerHTML = "Score: " + score;
}