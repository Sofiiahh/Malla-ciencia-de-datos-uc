document.addEventListener("DOMContentLoaded", () => {
  actualizarTodo();
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "<h2>Malla Interactiva</h2>";

  // Crear columnas por semestre
  for (let s = 1; s <= 8; s++) {
    const divSem = document.createElement("div");
    divSem.className = "semestre";
    divSem.innerHTML = `<h3>${s}° SEMESTRE</h3>`;
    const ul = document.createElement("ul");

    const ramosDelSem = ramos.filter(r => r.semestre === s);
    ramosDelSem.forEach(ramo => {
      const li = document.createElement("li");
      li.textContent = `${ramo.id} – ${ramo.nombre}`;
      li.classList.add(clasePorTipo(ramo));

      const reqs = ramo.req.length ? ramo.req.join("; ") : "Sin prerrequisitos";
      li.setAttribute("data-tooltip", `Requisitos: ${reqs}`);

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

function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  // Ramos anuales
  const anuales = ramos.filter(r => r.anual);
  if (anuales.length > 0) {
    let html = "<strong>RAMOS ANUALES:</strong><hr>";
    const sem1 = anuales.filter(r => r.semestre === 1);
    const sem2 = anuales.filter(r => r.semestre === 2);

    if (sem1.length > 0) {
      html += "<p>1er semestre:</p><ul>";
      sem1.forEach(r => html += `<li>${r.id} – ${r.nombre}</li>`);
      html += "</ul>";
    }
    if (sem2.length > 0) {
      html += "<p>2do semestre:</p><ul>";
      sem2.forEach(r => html += `<li>${r.id} – ${r.nombre}</li>`);
      html += "</ul>";
    }
    html += "<hr>";
    obs.innerHTML += html;
  }

  // Malla completa con prerrequisitos
  let htmlMalla = "<strong>MALLA Y REQUISITOS</strong><hr>";
  for (let s = 1; s <= 8; s++) {
    htmlMalla += `<p><strong>${s}° SEMESTRE</strong></p><ul>`;
    const ramosDelSem = ramos.filter(r => r.semestre === s);
    ramosDelSem.forEach(r => {
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

function actualizarTodo() {
  renderMalla();
  renderObservaciones();
}
