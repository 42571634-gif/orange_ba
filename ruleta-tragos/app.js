const cocktails = [
  { name: "Sol de Agave", short: "SOL DE AGAVE", color: "#f06428", calories: 115, note: "Tequila, Aperol y burbujas especiadas.", method: "Sirve con hielo y completa con ginger ale.", ingredients: [["Tequila", "30 ml"], ["Aperol", "20 ml"], ["Ginger ale", "60 ml"]] },
  { name: "Pisco Spritz", short: "PISCO SPRITZ", color: "#ef3f25", calories: 116, note: "Frutal, cítrico y ligeramente amargo.", method: "Sirve con hielo y remueve suavemente.", ingredients: [["Pisco", "30 ml"], ["Aperol", "20 ml"], ["Agua tónica", "60 ml"]] },
  { name: "Lima Mule", short: "LIMA MULE", color: "#f7b83c", calories: 127, note: "Pisco fresco con jengibre y especias.", method: "Construye directamente en un vaso con hielo.", ingredients: [["Pisco", "40 ml"], ["Ginger ale", "80 ml"], ["Angostura", "2 golpes"]] },
  { name: "Tinto Naranja", short: "TINTO NARANJA", color: "#8b2e42", calories: 132, note: "Vino profundo con naranja y un final herbal.", method: "Remueve con hielo hasta enfriar.", ingredients: [["Vino", "70 ml"], ["Triple sec", "15 ml"], ["Vermouth", "20 ml"]] },
  { name: "Jardín Tónico", short: "JARDÍN TÓNICO", color: "#d7e34c", calories: 128, note: "Botánico, brillante y muy refrescante.", method: "Sirve el gin sobre hielo y completa con tónica.", ingredients: [["Gin", "35 ml"], ["Agua tónica", "90 ml"], ["Angostura", "2 golpes"]] },
  { name: "Vermut Highball", short: "VERMUT HIGHBALL", color: "#a9d8cc", calories: 99, note: "Herbal, largo y de baja intensidad.", method: "Sirve en vaso alto con mucho hielo.", ingredients: [["Vermouth", "45 ml"], ["Ginger ale", "75 ml"], ["Angostura", "2 golpes"]] },
  { name: "Brisa de Agave", short: "BRISA DE AGAVE", color: "#3b7f6b", calories: 149, note: "Agave seco con naranja y tónica.", method: "Integra en vaso con hielo y remueve una vez.", ingredients: [["Tequila", "35 ml"], ["Triple sec", "15 ml"], ["Agua tónica", "75 ml"]] },
  { name: "Rojo Amargo", short: "ROJO AMARGO", color: "#7a4529", calories: 88, note: "Vino, Aperol y especias en equilibrio.", method: "Sirve sobre hielo y termina con Angostura.", ingredients: [["Vino", "60 ml"], ["Aperol", "25 ml"], ["Angostura", "2 golpes"]] },
  { name: "Naranja Botánica", short: "NARANJA BOT.", color: "#ff8f2f", calories: 145, note: "Gin cítrico con un final de jengibre.", method: "Sirve con hielo y completa con ginger ale.", ingredients: [["Gin", "30 ml"], ["Triple sec", "15 ml"], ["Ginger ale", "70 ml"]] },
  { name: "Atardecer Andino", short: "ATARDECER", color: "#d45b72", calories: 143, note: "Pisco y vermouth con una capa de naranja.", method: "Remueve con hielo y sirve bien frío.", ingredients: [["Pisco", "30 ml"], ["Vermouth", "30 ml"], ["Triple sec", "10 ml"]] },
  { name: "Cuba Libre", short: "CUBA LIBRE", color: "#bf4b32", calories: 156, note: "Ron, cola y limón; simple y refrescante.", method: "Llena un vaso con hielo, añade el ron y el limón, completa con Coca-Cola y remueve.", ingredients: [["Ron", "45 ml"], ["Coca-Cola", "100 ml"], ["Limón", "½ unidad"]] },
  { name: "Whisky Cola", short: "WHISKY COLA", color: "#a97336", calories: 158, note: "Whisky largo con cola y un corte cítrico.", method: "Sirve el whisky sobre hielo, completa con Coca-Cola y termina con una rodaja de limón.", ingredients: [["Whisky", "45 ml"], ["Coca-Cola", "100 ml"], ["Limón", "1 rodaja"]] },
  { name: "Ron Tropical", short: "RON TROPICAL", color: "#f09a3e", calories: 142, note: "Ron frutal con piña y naranja.", method: "Agita el ron y los jugos con hielo; sirve colado sobre hielo fresco.", ingredients: [["Ron", "40 ml"], ["Jugo de piña", "60 ml"], ["Jugo de naranja", "40 ml"]] },
  { name: "Whisky Manzana", short: "WHISKY MANZ.", color: "#8da646", calories: 142, note: "Whisky, manzana y especias aromáticas.", method: "Sirve con hielo, añade el jugo de manzana y termina con dos golpes de Angostura.", ingredients: [["Whisky", "40 ml"], ["Jugo de manzana", "80 ml"], ["Angostura", "2 golpes"]] }
];

