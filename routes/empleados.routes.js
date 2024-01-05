const express = require('express');
const router = express.Router();
const Empleados = require('../controllers/empleados.js')
const checkAutenticacion = require('../controllers/service/jwtAuth');

/* GET Empleados (Proyecto) */
router.get('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Empleados.listar()
            .then((resultado) => {
                res.status(200).json({ "status": 200, "data": resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Empleados", error: error })
            })
    }
);

/* POST Empleados (Proyecto) */
router.post('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Empleados.agregar(req.body)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido agregar el Empleado", error: error })
            })
    }
)

/* DELETE Empleados (Proyecto) */
router.delete('/:id',

    function (req, res, next) {
        roles = ["editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {

        const { id } = req.params

        Empleados.eliminar(id)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: 'No se pudo eliminar el Empleado', error: error })
            })
    }
)

module.exports = router;
