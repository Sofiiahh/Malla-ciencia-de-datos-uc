const semestres = [
  { nombre: "1er Semestre", ramos: [
      { codigo: "IC1103", nombre: "Introducción a la Programación", prereq: [], nota: "" },
      { codigo: "MAT1107", nombre: "Introducción al Cálculo", prereq: [], nota: "" },
      { codigo: "MAT1207", nombre: "Introducción al Álgebra y Geometría", prereq: [], nota: "" },
      { codigo: "MAT0007", nombre: "Taller de Matemáticas para Estadística", prereq: [], nota: "" },
      { codigo: "FIL2001", nombre: "Filosofía, ¿Para qué?", prereq: [], nota: "" }
  ]},
  { nombre: "2do Semestre", ramos: [
      { codigo: "IIC2233", nombre: "Programación Avanzada", prereq: ["IC1103"], nota: "" },
      { codigo: "MAT1610", nombre: "Cálculo I", prereq: ["MAT1107"], nota: "" },
      { codigo: "IMT2210", nombre: "Álgebra Lineal para Ciencia de Datos", prereq: ["IC1103","MAT1107","MAT1207"], nota: "" },
      { codigo: "IMT2200", nombre: "Introducción a Ciencia de Datos", prereq: ["IC1103","MAT1207"], nota: "" },
      { codigo: "OFG - Teológico", nombre: "OFG Teológico", prereq: [], nota: "" }
  ]},
  { nombre: "3er Semestre", ramos: [
      { codigo: "IMT2220", nombre: "Cálculo para Ciencia de Datos", prereq: ["MAT1610"], nota: "" },
      { codigo: "IMT2230", nombre: "Álgebra Lineal Avanzada y Modelamiento", prereq: ["MAT1610","IMT2210"], nota: "" },
      { codigo: "ETI195", nombre: "Ética para Ciencia de Datos y Estadística", prereq: ["IIC2233","IMT2200"], nota: "" },
      { codigo: "IIC1253", nombre: "Matemáticas Discretas", prereq: ["IMT2210"], nota: "" },
      { codigo: "OFG - Artes", nombre: "OFG Artes", prereq: [], nota: "" }
  ]},
  { nombre: "4to Semestre", ramos: [
      { codigo: "EYP1025", nombre: "Modelos Probabilísticos", prereq: ["IMT2220","IMT2230"], nota: "" },
      { codigo: "IC2133", nombre: "Estructuras de Datos y Algoritmos", prereq: ["IIC2233","IIC1253"], nota: "" },
      { codigo: "IC2413", nombre: "Bases de Datos", prereq: ["IIC2233","IIC1253"], nota: "Puede pedir Matemáticas Discretas en el futuro" },
      { codigo: "IMT2250", nombre: "Optimización para Ciencia de Datos", prereq: ["IMT2220","IMT2210"], nota: "" },
      { codigo: "OFG - Ciencias Sociales", nombre: "OFG Ciencias Sociales", prereq: [], nota: "" }
  ]},
  { nombre: "5to Semestre", ramos: [
      { codigo: "EYP2114", nombre: "Inferencia Estadística", prereq: ["EYP1025"], nota: "" },
      { codigo: "IIC2613", nombre: "Inteligencia Artificial", prereq: ["EYP1025","IIC2233"], nota: "" },
      { codigo: "LIC2440", nombre: "Procesamiento de Datos Masivos", prereq: ["IC2413","IC2133"], nota: "" },
      { codigo: "OPR o Minor", nombre: "OPR/Minor", prereq: [], nota: "" },
      { codigo: "OFG - Ecología Integral y Sustentabilidad", nombre: "OFG Ecología", prereq: [], nota: "" }
  ]},
  { nombre: "6to Semestre", ramos: [
      { codigo: "EYP2101", nombre: "Procesos Estocásticos Aplicados", prereq: ["EYP2114"], nota: "" },
      { codigo: "EYP2301", nombre: "Análisis de Regresión", prereq: ["EYP2114"], nota: "" },
      { codigo: "C2026", nombre: "Visualización de la Información", prereq: ["IC1103"], nota: "" },
      { codigo: "IIC2433", nombre: "Minería de Datos", prereq: ["IC1103","EYP1025","IMT2210"], nota: "" },
      { codigo: "OFG - Humanidades", nombre: "OFG Humanidades", prereq: [], nota: "" }
  ]},
  { nombre: "7mo Semestre", ramos: [
      { codigo: "EYP2111", nombre: "Simulación", prereq: ["EYP2101"], nota: "" },
      { codigo: "EYP2801", nombre: "Métodos Bayesianos", prereq: ["EYP2114"], nota: "" },
      { codigo: "IMT2260", nombre: "Teoría de Aprendizaje Automático", prereq: ["IMT2250","EYP1025"], nota: "" },
      { codigo: "OPR o Minor", nombre: "OPR/Minor", prereq: [], nota: "" },
      { codigo: "OFG - Salud y Bienestar", nombre: "OFG Salud y Bienestar", prereq: [], nota: "" }
  ]},
  { nombre: "8vo Semestre", ramos: [
      { codigo: "IMT2270", nombre: "Proyecto de Graduación", prereq: ["EYP2801","IMT2260","IMT2250","ETI195"], nota: "" },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 1", prereq: [], nota: "" },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 2", prereq: [], nota: "" },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 3", prereq: [], nota: "" },
      { codigo: "OFG - Libre", nombre: "OFG Libre", prereq: [], nota: "" }
  ]}
];

const ramosAnuales = [
  "1er Semestre: IIC2440 – Procesamiento de Datos Masivos, EYP280I – Métodos Bayesianos, IMT2260 – Teoría de Aprendizaje Automático, FIS154D – Física",
  "2do Semestre: IMT2200 – Introducción a la Ciencia de Datos, INT2250 – Optimización para la Ciencia de Datos"
];