const canvas = document.querySelector("#wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.querySelector("#spinButton");
const resultCard = document.querySelector("#resultCard");
const resultNumber = document.querySelector("#resultNumber");
const resultName = document.querySelector("#resultName");
const resultNote = document.querySelector("#resultNote");
const resultMethod = document.querySelector("#resultMethod");
const resultCalories = document.querySelector("#resultCalories");
const resultSwatch = document.querySelector("#resultSwatch");
const spinAgainButton = document.querySelector("#spinAgainButton");
const copyButton = document.querySelector("#copyButton");
const recipeList = document.querySelector("#recipeList");
const recipeName = document.querySelector("#recipeName");
const recipeDescription = document.querySelector("#recipeDescription");
const recipeCalories = document.querySelector("#recipeCalories");
const glassLiquid = document.querySelector("#glassLiquid");
const roundCounter = document.querySelector("#roundCounter");
const toast = document.querySelector("#toast");

let rotation = 0;
let spinning = false;
let selected = null;
let round = 1;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const spinDuration = prefersReducedMotion ? 700 : 2200;

function drawWheel() {
  const size = canvas.width;
  const center = size / 2;
  const radius = center - 22;
  const slice = (Math.PI * 2) / cocktails.length;

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.translate(center, center);

  cocktails.forEach((item, index) => {
    const start = index * slice - Math.PI / 2 - slice / 2;
    const end = start + slice;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    ctx.strokeStyle = "#f2ecdf";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + slice / 2);
    ctx.translate(radius * .67, 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = index === 4 || index === 5 ? "#152824" : "#fffaf0";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${cocktails.length > 12 ? 14 : 19}px Manrope, sans-serif`;
    const label = item.short;
    if (label.length > 10) {
      const parts = label.split(" ");
      ctx.fillText(parts[0], 0, -11);
      ctx.fillText(parts.slice(1).join(" "), 0, 12);
    } else {
      ctx.fillText(label, 0, 0);
    }
    ctx.restore();
  });

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#152824";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.restore();
}

function populateIngredients() {
  const grid = document.querySelector("#ingredientGrid");
  grid.innerHTML = cocktails.map((item, index) => `
    <li>
      <span class="ingredient-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="ingredient-dot" style="background:${item.color}"></span>
      <strong class="ingredient-name">${item.name}</strong>
      <small>${item.ingredients.map(part => part[0]).join(" · ")}<b>≈ ${item.calories} kcal / 200 ml</b></small>
    </li>
  `).join("");
}

function selectIngredient(index) {
  selected = cocktails[index];
  resultNumber.textContent = String(index + 1).padStart(2, "0");
  resultName.textContent = selected.name;
  resultNote.textContent = selected.ingredients.map(part => `${part[0]} ${part[1]}`).join(" · ");
  resultMethod.textContent = selected.method;
  resultCalories.textContent = `≈ ${selected.calories} kcal · vaso de 200 ml`;
  resultSwatch.style.background = selected.color;
  copyButton.disabled = false;
  renderRecipe();
  resultCard.classList.add("is-new");
  setTimeout(() => resultCard.classList.remove("is-new"), 500);
}

function spin() {
  if (spinning) return;
  spinning = true;
  spinButton.disabled = true;
  copyButton.disabled = true;
  resultName.textContent = "Girando…";
  resultNote.textContent = "El azar está eligiendo.";
  resultMethod.textContent = "En un momento tendrás la preparación completa.";
  resultCalories.textContent = "Calculando la porción…";

  const winner = Math.floor(Math.random() * cocktails.length);
  const sliceDeg = 360 / cocktails.length;
  const current = ((rotation % 360) + 360) % 360;
  const desired = (360 - winner * sliceDeg) % 360;
  const delta = (desired - current + 360) % 360;
  const fullTurns = prefersReducedMotion ? 1 : 3;
  rotation += fullTurns * 360 + delta;

  canvas.style.transition = `transform ${spinDuration}ms cubic-bezier(.12,.72,.12,1)`;
  canvas.style.transform = `rotate(${rotation}deg)`;

  let finished = false;
  const finishSpin = () => {
    if (finished) return;
    finished = true;
    spinning = false;
    spinButton.disabled = false;
    selectIngredient(winner);
    round += 1;
    roundCounter.textContent = `Ronda ${String(round).padStart(2, "0")}`;
  };

  canvas.addEventListener("transitionend", finishSpin, { once: true });
  setTimeout(finishSpin, spinDuration + 100);
}

function renderRecipe() {
  if (!selected) return;
  recipeName.textContent = selected.name;
  recipeDescription.textContent = selected.method;
  recipeCalories.textContent = `≈ ${selected.calories} kcal por vaso de 200 ml`;
  recipeList.innerHTML = selected.ingredients.map((part, index) => `
    <li><span>${String(index + 1).padStart(2, "0")}</span><strong>${part[0]}</strong><small>${part[1]}</small></li>
  `).join("");
  glassLiquid.style.inset = "25% 0 0";
  glassLiquid.style.background = selected.color;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

spinButton.addEventListener("click", spin);
spinAgainButton.addEventListener("click", spin);
copyButton.addEventListener("click", async () => {
  if (!selected) return;
  const text = `${selected.name}\n≈ ${selected.calories} kcal por vaso de 200 ml\n${selected.ingredients.map(part => `${part[0]}: ${part[1]}`).join("\n")}\n${selected.method}`;
  await navigator.clipboard.writeText(text);
  showToast("Receta copiada");
});

drawWheel();
populateIngredients();

