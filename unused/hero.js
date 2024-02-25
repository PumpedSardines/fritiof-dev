/**
 * This file renderer the cool hero canvas effect on the home page
 *
 * @author Fritiof Rusck <fritiof@rusck.se>
 * @date 24/02/2024
 */

/**
 * Returns a random point in a circle with a given radius
 * @param {number} radius - The radius of the circle
 * @returns An object with the angle and distance of the point
 */
function randomPointInCircle(radius) {
  while (true) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    if (x * x + y * y <= 1) {
      const angle = Math.atan2(y, x);
      const distance = Math.sqrt(x * x + y * y);
      return { angle, distance: distance * radius };
    }
  }
}

let animationFrameId;
const main = () => {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = (2 * window.innerWidth) / 3;
  const offsetY = canvas.height / 4;

  const amountOfBalls = ~~((5000 * canvas.width) / 1500);
  const minDistance = (50 * canvas.width) / 1500;
  const baseSpeed = (0.1 * canvas.width) / 1500;
  const baseRadius = (1 * canvas.width) / 1500;

  let balls = new Array(amountOfBalls).fill(0).map(() => {
    while (true) {
      const { angle, distance } = randomPointInCircle(canvas.width / 2 - 10);

      if (distance < minDistance) {
        continue;
      }

      return {
        r: Math.random() * baseRadius * 3 + baseRadius * 5,
        speed: Math.random() * baseSpeed * 1 + baseSpeed * 5,
        angle,
        distance,
        color: `hsl(${Math.random() * 360}, 50%, 50%)`,
      };
    }
  });

  const draw = () => {
    animationFrameId = window.requestAnimationFrame(draw);

    balls = balls.map((ball) => {
      const speed = ball.speed / ball.distance;
      ball.angle += speed;
      return ball;
    });

    ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    for (const ball of balls) {
      ctx.fillStyle = ball.color;
      ctx.lineCap = "round";

      const x = 2 * Math.cos(ball.angle) * ball.distance;
      const y = Math.sin(ball.angle) * ball.distance - offsetY;
      const r = ball.r;

      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2 + x,
        canvas.height / 2 + y,
        r,
        r,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  };

  draw();
};

// Load the content of the page when the DOM is ready
if (document.readyState === "interactive") {
  main();

  window.addEventListener("resize", () => {
    main();
  });
} else {
  window.addEventListener("DOMContentLoaded", () => {
    main();

    window.addEventListener("resize", () => {
      main();
    });
  });
}
