// aprobados, semestres, inglés
const estado = {
  aprobados: new Set(), 
  inglesAprobado: false, 
  semestres: [] 
};

// si el ramo puede ser tomado
function cumpleRequisitos(ramo) {
  return ramo.req.every(r => estado.aprobados.has(r));
}
function esElegible(ramo) {
  if (estado.aprobados.has(ramo.id)) return false; 
  return cumpleRequisitos(ramo); 
}

//créditos de un ramo
function creditosRamo(ramo) {
  return ramo.tipo === "OFG" ? CREDITOS_RAMO : CREDITOS_RAMO; 
}

// genera el plan
function generarPlan() {
  estado.semestres = []; 
  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id)); 

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) { //semestres
    let semestre = { numero: s, ramos: [], creditos: 0 };

    let elegibles = pendientes.filter(esElegible);

    for (let ramo of elegibles) {
      if (semestre.creditos + creditosRamo(ramo) > MAX_CREDITOS_SEMESTRE) continue; //ya tiene 60 créditos

      semestre.ramos.push(ramo); 
      semestre.creditos += creditosRamo(ramo); 
      estado.aprobados.add(ramo.id); 
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !estado.aprobados.has(r.id));
  }

 //un semestre 9
  if (pendientes.length > 0) {
    estado.semestres.push({
      numero: SEMESTRES_OBJETIVO + 1,
      ramos: pendientes,
      creditos: pendientes.length * CREDITOS_RAMO,
      aviso: "Extensión a 9° semestre"
    });
  }
}

// mostrar el planner generado
function renderPlanner() {
  const contenedor = document.getElementById("planner");
  contenedor.innerHTML = "<h2>Planner de Semestres</h2>";

  estado.semestres.forEach(sem => {
    const div = document.createElement("div");
    div.className = "semestre";

    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${sem.numero}`;
    div.appendChild(titulo);

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

generarPlan();
renderPlanner();
