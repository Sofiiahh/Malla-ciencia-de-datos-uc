document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("actualizarBtn").addEventListener("click", actualizarTodo);
  actualizarTodo();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.tipo === "INGLES") return "ingres";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Renderiza las columnas de semestres y la columna de inglés
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "";

  const semestreActual = parseInt(document.getElementById("semestreActual").value);

  // Columnas fijas de semestres
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
      li.addEventListener("click", () => li.classList.toggle("aprobado"));
      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }

  // Columna final de Inglés
  const colIngles = document.createElement("div");
  colIngles.className = "semestre";
  colIngles.innerHTML = "<h3>Inglés</h3>";
  const ulIngles = document.createElement("ul");
  ingles.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r.nombre;
    li.classList.add("ingres");
    ulIngles.appendChild(li);
  });
  colIngles.appendChild(ulIngles);
  contenedor.appendChild(colIngles);

  renderObservaciones();
  renderSugerencias(semestreActual);
}

// Observaciones con ramos anuales por semestre
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

// Sugerencias semestrales
function renderSugerencias(semestreActual) {
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "<h2>Ideas de planificación semestral</h2>";
  sugerencias.innerHTML += `<p>Planifica desde el semestre ${semestreActual + 1} priorizando los ramos que tienen menos requisitos.</p>`;
  sugerencias.innerHTML += `<p>Distribuye OFG y opcionales de forma equilibrada para no sobrecargar un semestre.</p>`;
}

// Actualiza todo cuando se hace click en el botón
function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
}
