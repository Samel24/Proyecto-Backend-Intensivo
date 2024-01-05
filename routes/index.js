var express = require('express');
var router = express.Router();
const Estudiantes = require('../controllers/estudiantes');
const Profesores = require('../controllers/profesores');
const Catedras = require('../controllers/catedras');
const Carreras = require('../controllers/carreras');
const Sedes = require('../controllers/sedes');
const Empleados = require('../controllers/empleados');
const Eventos = require('../controllers/eventos');

/* Vista 1. */
router.get('/', function (req, res, next) {
  Estudiantes.listar()
    .then((resultado) => {
      console.log(resultado.estudiantes)
      const total = resultado.estudiantes
      res.render('index', { estudiantes: total, alerta: false });

    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Estudiantes", error: error })
    })
});

/* Eliminar estudiante */
router.get('/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Estudiantes.eliminar(id)
    .then((resultado) => {
      console.log({ status: 200, data: resultado })

      Estudiantes.listar()
      .then((data) => {
        Estudiantes.listar()
        
        res.render('index', { estudiantes: data.estudiantes, alerta: true, mensaje: 'Se eliminó exitosamente el Estudiante', tipo: 'success' })
      })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('index', { estudiantes: total, alerta: true, mensaje: "No se ha podido eliminar el Estudiante", tipo: 'warning' })
    })
});

/* Vista 2. */
router.get('/crear', function (req, res, next) {
  res.render('crear', { alerta: false });
});

/* Vista 3. */
router.get('/editar/:id', async function (req, res, next) {
  const { id } = req.params
  const estudiante = await Estudiantes.mostrar(id)
  console.log(estudiante)
  res.render('editar', { alerta: false, estudiante: estudiante.estudiante[0] });
});

/* POST Estudiantes */
router.post('/estudiante', function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    edad: Number(req.body.edad),
    carrera: req.body.carrera
  }
  Estudiantes.agregar(body)
    .then((resultado) => {
      console.log({ status: 200, data: resultado })
      res.render('crear', { alerta: true, mensaje: 'Se agrego exitosamente el Estudiante', tipo: 'success' })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('crear', { alerta: true, mensaje: "No se ha podido agregar el Estudiante", tipo: 'warning' })
    })
})

/* PUT Estudiantes */
router.post('/estudiante/editar/:id', function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    edad: Number(req.body.edad),
  }

  const { id } = req.params

  Estudiantes.editar(body, id)
    .then( async (resultado) => {
      console.log({ status: 200, data: resultado })
      const estudiante = await Estudiantes.mostrar(id)
      res.render('editar', { alerta: true, mensaje: 'Se edito exitosamente el Estudiante', tipo: 'success', estudiante: estudiante.estudiante[0] })
    })
    .catch( async (error) => {
      console.log({ status: 400, error: error })
      const estudiante = await Estudiantes.mostrar(id)
      res.render('editar', { alerta: true, mensaje: "No se ha podido editar el Estudiante", tipo: 'warning', estudiante: estudiante.estudiante[0] })
    })
})

/* Vista Profesores. */
router.get('/profesores/vista', function (req, res, next) {
  Profesores.listar()
    .then((resultado) => {
      const total = resultado.Profesores
      res.render('profesores', { profesores: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar los Profesores", error: error })
    })
});

/* Eliminar Profesor */
router.get('/profesores/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Profesores.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const data = await Profesores.listar()
      res.render('profesores', { profesores: data.Profesores, alerta: true, mensaje: 'Se eliminó exitosamente el Profesor', tipo: 'success' })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('profesores', { profesores: data.Profesores, alerta: true, mensaje: "No se ha podido eliminar el Profesor", tipo: 'warning' })
    })
});

/* Vista 2 Profesores. */
router.get('/profesores/vista/crear', async function (req, res, next) {
  const catedras = await Catedras.listar()
  res.render('profesores_crear', { alerta: false, catedras: catedras.Catedras });
})

/* POST Profesores */
router.post('/profesores/vista/crear', function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    edad: Number(req.body.edad),
    catedra: req.body.catedra
  }
  Profesores.agregar(body)
    .then(async (resultado) => {
      console.log({ status: 200, data: resultado })
      const catedras = await Catedras.listar()
      res.render('profesores_crear', { alerta: true, mensaje: 'Se agrego exitosamente el Profesor', tipo: 'success', catedras: catedras.Catedras })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const catedras = await Catedras.listar()
      res.render('profesores_crear', { alerta: true, mensaje: "No se ha podido agregar el Profesor", tipo: 'warning', catedras: catedras.Catedras })
    })
})










