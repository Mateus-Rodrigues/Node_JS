const express = require('express'); 
const router = express.Router(); 

// referência a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios'); 

-
router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); //body
router.patch('/usuarios/:usu_id', UsuariosController.editarUsuarios); // params (URL) e body
router.delete('/usuarios/:usu_id', UsuariosController.apagarUsuarios); // params (URL)
router.delete('/usuarios/del/:usu_id', UsuariosController.ocultarUsuario); // params (URL) 
router.post('/usuarios/login', UsuariosController.login); //body

module.exports = router;