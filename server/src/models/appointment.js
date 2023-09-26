const Sequelize = require('sequelize');
const db = require('../util/db');
const Paciente = require('./patient');

const Consulta = db.define('Consulta', {
    idConsulta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    peso: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
    },
    diagonosticoNutri: {
        type: Sequelize.ENUM('Baixo peso', 'Desnutrição', 'Caquexia', 'Miopenia', 'Sarcopenia', 'Sobrepeso', 'Obesidade'),
        allowNull: false,
    },
    inapetencia: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    riscoNutricional: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    statusTno: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    planoTeraoeutico: {
        type: Sequelize.STRING(350),
    }, 
    tratamento: {
        type: Sequelize.STRING,
    },
});

// estabelecendo relacionamento
Consulta.belongsTo(Paciente, { 
    constraint: true, 
    foreignKey: 'idPaciente',
    onDelete: 'CASCADE' 
});

Paciente.hasMany(Consulta, { 
    foreignKey: 'idPaciente' 
});

module.exports = Consulta;