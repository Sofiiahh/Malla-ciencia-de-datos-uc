document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("actualizarBtn").addEventListener("click", actualizarTodo);
  renderMalla();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.tipo === "INGLES") return "ingres";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Función para marcar o desmarcar un ramo
function toggleRamo(id, li) {
  if (estado.aprobados.has(id)) {
    estado.aprobados.delete(id);
    li.classList.remove("aprobado");
  } else {
    estado.aprobados.add(id);
    li.classList.add("aprobado");
  }
}

// Renderiza la malla interactiva (8 semestres + columna de inglés)
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  // Columnas semestre 1 a 8
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

      // Marcar/desmarcar al click
      li.addEventListener("click", () => toggleRamo(ramo.id, li));

      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }

  // Columna final de inglés
  const colIngles = document.createElement("div");
  colIngles.className = "semestre";
  colIngles.innerHTML = "<h3>Inglés</h3>";
  const ulIngles = document.createElement("ul");
  ingles.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r.nombre;
    li.classList.add("ingres");
    li.addEventListener("click", () => toggleRamo(r.id, li));
    ulIngles.appendChild(li);
  });
  colIngles.appendChild(ulIngles);
  contenedor.appendChild(colIngles);
}

// Observaciones con ramos anuales por semestre
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  // Ramos anuales
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

// Sugerencias semestrales según semestre actual
function renderSugerencias() {
  const sugerencias = document.getElementById("sugerencias");
  const semestreActual = parseInt(document.getElementById("semestreActual").value);

  sugerencias.innerHTML = "<h2>Ideas de planificación semestral</h2>";
  sugerencias.innerHTML += `<p>Planifica desde el semestre ${semestreActual + 1} priorizando los ramos que tienen menos requisitos.</p>`;
  sugerencias.innerHTML += `<p>Distribuye OFG y ramos optativos de forma equilibrada para no sobrecargar un semestre.</p>`;
}

// Renderiza el planner semestral desde el siguiente semestre
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "";

  const semestreActual = parseInt(document.getElementById("semestreActual").value);

  for (let s = semestreActual + 1; s <= 8; s++) {
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

function actualizarTodo() {
  generarPlan();
  renderPlanner(); 
  renderMalla(); 
  renderObservaciones(); 
  renderSugerencias(); 
}
