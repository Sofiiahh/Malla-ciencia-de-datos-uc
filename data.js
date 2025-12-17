// Créditos y configuración
const CREDITOS_RAMO = 10;
const MAX_CREDITOS_SEMESTRE = 60;
const SEMESTRES_OBJETIVO = 8;

// Ramos de la malla
const ramos = [
  // 1er semestre
  { id: "IC1103", nombre: "Introducción a la Programación", semestre: 1, req: [] },
  { id: "MAT1107", nombre: "Introducción al Cálculo", semestre: 1, req: [] },
  { id: "MAT1207", nombre: "Introducción al Álgebra y Geometría", semestre: 1, req: [] },
  { id: "MAT0007", nombre: "Taller de Matemáticas para Estadística", semestre: 1, req: [] },
  { id: "FIL2001", nombre: "Filosofía: ¿Para qué?", semestre: 1, req: [], tipo: "OFG" },

  // 2do semestre
  { id: "IIC2233", nombre: "Programación Avanzada", semestre: 2, req: ["IC1103"] },
  { id: "MAT1610", nombre: "Cálculo I", semestre: 2, req: ["MAT1107"] },
  { id: "IMT2210", nombre: "Álgebra Lineal para Ciencia de Datos", semestre: 2, req: ["IC1103","MAT1107","MAT1207"] },
  { id: "IMT2200", nombre: "Introducción a la Ciencia de Datos", semestre: 2, req: ["IC1103","MAT1207"], anual:true },
  { id: "OFG2", nombre: "OFG Teológico", semestre: 2, req: [], tipo:"OFG" },

  // 3er semestre
  { id: "IMT2220", nombre: "Cálculo para Ciencia de Datos", semestre: 3, req:["MAT1610"] },
  { id: "IMT2230", nombre: "Álgebra Lineal Avanzada y Modelamiento", semestre:3, req:["MAT1610","IMT2210"] },
  { id: "ETI195", nombre: "Ética para Ciencia de Datos y Estadística", semestre:3, req:["IIC2233","IMT2200"] },
  { id: "IIC1253", nombre: "Matemáticas Discretas", semestre:3, req:["IMT2210"] },
  { id: "OFG3", nombre:"OFG Artes", semestre:3, req:[], tipo:"OFG" },

  // 4to semestre
  { id:"EYP1025", nombre:"Modelos Probabilísticos", semestre:4, req:["IMT2220","IMT2230"] },
  { id:"IC2133", nombre:"Estructuras de Datos y Algoritmos", semestre:4, req:["IIC2233","IIC1253"] },
  { id:"IC2413", nombre:"Bases de Datos", semestre:4, req:["IIC2233"], aviso:"Podría requerir Matemáticas Discretas en el futuro" },
  { id:"IMT2250", nombre:"Optimización para Ciencia de Datos", semestre:4, req:["IMT2220","IMT2210"], anual:true },
  { id:"OFG4", nombre:"OFG Ciencias Sociales", semestre:4, req:[], tipo:"OFG" },

  // 5to semestre
  { id:"EYP2114", nombre:"Inferencia Estadística", semestre:5, req:["EYP1025"] },
  { id:"IIC2613", nombre:"Inteligencia Artificial", semestre:5, req:["EYP1025","IIC2233"] },
  { id:"LIC2440", nombre:"Procesamiento de Datos Masivos", semestre:5, req:["IC2413","IC2133"], anual:true },
  { id:"OPR5", nombre:"OPR o Minor", semestre:5, req:[] },
  { id:"OFG5", nombre:"OFG Ecología Integral y Sustentabilidad", semestre:5, req:[], tipo:"OFG" },

  // 6to semestre
  { id:"EYP2101", nombre:"Procesos Estocásticos Aplicados", semestre:6, req:["EYP2114"] },
  { id:"EYP2301", nombre:"Análisis de Regresión", semestre:6, req:["EYP2114"] },
  { id:"C2026", nombre:"Visualización de la Información", semestre:6, req:["IC1103"] },
  { id:"IIC2433", nombre:"Minería de Datos", semestre:6, req:["IC1103","EYP1025","IMT2210"] },
  { id:"OFG6", nombre:"OFG Humanidades", semestre:6, req:[], tipo:"OFG" },

  // 7mo semestre
  { id:"EYP2111", nombre:"Simulación", semestre:7, req:["EYP2101"] },
  { id:"EYP2801", nombre:"Métodos Bayesianos", semestre:7, req:["EYP2114"], anual:true },
  { id:"IMT2260", nombre:"Teoría de Aprendizaje Automático", semestre:7, req:["IMT2250","EYP1025"], anual:true },
  { id:"OPR7", nombre:"OPR o Minor", semestre:7, req:[] },
  { id:"OFG7", nombre:"OFG Salud y Bienestar", semestre:7, req:[], tipo:"OFG" },

  // 8vo semestre
  { id:"IMT2270", nombre:"Proyecto de Graduación", semestre:8, req:["EYP2801","IMT2260","IMT2250","ETI195"] },
  { id:"OPR8A", nombre:"OPR o Minor", semestre:8, req:[] },
  { id:"OPR8B", nombre:"OPR o Minor", semestre:8, req:[] },
  { id:"OPR8C", nombre:"OPR o Minor", semestre:8, req:[] },
  { id:"OFG8", nombre:"OFG Libre", semestre:8, req:[], tipo:"OFG" }
];
