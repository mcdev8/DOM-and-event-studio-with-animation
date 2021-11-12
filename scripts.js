window.addEventListener('DOMContentLoaded', () => {
    // shuttle location:
    let height = 0;
    let left = 0;
    // HTML Elements:
    const rocket = document.getElementById("rocket");
    const takeOffButton = document.getElementById("takeoff");
    const flightStatus = document.getElementById("flightStatus");
    const shuttleBackground = document.getElementById("shuttleBackground");
    const spaceShuttleHeight = document.getElementById("spaceShuttleHeight");
    const landingButton = document.getElementById("landing");
    const missionAbortButton = document.getElementById("missionAbort");
    const upButton = document.getElementById("upControl");
    const downButton = document.getElementById("downControl");
    const rightButton = document.getElementById("rightControl");
    const leftButton = document.getElementById("leftControl");

    // Event Listeners:
    takeOffButton.addEventListener('click', () => {
        const flightConfirmation = window.confirm("Confirm that the shuttle is ready for takeoff.");
        if (flightConfirmation) {
            flightStatus.innerText = "Shuttle in flight.";
            shuttleBackground.style.backgroundColor = "blue";
            height += 10000
            spaceShuttleHeight.innerText = height;
        }
    });
    landingButton.addEventListener('click', function () {
        window.alert("The shuttle is landing. Landing gear engaged.");
        height = 0;
        spaceShuttleHeight.innerText = height;
        shuttleBackground.style.backgroundColor = "green";
        returnToOriginalPosition();
    });

    const missionAbortHandler = () => {
        const abortConfirmation = window.confirm("Confirm that you want to abort the mission.");
        if (abortConfirmation) {
            height = 0;
            spaceShuttleHeight.innerText = height;
            shuttleBackground.style.backgroundColor = "green";
            returnToOriginalPosition();
        }
    }
    missionAbortButton.addEventListener('click', missionAbortHandler);

    upButton.addEventListener('click', () => {
        height += 10000
        spaceShuttleHeight.innerText = height;
        rocket.style.bottom = `${height / 1000}px`;
    });
    downButton.addEventListener('click', () => {
        height -= 10000
        spaceShuttleHeight.innerText = height;
        rocket.style.bottom = `${height / 1000}px`;
    });

    leftButton.addEventListener('click', () => {
        left -= 10
        rocket.style.left = `${left}px`;
    });
    rightButton.addEventListener('click', () => {
        left += 10
        rocket.style.left = `${left}px`;
    });

    const returnToOriginalPosition = () => {
        rocket.style.left = "-23px";
        rocket.style.bottom = "-7px";
    }

});

// Keep the rocket from flying off of the background.
// Return the rocket to its original position on the background when it has been landed or the mission was aborted.