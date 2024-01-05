const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Evento {

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM eventos';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Eventos: response
                })
            } catch (error) {
                console.error('Error al mostrar los Eventos de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los Eventos de la Universidad',
                })
            }
        })
    }

    agregar(evento) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!evento.titulo || !evento.fecha || !evento.sede) {
                    return reject('Debes ingresar propiedades como: titulo, fecha y sede')
                }

                if (Number.isInteger(evento.nombre) === true || Number.isInteger(evento.sede) === true) {
                    return reject('Debes ingresar una cadena de texto para ser valido')
                }

                const validacion = validarFormatoFecha(evento.fecha);
                if(validacion === false) {
                    return reject({
                        ok: false,
                        mensaje: 'La fecha no es válida'
                    })
                }

                const sql = 'SELECT * FROM eventos';
                const eventos = await query(sql);

                for (let i = 0; i < eventos.length; i++) {
                    if (eventos[i].titulo === evento.titulo) {
                        return reject({
                            ok: false,
                            mensaje: 'Este Evento ya esta registrado'
                        })
                    }
                }

                const sql2 = 'SELECT nombre FROM sedes';
                const sedes = await query(sql2);

                for (let i = 0; i < sedes.length; i++) {
                    if (sedes[i].nombre === evento.sede) {
                        const sql3 = 'INSERT INTO eventos (titulo, fecha, sede) VALUES (?, ?, ?)';
                        const values = [evento.titulo, evento.fecha, evento.sede];
                        await query(sql3, values);

                        return resolve({
                            ok: true,
                            evento_agregado: evento
                        })
                    }
                }

                return reject({
                    ok: false,
                    mensaje: 'Debes ingresar una seede válida en la cual el evento pueda realizarse',
                    sede_valida: sedes
                })


            } catch (error) {
                console.error('Error al agregar el Evento:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Evento',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM eventos WHERE id=?';
                const evento = await query(sql, Number(id));

                if (evento.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No se encontro el Evento que estas buscando eliminar"
                    })
                }

                const sql2 = 'DELETE FROM eventos WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    evento_eliminado: evento
                })
            } catch (error) {
                console.error('Error al eliminar el Evento:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Evento',
                })
            }
        })
    }
}

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{4}\-\d{2}\-\d{2}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
          return true;
    } else {
          return false;
    }
}

const eventosC = new Evento();
module.exports = eventosC;