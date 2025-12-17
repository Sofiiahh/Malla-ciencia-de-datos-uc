function crearPlanner(aprobados = []) {
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
      ramoDiv.dataset.codigo = ramo.codigo;
      ramoDiv.textContent = `${ramo.codigo} - ${ramo.nombre}`;

      // Determinar estado
      if(aprobados.includes(ramo.codigo)) {
        ramoDiv.classList.add("aprobado");
      } else if(ramo.prereq.every(p => aprobados.includes(p))) {
        ramoDiv.classList.add("sugerido");
      } else {
        ramoDiv.classList.add("bloqueado");
      }

      // Permitir marcar/desmarcar aprobado
      ramoDiv.addEventListener("click", () => {
        if(ramoDiv.classList.contains("aprobado")) {
          aprobados = aprobados.filter(c => c !== ramo.codigo);
        } else {
          aprobados.push(ramo.codigo);
        }
        crearPlanner(aprobados);
      });

      div.appendChild(ramoDiv);
    });

    contenedor.appendChild(div);
  });
}

function mostrarObservaciones() {
  const contenedor = document.getElementById("ramosAnuales");
  contenedor.innerHTML = "";
  ramosAnuales.forEach(ramo => {
    const p = document.createElement("p");
    p.textContent = ramo;
    contenedor.appendChild(p);
  });
}
