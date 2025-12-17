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

function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "";

  const semestreActual = parseInt(document.getElementById("semestreActual").value);

  // Renderizar 8 semestres
  for (let i = semestreActual + 1; i <= 8; i++) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>Semestre ${i}</h3>`;

    const ul = document.createElement("ul");
    const semRamos = estado.semestres.find(s => s.numero === i)?.ramos || [];
    semRamos.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} — ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));
      li.setAttribute("data-tooltip", `Requisitos: ${ramo.req.length ? ramo.req.join(", ") : "Ninguno"}`);
      li.addEventListener("click", () => li.classList.toggle("aprobado"));
      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }

  // Columna de Inglés al lado
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

function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  // Ramos anuales
  const anuales = ramos.filter(r => r.anual);
  const primero = anuales.filter(r => r.semestre % 2 !== 0);
  const segundo = anuales.filter(r => r.semestre % 2 === 0);

  if (primero.length > 0) {
    obs.innerHTML += `<p><strong>Ramos anuales — Primer semestre:</strong> ${primero.map(r => r.id + " (" + r.nombre + ")").join(", ")}</p>`;
  }
  if (segundo.length > 0) {
    obs.innerHTML += `<p><strong>Ramos anuales — Segundo semestre:</strong> ${segundo.map(r => r.id + " (" + r.nombre + ")").join(", ")}</p>`;
  }
}

function renderSugerencias(semestreActual) {
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "<h2>Ideas de planificación semestral</h2>";
  sugerencias.innerHTML += `<p>Comienza planificando desde el semestre ${semestreActual + 1} y prioriza los ramos que tienen menos requisitos.</p>`;
  sugerencias.innerHTML += `<p>Distribuye los OFG y opcionales de manera equilibrada.</p>`;
}

function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
}
