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

// Render del planner en columnas
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "";

  // Columnas por semestre
  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    const col = document.createElement("div");
    col.className = "columna";
    col.innerHTML = `<h3>Semestre ${s}</h3>`;

    ramos.filter(r => r.semestre === s).forEach(r => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo " + clasePorTipo(r);
      divRamo.textContent = `${r.id} — ${r.nombre}`;

      const aprobado = estado.aprobados.has(r.id);
      const disponible = cumpleRequisitos(r, estado.aprobados);

      if (aprobado) divRamo.classList.add("aprobado");
      else if (!disponible) divRamo.classList.add("bloqueado");
      else divRamo.addEventListener("click", () => {
        estado.aprobados.add(r.id);
        actualizarTodo();
      });

      col.appendChild(divRamo);
    });

    contenedor.appendChild(col);
  }

  // Columna de Inglés
  const colIngles = document.createElement("div");
  colIngles.className = "columna";
  colIngles.innerHTML = "<h3>Inglés</h3>";

  ingles.forEach(r => {
    const divRamo = document.createElement("div");
    divRamo.className = "ramo ingres";
    divRamo.textContent = r.nombre;
    colIngles.appendChild(divRamo);
  });

  contenedor.appendChild(colIngles);
}

// Observaciones: ramos anuales y total de créditos
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  const anuales = ramos.filter(r => r.anual);
  if (anales.length)
    obs.innerHTML += `<p>Ramos anuales: ${anales.map(r => r.id).join(", ")}</p>`;

  const totalCreditos = estado.semestres.reduce((sum, s) => sum + s.creditos, 0);
  obs.innerHTML += `<p>Total de créditos planificados: ${totalCreditos}</p>`;
}

// Sugerencias de planificación semestral según el semestre actual
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

// Actualiza todo el planner
function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderObservaciones();
  renderSugerencias();
}