/* Vista Carreras. */
router.get('/carreras/vista', function (req, res, next) {
  Carreras.listar()
    .then((resultado) => {
      const total = resultado.Carreras
      res.render('carreras/carreras', { carreras: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar las Carreras", error: error })
    })
});

/* Eliminar Carreras */
router.get('/carreras/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Carreras.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const datos = await Carreras.listar()
      res.render('carreras/carreras', { carreras: datos.Carreras, alerta: true, mensaje: 'Se eliminó exitosamente la Carrera', tipo: 'success' })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const datos = await Carreras.listar()
      res.render('carreras/carreras', { carreras: datos.Carreras, alerta: true, mensaje: "No se ha podido eliminar la Carrera", tipo: 'warning' })
    })
});

/* Vista 2 Carreras. */
router.get('/carreras/vista/crear', async function (req, res, next) {
  res.render('carreras/carreras_crear', { alerta: false});
})

/* POST Carreras */
router.post('/carreras/vista/crear', async function (req, res, next) {
  const body = {
    nombre: req.body.nombre
  }
  Carreras.agregar(body)
    .then((resultado) => {
      console.log({ status: 200, data: resultado })
      res.render('carreras/carreras_crear', { alerta: true, mensaje: 'Se agrego exitosamente la Carrera', tipo: 'success' })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('carreras/carreras_crear', { alerta: true, mensaje: "No se ha podido agregar la Carrera", tipo: 'warning' })
    })
})









/* Vista Catedras. */
router.get('/catedras/vista', function (req, res, next) {
  Catedras.listar()
    .then((resultado) => {
      const total = resultado.Catedras
      res.render('catedras/catedras', { catedras: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar las Catedras", error: error })
    })
});

/* Eliminar Catedras */
router.get('/catedras/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Catedras.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const datos = await Catedras.listar()
      res.render('catedras/catedras', { catedras: datos.Catedras, alerta: true, mensaje: 'Se eliminó exitosamente la Catedra', tipo: 'success' })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const datos = await Catedras.listar()
      res.render('catedras/catedras', { catedras: datos.Catedras, alerta: true, mensaje: "No se ha podido eliminar la Catedra", tipo: 'warning' })
    })
});

/* Vista 2 Catedras. */
router.get('/catedras/vista/crear', function (req, res, next) {
  res.render('catedras/catedras_crear', { alerta: false});
})

/* POST Catedras */
router.post('/catedras/vista/crear', async function (req, res, next) {
  const body = {
    nombre: req.body.nombre
  }
  Catedras.agregar(body)
    .then((resultado) => {
      console.log({ status: 200, data: resultado })
      res.render('catedras/catedras_crear', { alerta: true, mensaje: 'Se agrego exitosamente la Catedra', tipo: 'success' })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('catedras/catedras_crear', { alerta: true, mensaje: "No se ha podido agregar la Catedra", tipo: 'warning' })
    })
})









/* Vista Sedes. */
router.get('/sedes/vista', function (req, res, next) {
  Sedes.listar()
    .then((resultado) => {
      const total = resultado.Sedes
      res.render('sedes/sedes', { sedes: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar las Sedes", error: error })
    })
});

/* Eliminar Sedes */
router.get('/sedes/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Sedes.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const datos = await Sedes.listar()
      res.render('sedes/sedes', { sedes: datos.Sedes, alerta: true, mensaje: 'Se eliminó exitosamente la Sede', tipo: 'success' })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const datos = await Sedes.listar()
      res.render('sedes/sedes', { sedes: datos.Sedes, alerta: true, mensaje: "No se ha podido eliminar la Sede", tipo: 'warning' })
    })
});

/* Vista 2 Sedes. */
router.get('/sedes/vista/crear', function (req, res, next) {
  res.render('sedes/sedes_crear', { alerta: false});
})

