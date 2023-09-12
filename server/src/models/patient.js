const Sequelize = require('sequelize');
const db = require('../util/db');
const Nutricionista = require('./nutritionist');
const Consulta = require('./appointment');

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
    idNutricionista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Nutricionista',
            key: 'idNutricionista',
        }
    },
});

// estabelecendo relacionamentos
Paciente.belongsTo(Nutricionista, { foreignKey: 'idNutricionista' });
Paciente.hasMany(Consulta, { foreignKey: 'idPaciente', onDelete: 'CASCADE' });

    
module.exports = Paciente;
