const canvasElement = document.getElementById("canvas");
const canvasContainer = canvasElement.parentElement;
const canvasContext = canvasElement.getContext("2d");

const DEVICE_PIXEL_RATIO = Math.min(window.devicePixelRatio || 1, 2);

const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const resizeCanvas = () => {
  const rect = canvasContainer.getBoundingClientRect();

  canvasElement.width = rect.width * DEVICE_PIXEL_RATIO;
  canvasElement.height = rect.height * DEVICE_PIXEL_RATIO;

  canvasElement.style.width = `${rect.width}px`;
  canvasElement.style.height = `${rect.height}px`;

  canvasContext.setTransform(
    DEVICE_PIXEL_RATIO,
    0,
    0,
    DEVICE_PIXEL_RATIO,
    0,
    0,
  );
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.1)";
};

const resizeObserver = new ResizeObserver(() => {
  resizeCanvas();
});

let mouseCoords = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener("mousemove", (event) => {
  mouseCoords.x = event.clientX;
  mouseCoords.y = event.clientY;
});

resizeObserver.observe(canvasContainer);
window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});

const particlesArray = [];

class Particle {
  constructor(center, color, radius, orbitRadius) {
    this.center = center;

    this.orbitRadius = orbitRadius;

    this.color = color;
    this.radius = radius;

    this.angularVelocity = 0.05 + Math.random() * 0.08;
    this.angle = Math.random() * Math.PI * 2;

    // set an initial position so the first line segment has a valid start point
    this.position = {
      xPosition:
        this.center.xPosition + Math.cos(this.angle) * this.orbitRadius,
      yPosition:
        this.center.yPosition + Math.sin(this.angle) * this.orbitRadius,
    };

    this.lastMouse = {
      xPosition: center.xPosition,
      yPosition: center.yPosition,
    };
  }

  draw = (lastPoint) => {
    canvasContext.beginPath();

    canvasContext.strokeStyle = this.color;
    canvasContext.lineWidth = this.radius;
    canvasContext.lineCap = "round";

    canvasContext.moveTo(lastPoint.xPosition, lastPoint.yPosition);
    canvasContext.lineTo(this.position.xPosition, this.position.yPosition);

    canvasContext.stroke();
    canvasContext.closePath();
  };

  update = () => {
    const lastPoint = { ...this.position };

    this.angle += this.angularVelocity;
    this.lastMouse.xPosition +=
      (mouseCoords.x - this.lastMouse.xPosition) * 0.05;

    this.lastMouse.yPosition +=
      (mouseCoords.y - this.lastMouse.yPosition) * 0.05;

    this.position = {
      xPosition:
        this.lastMouse.xPosition + Math.cos(this.angle) * this.orbitRadius,
      yPosition:
        this.lastMouse.yPosition + Math.sin(this.angle) * this.orbitRadius,
    };

    this.draw(lastPoint);
  };
}

const COUNT = 50;

const PALETTES = [
  ["#ff3b30", "#ff6b35", "#ff9500", "#ffd166"], // Fire
  ["#ffe066", "#ffd43b", "#fcc419", "#fab005"], // Gold
  ["#4dabf7", "#339af0", "#228be6", "#74c0fc"], // Blue
  ["#69db7c", "#51cf66", "#40c057", "#8ce99a"], // Green
  ["#da77f2", "#cc5de8", "#be4bdb", "#e599f7"], // Purple
  ["#ff8787", "#ff6b6b", "#fa5252", "#ffb3b3"], // Red
];

const palettes = [...PALETTES].sort(() => Math.random() - 0.5).slice(0, 3);

function init() {
  particlesArray.length = 0;
  resizeCanvas();
  const rect = canvasContainer.getBoundingClientRect();

  for (let index = 0; index < COUNT; index++) {
    // Randomly choose one of the selected palettes
    const particlePalette =
      palettes[Math.floor(Math.random() * palettes.length)];
    // Then choose a color from that palette
    const color =
      particlePalette[Math.floor(Math.random() * particlePalette.length)];

    const radius = Math.random() * 2 + 1;

    particlesArray.push(
      new Particle(
        {
          xPosition: rect.width / 2,
          yPosition: rect.height / 2,
        },
        color,
        radius,
        randomIntFromRange(60, 200),
      ),
    );
  }
}

function animate() {
  requestAnimationFrame(animate);

  const rect = canvasContainer.getBoundingClientRect();
  canvasContext.fillStyle = "rgba(0, 0, 0, 0.1)";
  canvasContext.fillRect(0, 0, rect.width, rect.height);

  particlesArray.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
