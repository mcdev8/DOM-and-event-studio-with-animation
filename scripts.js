// import { TweenMax } from "gsap";

window.addEventListener('DOMContentLoaded', () => {
  // Write your JavaScript code here.
  // Remember to pay attention to page loading!

  const rocket = document.getElementById("rocket");
  const takeOff = document.getElementById("takeoff");
  const landing = document.getElementById("landing");
  const missionAbort = document.getElementById("missionAbort");
  const flightStatus = document.getElementById("flightStatus");
  const shuttleBackground = document.getElementById("shuttleBackground");
  const spaceShuttleHeight = document.getElementById("spaceShuttleHeight");
  let horizontalPosition = 50; // This assumes the CSS starting position is "right: calc(50% - 37px)" 
  let takeOfBool = false;

  TweenMax.set(document.body, { filter: "blur(1rem)" });
  TweenMax.to(document.body, 1.0, { filter: "blur(0rem)" });

  const handleTakeOffClickEvent = () => {
    if (!takeOfBool) {
      takeOfBool = true;
      const confirm = window.confirm("Confirm that the shuttle is ready for takeoff.");
      if (confirm) {
        takeOffSequence();
        up();
      }
    }
  };

  const takeOffSequence = () => {
    flightStatus.innerText = "Shuttle in flight";
    // shuttleBackground.classList.add("shuttleInFlight");"
    // shuttleBackground.style.backgroundColor = "rgb(124, 179, 200)"
    TweenMax.to(shuttleBackground, 2.0, { backgroundColor: "rgb(124, 179, 200)" });
    const currentHeight = Number(spaceShuttleHeight.innerText); // TODO: add exception handling
    // spaceShuttleHeight.innerText = currentHeight + 10000; // Handled in "up"
  }

  const handleLandClickEvent = () => {
    takeOfBool = false;
    window.alert("The shuttle is landing. Landing gear engaged.");
    flightStatus.innerText = "The shuttle has landed.";
    // shuttleBackground.classList.remove("shuttleInFlight");
    TweenMax.to(shuttleBackground, 1.0, { backgroundColor: "rgb(109, 175, 102)" });
    spaceShuttleHeight.innerText = 0;
    moveRocketToStartingPosition();
  }

  const handlMissionAbortClickEvent = () => {
    const confirm = window.confirm("Confirm that you want to abort the mission.");
    if (confirm) {
      takeOfBool = false;
      flightStatus.innerText = "Mission aborted.";
      // shuttleBackground.classList.remove("shuttleInFlight");
      TweenMax.to(shuttleBackground, 1.0, { backgroundColor: "rgb(109, 175, 102)" });
      spaceShuttleHeight.innerText = 0;
      moveRocketToStartingPosition();
    }
  }

  // TODO: refactor pixelValueToInt()
  const pixelValueToInt = pixelValue => {
    pixelValue = pixelValue.split('');
    pixelValue.pop();
    pixelValue.pop();
    return Number(pixelValue.join(''));
  }
  const intToPixelValue = int => String(int) + "px";

  const moveRocketToStartingPosition = () => {
    rocket.style.bottom = 0;
    horizontalPosition = 50; // reset to original value;
    const calculatedPosition = "calc(" + (horizontalPosition) + "% - 37px)";
    rocket.style.right = calculatedPosition;
  }

  const up = () => {
    if (!takeOfBool) {
      takeOffSequence();
      takeOfBool = true;
    }
    const windowHeight = getComputedStyle(shuttleBackground).height;
    const bottomValue = pixelValueToInt(getComputedStyle(rocket).bottom);
    const calculatedHeight = (bottomValue + 50) % (pixelValueToInt(windowHeight) - 20);
    console.log(calculatedHeight)
    // rocket.style.bottom = intToPixelValue(calculatedHeight);
    TweenMax.to(rocket, 0.7, { ease: Back.easeIn.config(1.7), bottom: intToPixelValue(calculatedHeight) });
    console.log("Up pressed");
    const currentHeight = Number(spaceShuttleHeight.innerText); // TODO: add exception handling
    spaceShuttleHeight.innerText = currentHeight + 10000;
  };

  const down = () => {
    const bottomValue = pixelValueToInt(getComputedStyle(rocket).bottom);
    if (bottomValue - 50 >= 0) {
      // rocket.style.bottom = intToPixelValue((bottomValue - 10));
      TweenMax.to(rocket, 0.7, { bottom: intToPixelValue((bottomValue - 50)) });
    }
    console.log("Down pressed");
    const currentHeight = Number(spaceShuttleHeight.innerText); // TODO: add exception handling
    if (currentHeight <= 10000 && currentHeight !== 0) handleLandClickEvent();
    spaceShuttleHeight.innerText = (currentHeight >= 10000) ? currentHeight - 10000 : 0;
  }

  const right = () => {
    horizontalPosition = ((horizontalPosition - 5) >= 0) ? horizontalPosition - 5 : 100;
    const calculatedPosition = "calc(" + (horizontalPosition) + "% - 37px)";
    TweenMax.to(rocket, 0.3, { right: calculatedPosition });
    TweenMax.to(rocket, 0.3, { transform: "rotate(10deg)" });
    TweenMax.to(rocket, 0.5, { delay: 0.5, transform: "rotate(0deg)" });
    // rocket.style.right = calculatedPosition;
    console.log("Right pressed");
  }

  const left = () => {
    console.log({ horizontalPosition })
    horizontalPosition = ((horizontalPosition + 5) <= 100) ? (horizontalPosition + 5) : 0;
    const calculatedPosition = "calc(" + (horizontalPosition) + "% - 37px)";
    // rocket.style.right = calculatedPosition;
    TweenMax.to(rocket, 0.3, { transform: "rotate(-10deg)" });
    TweenMax.to(rocket, 0.5, { delay: 0.5, transform: "rotate(0deg)" });
    TweenMax.to(rocket, 0.3, { right: calculatedPosition });
  }

  const arrowKeyEvent = event => {
    switch (event.key) {
      case "ArrowLeft":
        left();
        break;
      case "ArrowRight":
        right();
        break;
      case "ArrowUp":
        up();
        break;
      case "ArrowDown":
        down();
        break;
    }
  }

  document.addEventListener("keydown", arrowKeyEvent);
  takeOff.addEventListener("click", handleTakeOffClickEvent);
  landing.addEventListener("click", handleLandClickEvent);
  missionAbort.addEventListener("click", handlMissionAbortClickEvent);
});