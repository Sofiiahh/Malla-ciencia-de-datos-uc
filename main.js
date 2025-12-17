document.addEventListener("DOMContentLoaded", () => {
  actualizarTodo();
});

const estado = {
  aprobados: new Set(),
  semestres: []
};

// Funciones auxiliares
function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.tipo === "INGLES") return "ingres";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

function cumpleRequisitos(ramo, aprobadosSimulados = estado.aprobados) {
  return ramo.req.every(r => aprobadosSimulados.has(r));
}

function creditosRamo(ramo) {
  if (ramo.tipo === "INGLES") return CREDITOS_INGLES;
  return CREDITOS_RAMO;
}

// Genera el plan de semestres
function generarPlan() {
  estado.semestres = [];
  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id));
  let aprobadosSimulados = new Set(estado.aprobados);

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    let semestre = { numero: s, ramos: [], creditos: 0 };
    let elegibles = pendientes.filter(r => cumpleRequisitos(r, aprobadosSimulados));

    for (let ramo of elegibles) {
      let c = creditosRamo(ramo);
      if (semestre.creditos + c > MAX_CREDITOS_SEMESTRE) continue;

      semestre.ramos.push(ramo);
      semestre.creditos += c;
      aprobadosSimulados.add(ramo.id);
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !aprobadosSimulados.has(r.id));
  }

  // Semestres extra si quedan pendientes
  let numExtra = SEMESTRES_OBJETIVO + 1;
  while (pendientes.length > 0) {
    let semestre = { numero: numExtra, ramos: [], creditos: 0, aviso: "Semestre extra por ramos pendientes" };
    for (let ramo of pendientes) {
      let c = creditosRamo(ramo);
      if (semestre.creditos + c > MAX_CREDITOS_SEMESTRE) continue;

      semestre.ramos.push(ramo);
      semestre.creditos += c;
      aprobadosSimulados.add(ramo.id);
    }
    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !aprobadosSimulados.has(r.id));
    numExtra++;
  }
}

// Render de la malla interactiva
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "<h2>Malla Interactiva</h2>";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo", clasePorTipo(ramo));

    const aprobado = estado.aprobados.has(ramo.id);
    const disponible = cumpleRequisitos(ramo, estado.aprobados);

    if (aprobado) div.classList.add("aprobado");
    else if (!disponible) div.classList.add("bloqueado");

    div.innerHTML = `<strong>${ramo.id}</strong><br>${ramo.nombre}`;

    if (disponible && !aprobado) {
      div.addEventListener("click", () => {
        estado.aprobados.add(ramo.id);
        actualizarTodo();
        scrollAlSiguienteSemestre();
      });
    }

    contenedor.appendChild(div);
  });
}

// Render del planner con columna de Inglés al final
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "<h2>Planner de Semestres</h2>";

  // Semestres
  estado.semestres.forEach(s => {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>Semestre ${s.numero} — Créditos: ${s.creditos}</h3>`;

    const ul = document.createElement("ul");
    s.ramos.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} — ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));

      const reqs = ramo.req.length ? ramo.req.join(", ") : "Ninguno";
      const creditos = ramo.tipo === "INGLES" ? CREDITOS_INGLES : CREDITOS_RAMO;
      li.setAttribute("data-tooltip", `Créditos: ${creditos} | Requisitos: ${reqs}`);

      ul.appendChild(li);
    });

    divSem.appendChild(ul);

    if (s.aviso) {
      const aviso = document.createElement("p");
      aviso.style.color = "red";
      aviso.style.fontWeight = "bold";
      aviso.textContent = s.aviso;
      divSem.appendChild(aviso);
    }

    contenedor.appendChild(divSem);
  });

  // Columna de Inglés
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
}

// Observaciones
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  const anuales = ramos.filter(r => r.anual);
  if (anales.length)
    obs.innerHTML += `<p>Ramos anuales: ${anales.map(r => r.id).join(", ")}</p>`;

  const totalCreditos = estado.semestres.reduce((sum, s) => sum + s.creditos, 0);
  obs.innerHTML += `<p>Total de créditos planificados: ${totalCreditos}</p>`;
}

// Sugerencias según semestre actual
function renderSugerencias() {
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "<h2>Ideas de planificación semestral</h2>";

  let semestreActual = parseInt(prompt("¿En qué semestre estás? (1-8)"), 10);
  if (isNaN(semestreActual) || semestreActual < 1 || semestreActual > SEMESTRES_OBJETIVO)
    semestreActual = 1;

  let ideas = [];
  for (let s = semestreActual + 1; s <= SEMESTRES_OBJETIVO; s++) {
    const rams = ramos.filter(r => r.semestre === s).map(r => r.id);
    if (rams.length) ideas.push(`Semestre ${s}: ${rams.join(", ")}`);
  }

  if (ideas.length === 0) ideas.push("No hay ramos pendientes.");
  sugerencias.innerHTML += `<ul>${ideas.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

// Scroll al siguiente semestre con ramos desbloqueados
function scrollAlSiguienteSemestre() {
  const semestres = document.querySelectorAll(".semestre");
  for (let s of semestres) {
    const liBloqueados = s.querySelectorAll("li.bloqueado");
    const liTotales = s.querySelectorAll("li");
    if (liTotales.length > 0 && liBloqueados.length < liTotales.length) {
      s.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    }
  }
}

function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
  renderObservaciones();
  renderSugerencias();
}
