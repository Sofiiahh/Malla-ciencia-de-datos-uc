document.addEventListener("DOMContentLoaded", () => {
  renderMalla();
  renderObservaciones();

  document.getElementById("generarPlanBtn").addEventListener("click", () => {
    generarPlan(5); // Plan A: 5 ramos por semestre
    const planA = JSON.parse(JSON.stringify(estado.semestres));

    generarPlan(6); // Plan B: 6 ramos por semestre
    const planB = JSON.parse(JSON.stringify(estado.semestres));

    renderPlanner(planA, planB);
  });
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
        div.classList.toggle("aprobado");
      });

      col.appendChild(div);
    });

    grid.appendChild(col);
  }

  cont.appendChild(grid);
}

function renderPlanner(planA, planB) {
  const cont = document.getElementById("planner");
  cont.innerHTML = "<h2>Planner de Semestres</h2>";

  const crearGrid = (plan, titulo) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${titulo}</h3>`;
    const grid = document.createElement("div");
    grid.className = "grid-malla";

    plan.forEach(s => {
      const col = document.createElement("div");
      col.className = "columna";
      col.innerHTML = `<h4>Sem ${s.numero}</h4>`;
      s.ramos.forEach(r => {
        const d = document.createElement("div");
        d.className = "ramo " + clasePorTipo(r);
        d.textContent = `${r.id} - ${r.nombre}`;
        col.appendChild(d);
      });
      grid.appendChild(col);
    });

    div.appendChild(grid);
    cont.appendChild(div);
  };

  crearGrid(planA, "Plan con 5 ramos por semestre");
  crearGrid(planB, "Plan con 6 ramos por semestre");
}

function renderObservaciones() {
  const cont = document.getElementById("observaciones");
  cont.innerHTML = "<h2>Observaciones</h2>";

  const anualesPorSemestre = {};
  ramos.filter(r => r.anual).forEach(r => {
    if (!anualesPorSemestre[r.semestre]) anualesPorSemestre[r.semestre] = [];
    anualesPorSemestre[r.semestre].push(r);
  });

  Object.keys(anualesPorSemestre).sort((a,b)=>a-b).forEach(sem => {
    const p = document.createElement("p");
    const listaRamos = anualesPorSemestre[sem].map(r => `${r.id} - ${r.nombre}`).join("; ");
    p.textContent = `Ramos anuales del semestre ${sem}: ${listaRamos}. Solo se dictan en este semestre.`;
    cont.appendChild(p);
  });
}
