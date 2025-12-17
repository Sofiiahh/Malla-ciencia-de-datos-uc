document.addEventListener("DOMContentLoaded", () => {
  actualizarTodo();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.tipo === "INGLES") return "ingres";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Renderiza la malla interactiva
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

// Renderiza los semestres y la columna de Inglés
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "<h2>Planner de Semestres</h2>";

  // Render semestres
  estado.semestres.forEach(s => {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>Semestre ${s.numero}</h3>`;

    const ul = document.createElement("ul");
    s.ramos.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} — ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));

      const reqs = ramo.req.length ? ramo.req.join(", ") : "Ninguno";
      li.setAttribute("data-tooltip", `Requisitos: ${reqs}`);

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

  renderObservaciones();
  renderSugerencias();
}

// Observaciones sin créditos
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  const ramosAnuales = ramos.filter(r => r.anual && !estado.aprobados.has(r.id));
  if (ramosAnuales.length > 0)
    obs.innerHTML += `<p>Ramos anuales pendientes: ${ramosAnuales.map(r => r.id).join(", ")}</p>`;
}

// Sugerencias de planificación semestral
function renderSugerencias() {
  const sugerencias = document.getElementById("sugerencias");
  sugerencias.innerHTML = "<h2>Ideas de planificación semestral</h2>";

  const semestreActual = estado.semestres.find(s => s.ramos.some(r => !estado.aprobados.has(r.id))) || estado.semestres[0];

  sugerencias.innerHTML += `<p>Considera planificar tu próximo semestre (Semestre ${semestreActual.numero}) priorizando los ramos que tienen menos requisitos y los ramos anuales.</p>`;
  sugerencias.innerHTML += `<p>Revisa los OFG y opcionales para distribuir tu carga de manera equilibrada.</p>`;
}

// Scroll al siguiente semestre con ramos disponibles
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
