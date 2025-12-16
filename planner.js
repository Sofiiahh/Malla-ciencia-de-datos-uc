const SEMESTRES_OBJETIVO = 8;
const MAX_CREDITOS_SEMESTRE = 60;
const CREDITOS_RAMO = 10;
const CREDITOS_INGLES = 5;

const estado = {
  aprobados: new Set(),
  inglesAprobado: false,
  semestres: []
};

// FUNCIONES AUXILIARES

// Verifica que se cumplan los requisitos de un ramo
function cumpleRequisitos(ramo, aprobadosSimulados) {
  return ramo.req.every(r => aprobadosSimulados.has(r));
}

// Devuelve créditos según tipo de ramo
function creditosRamo(ramo) {
  return ramo.tipo === "INGLES" ? CREDITOS_INGLES : CREDITOS_RAMO;
}

// GENERA EL PLAN DE SEMESTRES
function generarPlan() {
  estado.semestres = [];
  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id));
  let aprobadosSimulados = new Set(estado.aprobados);

  // Llenar hasta SEMESTRES_OBJETIVO
  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    let semestre = { numero: s, ramos: [], creditos: 0 };
    
    let elegibles = pendientes.filter(r => cumpleRequisitos(r, aprobadosSimulados));

    for (let ramo of elegibles) {
      let c = creditosRamo(ramo);
      if (semestre.creditos + c > MAX_CREDITOS_SEMESTRE) continue;

      semestre.ramos.push(ramo);
      semestre.creditos += c;
      aprobadosSimulados.add(ramo.id);
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !aprobadosSimulados.has(r.id));
  }

  // Crear semestres extra mientras queden ramos
  let numExtra = SEMESTRES_OBJETIVO + 1;
  while (pendientes.length > 0) {
    let semestre = { numero: numExtra, ramos: [], creditos: 0, aviso: "Semestre extra por ramos pendientes" };

    for (let ramo of pendientes) {
      let c = creditosRamo(ramo);
      if (semestre.creditos + c > MAX_CREDITOS_SEMESTRE) continue;

      semestre.ramos.push(ramo);
      semestre.creditos += c;
      aprobadosSimulados.add(ramo.id);
    }

    estado.semestres.push(semestre);
    pendientes = pendientes.filter(r => !aprobadosSimulados.has(r.id));
    numExtra++;
  }
}
