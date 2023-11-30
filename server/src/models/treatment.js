const Sequelize = require('sequelize');
const db = require('../util/db');
const Paciente = require('./patient');

const Tratamento = db.define('Tratamento', {
    idTratamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo: {
        type: Sequelize.ENUM('Quimioterapia', 'Radioterapia', 'Imunoterapia', 'Hormônioterapia', 'Cirurgia', 'Seguimento'),
        allowNull: false,
    },
    medicamentos: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },

});

Tratamento.belongsTo(Paciente, { 
    constraint: true, 
    foreignKey: 'idPaciente',
    onDelete: 'CASCADE' 
});

Paciente.hasMany(Tratamento, { 
    foreignKey: 'idPaciente' 
});

module.exports = Tratamento;