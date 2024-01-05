const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Estudiante {

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM estudiantes';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    estudiantes: response
                })
            } catch (error) {
                console.error('Error al mostrar los Estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    agregar(estudiante) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad || !estudiante.carrera) {
                    return reject('Debes ingresar propiedades como: nombre, edad y carrera')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 150 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida entre 1 año y 150 años')
                }

                const sql = 'SELECT * FROM estudiantes';
                const estudiantes = await query(sql);

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].edad === estudiante.edad && estudiantes[i].nombre === estudiante.nombre && estudiantes[i].carerra === estudiante.carerra) {
                        return reject('Este estudiante ya esta registrado con los mismos datos, debes cambiarlos')
                    }
                }

                const sql1 = 'SELECT nombre FROM carreras';
                const carreras = await query(sql1);

                for (let i = 0; i < carreras.length; i++) {
                    if (carreras[i].nombre === estudiante.carrera) {
                        const values = [estudiante.nombre, estudiante.edad, estudiante.carrera]
                        const sql2 = 'INSERT INTO estudiantes (nombre, edad, carrera) VALUES (?, ?, ?)';
                        await query(sql2, values);

                        return resolve({
                            ok: true,
                            estudiante_agregado: estudiante
                        })
                    }
                }

                return reject({
                    ok: false,
                    mensaje: 'Debes ingresar una carrera válida en la cual el estudiante pueda graduarse',
                    carrera_valida: carreras
                })


            } catch (error) {
                console.error('Error al agregar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Estudiante',
                })
            }
        })
    }

    mostrar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT id, nombre, edad, carrera FROM estudiantes WHERE id=?';
                const estudiante = await query(sql, Number(id));

                if (estudiante.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "no se encontro el estudiante que estas buscando"
                    })
                }

                return resolve({
                    ok: true,
                    estudiante: estudiante
                })
            } catch (error) {
                console.error('Error al mostrar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar el estudiante',
                })
            }
        })
    }

    /*Nuevo controlador de la clase */
    mostrarCarrera(carrera) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT id, nombre, edad, carrera FROM estudiantes WHERE carrera=?';
                const estudiantes = await query(sql, carrera);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados en esta carrera"
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los Estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    /*Nuevo controlador de la clase */
    mostrarRango(rangomin, rangomax) {
        return new Promise(async (resolve, reject) => {
            try {
                if (rangomin > rangomax) {
                    return reject({
                        ok: false,
                        mensaje: 'Debes ingresar los datos correctamente ya que el valor mínimo es mayor que el valor máximo'
                    })
                }

                const sql = 'SELECT id, nombre, edad, carrera FROM estudiantes WHERE edad BETWEEN ? AND ?';
                const values = [rangomin, rangomax]
                const estudiantes = await query(sql, values);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados en este rango de edad"
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los Estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    /*Nuevo controlador de la clase */
    mostrarUltimos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM estudiantes ORDER BY id DESC LIMIT 5';
                const estudiantes = await query(sql);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados"
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los Estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    editar(estudiante, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad) {
                    return reject('Debes ingresar propiedades como: nombre, edad')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 150 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida entre 1 año y 150 años')
                }

                const sql = 'SELECT * FROM estudiantes';
                const estudiantes = await query(sql);

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].edad === estudiante.edad && estudiantes[i].nombre === estudiante.nombre) {
                        return reject('Este estudiante ya esta registrado con los mismos datos, debes cambiarlos')
                    }
                }

                const sql2 = 'SELECT id, nombre, edad, carrera FROM estudiantes WHERE id=?';
                const estudiante_buscado = await query(sql2, Number(id));

                if (estudiante_buscado.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "no se encontro el estudiante que estas buscando editar"
                    })
                }

                const values = [id, estudiante.nombre, estudiante.edad, id]
                const sql3 = 'UPDATE estudiantes SET id=?,nombre=?,edad=? WHERE id=?';
                await query(sql3, values);

                return resolve({
                    ok: true,
                    estudiante_editado: estudiante
                })
            } catch (error) {
                console.error('Error al editar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el Estudiante',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT id, nombre, edad, carrera FROM estudiantes WHERE id=?';
                const estudiante = await query(sql, Number(id));

                if (estudiante.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "no se encontro el estudiante que estas buscando"
                    })
                }

                const sql2 = 'DELETE FROM estudiantes WHERE id=?';
                const response = await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    estudiante_eliminado: estudiante
                })
            } catch (error) {
                console.error('Error al eliminar el Estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Estudiante',
                })
            }
        })
    }
}

const estudiantesC = new Estudiante();
module.exports = estudiantesC;