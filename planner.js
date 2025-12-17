const estado = {
  aprobados: new Set(),
  semestres: []
};

function cumpleRequisitos(ramo, aprobadosSimulados) {
  return ramo.req.every(r => aprobadosSimulados.has(r));
}

function creditosRamo(ramo) {
  return CREDITOS_RAMO;
}

// Genera un plan optimizado y varias opciones
function generarPlan(maxRamosPorSemestre = 5) {
  estado.semestres = [];
  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id));
  let aprobadosSimulados = new Set(estado.aprobados);

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    let semestre = { numero: s, ramos: [], creditos: 0 };
    let elegibles = pendientes.filter(r => cumpleRequisitos(r, aprobadosSimulados));

    // Agregamos hasta maxRamosPorSemestre
    for (let ramo of elegibles) {
      if (semestre.ramos.length >= maxRamosPorSemestre) break;
      semestre.ramos.push(ramo);
      aprobadosSimulados.add(ramo.id);
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !aprobadosSimulados.has(r.id));
  }
}
