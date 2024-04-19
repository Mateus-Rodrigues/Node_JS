const db = require('..database/connection');

module.exports = {
    async listarUsuarios(request, response) {
        try {
            // instruções SQL
            const sql = `SELECT
                usu_id, usu_nome, usu_email, usu_dt_nasc, usu_senha,
                usu_tipo, usu_ativo = 1 AS usu_ativo
                FROM usuarios
                WHERE usu_ativo = 1;`;
            // executa instruções SQL e armazena o resultado na variável usuarios     
            const usuarios = await db.query(sql);
            // armazena em uma variável o numero de resgistros retornados 
            const nItens = usuarios[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuários. ',
                dados: usuarios[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.message
            });
        }        
    },
    async cadastrarUsuario(request, response) {
        try {
            //parâmetros recebidos no corpo da requisição
            const { usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo} = request.body;
            // instrução SQL
            const sql = `INSERT INTO usuarios
            (usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo)
            VALUES (?, ?, ?, ?, ?, ?)`;
            //definição dos dados a serem inseridos em um array
            const values = [usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo];
            //execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            //identificação do ID do registro inserido
            const usu_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de usuário efetuado com sucesso. ',
                dados: usu_id
                //mensSql: execSql
            });
        } catch (error) {
            return response.satatus(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.message
            });

        }
    },
    async editarUsuarios(request, response) {
        try {
            // parâmetros recebidos pelo corpo da requisição
            const {usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo} = request.body;
            // parâmetros recebido pela URL via params ex: /usuario/1
            const { usu_id } = request.params;
            //instruções SQL
            const sql = `UPDATE usuarios SET usu_nome = ?, usu_email = ?,
            usu_dt_nasc = ?, usu_senha = ?, usu_tipo = ?, usu_ativo = ?;`;
            // preparo do array com dados que serão atualizados
            const values = [usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo, usu_id];
            // execução e obtenção da confirmação da atualização realizada
            const atualizaDados = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuario ${usu_id} atualizado com sucesso`,
                dados: atualiaDados[0].affectedRows
                // mensSql: atualizaDados
            });
        }
    },
    async apagarUsuarios(request, response) {
        try {
            // parâmetros passado via urlna chamada da api pelo front-end
            const { usu_id } = request.params;
            // comando de exclusão
            const sql = `DELETE FROM usuarios WHERE usu_id = ?`;
            // array com parâmetros da exclusão
            const values = [usu_id];
            // executa instrução no banco de dados 
            const excluir = await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                menssagem: `Usuario ${usu_id} excluido com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                menssagem: 'Erro na requisição. ',
                dados: error.message
            });
        }        
    },
    async ocultarUsuario(request, response) {
        try {
            const usu_ativo = false;
            const { usu_id } = request.params;
            const sql = `UPDATE usuarios SET usu_ativo = ?
            WHERE usu_id = ?:`;
            const values = [usu_ativo, usu_id];
            const atualizacao = await db.query(sql, values);

            return response.status(200).json({
                sucesso: false,
                menssagem: `Usuário ${ usu_id } excluido com sucesso `,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.message
            });
        } 
    },
    async login(request, response) {
        try {

            const { usu_email, usu_senha } = request.body;

            const sql = `SELECT usu_nome, usu_email, usu_dt_nasc, usu_senha, usu_tipo, usu_ativo, usu_id `
        }
    }
}