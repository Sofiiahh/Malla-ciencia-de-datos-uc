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
  contenedor.innerHTML = "<h2>Planner de Semestres</h2>";

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
