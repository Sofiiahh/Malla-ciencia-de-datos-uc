document.addEventListener("DOMContentLoaded", () => {
  actualizarTodo();
});


function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "<h2>Malla Interactiva</h2>";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";

    const aprobado = estado.aprobados.has(ramo.id);
    const disponible = cumpleRequisitos(ramo, estado.aprobados);

    if (aprobado) div.classList.add("aprobado");
    else if (disponible) div.classList.add("disponible");
    else div.classList.add("bloqueado");

    div.innerHTML = `<strong>${ramo.id}</strong><br>${ramo.nombre}`;

    if (disponible && !aprobado) {
      div.addEventListener("click", () => {
        estado.aprobados.add(ramo.id);
        actualizarTodo();
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
      ul.appendChild(li);
    });

    divSem.appendChild(ul);

    if (s.aviso) {
      const aviso = document.createElement("p");
      aviso.style.color = "red";
      aviso.textContent = s.aviso;
      divSem.appendChild(aviso);
    }

    contenedor.appendChild(divSem);
  });
}


function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
}
