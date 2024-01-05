const query = require('../config/query'); // Importamos la función para realizar consultas a la BD
const bcrypt = require('bcrypt');
const { crearToken } = require('./service/jwtCrear');

class Usuario {

    registrar(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!usuario.usuario || !usuario.password || !usuario.rol) {
                    return reject('Faltan propiedades escenciales: usuario, password y rol')
                }
    
                if (usuario.rol != 'admin' && usuario.rol != 'editor') {
                    return reject('Debes ingresar un rol permitido: admin o editor')
                }
    
                //validamos que no exista otro usuario igual
                const sql = 'SELECT `id`, `usuario`, `password`, `rol` FROM `usuarios` WHERE usuario = ?';
                const usuarioRepetido = await query(sql, usuario.usuario);
    
                if (usuarioRepetido.length > 0) {
                    return reject({
                        ok: false,
                        mensaje: 'Ya existe el Usuario registrado',
                    })
                }
    
                const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
                if (!passwordRegex.test(usuario.password)) {
                    return reject({ mensaje: 'La contraseña debe ser de al menos 6 caracteres, incluir una mayúscula y un número.' });
                }
    
                const passwordCifrada = await bcrypt.hash(usuario.password, 10);
    
                const values = [usuario.usuario, passwordCifrada, usuario.rol]
    
                const sql2 = 'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)';
                await query(sql2, values);
    
                resolve({
                    ok: true,
                    mensaje: 'Se ha registrado exitosamente el usuario: ' + usuario.usuario
                })
            }
            catch (error) {
                console.error('Error al agregar el Usuario:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Usuario',
                })
            }
        })
    }

    login(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!usuario.usuario || !usuario.password) {
                    return reject('Faltan propiedades escenciales: usuario y password')
                }
    
                const sql = 'SELECT `id`, `usuario`, `password`, `rol` FROM `usuarios` WHERE usuario = ?';
                const usuarioLogear = await query(sql, usuario.usuario);
                console.log(usuarioLogear)
    
                if (usuarioLogear.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: 'El usuario ingresado no existe',
                    })
                }
    
                const passwordValida = await bcrypt.compare(usuario.password, usuarioLogear[0].password);
                if (!passwordValida) {
                    return reject({ mensaje: 'La contraseña es incorrecta' });
                }
    
                let token = crearToken({ id: usuarioLogear[0].id, usuario: usuarioLogear[0].usuario, rol: usuarioLogear[0].rol });
                resolve({
                    ok: true,
                    mensaje: 'Has iniciado sesion con éxito',
                    usuario: usuarioLogear[0].usuario,
                    token: token
                })
            }catch (error) {
                console.error('Error al hacer el Login:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al hacer el Login',
                })
            }
        })
    }

}



const usuariosC = new Usuario();
module.exports = usuariosC;