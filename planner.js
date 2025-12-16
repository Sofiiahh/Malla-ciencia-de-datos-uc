// planner.js

const estado = {
  aprobados: new Set(),
  semestres: []
};

function creditosRamo(ramo) {
  if (ramo.tipo === "INGLES") return 5;
  return 10;
}

function cumpleRequisitos(ramo) {
  return ramo.req.every(r => estado.aprobados.has(r));
}

function esElegible(ramo) {
  if (estado.aprobados.has(ramo.id)) return false;
  return cumpleRequisitos(ramo);
}

function generarPlan() {
  estado.semestres = [];
  estado.aprobados = new Set();

  let pendientes = [...ramos];

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    let semestre = {
      numero: s,
      ramos: [],
      creditos: 0,
      reservas: 0
    };

    let elegibles = pendientes.filter(esElegible);

    for (let ramo of elegibles) {
      const c = creditosRamo(ramo);

      if (semestre.creditos + semestre.reservas + c > MAX_CREDITOS_SEMESTRE) {
        continue;
      }

      if (ramo.anual) {
        if (s === SEMESTRES_OBJETIVO) continue;

        let siguiente = estado.semestres[s];

        if (siguiente && siguiente.reservas + c > MAX_CREDITOS_SEMESTRE) {
          continue;
        }

        semestre.ramos.push(ramo);
        semestre.creditos += c;
        estado.aprobados.add(ramo.id);

        if (siguiente) {
          siguiente.reservas += c;
        }

      } else {
        semestre.ramos.push(ramo);
        semestre.creditos += c;
        estado.aprobados.add(ramo.id);
      }
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !estado.aprobados.has(r.id));
  }

  if (pendientes.length > 0) {
    estado.semestres.push({
      numero: SEMESTRES_OBJETIVO + 1,
      ramos: pendientes,
      creditos: pendientes.reduce((s, r) => s + creditosRamo(r), 0),
      aviso: "Extensión a 9° semestre"
    });
  }
}

function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "<h2>Planner de Semestres</h2>";

  estado.semestres.forEach(sem => {
    const div = document.createElement("div");
    div.className = "semestre";

    const h = document.createElement("h3");
    h.textContent = `Semestre ${sem.numero}`;
    div.appendChild(h);

    sem.ramos.forEach(r => {
      const p = document.createElement("p");
      p.textContent = `${r.id} — ${r.nombre}`;
      div.appendChild(p);
    });

    const c = document.createElement("small");
    c.textContent = `Créditos: ${sem.creditos}`;
    div.appendChild(c);

    if (sem.aviso) {
      const warn = document.createElement("strong");
      warn.textContent = sem.aviso;
      div.appendChild(warn);
    }

    contenedor.appendChild(div);
  });
}
