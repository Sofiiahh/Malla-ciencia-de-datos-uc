document.addEventListener("DOMContentLoaded", () => {
  generarPlan();
  renderPlanner();
});

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "<h2>Malla</h2>";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";

    const aprobado = estado.aprobados.has(ramo.id);
    const disponible = cumpleRequisitos(ramo, estado.aprobados);

    if (aprobado) div.classList.add("aprobado");
    else if (disponible) div.classList.add("disponible");
    else div.classList.add("bloqueado");

    div.innerHTML = `
      <strong>${ramo.id}</strong><br>
      ${ramo.nombre}
    `;

    if (disponible && !aprobado) {
      div.addEventListener("click", () => {
        estado.aprobados.add(ramo.id);
        actualizarTodo();
      });
    }

    contenedor.appendChild(div);
  });
}


function actualizarTodo() {
  generarPlan();
  renderPlanner();
  renderMalla();
}

actualizarTodo();
