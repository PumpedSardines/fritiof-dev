const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const animateCharacters = async () => {
  const heroTitle = document.querySelector(".hero h1");
  const chars = heroTitle.querySelectorAll("span:not(.flower-cont)");

  for (const char of chars) {
    char.classList.add("animate");
    await sleep(50);
  }
};

const animateFlowers = async () => {
  await sleep(300);
  const flowers = document.querySelectorAll(".hero .flower");

  for (const flower of flowers) {
    flower.classList.add("animate");
    await sleep(100);
  }
};

const animateParagraph = async () => {
  await sleep(300);
  const p = document.querySelector(".hero p");
  p.classList.add("animate");
};

const animateButtons = async () => {
  await sleep(400);
  const buttons = document.querySelectorAll(".hero .button");

  for (const button of buttons) {
    button.classList.add("animate");
    await sleep(100);
  }
};

const animateWiggle = async () => {
  await sleep(600);
  const wiggles = document.querySelectorAll(".hero #hero-svg-box img");

  for (const wiggle of wiggles) {
    wiggle.classList.add("animate");
    await sleep(200);
  }
};

setTimeout(() => {
  window.requestAnimationFrame(() => {
    setTimeout(async () => {
      document.body.classList.remove("disable-transition");
      animateCharacters();
      animateFlowers();
      animateParagraph();
      animateButtons();
      animateWiggle();
    }, 0);
  });
}, 0);
