const SEMESTRES_OBJETIVO = 8;
const MAX_CREDITOS_SEMESTRE = 60;
const CREDITOS_RAMO = 10;
const CREDITOS_INGLES = 5;


const estado = {
  aprobados: new Set(),
  inglesAprobado: false,
  semestres: []
};


// REGLAS

function cumpleRequisitos(ramo, aprobadosSimulados) {
  return ramo.req.every(r => aprobadosSimulados.has(r));
}

function creditosRamo(ramo) {
  return ramo.tipo === "INGLES" ? CREDITOS_INGLES : CREDITOS_RAMO;
}

function generarPlan() {
  estado.semestres = [];

  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id));
  let aprobadosSimulados = new Set(estado.aprobados);

  for (let s = 1; s <= SEMESTRES_OBJETIVO; s++) {
    let semestre = {
      numero: s,
      ramos: [],
      creditos: 0
    };

    let elegibles = pendientes.filter(r =>
      cumpleRequisitos(r, aprobadosSimulados)
    );

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

  //otro semestre
 
  if (pendientes.length > 0) {
    estado.semestres.push({
      numero: 9,
      ramos: pendientes,
      creditos: pendientes.length * CREDITOS_RAMO,
      aviso: "Extensión a 9° semestre (no ideal)"
    });
  }
}
