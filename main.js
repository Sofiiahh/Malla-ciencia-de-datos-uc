window.onload = function() {
  crearPlanner();
  mostrarObservaciones();

  const ramos = document.querySelectorAll(".ramo");
  ramos.forEach(ramo => {
    ramo.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.classList.add("dragging");
    });
    ramo.addEventListener("dragend", e => {
      e.target.classList.remove("dragging");
    });
  });

  const semestresDivs = document.querySelectorAll(".semestre");
  semestresDivs.forEach(sem => {
    sem.addEventListener("dragover", e => {
      e.preventDefault();
    });
    sem.addEventListener("drop", e => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const ramo = document.getElementById(id);
      sem.appendChild(ramo);
    });
  });
};
