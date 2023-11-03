const Sequelize = require('sequelize');
const db = require('../util/db');
const Nutricionista = require('./nutritionist');

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

// estabelecendo relacionamentos
Paciente.belongsTo(Nutricionista, { 
    constraint: true, 
    foreignKey: 'idNutricionista' ,
    onDelete: 'CASCADE'
});

Nutricionista.hasMany(Paciente, { 
    foreignKey: 'idNutricionista' 
});

    
module.exports = Paciente;
