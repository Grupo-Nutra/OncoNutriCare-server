const Sequelize = require('sequelize');
const db = require('../util/db');

const Paciente = db.define('Paciente', {
    idPaciente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dtNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    numeroProntuario: {
        type: Sequelize.STRING,
        unique: true,
    },
    sexo: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    diagnosticoOnco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
    
module.exports = Paciente;
