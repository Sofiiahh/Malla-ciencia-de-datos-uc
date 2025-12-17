// Rellena checkboxes para marcar ramos aprobados
function initFormulario() {
  const cont = document.getElementById("checkboxes");
  cont.innerHTML = "";
  for (let s = 1; s <= 8; s++) {
    const semDiv = document.createElement("div");
    semDiv.innerHTML = `<h4>${s}° Semestre</h4>`;
    ramos.filter(r => r.semestre === s).forEach(r => {
      const label = document.createElement("label");
      label.style.display = "block";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = r.id;
      checkbox.checked = estado.aprobados.has(r.id);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) estado.aprobados.add(r.id);
        else estado.aprobados.delete(r.id);
      });
      label.appendChild(checkbox);
      label.append(` ${r.id} – ${r.nombre}`);
      semDiv.appendChild(label);
    });
    cont.appendChild(semDiv);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initFormulario();
  document.getElementById("enviarBtn").addEventListener("click", () => {
    generarPlan();
    renderPlanner();
    renderObservaciones();
  });
});

function clasePorTipo(ramo) {
  if (ramo.tipo === "OFG") return "ofg";
  if (ramo.id.startsWith("OPR")) return "opr";
  return "regular";
}

// Renderiza el planner en columnas
function renderPlanner() {
  const cont = document.getElementById("plannerGrid");
  cont.innerHTML = "";
  cont.style.display = "flex";
  cont.style.gap = "10px";

  estado.semestres.forEach(s => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h3>Sem ${s.numero}</h3>`;
    const ul = document.createElement("ul");
    s.ramos.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.id} – ${r.nombre}`;
      li.classList.add(clasePorTipo(r));
      ul.appendChild(li);
    });
    div.appendChild(ul);
    if (s.aviso) {
      const aviso = document.createElement("p");
      aviso.style.color = "red";
      aviso.textContent = s.aviso;
      div.appendChild(aviso);
    }
    cont.appendChild(div);
  });
}

// Observaciones
function renderObservaciones() {
  const obs = document.getElementById("observaciones");
  obs.innerHTML = "<h2>Observaciones</h2>";

  const anuales = ramos.filter(r => r.anual);
  if (anuales.length) {
    let html = "<strong>Ramos anuales:</strong><hr>";
    const sem1 = anuales.filter(r => r.semestre === 1);
    const sem2 = anuales.filter(r => r.semestre === 2);
    if (sem1.length) html += "<p>1er semestre:</p><ul>" + sem1.map(r => `<li>${r.id} – ${r.nombre}</li>`).join("") + "</ul>";
    if (sem2.length) html += "<p>2do semestre:</p><ul>" + sem2.map(r => `<li>${r.id} – ${r.nombre}</li>`).join("") + "</ul>";
    html += "<hr>";
    obs.innerHTML += html;
  }

  let htmlMalla = "<strong>Malla y prerrequisitos:</strong><hr>";
  for (let s = 1; s <= 8; s++) {
    htmlMalla += `<p><strong>${s}° semestre</strong></p><ul>`;
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
