import { Subject } from './types';

export const initialSubjects: Subject[] = [
  {
    id: 'am1',
    icon: 'FunctionSquare',
    name: 'Análisis Matemático 1',
    color: 'bg-blue-500',
    bgLight: 'bg-blue-50 dark:bg-blue-900/30',
    schedule: 'Miércoles 08.00 a 12.00 hs',
    status: 'active',
    exams: [
      { id: 'es1', title: 'ES 1: Funciones', date: '2026-09-09', type: 'es' },
      { id: 'es2', title: 'ES 2: Límite funcional', date: '2026-09-30', type: 'es' },
      { id: 'p1', title: 'Primer Parcial', date: '2026-10-07', type: 'parcial' },
      { id: 'es3', title: 'ES 3: Derivada', date: '2026-11-04', type: 'es' },
      { id: 'es4', title: 'ES 4: Regla Cadena', date: '2026-11-18', type: 'es' },
      { id: 'p2', title: 'Segundo Parcial', date: '2026-11-25', type: 'parcial' },
      { id: 'rec', title: 'Recuperatorio', date: '2026-12-02', type: 'recuperatorio' },
    ],
    units: [
      {
        id: 'u1',
        title: 'Unidad 1: Funciones',
        topics: [
          { id: 't1_1', title: 'Definición, dominio, imagen y representación', deadline: '2026-08-19', completed: false },
          { id: 't1_2', title: 'Funciones como modelos. Ceros y signos', deadline: '2026-08-26', completed: false },
          { id: 't1_3', title: 'Funciones par e impar. Algebraicas y trascendentes', deadline: '2026-09-02', completed: false },
          { id: 't1_4', title: 'Álgebra de funciones y desplazamientos', deadline: '2026-09-09', completed: false },
          { id: 't1_5', title: 'Funciones biyectivas e inversas', deadline: '2026-09-16', completed: false },
        ]
      },
      {
        id: 'u2',
        title: 'Unidad 2: Límite funcional',
        topics: [
          { id: 't2_1', title: 'Distancia, entorno y límite finito', deadline: '2026-09-16', completed: false },
          { id: 't2_2', title: 'Límites laterales y propiedades', deadline: '2026-09-23', completed: false },
          { id: 't2_3', title: 'Infinitésimos y límites infinitos', deadline: '2026-09-30', completed: false },
          { id: 't2_4', title: 'Indeterminaciones y asíntotas', deadline: '2026-10-07', completed: false },
          { id: 't2_5', title: 'Continuidad y discontinuidades', deadline: '2026-10-14', completed: false },
        ]
      },
      {
        id: 'u3',
        title: 'Unidad 3: Derivada',
        topics: [
          { id: 't3_1', title: 'Razón de cambio y derivada en un punto', deadline: '2026-10-21', completed: false },
          { id: 't3_2', title: 'Recta tangente, normal y derivadas laterales', deadline: '2026-10-28', completed: false },
          { id: 't3_3', title: 'Reglas de derivación y composition', deadline: '2026-11-04', completed: false },
          { id: 't3_4', title: 'Derivada inversa, implícita y logarítmica', deadline: '2026-11-11', completed: false },
        ]
      },
      {
        id: 'u4',
        title: 'Unidad 4: Polinomios de Taylor',
        topics: [
          { id: 't4_1', title: 'Órdenes de contacto y expresión de polinomio', deadline: '2026-11-11', completed: false },
          { id: 't4_2', title: 'Taylor y Mac Laurin. Aproximación lineal', deadline: '2026-11-18', completed: false },
        ]
      }
    ]
  },
  {
    id: 'isi',
    icon: 'Network',
    name: 'Introducción a los Sistemas de Información',
    color: 'bg-purple-500',
    bgLight: 'bg-purple-50 dark:bg-purple-900/30',
    schedule: 'Martes 19.00 a 23.00 hs',
    status: 'active',
    exams: [
      { id: 'isi_tp1', title: 'Entrega TP: Estudio y Análisis', date: '2026-09-22', type: 'tp' },
      { id: 'isi_p1', title: '1era Evaluación', date: '2026-09-29', type: 'parcial' },
      { id: 'isi_tp2', title: 'Entrega TP Integrador', date: '2026-10-27', type: 'tp' },
      { id: 'isi_p2', title: '2da Evaluación', date: '2026-11-03', type: 'parcial' },
      { id: 'isi_exp', title: 'Exposiciones del TP Integrador', date: '2026-11-10', type: 'es' },
      { id: 'isi_rec', title: 'Recuperatorio', date: '2026-11-17', type: 'recuperatorio' },
      { id: 'isi_notas', title: 'Devolución de notas', date: '2026-11-24', type: 'es' },
      { id: 'isi_cierre', title: 'Cierre de cursada', date: '2026-12-01', type: 'es' }
    ],
    units: [
      {
        id: 'isi_u1',
        title: 'Unidad 1: Definición de Sistema',
        topics: [
          { id: 'isi_u1_t1', title: 'Concepto de Sistema, Subsistema, Módulo. TGS.', deadline: '2026-08-18', completed: false }
        ]
      },
      {
        id: 'isi_u2',
        title: 'Unidad 2: Teoría General de Sistemas',
        topics: [
          { id: 'isi_u2_t1', title: 'Función, objetivos, alcance y límites. Enfoque sistémico.', deadline: '2026-08-25', completed: false }
        ]
      },
      {
        id: 'isi_u3',
        title: 'Unidad 3: Tipos de sistemas',
        topics: [
          { id: 'isi_u3_t1', title: 'Tipos de sistemas en la organización. Seguridad informática.', deadline: '2026-09-01', completed: false }
        ]
      },
      {
        id: 'isi_u4',
        title: 'Unidad 4: Resolución de Problemas',
        topics: [
          { id: 'isi_u4_t1', title: 'Problema. Definición y métodos de Resolución.', deadline: '2026-09-08', completed: false },
          { id: 'isi_u4_t2', title: 'El problema y su solución software. Fases del proyecto.', deadline: '2026-09-15', completed: false }
        ]
      },
      {
        id: 'isi_u5',
        title: 'Unidad 5: Ciclos de vida',
        topics: [
          { id: 'isi_u5_t1', title: 'Ciclos de vida: cascada, prototipos, espiral, ágiles.', deadline: '2026-10-06', completed: false }
        ]
      },
      {
        id: 'isi_u6',
        title: 'Unidad 6: Trabajo en Equipo',
        topics: [
          { id: 'isi_u6_t1', title: 'Stakeholders y sus roles. Juego de roles. Escucha Activa.', deadline: '2026-10-13', completed: false },
          { id: 'isi_u6_t2', title: 'Metodologías ágiles. Entrevista Cliente – Empresa SW.', deadline: '2026-10-20', completed: false }
        ]
      }
    ]
  },
  {
    id: 'ipi',
    icon: 'Briefcase',
    name: 'Introducción a Proyectos Informáticos',
    color: 'bg-pink-500',
    bgLight: 'bg-pink-50 dark:bg-pink-900/30',
    schedule: 'Sábado 08.00 a 12.00 hs',
    status: 'active',
    exams: [
      { id: 'ipi_p1', title: 'PRIMER PARCIAL (SEMANA 1 A 6)', date: '2026-10-10', type: 'parcial' },
      { id: 'ipi_p2', title: 'SEGUNDO PARCIAL (SEMANA 7 A 12)', date: '2026-11-14', type: 'parcial' },
      { id: 'ipi_notas', title: 'ENTREGA DE NOTAS', date: '2026-11-21', type: 'es' },
      { id: 'ipi_rec', title: 'RECUPERATORIO', date: '2026-11-28', type: 'recuperatorio' },
      { id: 'ipi_cierre', title: 'CIERRE DE CURSO', date: '2026-12-05', type: 'es' }
    ],
    units: [
      {
        id: 'ipi_u1',
        title: 'Unidad 1: Organización de las empresas: Estructuras y Pilares',
        topics: [
          { id: 'ipi_u1_t1', title: 'Concepto de Organización y Estructura. Organigrama y Organizaciones Virtuales', deadline: '2026-08-22', completed: false },
          { id: 'ipi_u1_t2', title: 'Tipos de estructuras: ACME. Híbridas, Matricial, Orientadas a proyectos, Ágiles', deadline: '2026-08-29', completed: false },
          { id: 'ipi_u1_t3', title: 'Teoría General de Sistemas', deadline: '2026-09-12', completed: false }
        ]
      },
      {
        id: 'ipi_u2',
        title: 'Unidad 2: Las Funciones Gerenciales',
        topics: [
          { id: 'ipi_u2_t1', title: 'Las funciones Gerenciales. Planificación. Parte I.', deadline: '2026-10-17', completed: false },
          { id: 'ipi_u2_t2', title: 'Planificación. Parte II. El control y Análisis de la cadena de valor', deadline: '2026-10-24', completed: false },
          { id: 'ipi_u2_t3', title: 'La decisión', deadline: '2026-10-31', completed: false }
        ]
      },
      {
        id: 'ipi_u3',
        title: 'Unidad 3: Conocimiento de Negocios',
        topics: [
          { id: 'ipi_u3_t1', title: 'Micro y Macro economía. Flujo circular de la economía. Equilibrio y Mercados', deadline: '2026-09-05', completed: false }
        ]
      },
      {
        id: 'ipi_u4',
        title: 'Unidad 4: Administración de servicios',
        topics: [
          { id: 'ipi_u4_t1', title: 'Productos y Servicios. Conceptos. Diferencias. Desarrollo', deadline: '2026-09-19', completed: false },
          { id: 'ipi_u4_t2', title: 'Desarrollo de nuevos servicios.', deadline: '2026-09-26', completed: false }
        ]
      },
      {
        id: 'ipi_u5',
        title: 'Unidad 5: Desarrollo de Proyectos SW y gestión de requerimientos',
        topics: [
          { id: 'ipi_u5_t1', title: 'Desarrollo SW. Gestión de Requerimientos.', deadline: '2026-10-03', completed: false }
        ]
      },
      {
        id: 'ipi_u6',
        title: 'Unidad 6: Ética y moral en las organizaciones',
        topics: [
          { id: 'ipi_u6_t1', title: 'Ética y moral en las Organizaciones.', deadline: '2026-11-07', completed: false }
        ]
      }
    ]
  },
  {
    id: 'prog',
    icon: 'TerminalSquare',
    name: 'Programación Inicial',
    color: 'bg-green-500',
    bgLight: 'bg-green-50 dark:bg-green-900/30',
    schedule: 'Lunes 08.00 a 12.00 hs',
    status: 'active',
    exams: [
      { id: 'prog_p1', title: 'PARCIAL 1', date: '2026-09-28', type: 'parcial' },
      { id: 'prog_p2', title: 'PARCIAL 2', date: '2026-11-09', type: 'parcial' }
    ],
    units: [
      {
        id: 'prog_u1',
        title: 'Unidades 1 y 2: Introducción y Secuencial',
        topics: [
          { id: 'prog_u1_t1', title: 'Introducción. Estructura Secuencial. Primeras nociones de C.', deadline: '2026-08-17', completed: false }
        ]
      },
      {
        id: 'prog_u3',
        title: 'Unidades 3 y 4: Lenguaje C y Selección',
        topics: [
          { id: 'prog_u3_t1', title: 'Lenguaje C. Estructura Selección.', deadline: '2026-08-24', completed: false }
        ]
      },
      {
        id: 'prog_u5',
        title: 'Unidad 5: Estructura de Iteración',
        topics: [
          { id: 'prog_u5_t1', title: 'Iteración Indefinida. Máximos y mínimos. Contadores y acumuladores.', deadline: '2026-08-31', completed: false },
          { id: 'prog_u5_t2', title: 'Iteración Definida. Ejercitación.', deadline: '2026-09-07', completed: false }
        ]
      },
      {
        id: 'prog_u6',
        title: 'Unidad 6: Funciones',
        topics: [
          { id: 'prog_u6_t1', title: 'Ejercicios integradores. Funciones. Refuerzo de conceptos.', deadline: '2026-09-14', completed: false },
          { id: 'prog_u6_t2', title: 'Funciones de validación. Tipos de parámetros. Práctica para el parcial.', deadline: '2026-09-21', completed: false }
        ]
      },
      {
        id: 'prog_u7',
        title: 'Unidad 7: Arreglos de datos (Vectores y Matrices)',
        topics: [
          { id: 'prog_u7_t1', title: 'Vectores: Acceso secuencial, Carga Parcial y segura, Carga sin duplicado, Vectores paralelos.', deadline: '2026-10-05', completed: false },
          { id: 'prog_u7_t2', title: 'Acceso directo a vectores. Operaciones: Ordenamiento y Búsqueda.', deadline: '2026-10-12', completed: false },
          { id: 'prog_u7_t3', title: 'Máximos y mínimos múltiples. Matrices. Vectores paralelos a matrices. Acceso directo.', deadline: '2026-10-19', completed: false },
          { id: 'prog_u7_t4', title: 'Recorridos de Matrices. Suma por fila y columna. Máximos y mínimos múltiples.', deadline: '2026-10-26', completed: false },
          { id: 'prog_u7_t5', title: 'Ejercicios integradores. Práctica de Parcial.', deadline: '2026-11-02', completed: false }
        ]
      }
    ]
  },
  {
    id: 'sn',
    icon: 'Binary',
    name: 'Sistemas de Numeración',
    color: 'bg-red-500',
    bgLight: 'bg-red-50 dark:bg-red-900/30',
    schedule: 'Martes 08.00 a 12.00 hs',
    status: 'active',
    exams: [
      { id: 'sn_tpg1', title: 'TP Grupal 1', date: '2026-09-01', type: 'tp' },
      { id: 'sn_tpg2', title: 'TP Grupal 2', date: '2026-09-22', type: 'tp' },
      { id: 'sn_p1', title: '1er Parcial', date: '2026-09-29', type: 'parcial' },
      { id: 'sn_tpg3', title: 'TP Grupal 3', date: '2026-10-20', type: 'tp' },
      { id: 'sn_tpg4', title: 'TP Grupal U4', date: '2026-11-03', type: 'tp' },
      { id: 'sn_p2', title: '2do Parcial', date: '2026-11-10', type: 'parcial' },
      { id: 'sn_notas', title: 'Devolución de Notas', date: '2026-11-17', type: 'es' },
      { id: 'sn_rec', title: 'Recuperatorio', date: '2026-11-24', type: 'recuperatorio' }
    ],
    units: [
      {
        id: 'sn_u1',
        title: 'Unidad 1: Digitalización y Tecnologías Digitales',
        topics: [
          { id: 'sn_u1_t1', title: 'Información, Datos y Resultados. Magnitudes. Revolución 4.0.', deadline: '2026-08-18', completed: false }
        ]
      }
    ]
  },
  {
    id: 'curso_ingreso',
    icon: 'GraduationCap',
    name: 'Curso de Ingreso',
    color: 'bg-teal-500',
    bgLight: 'bg-teal-50 dark:bg-teal-900/30',
    status: 'passed',
    exams: [],
    units: []
  },
  {
    id: 'mat_discreta',
    icon: 'Network',
    name: 'Matemática Discreta',
    color: 'bg-indigo-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-900/30',
    status: 'passed',
    exams: [],
    units: []
  },
  {
    id: 'calidad_sw',
    icon: 'ShieldCheck',
    name: 'Principios de Calidad de Software',
    color: 'bg-cyan-500',
    bgLight: 'bg-cyan-50 dark:bg-cyan-900/30',
    status: 'passed',
    exams: [],
    units: []
  }
];
