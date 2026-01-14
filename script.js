const pet = {
  hunger: 50,
  energy: 50,
  happiness: 50,
  sang: 0,
  achievements: [],
  secretRevealed: false
};

const achievements = [
  { id: "firstSong", text: "🎶 Primeira música cantada", check: () => pet.sang >= 1 },
  { id: "popStar", text: "⭐ Pop Star (cantou 5 vezes)", check: () => pet.sang >= 5 },
  { id: "trueLove", text: "❤️ Segredo revelado", check: () => pet.secretRevealed }
];

const hungerEl = document.getElementById("hunger");
const energyEl = document.getElementById("energy");
const happinessEl = document.getElementById("happiness");
const petImg = document.getElementById("pet");
const secretBtn = document.getElementById("secretBtn");
const thought = document.getElementById("thought");
const achievementList = document.getElementById("achievementList");

function clamp(v) {
  return Math.max(0, Math.min(100, v));
}

function animate() {
  petImg.classList.add("animate");
  setTimeout(() => petImg.classList.remove("animate"), 300);
}

function render() {
  hungerEl.textContent = pet.hunger;
  energyEl.textContent = pet.energy;
  happinessEl.textContent = pet.happiness;

  if (
    pet.happiness >= 80 &&
    pet.sang >= 3 &&
    !pet.secretRevealed
  ) {
    secretBtn.classList.remove("hidden");
  } else {
    secretBtn.classList.add("hidden");
  }

  renderAchievements();
}

function feed() {
  pet.hunger = clamp(pet.hunger - 20);
  pet.happiness = clamp(pet.happiness + 5);
  animate();
  save();
  render();
}

function sleep() {
  pet.energy = clamp(pet.energy + 25);
  pet.hunger = clamp(pet.hunger + 10);
  animate();
  save();
  render();
}

function sing() {
  pet.happiness = clamp(pet.happiness + 20);
  pet.energy = clamp(pet.energy - 10);
  pet.hunger = clamp(pet.hunger + 5);
  pet.sang++;
  animate();
  save();
  render();
}

function secret() {
  thought.classList.remove("hidden");
  pet.secretRevealed = true;
  secretBtn.classList.add("hidden");
  save();

  setTimeout(() => {
    thought.classList.add("hidden");
  }, 4000);
}

function renderAchievements() {
  achievementList.innerHTML = "";
  achievements.forEach(a => {
    if (a.check() && !pet.achievements.includes(a.id)) {
      pet.achievements.push(a.id);
      save();
    }
    if (pet.achievements.includes(a.id)) {
      const li = document.createElement("li");
      li.textContent = a.text;
      achievementList.appendChild(li);
    }
  });
}

function save() {
  localStorage.setItem("redEraPet", JSON.stringify(pet));
}

function load() {
  const data = localStorage.getItem("redEraPet");
  if (data) Object.assign(pet, JSON.parse(data));
}

setInterval(() => {
  pet.hunger = clamp(pet.hunger + 1);
  pet.energy = clamp(pet.energy - 1);
  save();
  render();
}, 5000);

window.onload = () => {
  load();
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    render();
  }, 2000);
};
