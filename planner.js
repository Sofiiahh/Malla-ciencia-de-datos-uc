function crearPlanner() {
  const contenedor = document.getElementById("semestres");
  contenedor.innerHTML = "";

  semestres.forEach(semestre => {
    const div = document.createElement("div");
    div.className = "semestre";

    const h3 = document.createElement("h3");
    h3.textContent = semestre.nombre;
    div.appendChild(h3);

    semestre.ramos.forEach(ramo => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.draggable = true;
      ramoDiv.id = ramo.codigo;
      ramoDiv.textContent = `${ramo.codigo} - ${ramo.nombre}`;
      if(ramo.nota) {
        const aviso = document.createElement("small");
        aviso.textContent = " (" + ramo.nota + ")";
        ramoDiv.appendChild(aviso);
      }
      div.appendChild(ramoDiv);
    });

    contenedor.appendChild(div);
  });
}

function mostrarObservaciones() {
  const contenedor = document.getElementById("observaciones");
  contenedor.innerHTML = "<h3>Ramos Anuales:</h3>";
  ramosAnuales.forEach(ramo => {
    const p = document.createElement("p");
    p.textContent = ramo;
    contenedor.appendChild(p);
  });
}
