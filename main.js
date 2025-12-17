document.addEventListener("DOMContentLoaded", () => {
  actualizarTodo();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.tipo === "INGLES") return "ingles";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

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


  // Observaciones
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";
  const totalCreditos = estado.semestres.reduce((sum, s) => sum + s.creditos, 0);
  obs.innerHTML += `<p>Total de créditos planificados: <strong>${totalCreditos}</strong></p>`;

  const ofgPendientes = ramos.filter(r => r.tipo === "OFG" && !estado.aprobados.has(r.id));
  const inglesPendientes = ramos.filter(r => r.tipo === "INGLES" && !estado.aprobados.has(r.id));

  if (ofgPendientes.length > 0)
    obs.innerHTML += `<p>OFG pendientes: ${ofgPendientes.map(r => r.id).join(", ")}</p>`;
  if (inglesPendientes.length > 0)
    obs.innerHTML += `<p>Inglés pendiente: ${inglesPendientes.map(r => r.id).join(", ")}</p>`;
}

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
}
