const WHATSAPP_NUMBER = "5491151168759";

const products = [
  {name:"Llaveros personalizados",category:"Llaveros",price:"Consultar",description:"Diseños personalizados en 3D.",image:""},
  {
{
  name:"Muñeco de nieve tejido",
  category:"Decoración",
  price:"$3000",
  description:`☃️❄️ MUÑECO DE NIEVE TEJIDO ❄️

¡Un detalle lleno de ternura para esta temporada! ❤️

Muñeco de nieve con hermoso diseño de tejido, realizado mediante impresión 3D, con detalles que imitan la textura del crochet.

🧶 Diseño estilo tejido.
⛄ Terminaciones y detalles decorativos.
🎁 Ideal para decorar tu hogar o regalar.
❤️ Un toque navideño y original para cualquier rincón.

✨ ¡Llevate el tuyo y llená de magia tu Navidad!`,
  image:"file_000000005904820ea09bddbb38ce62b9.png"},
{name:"Figuras decorativas",category:"Decoración",price:"Consultar",description:"Figuras impresas en 3D.",image:""},
  {name:"Organizadores",category:"Organización",price:"Consultar",description:"Organizadores personalizados.",image:""},
  {name:"Productos a pedido",category:"Personalizados",price:"Consultar",description:"Creamos tus ideas en 3D.",image:""}
];

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");

function wa(name = "") {
  const msg = "Hola DaCam 3D! Quiero consultar por " + name;
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
}

document.getElementById("topWhatsapp").href = wa();
document.getElementById("bottomWhatsapp").href = wa();
document.getElementById("year").textContent = new Date().getFullYear();

let active = "Todos";

function drawFilters() {
  const cats = ["Todos", ...new Set(products.map(p => p.category))];
  filters.innerHTML = cats.map(c =>
    `<button class="filter ${c === active ? "active" : ""}" data-c="${c}">${c}</button>`
  ).join("");

  filters.querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      active = b.dataset.c;
      drawFilters();
      draw();
    };
  });
}

function draw() {
  const q = search.value.toLowerCase();
  const list = products.filter(p =>
    (active === "Todos" || p.category === active) &&
    (p.name + p.category + p.description).toLowerCase().includes(q)
  );

  document.getElementById("count").textContent = list.length + " productos";
  document.getElementById("empty").hidden = list.length > 0;

  grid.innerHTML = list.map(p => `
    <article class="card">
      <div class="photo">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : '<span class="placeholder">DaCam 3D</span>'}
      </div>
      <div class="info">
        <span class="category">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="description">${p.description}</p>
        <div class="bottom">
          <span class="price">${p.price}</span>
          <a class="ask" href="${wa(p.name)}" target="_blank">CONSULTAR ↗</a>
        </div>
      </div>
    </article>
  `).join("");
}

search.addEventListener("input", draw);
drawFilters();
draw();