/* POST Sedes */
router.post('/sedes/vista/crear', async function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion
  }
  Sedes.agregar(body)
    .then((resultado) => {
      console.log({ status: 200, data: resultado })
      res.render('sedes/sedes_crear', { alerta: true, mensaje: 'Se agrego exitosamente la Sede', tipo: 'success' })
    })
    .catch((error) => {
      console.log({ status: 400, error: error })
      res.render('sedes/sedes_crear', { alerta: true, mensaje: "No se ha podido agregar la Sede", tipo: 'warning' })
    })
})









/* Vista Empleados. */
router.get('/empleados/vista', function (req, res, next) {
  Empleados.listar()
    .then((resultado) => {
      const total = resultado.Empleados
      res.render('empleados/empleados', { empleados: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar los Empleados", error: error })
    })
});

/* Eliminar Empleados */
router.get('/empleados/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Empleados.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const datos = await Empleados.listar()
      res.render('empleados/empleados', { empleados: datos.Empleados, alerta: true, mensaje: 'Se eliminó exitosamente el Empleado', tipo: 'success' })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const datos = await Empleados.listar()
      res.render('empleados/empleados', { empleados: datos.Empleados, alerta: true, mensaje: "No se ha podido eliminar el Empleado", tipo: 'warning' })
    })
});

/* Vista 2 Empleados. */
router.get('/empleados/vista/crear', async function (req, res, next) {
  const sedes = await Sedes.listar()
  res.render('empleados/empleados_crear', { alerta: false, sedes: sedes.Sedes});
})

/* POST Empleados */
router.post('/empleados/vista/crear', async function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    departamento: req.body.departamento,
    cargo: req.body.cargo,
    sede: req.body.sede
  }
  Empleados.agregar(body)
    .then( async (resultado) => {
      console.log({ status: 200, data: resultado })
      const sedes = await Sedes.listar()
      res.render('empleados/empleados_crear', { alerta: true, mensaje: 'Se agrego exitosamente el Empleado', tipo: 'success', sedes: sedes.Sedes })
    })
    .catch( async (error) => {
      console.log({ status: 400, error: error })
      const sedes = await Sedes.listar()
      res.render('empleados/empleados_crear', { alerta: true, mensaje: "No se ha podido agregar el Empleado", tipo: 'warning', sedes: sedes.Sedes })
    })
})









/* Vista Eventos. */
router.get('/eventos/vista', function (req, res, next) {
  Eventos.listar()
    .then((resultado) => {
      const total = resultado.Eventos
      res.render('eventos/eventos', { eventos: total, alerta: false });
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "No se ha podido mostrar los Eventos", error: error })
    })
});

/* Eliminar Eventos */
router.get('/eventos/vistas/eliminar/:id', function (req, res, next) {
  const { id } = req.params

  Eventos.eliminar(id)
    .then( async (resultado)  => {
      console.log({ status: 200, data: resultado })

      const datos = await Eventos.listar()
      res.render('eventos/eventos', { eventos: datos.Eventos, alerta: true, mensaje: 'Se eliminó exitosamente el Evento', tipo: 'success' })
    })
    .catch(async (error) => {
      console.log({ status: 400, error: error })
      const datos = await Eventos.listar()
      res.render('eventos/eventos', { eventos: datos.Eventos, alerta: true, mensaje: "No se ha podido eliminar el Evento", tipo: 'warning' })
    })
});

/* Vista 2 Eventos. */
router.get('/eventos/vista/crear', async function (req, res, next) {
  const sedes = await Sedes.listar()
  res.render('eventos/eventos_crear', { alerta: false, sedes: sedes.Sedes});
})

/* POST Eventos */
router.post('/eventos/vista/crear', async function (req, res, next) {
  const body = {
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    sede: req.body.sede
  }
  Eventos.agregar(body)
    .then( async (resultado) => {
      console.log({ status: 200, data: resultado })
      const sedes = await Sedes.listar()
      res.render('eventos/eventos_crear', { alerta: true, mensaje: 'Se agrego exitosamente el Evento', tipo: 'success', sedes: sedes.Sedes })
    })
    .catch( async (error) => {
      console.log({ status: 400, error: error })
      const sedes = await Sedes.listar()
      res.render('eventos/eventos_crear', { alerta: true, mensaje: "No se ha podido agregar el Evento", tipo: 'warning', sedes: sedes.Sedes })
    })
})

module.exports = router;
