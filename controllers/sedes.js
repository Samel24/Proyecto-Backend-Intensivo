const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Sede {

    listar(){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM sedes';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Sedes: response
                })
            } catch (error) {
                console.error('Error al mostrar las Sedes de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar las Sedes de la Universidad',
                })
            }
        })
    }
   
    agregar(sede) {
        return new Promise( async (resolve, reject) => {
            try {
                if (!sede.nombre || !sede.ubicacion) {
                    return reject('Debes ingresar propiedades como: nombre y ubicacion')
                }

                const sql = 'SELECT * FROM sedes';
                const sedes = await query(sql);

                for (let i = 0; i < sedes.length; i++) {
                    if (sedes[i].nombre === sede.nombre) {
                        return reject({
                            ok: false,
                            mensaje: 'Esta Sede ya esta registrada'
                        })
                    }
                }

                const sql2 = 'INSERT INTO sedes (nombre, ubicacion) VALUES (?, ?)';
                const values = [sede.nombre, sede.ubicacion]
                await query(sql2, values);

                return resolve({
                    ok: true,
                    sede_agregada: sede
                })
            } catch (error) {
                console.error('Error al agregar la Sede:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar la Sede',
                })
            }
        })
    }

    eliminar(id){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM sedes WHERE id=?';
                const sede = await query(sql, Number(id));

                if (sede.length === 0) {
                    return reject({
                        ok:false,
                        mensaje: "No se encontro la Sede que estas buscando eliminar"
                    })
                }

                const sql2 = 'DELETE FROM sedes WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    sede_eliminada: sede
                })
            } catch (error) {
                console.error('Error al eliminar la Sede:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar la Sede',
                })
            }
        })
    }
}

const sedesC = new Sede();
module.exports = sedesC;