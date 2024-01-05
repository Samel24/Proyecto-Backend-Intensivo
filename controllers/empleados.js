const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Empleado {

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM empleados';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Empleados: response
                })
            } catch (error) {
                console.error('Error al mostrar los Empelados de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los Empelados de la Universidad',
                })
            }
        })
    }

    agregar(empleado) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!empleado.nombre || !empleado.departamento || !empleado.cargo || !empleado.sede) {
                    return reject('Debes ingresar propiedades como: nombre, departamento, cargo y sede')
                }

                if (Number.isInteger(empleado.nombre) === true || Number.isInteger(empleado.departamento) === true || Number.isInteger(empleado.cargo) === true || Number.isInteger(empleado.sede) === true) {
                    return reject('Debes ingresar un cadena de texto para ser valido')
                }


                const sql = 'SELECT * FROM empleados';
                const empleados = await query(sql);

                for (let i = 0; i < empleados.length; i++) {
                    if (empleados[i].nombre === empleado.nombre) {
                        return reject({
                            ok: false,
                            mensaje: 'Este Empleado ya esta registrado'
                        })
                    }
                }

                const sql2 = 'SELECT nombre FROM sedes';
                const sedes = await query(sql2);

                for (let i = 0; i < sedes.length; i++) {
                    if (sedes[i].nombre === empleado.sede) {
                        const sql3 = 'INSERT INTO empleados (nombre, departamento, cargo, sede) VALUES (?, ?, ?, ?)';
                        const values = [empleado.nombre, empleado.departamento, empleado.cargo, empleado.sede];
                        await query(sql3, values);

                        return resolve({
                            ok: true,
                            empleado_agregado: empleado
                        })
                    }
                }

                return reject({
                    ok: false,
                    mensaje: 'Debes ingresar una seede válida en la cual el empleado pueda trabajar',
                    sede_valida: sedes
                })


            } catch (error) {
                console.error('Error al agregar el Empleado:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Empleado',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM empleados WHERE id=?';
                const empleado = await query(sql, Number(id));

                if (empleado.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No se encontro el Empleado que estas buscando eliminar"
                    })
                }

                const sql2 = 'DELETE FROM empleados WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    empleado_eliminado: empleado
                })
            } catch (error) {
                console.error('Error al eliminar el Empleado:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Empleado',
                })
            }
        })
    }
}

const empleadosC = new Empleado();
module.exports = empleadosC;