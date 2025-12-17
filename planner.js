function cumpleRequisitos(ramo, aprobadosSimulados) {
  return ramo.req.every(r => aprobadosSimulados.has(r));
}

function creditosRamo(ramo) {
  return CREDITOS_RAMO;
}

function generarPlan() {
  estado.semestres = [];
  let pendientes = ramos.filter(r => !estado.aprobados.has(r.id));
  let aprobadosSimulados = new Set(estado.aprobados);

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
