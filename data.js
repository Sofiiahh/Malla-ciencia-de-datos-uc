const semestres = [
  {
    nombre: "1er Semestre",
    ramos: [
      { codigo: "IC1103", nombre: "Introducción a la Programación", prereq: [] },
      { codigo: "MAT1107", nombre: "Introducción al Cálculo", prereq: [] },
      { codigo: "MAT1207", nombre: "Introducción al Álgebra y Geometría", prereq: [] },
      { codigo: "MAT0007", nombre: "Taller de Matemáticas para Estadística", prereq: [] },
      { codigo: "FIL2001", nombre: "Filosofía, ¿Para qué?", prereq: [] }
    ]
  },
  {
    nombre: "2do Semestre",
    ramos: [
      { codigo: "IIC2233", nombre: "Programación Avanzada", prereq: ["IC1103"] },
      { codigo: "MAT1610", nombre: "Cálculo I", prereq: ["MAT1107"] },
      { codigo: "IMT2210", nombre: "Álgebra Lineal para Ciencia de Datos", prereq: ["IC1103","MAT1107","MAT1207"] },
      { codigo: "IMT2200", nombre: "Introducción a Ciencia de Datos", prereq: ["IC1103","MAT1207"] },
      { codigo: "OFG - Teológico", nombre: "OFG Teológico", prereq: [] }
    ]
  },
  {
    nombre: "3er Semestre",
    ramos: [
      { codigo: "IMT2220", nombre: "Cálculo para Ciencia de Datos", prereq: ["MAT1610"] },
      { codigo: "IMT2230", nombre: "Álgebra Lineal Avanzada y Modelamiento", prereq: ["MAT1610","IMT2210"] },
      { codigo: "ETI195", nombre: "Ética para Ciencia de Datos y Estadística", prereq: ["IIC2233","IMT2200"] },
      { codigo: "IIC1253", nombre: "Matemáticas Discretas", prereq: ["IMT2210"] },
      { codigo: "OFG - Artes", nombre: "OFG Artes", prereq: [] }
    ]
  },
  {
    nombre: "4to Semestre",
    ramos: [
      { codigo: "EYP1025", nombre: "Modelos Probabilísticos", prereq: ["IMT2220","IMT2230"] },
      { codigo: "IC2133", nombre: "Estructuras de Datos y Algoritmos", prereq: ["IIC2233","IIC1253"] },
      { codigo: "IC2413", nombre: "Bases de Datos", prereq: ["IIC2233","IIC1253"], nota: "Puede pedir Matemáticas Discretas en el futuro" },
      { codigo: "IMT2250", nombre: "Optimización para Ciencia de Datos", prereq: ["IMT2220","IMT2210"] },
      { codigo: "OFG - Ciencias Sociales", nombre: "OFG Ciencias Sociales", prereq: [] }
    ]
  },
  {
    nombre: "5to Semestre",
    ramos: [
      { codigo: "EYP2114", nombre: "Inferencia Estadística", prereq: ["EYP1025"] },
      { codigo: "IIC2613", nombre: "Inteligencia Artificial", prereq: ["EYP1025","IIC2233"] },
      { codigo: "LIC2440", nombre: "Procesamiento de Datos Masivos", prereq: ["IC2413","IC2133"] },
      { codigo: "OPR o Minor", nombre: "OPR/Minor", prereq: [] },
      { codigo: "OFG - Ecología Integral y Sustentabilidad", nombre: "OFG Ecología", prereq: [] }
    ]
  },
  {
    nombre: "6to Semestre",
    ramos: [
      { codigo: "EYP2101", nombre: "Procesos Estocásticos Aplicados", prereq: ["EYP2114"] },
      { codigo: "EYP2301", nombre: "Análisis de Regresión", prereq: ["EYP2114"] },
      { codigo: "C2026", nombre: "Visualización de la Información", prereq: ["IC1103"] },
      { codigo: "IIC2433", nombre: "Minería de Datos", prereq: ["IC1103","EYP1025","IMT2210"] },
      { codigo: "OFG - Humanidades", nombre: "OFG Humanidades", prereq: [] }
    ]
  },
  {
    nombre: "7mo Semestre",
    ramos: [
      { codigo: "EYP2111", nombre: "Simulación", prereq: ["EYP2101"] },
      { codigo: "EYP2801", nombre: "Métodos Bayesianos", prereq: ["EYP2114"] },
      { codigo: "IMT2260", nombre: "Teoría de Aprendizaje Automático", prereq: ["IMT2250","EYP1025"] },
      { codigo: "OPR o Minor", nombre: "OPR/Minor", prereq: [] },
      { codigo: "OFG - Salud y Bienestar", nombre: "OFG Salud y Bienestar", prereq: [] }
    ]
  },
  {
    nombre: "8vo Semestre",
    ramos: [
      { codigo: "IMT2270", nombre: "Proyecto de Graduación", prereq: ["EYP2801","IMT2260","IMT2250","ETI195"] },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 1", prereq: [] },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 2", prereq: [] },
      { codigo: "OPR o Minor", nombre: "OPR/Minor 3", prereq: [] },
      { codigo: "OFG - Libre", nombre: "OFG Libre", prereq: [] }
    ]
  }
];

// Ramos anuales
const ramosAnuales = [
  "1er Semestre: IIC2440 – Procesamiento de Datos Masivos, EYP280I – Métodos Bayesianos, IMT2260 – Teoría de Aprendizaje Automático, FIS154D – Física",
  "2do Semestre: IMT2200 – Introducción a la Ciencia de Datos, INT2250 – Optimización para la Ciencia de Datos"
];
