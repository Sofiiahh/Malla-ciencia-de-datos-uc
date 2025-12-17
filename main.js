document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("actualizarBtn").addEventListener("click", actualizarTodo);
  renderMalla();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Marca/desmarca un ramo
function toggleRamo(id, li) {
  if (estado.aprobados.has(id)) {
    estado.aprobados.delete(id);
    li.classList.remove("aprobado");
  } else {
    estado.aprobados.add(id);
    li.classList.add("aprobado");
  }
}

// Renderiza la malla interactiva (8 columnas por semestre)
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let s = 1; s <= 8; s++) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>Semestre ${s}</h3>`;

    const ul = document.createElement("ul");
    const semRamos = ramos.filter(r => r.semestre === s);
    semRamos.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} — ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));
      li.addEventListener("click", () => toggleRamo(ramo.id, li));
      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }
}

// Observaciones: solo ramos anuales
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  const anuales = ramos.filter(r => r.anual);
  const primero = anuales.filter(r => r.semestre % 2 !== 0);
  const segundo = anuales.filter(r => r.semestre % 2 === 0);

  if (primero.length) {
    obs.innerHTML += `<p><strong>Ramos anuales — Primer semestre:</strong> ${primero.map(r => `${r.id} (${r.nombre})`).join(", ")}</p>`;
  }
  if (segundo.length) {
    obs.innerHTML += `<p><strong>Ramos anuales — Segundo semestre:</strong> ${segundo.map(r => `${r.id} (${r.nombre})`).join(", ")}</p>`;
  }
}

// Planner semestral: muestra todos los semestres planificados
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "";

  for (let s = 1; s <= 8; s++) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>Semestre ${s}</h3>`;

    const ul = document.createElement("ul");
    const semRamos = estado.semestres.find(se => se.numero === s)?.ramos || [];
    semRamos.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} — ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));
      li.setAttribute("data-tooltip", `Requisitos: ${ramo.req.length ? ramo.req.join(", ") : "Ninguno"}`);
      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }
}

// Función principal: genera plan y actualiza todo
function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
  renderObservaciones();
}
