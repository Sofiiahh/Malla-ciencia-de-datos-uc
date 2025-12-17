document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generarPlanBtn").addEventListener("click", () => {
    const ramosPorSem = parseInt(document.getElementById("ramosPorSemestre").value);
    generarPlan(ramosPorSem);
    renderPlanner();
  });

  renderMalla();
  renderObservaciones();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  return "regular";
}

function renderMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "<h2>Malla Interactiva</h2>";

  const grid = document.createElement("div");
  grid.className = "grid-malla";

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    const col = document.createElement("div");
    col.className = "columna";
    col.innerHTML = `<h3>Semestre ${s}</h3>`;
    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo " + clasePorTipo(ramo);
      div.textContent = `${ramo.id} - ${ramo.nombre}`;
      div.addEventListener("click", () => {
        if (estado.aprobados.has(ramo.id)) estado.aprobados.delete(ramo.id);
        else estado.aprobados.add(ramo.id);
      });
      col.appendChild(div);
    });
    grid.appendChild(col);
  }

  cont.appendChild(grid);
}

function renderPlanner() {
  const cont = document.getElementById("planner");
  cont.innerHTML = "<h2>Planner de Semestres</h2>";
  const grid = document.createElement("div");
  grid.className = "grid-malla";

  estado.semestres.forEach(s => {
    const col = document.createElement("div");
    col.className = "columna";
    col.innerHTML = `<h3>Semestre ${s.numero}</h3>`;
    s.ramos.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo " + clasePorTipo(ramo);
      div.textContent = `${ramo.id} - ${ramo.nombre}`;
      col.appendChild(div);
    });
    grid.appendChild(col);
  });

  cont.appendChild(grid);
  renderObservaciones();
}

function renderObservaciones() {
  const cont = document.getElementById("observaciones");
  cont.innerHTML = "<h2>Observaciones</h2>";

  const anuales = ramos.filter(r => r.anual);
  if (anuales.length > 0) {
    const h3 = document.createElement("h3");
    h3.textContent = "Ramos Anuales";
    cont.appendChild(h3);

    anuales.forEach(r => {
      const p = document.createElement("p");
      p.textContent = `${r.semestre}º semestre - ${r.id} - ${r.nombre}`;
      cont.appendChild(p);
    });
  }
}
