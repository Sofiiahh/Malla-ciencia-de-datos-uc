document.addEventListener("DOMContentLoaded", () => {
  renderMalla(); // muestra la malla inicial
});

document.getElementById("actualizarBtn").addEventListener("click", () => {
  actualizarTodo(); // genera planificación al presionar enviar
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Renderiza la malla interactiva
function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let s = 1; s <= 8; s++) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>${s}° SEMESTRE</h3>`;
    const ul = document.createElement("ul");

    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} – ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));

      if (estado.aprobados.has(ramo.id)) li.classList.add("aprobado");

      li.addEventListener("click", () => {
        if (estado.aprobados.has(ramo.id)) {
          estado.aprobados.delete(ramo.id);
          li.classList.remove("aprobado");
        } else {
          estado.aprobados.add(ramo.id);
          li.classList.add("aprobado");
        }
      });

      ul.appendChild(li);
    });

    divSem.appendChild(ul);
    contenedor.appendChild(divSem);
  }
}

// Observaciones con ramos anuales y prerrequisitos
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  // Ramos anuales
  const anuales = ramos.filter(r => r.anual);
  if (anuales.length > 0) {
    let html = "<strong>RAMOS ANUALES:</strong><hr>";
    const sem1 = anuales.filter(r => r.semestre === 1);
    const sem2 = anuales.filter(r => r.semestre === 2);

    if (sem1.length) {
      html += "<p>1er semestre:</p><ul>";
      sem1.forEach(r => html += `<li>${r.id} – ${r.nombre}</li>`);
      html += "</ul>";
    }
    if (sem2.length) {
      html += "<p>2do semestre:</p><ul>";
      sem2.forEach(r => html += `<li>${r.id} – ${r.nombre}</li>`);
      html += "</ul>";
    }
    html += "<hr>";
    obs.innerHTML += html;
  }

  // Malla con prerrequisitos
  let htmlMalla = "<strong>MALLA Y REQUISITOS:</strong><hr>";
  for (let s = 1; s <= 8; s++) {
    htmlMalla += `<p><strong>${s}° SEMESTRE</strong></p><ul>`;
    ramos.filter(r => r.semestre === s).forEach(r => {
      const prereqs = r.req.length ? r.req.map(id => {
        const rj = ramos.find(x => x.id === id);
        return rj ? `${rj.id} (${rj.nombre})` : id;
      }).join("; ") : "Sin prerrequisitos";
      htmlMalla += `<li>${r.id} – ${r.nombre} → Requiere: ${prereqs}</li>`;
    });
    htmlMalla += "</ul>";
  }
  obs.innerHTML += htmlMalla;
}

// Actualiza la planificación dinámica
function actualizarTodo() {
  generarPlan(); // del planner.js
  renderMalla();
  renderObservaciones();
}
