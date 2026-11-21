
const mongoose = require('mongoose');

// Importar los 9 modelos
const Usuario = require('./modelos/modelo_usuario');
const Carrera = require('./modelos/modelo_carrera');
const Departamento = require('./modelos/modelo_departamento');
const Asignatura = require('./modelos/modelo_asignatura');
const Periodo = require('./modelos/modelo_periodo');
const Seccion = require('./modelos/modelos_seccion');
const Matricula = require('./modelos/modelo_matricula');
const MovimientoMatricula = require('./modelos/modelo_movimiento_matricula');
const HistorialAcademico = require('./modelos/modelo_historial_academico');

// Identificadores temporales para probar las relaciones
const carreraId = new mongoose.Types.ObjectId();
const departamentoId = new mongoose.Types.ObjectId();
const asignaturaId = new mongoose.Types.ObjectId();
const periodoId = new mongoose.Types.ObjectId();
const seccionId = new mongoose.Types.ObjectId();
const usuarioId = new mongoose.Types.ObjectId();
const matriculaId = new mongoose.Types.ObjectId();

// Función para validar un modelo

async function probarModelo(nombre, documento) {
    try {
        await documento.validate();
        console.log(`✅ ${nombre}: CORRECTO`);
        return true;
    } catch (error) {
        console.log(`❌ ${nombre}: ERROR`);
        console.log(error.message);
        return false;
    }
}


// Datos de prueba
const usuarioEstudiante = new Usuario({
    id: 'USR-001',
    numero_identidad: '0801199912345',
    nombre_completo: 'Estudiante de Prueba',
    fecha_nacimiento: new Date('2000-05-15'),
    correo: 'estudiante@prueba.com',
    numero_cuenta: '20270001',
    contrasena: 'hash_de_prueba',
    carrera_id: carreraId,
    rol: 'estudiante',
    estado: 'activo'
});

const usuarioDocente = new Usuario({
    id: 'USR-002',
    numero_identidad: '0801199912346',
    nombre_completo: 'Docente de Prueba',
    fecha_nacimiento: new Date('1985-03-20'),
    correo: 'docente@prueba.com',
    contrasena: 'hash_de_prueba',
    rol: 'docente',
    numero_empleado: 'EMP-001',
    estado: 'activo'
});

const usuarioAdministrador = new Usuario({
    id: 'USR-003',
    nombre_completo: 'Administrador de Prueba',
    fecha_nacimiento: new Date('1980-01-10'),
    correo: 'admin@prueba.com',
    contrasena: 'hash_de_prueba',
    rol: 'administrador',
    numero_empleado: 'EMP-002',
    estado: 'activo'
});

const carrera = new Carrera({
    id: 'CAR-001',
    codigo: 'INF-001',
    nombre: 'Ingeniería en Sistemas',
    descripcion: 'Carrera de prueba',
    estado: 'activa'
});

const departamento = new Departamento({
    id: 'DEP-001',
    codigo: 'DEP-001',
    nombre: 'Departamento de Informática',
    descripcion: 'Departamento de prueba',
    estado: 'activo'
});

const asignatura = new Asignatura({
    id: 'ASI-001',
    codigo: 'IS-101',
    nombre: 'Programación Web',
    creditos: 4,
    descripcion: 'Asignatura de prueba',
    departamento_id: departamentoId,
    tipo: 'carrera',
    carrera_ids: [carreraId],
    prerrequisito_ids: [],
    estado: 'activa'
});

const periodo = new Periodo({
    id: 'PER-001',
    nombre: '2027-I',
    fecha_inicio: new Date('2027-01-15'),
    inicio_matricula: new Date('2027-01-01'),
    fin_matricula: new Date('2027-01-10'),
    fecha_limite_retiro: new Date('2027-02-15'),
    creditos_maximos: 20,
    estado: 'abierto'
});

const seccion = new Seccion({
    id: 'SEC-001',
    asignatura_id: asignaturaId,
    periodo_id: periodoId,
    codigo_seccion: 'IS-101-0800',
    docente: 'Docente de Prueba',
    aula: 'Aula 101',
    horario: [{
        dia: 1,
        minuto_inicio: 480,
        minuto_fin: 570
    }],
    cupo_maximo: 30,
    matriculados: 0,
    estado: 'activa'
});

const matricula = new Matricula({
    id: 'MAT-001',
    codigo: 'M-2027-001',
    estudiante_id: usuarioId,
    periodo_id: periodoId,
    estado: 'confirmada',
    confirmada_en: new Date(),
    total_creditos: 4,
    detalle: [{
        seccion_id: seccionId,
        asignatura_id: asignaturaId,
        departamento_id: departamentoId,
        departamento_nombre: 'Departamento de Informática',
        codigo_asignatura: 'IS-101',
        nombre_asignatura: 'Programación Web',
        codigo_seccion: 'IS-101-0800',
        creditos: 4,
        docente: 'Docente de Prueba',
        aula: 'Aula 101',
        horario: [{
            dia: 1,
            minuto_inicio: 480,
            minuto_fin: 570
        }],
        estado: 'activa',
        retirada_en: null
    }]
});

const movimiento = new MovimientoMatricula({
    id: 'MOV-001',
    matricula_id: matriculaId,
    estudiante_id: usuarioId,
    seccion_id: seccionId,
    accion: 'MATRICULAR',
    realizado_por: {
        id: usuarioId,
        rol: 'estudiante'
    }
});

const historial = new HistorialAcademico({
    id: 'HIS-001',
    estudiante_id: usuarioId,
    asignatura_id: asignaturaId,
    periodo_nombre: '2027-I',
    nota: 90,
    estado: 'aprobada'
});


async function ejecutarPruebas() {
    console.log('\n========== PRUEBA GENERAL DE MODELOS ==========\n');

    const resultados = [
        await probarModelo('Usuario - Estudiante', usuarioEstudiante),
        await probarModelo('Usuario - Docente', usuarioDocente),
        await probarModelo('Usuario - Administrador', usuarioAdministrador),
        await probarModelo('Carrera', carrera),
        await probarModelo('Departamento', departamento),
        await probarModelo('Asignatura', asignatura),
        await probarModelo('Periodo', periodo),
        await probarModelo('Sección', seccion),
        await probarModelo('Matrícula', matricula),
        await probarModelo('Movimiento de matrícula', movimiento),
        await probarModelo('Historial académico', historial)
    ];

    const correctos = resultados.filter(Boolean).length;
    const errores = resultados.length - correctos;

    console.log('\n=============== RESULTADO FINAL ===============');
    console.log(`Pruebas realizadas: ${resultados.length}`);
    console.log(`Correctas: ${correctos}`);
    console.log(`Con errores: ${errores}`);

    if (errores === 0) {
        console.log('\n🎉 ¡TODOS LOS MODELOS PASARON LA VALIDACIÓN!');
    } else {
        console.log('\n⚠️ Hay modelos que necesitan revisión.');
    }
}

ejecutarPruebas();
